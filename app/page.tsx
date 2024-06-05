"use client";

import Tasks from "./components/Tasks/Tasks";
import { useGlobalState } from "./context/globalProvider";

const page = () => {
  const { tasks } = useGlobalState();

  return (
    <>
      <Tasks tasks={tasks} title={"All Tasks"} />
    </>
  );
};

export default page;
