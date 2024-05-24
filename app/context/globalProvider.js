"use client";
import { createContext, useContext, useEffect, useState } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalContextUpdate = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0); // '0' because in our theme file we have array of objects in which 0 is for light and '1' is for dark
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);

  const theme = themes[selectedTheme];

  const { user } = useUser();

  const collapseSidebar = () => {
    setCollapsedSidebar(!collapsedSidebar);
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const getAllTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/tasks`);

      if (data.eror) {
        toast.error(data.error);
        return;
      }

      const sortedTasks = data?.tasks?.sort((a, b) => {
        return (
          new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
        );
      });

      setTasks(sortedTasks);
      setIsLoading(false);
    } catch (error) {
      console.log("get tasks err ", error);
      setIsLoading(false);
      return;
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`/api/tasks/${id}`);

      toast.success("Task deleted");

      getAllTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const updateTask = async (task) => {
    try {
      const { data } = await axios.put(`/api/tasks`, task);

      toast.success("Task updated");

      getAllTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const completedTasks = tasks?.filter((task) => task?.isCompleted === true);
  const importantTasks = tasks?.filter((task) => task?.isImportant === true);
  const inCompleteTasks = tasks?.filter((task) => task?.isCompleted === false);

  useEffect(() => {
    if (user) {
      getAllTasks();
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        inCompleteTasks,
        updateTask,
        modal,
        openModal,
        closeModal,
        getAllTasks,
        collapsedSidebar,
        collapseSidebar,
      }}
    >
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalStateUpdate = () => useContext(GlobalContextUpdate);
