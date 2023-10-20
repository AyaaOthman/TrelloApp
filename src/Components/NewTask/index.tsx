import { useFormik } from "formik";
import React, { useState } from "react";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";
import { NewTask } from "../../interfaces/Task";
import * as yup from "yup";

export default function AddTask() {
    const [showModal, setShowModal] = useState(false);
    const formik = useFormik<NewTask>({
        initialValues: {
            title: "",
            description: "",
            assignTo: "",
            deadline: "",
        },
        validationSchema: yup.object({
            title: yup
                .string()
                .required("title is required")
                .max(30, " must be less than 30 character"),
            description: yup
                .string()
                .required("description is required")
                .max(250),
            assignTo: yup
                .string()
                .email("email not valid")
                .required("must assign task"),
            deadline: yup.string().required("must set task deadline"),
            createdOn: yup.date().default(() => new Date()),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            <TERipple rippleColor="white">
                <button
                    className="inline-block rounded bg-Orange px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-black hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-Orange focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-orange-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={() => setShowModal(true)}
                >
                    Add New Task
                </button>
            </TERipple>

            {/* <!-- Modal --> */}
            <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
                <TEModalDialog>
                    <TEModalContent>
                        <TEModalHeader>
                            {/* <!--Modal title--> */}
                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                New Task
                            </h5>
                            {/* <!--Close button--> */}
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </TEModalHeader>
                        {/* <!--Modal body--> */}
                        <TEModalBody>
                            <div className="container">
                                <form
                                    onSubmit={formik.handleSubmit}
                                    className="p-2"
                                >
                                    <div className="mb-4 flex flex-col items-start">
                                        <label htmlFor="title">
                                            Task Title
                                        </label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="w-full border"
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.title &&
                                            formik.touched.title && (
                                                <div className="my-2 w-full bg-red-800 p-1">
                                                    <p className="text-red-50">
                                                        {formik.errors.title}
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                    <div className="mb-4 flex flex-col items-start">
                                        <label htmlFor="description">
                                            Task Description
                                        </label>

                                        <textarea
                                            name="description"
                                            id="description"
                                            cols={30}
                                            rows={5}
                                            className="w-full border"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        ></textarea>
                                        {formik.errors.description &&
                                            formik.touched.description && (
                                                <div className="my-2 w-full bg-red-800 p-1">
                                                    <p className="text-red-50">
                                                        {
                                                            formik.errors
                                                                .description
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                    <div className="mb-4 flex justify-between">
                                        <div className="flex flex-col items-start">
                                            <label htmlFor="assignTo">
                                                Assign To
                                            </label>
                                            <input
                                                type="email"
                                                className="border"
                                                id="assignTo"
                                                name="assignTo"
                                                value={formik.values.assignTo}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.assignTo &&
                                                formik.touched.assignTo && (
                                                    <div className="my-2 w-full bg-red-800 p-1">
                                                        <p className="text-red-50">
                                                            {
                                                                formik.errors
                                                                    .assignTo
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <label htmlFor="deadline">
                                                Deadline
                                            </label>
                                            <input
                                                type="date"
                                                className="border"
                                                id="deadline"
                                                name="deadline"
                                                value={formik.values.deadline}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />

                                            {formik.errors.deadline &&
                                                formik.touched.deadline && (
                                                    <div className="my-2 w-full bg-red-800 p-1">
                                                        <p className="text-red-50">
                                                            {
                                                                formik.errors
                                                                    .deadline
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <TERipple rippleColor="light">
                                        <button
                                            type="button"
                                            className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Discard
                                        </button>
                                    </TERipple>
                                    <TERipple rippleColor="light">
                                        <button
                                            type="submit"
                                            className="ml-2 inline-block rounded !bg-Orange px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-black hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-Orange focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-orange-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        >
                                            Add Task
                                        </button>
                                    </TERipple>
                                </form>
                            </div>
                        </TEModalBody>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </div>
    );
}
