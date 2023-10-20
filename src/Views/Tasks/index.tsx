import React from 'react'
import TaskCard from '../../Components/UI/Cards/TaskCard'
import AddTask from '../../Components/NewTask'

const TasksPage = () => {
    return (
        <main className="container flex flex-col justify-center mx-auto">
            <div className="container text-center my-6">
                <h2 className="text-2xl font-bold mb-5 ">
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
    )
}

export default TasksPage
