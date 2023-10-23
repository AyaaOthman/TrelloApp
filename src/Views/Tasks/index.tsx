import React, { useContext, useState } from "react";
import TaskCard, { TaskEditCard } from "../../Components/UI/Cards/TaskCard";
import AddTask from "../../Components/NewTask";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import { Task } from "../../interfaces/Task";
import { AnimatePresence } from "framer-motion";
import { TEModal, TEModalDialog, TEModalContent } from "tw-elements-react";

const TasksPage = () => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [editingTask, setEditingTask] = useState<boolean>(false);
    const { state } = useContext(AuthContext);
    console.log(state.token);
    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery<Task[]>({
        queryKey: ["tasks"],
        queryFn: () =>
            axios
                .get("https://trello-app-iti.onrender.com/tasks/all", {
                    headers: {
                        authorization: `Bearer__${state.token}`,
                    },
                })
                .then((res) => res.data.tasks),
    });
    const mutation = useMutation({
        mutationFn: async (newTask: { id: string; taskData: object }) => {
            return axios
                .put(
                    `https://trello-app-iti.onrender.com/tasks/${newTask.id}`,
                    newTask.taskData,
                    {
                        headers: {
                            authorization: `Bearer__${state.token}`,
                        },
                    }
                )
                .then((res) => res.data);
        },
        mutationKey: ["tasks"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
    console.log(data);

    return (
        <main className="container mx-auto flex flex-col justify-center">
            <div className="container my-6 text-center">
                <h2 className="mb-5 text-2xl font-bold ">
                    Failing to plan is simply planning to fail !
                </h2>
                <AddTask />
            </div>
            <div className="container">
                {(isLoading || mutation.isPending) && (
                    <div className="flex w-full items-center justify-center">
                        <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
                    </div>
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {data &&
                        data.map((task) => {
                            return (
                                <TaskCard
                                    onClick={() => {
                                        setSelectedTask(task);
                                    }}
                                    key={task._id}
                                    className=" cursor-pointer rounded-lg border p-3"
                                    task={task}
                                    layoutId={task._id}
                                />
                            );
                        })}
                </div>
            </div>

            <TEModal
                leaveHiddenModal={true}
                show={Boolean(selectedTask)}
                setShow={() => {
                    setSelectedTask(null);
                    setEditingTask(false);
                }}>
                <TEModalDialog centered>
                    <AnimatePresence initial={true}>
                        <TEModalContent>
                            {selectedTask && !editingTask && (
                                <TaskCard
                                    layoutId={selectedTask._id}
                                    className="w-full rounded-lg bg-white p-5"
                                    task={selectedTask}
                                    onEdit={() => {
                                        setEditingTask(true);
                                    }}
                                    expanded
                                />
                            )}
                            {selectedTask && editingTask && (
                                <TaskEditCard
                                    className="p-5"
                                    task={selectedTask}
                                    layoutId={selectedTask._id}
                                    onEdit={() => {
                                        setEditingTask(false);
                                        setSelectedTask(null);
                                    }}
                                    onSubmit={(val: object) => {
                                        console.log(val);

                                        mutation.mutate({
                                            id: selectedTask._id,
                                            taskData: val,
                                        });
                                    }}
                                />
                            )}
                        </TEModalContent>
                    </AnimatePresence>
                </TEModalDialog>
            </TEModal>
        </main>
    );
};

export default TasksPage;
