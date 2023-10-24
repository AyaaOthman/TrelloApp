import React, { useContext, useState } from "react";
import TaskCard, { TaskEditCard } from "../../Components/UI/Cards/TaskCard";
import AddTask from "../../Components/NewTask";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import { Task } from "../../interfaces/Task";
import { AnimatePresence } from "framer-motion";
import { TEModal, TEModalDialog, TEModalContent } from "tw-elements-react";
import { ToastContainer, toast } from "react-toastify";

async function getUsers() {
    return await axios
        .get("https://trello-app-iti.onrender.com/profile/all-users")
        .then((res) => res.data.users);
}

const TasksPage = () => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [editingTask, setEditingTask] = useState<boolean>(false);
    const { state } = useContext(AuthContext);
    // console.log(state.token);
    console.log(state.id);
    const queryClient = useQueryClient();
    // tasks query
    const {
        isLoading: tasksLoading,
        error: tasksError,
        data: tasks,
    } = useQuery<Task[]>({
        queryKey: ["tasks"],
        queryFn: () =>
            axios
                .get("https://trello-app-iti.onrender.com/tasks/all", {
                    headers: {
                        authorization: `Bearer__${state.token}`,
                    },
                })
                .then((res) => res.data.tasks)
                .catch((err) => {
                    toast.error(err?.response?.data?.message || 'something went wrong please try again');     
                })
    });
    const mutation = useMutation({
        mutationFn: async (newTask: {
            id: string;
            taskData?: object;
            action: "edit" | "delete";
        }) => {
            if (newTask.action === "edit") {
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
                    .then((res) => res.data)
                    .catch((err) => {
                        toast.error(err?.response?.data?.message || 'something went wrong please try again');     
                    })
            } else if (newTask.action === "delete") {
                return axios.delete(
                    `https://trello-app-iti.onrender.com/tasks/${newTask.id}`,
                    {
                        headers: {
                            authorization: `Bearer__${state.token}`,
                        },
                    }
                ).catch((err) => {
                    toast.error(err?.response?.data?.message || 'something went wrong please try again');     
                })
            }
        },
        mutationKey: ["tasks"],
        onSuccess: () => {
            toast.success("Task was edited successfully!")
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: (err) => {
            // toast.error(err.message);
        },
    });
    console.log(tasks);
    // users query
    const {
        isLoading: usersLoading,
        error: usersError,
        data: users,
    } = useQuery<any[]>({
        queryKey: ["users"],
        queryFn: getUsers,
    });
    console.log(users);
    return (
        <>
            <main className="container mx-auto flex min-h-screen flex-col justify-center pb-12">
                <div className="container my-6 text-center">
                    <h2 className="mb-5 text-2xl font-bold ">
                        Failing to plan is simply planning to fail !
                    </h2>
                    <AddTask />
                </div>
                <div className="container">
                    {(tasksLoading || mutation.isPending) && (
                        <div className="flex w-full items-center justify-center">
                            <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {tasks &&
                            tasks.map((task) => {
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
                                            if (
                                                selectedTask.createdBy._id ===
                                                state.id
                                            ) {
                                                setEditingTask(true);
                                            }
                                        }}
                                        onDelete={() => {
                                            mutation.mutate({
                                                id: selectedTask._id,
                                                action: "delete",
                                            });
                                            setSelectedTask(null);
                                        }}
                                        canEdit={Boolean(
                                            selectedTask.createdBy._id ===
                                                state.id
                                        )}
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
                                            mutation.mutate({
                                                id: selectedTask._id,
                                                taskData: val,
                                                action: "edit",
                                            });
                                        }}
                                    />
                                )}
                            </TEModalContent>
                        </AnimatePresence>
                    </TEModalDialog>
                </TEModal>
            </main>
        </>
    );
};

export default TasksPage;
