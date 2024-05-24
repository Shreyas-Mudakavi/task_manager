"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import Button from "../Button/Button";
import { FaFileCirclePlus } from "react-icons/fa6";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const { theme, closeModal, getAllTasks } = useGlobalState();

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "isCompleted":
        setIsCompleted(e.target.checked);
        break;
      case "isImportant":
        setIsImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      isCompleted,
      isImportant,
    };

    try {
      const { data } = await axios.post(`/api/tasks`, task);

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Task created successfully.");

      setTimeout(() => {
        getAllTasks();
      }, 1000);

      closeModal();
    } catch (error) {
      console.log("create task err ", error);
      toast.error("Something went wrong!");
      return;
    }
  };

  const CreateContentStyled = styled.form`
    > h1 {
      font-size: clamp(1.2rem, 5vw, 1.6rem);
      font-weight: 600;
    }

    color: ${(props) => props.theme.colorGrey1};

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    .input-control {
      position: relative;
      margin: 1.6rem 0;
      font-weight: 500;

      input,
      textarea {
        width: 100%;
        padding: 1rem;
        resize: none;
        background-color: ${(props) => props.theme.colorGreyDark};
        color: ${(props) => props.theme.colorGrey2};
        border-radius: 0.5rem;
      }
    }

    .submit-btn button {
      transition: all 0.35s ease-in-out;
      &:hover {
        background: ${(props) => props.theme.colorPrimaryGreen} !important;
        color: ${(props) => props.theme.colorWhite} !important;
      }
    }

    .toggler {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      label {
        flex: 1;
      }

      input: {
        width: initial;
      }
    }
  `;

  return (
    <CreateContentStyled theme={theme} onSubmit={handleFormSubmit}>
      <h1>Create a Task</h1>

      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleChange("title")}
          placeholder="e.g. Watch a video from Fireship."
        />
      </div>

      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={description}
          rows={4}
          onChange={handleChange("description")}
          placeholder="e.g. Watch a video about Next.js Auth."
        ></textarea>
      </div>

      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={handleChange("date")}
        />
      </div>

      <div className="input-control toggler">
        <label htmlFor="isCompleted">Toggle Completed</label>
        <input
          type="checkbox"
          name="isCompleted"
          id="isCompleted"
          value={isCompleted?.toString()}
          onChange={handleChange("isCompleted")}
        />
      </div>

      <div className="input-control toggler">
        <label htmlFor="isImportant">Toggle Important</label>
        <input
          type="checkbox"
          name="isImportant"
          id="isImportant"
          value={isImportant?.toString()}
          onChange={handleChange("isImportant")}
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Create Task"
          icon={<FaFileCirclePlus color={theme.colorGrey0} />}
          padding={""}
          borderRad={""}
          fw={""}
          fs={""}
          background={"#27ae60"}
        />
      </div>
    </CreateContentStyled>
  );
};

export default CreateContent;
