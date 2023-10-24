import React, { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import styles from "./TaskCard.module.css";
import { Task } from "../../../../interfaces/Task";
import * as Yup from "yup";
import { Formik } from "formik";

interface TaskCardProps {
    task: Task;
    className?: string;
    layoutId?: string;
    onClick?: () => void;
    expanded?: boolean;
    onEdit?: MouseEventHandler<HTMLElement> | undefined;
    onDelete?: MouseEventHandler<HTMLElement> | undefined;
    canEdit?: boolean;
}
interface TaskEditProps {
    task: Task;
    layoutId: string;
    className?: string;
    onEdit: Function;
    onSubmit?: Function;
    users?: any[];
}
const TaskCard: React.FC<TaskCardProps> = ({
    task,
    className,
    layoutId,
    onClick,
    onEdit,
    onDelete,
    canEdit,
    expanded,
}) => {
    // console.log(task);

    return (
        <div>
            <motion.div
                className={`relative ${className} ${
                    expanded ? styles.expanded : ""
                }`}
                layoutId={layoutId}
                onClick={onClick}>
                <span
                    className={`me-2 inline-block whitespace-nowrap rounded-full px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none ${
                        task.status === "todo"
                            ? "bg-primary-100 text-primary-700"
                            : task.status === "doing"
                            ? "bg-warning-100 text-warning-800"
                            : " bg-success-100 text-success-700 "
                    }`}>
                    {task.status}
                </span>
                {/* Edit Icon */}
                {/* Delete Icon */}
                {expanded && (
                    <div className="absolute end-7 top-7">
                        <i
                            onClick={onEdit}
                            className={`fa-regular fa-pen-to-square me-5 text-xl ${
                                canEdit
                                    ? "cursor-pointer"
                                    : "cursor-not-allowed"
                            }`}></i>
                        <i
                            onClick={onDelete}
                            className={`fa-solid fa-trash text-xl ${
                                canEdit
                                    ? "cursor-pointer"
                                    : "cursor-not-allowed"
                            }`}></i>
                    </div>
                )}
                <p className="text-sm font-bold">
                    {new Date(task.deadline).toLocaleDateString()}
                </p>
                <h2 className="mt-2 text-lg font-bold">
                    {task.title.toUpperCase()}
                </h2>

                <p className={expanded ? "mt-2" : ""}>{task.description}</p>
                <div className="mt-4">
                    <p>
                        {expanded && (
                            <motion.span className="text-sm font-bold">
                                Assigned to:
                            </motion.span>
                        )}
                        <span className="inline-block whitespace-nowrap rounded-full bg-neutral-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-neutral-600">
                            {task.assignTo.email}
                        </span>
                    </p>
                    {expanded && (
                        <div className="mt-2">
                            <motion.span className="text-sm font-bold">
                                Created by:
                            </motion.span>
                            <span className="inline-block whitespace-nowrap rounded-full bg-neutral-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-neutral-600">
                                {task.createdBy.email}
                            </span>
                        </div>
                    )}
                </div>

                {expanded && (
                    <>
                        <hr className="mx-4 my-4" />
                        <div className="grid grid-cols-2">
                            {task?.createdAt && (
                                <div>
                                    <span className="font-bold">
                                        Created at:{" "}
                                    </span>
                                    <span>
                                        {new Date(
                                            task.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                            {task?.updatedAt && (
                                <div>
                                    <span className="font-bold">
                                        Last updated at:{" "}
                                    </span>
                                    <span>
                                        {new Date(
                                            task.updatedAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export const TaskEditCard: React.FC<TaskEditProps> = ({
    task,
    layoutId,
    className,
    onEdit,
    onSubmit,
    users,
}) => {
    const oldDeadLine: Date = new Date(task.deadline);
    console.log(users);

    return (
        <motion.div layoutId={layoutId} className={className}>
            <Formik
                initialValues={{
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    to: task.assignTo._id,
                    deadline: `${oldDeadLine.getFullYear()}-${
                        oldDeadLine.getMonth() + 1
                    }-${oldDeadLine.getDate()}`,
                }}
                validationSchema={Yup.object({
                    title: Yup.string().required().min(3).label("Title"),
                    description: Yup.string()
                        .required()
                        .min(30)
                        .label("Description"),
                    status: Yup.string().required().label("Status"),
                    to: Yup.string()
                        .required("You have to assign to a user.")
                        .label("Assigned to"),
                    deadline: Yup.date().required().label("Deadline"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        onSubmit &&
                            (await onSubmit({
                                title: values.title,
                                description: values.description,
                                assignTo: values.to,
                                deadline: new Date(
                                    values.deadline
                                ).toISOString(),
                                status: values.status,
                            }));
                        onEdit();
                    } catch (err: any) {
                        console.log(err.message);
                    }
                    console.log(values);
                }}>
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                }) => (
                    <form onSubmit={handleSubmit} className="flex flex-col p-2">
                        <button type="submit">
                            <i className="fa-solid fa-check absolute end-3 top-3 cursor-pointer text-xl"></i>
                        </button>
                        <div className="mb-4">
                            <label
                                htmlFor="status"
                                className="mb-2 block text-sm font-bold text-gray-700">
                                Status
                            </label>
                            <select
                                className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                name="status"
                                id="status"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option value="toDo">Todo</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                            {touched.status && errors.status && (
                                <p className="text-xs italic text-red-500">
                                    {errors.status}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="to"
                                className="mb-2 block text-sm font-bold text-gray-700">
                                Assigned to:
                            </label>
                            <select
                                className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                name="to"
                                id="to"
                                value={values.to}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                {users?.map((user) => (
                                    <option value={user._id} key={user._id}>
                                        {user.email}
                                    </option>
                                ))}
                            </select>

                            {touched.to && errors.to && (
                                <p className="text-xs italic text-red-500">
                                    {errors.to}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="to"
                                className="mb-2 block text-sm font-bold text-gray-700">
                                Title:
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.title && errors.title && (
                                <p className="text-xs italic text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="to"
                                className="mb-2 block text-sm font-bold text-gray-700">
                                Description:
                            </label>
                            <textarea
                                name="description"
                                placeholder="Description"
                                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}></textarea>
                            {touched.description && errors.description && (
                                <p className="text-xs italic text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="to"
                                className="mb-2 block text-sm font-bold text-gray-700">
                                Deadline:
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                placeholder="Deadline"
                                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                value={values.deadline}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.deadline && errors.deadline && (
                                <p className="text-xs italic text-red-500">
                                    {errors.deadline}
                                </p>
                            )}
                        </div>
                    </form>
                )}
            </Formik>
        </motion.div>
    );
};
export default TaskCard;
