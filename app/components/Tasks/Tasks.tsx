"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import TaskItem from "./../TaskItem/TaskItem";
import { FaFileCirclePlus } from "react-icons/fa6";
import Modal from "../Modals/Modal";
import CreateContent from "../Modals/CreateContent";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const TaskStyled = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  padding: 2rem;
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    margin: 2rem 0rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0%.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

interface Props {
  title: string;
  tasks: any[];
}

const Tasks = ({ tasks, title }: Props) => {
  const { theme, isLoading, openModal, modal } = useGlobalState();

  const { user } = useUser();

  const router = useRouter();

  if (!user) {
    router.push("/signin");
    return;
  }

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>
      {!isLoading ? (
        <div className="tasks grid">
          {tasks?.map((task) => (
            <TaskItem
              id={task?.id}
              key={task?.id}
              title={task?.title}
              description={task?.description}
              date={task?.date}
              isCompleted={task?.isCompleted}
              isImportant={task?.isImportant}
            />
          ))}

          <button className="create-task" onClick={openModal}>
            <FaFileCirclePlus /> Add New Task
          </button>
        </div>
      ) : (
        <div className="task-loader w-full flex items-center justify-center h-full">
          <span className="loader"></span>
        </div>
      )}
    </TaskStyled>
  );
};

export default Tasks;
