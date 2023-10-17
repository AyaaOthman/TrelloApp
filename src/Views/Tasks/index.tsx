import React from "react";
import TaskCard from "../../Components/UI/Cards/TaskCard";

const TasksPage = () => {
  return (
    <main>
      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          <TaskCard
            className=" rounded-lg border p-3"
            title="Hello"
            description="lorem sdf;ldvs"
            status="doing"
          />
          <TaskCard
            className=" rounded-lg border p-3"
            title="Hello"
            description="lorem sdf;ldvs"
            status="doing"
          />
          <TaskCard
            className=" rounded-lg border p-3"
            title="Hello"
            description="lorem sdf;ldvs"
            status="doing"
          />
          <TaskCard
            className=" rounded-lg border p-3"
            title="Hello"
            description="lorem sdf;ldvs"
            status="doing"
          />
          <TaskCard
            className=" rounded-lg border p-3"
            title="Hello"
            description="lorem sdf;ldvs"
            status="doing"
          />
        </div>
      </div>
    </main>
  );
};

export default TasksPage;
