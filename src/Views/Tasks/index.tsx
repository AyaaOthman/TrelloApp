import React from "react";
import TaskCard from "../../Components/UI/Cards/TaskCard";
import AddTask from "../../Components/NewTask";

const TasksPage = () => {
    return (
        <main className="container mx-auto flex flex-col justify-center">
            <div className="container my-6 text-center">
                <h2 className="mb-5 text-2xl font-bold ">
                    Failing to plan is simply planning to fail !
                </h2>
                <AddTask />
            </div>
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
