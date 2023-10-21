import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth.context";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
} from "tw-elements-react";
import axios from "axios";
import * as yup from "yup";
import { IUser } from "../../interfaces/register.interface";

export default function ProfilePage() {
    // validate that user is logged in
    const { state } = useContext(AuthContext);
    const token = state.token;
    const userId = state.id;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const phoneRegExp = /^01[0125][0-9]{8}$/;
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        // if (!token) {
        //     navigate("/login");
        // }
        getUserData();
    }, []);

    const formik = useFormik<IUser>({
        initialValues: {
            username: "",
            age: 0,
            gender: "",
            phone: "",
        },
        validationSchema: yup.object({
            username: yup
                .string()
                .min(3, " must be at least 3 character")
                .max(30, " must be less than 30 character"),
            gender: yup
                .mixed()
                .oneOf(["male", "female"] as const)
                .defined(),
            age: yup.number().positive().integer(),

            phone: yup
                .string()
                .matches(phoneRegExp, "Phone number is not valid"),
        }),
        onSubmit: async (values, { resetForm }) => {
            let data = {
                ...values,
            };
            await axios
                .put(
                    `https://trello-app-iti.onrender.com/profile/${userId}`,
                    data,
                    {
                        headers: { authorization: ` Bearer__${token}` },
                    }
                )
                .then(async ({ data }) => {
                    toast.success(data.message);
                    await getUserData();
                    resetForm();
                    setShowModal(false);
                })
                .catch((err) => {
                    const errorMsg = err?.message;
                    toast.error(errorMsg);
                });
        },
    });

    //get user data
    async function getUserData() {
        await axios
            .get("https://trello-app-iti.onrender.com/profile/me", {
                headers: { authorization: ` Bearer__${token}` },
            })
            .then((data) => {
                setUser(data.data.user);
            })
            .catch((e) => console.log(e));
    }

    return (
        <div>
            <div className="h-screen bg-gray-200 pt-12 dark:bg-gray-700">
                {/* Card start */}
                <div className="mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
                    <div className="border-b px-4 pb-6">
                        <div className="my-4 text-center">
                            <img
                                className="mx-auto my-4 h-32 w-32 rounded-full border-4 border-white dark:border-gray-800"
                                src={
                                    user?.gender === "male"
                                        ? "male-avatar.jpg"
                                        : "female-avatar.jpg"
                                }
                                alt="male-avatar"
                            />

                            <div className="py-2">
                                <h3 className="mb-1 text-2xl font-bold text-gray-800 dark:text-white">
                                    {user?.username}
                                </h3>
                                <div className="inline-flex items-center text-gray-700 dark:text-gray-300">
                                    <ul className="flex flex-col">
                                        <li>
                                            <span className="font-bold">
                                                Phone:
                                            </span>{" "}
                                            {user?.phone}
                                        </li>
                                        <li>
                                            <span className="font-bold">
                                                Age:
                                            </span>{" "}
                                            {user?.age}
                                        </li>
                                        <li>
                                            <span className="font-bold">
                                                Gender:
                                            </span>{" "}
                                            {user?.gender}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 px-2">
                            <TERipple rippleColor="white">
                                <button
                                    className="inline-block rounded bg-Orange px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-black hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-Orange focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-orange-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    onClick={() => setShowModal(true)}
                                >
                                    Edit Profile
                                </button>
                            </TERipple>
                            <TEModal
                                show={showModal}
                                setShow={setShowModal}
                                staticBackdrop
                            >
                                <TEModalDialog>
                                    <TEModalContent>
                                        <TEModalHeader>
                                            {/* <!--Modal title--> */}
                                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                                Edit Profile
                                            </h5>
                                            <ToastContainer
                                                theme="colored"
                                                position="top-center"
                                            />

                                            {/* <!--Close button--> */}
                                            <button
                                                type="button"
                                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
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
                                                    onSubmit={
                                                        formik.handleSubmit
                                                    }
                                                    className="p-2"
                                                >
                                                    <div className="mb-4 flex flex-col items-start">
                                                        <label htmlFor="username">
                                                            User Name
                                                        </label>
                                                        <input
                                                            id="username"
                                                            name="username"
                                                            type="text"
                                                            className="w-full border"
                                                            value={
                                                                formik.values
                                                                    .username
                                                            }
                                                            onChange={
                                                                formik.handleChange
                                                            }
                                                            onBlur={
                                                                formik.handleBlur
                                                            }
                                                        />
                                                        {formik.errors
                                                            .username &&
                                                            formik.touched
                                                                .username && (
                                                                <div className="my-2 w-full bg-red-800 p-1">
                                                                    <p className="text-red-50">
                                                                        {
                                                                            formik
                                                                                .errors
                                                                                .username
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div className="mb-4 flex flex-col items-start">
                                                        <label htmlFor="gender">
                                                            Gender
                                                        </label>
                                                        <select
                                                            name="gender"
                                                            id="gender"
                                                            className="w-full border"
                                                            value={
                                                                formik.values
                                                                    .gender
                                                            }
                                                            onChange={
                                                                formik.handleChange
                                                            }
                                                            onBlur={
                                                                formik.handleBlur
                                                            }
                                                        >
                                                            <option value="male">
                                                                male
                                                            </option>
                                                            <option value="female">
                                                                female
                                                            </option>
                                                        </select>

                                                        {formik.errors.gender &&
                                                            formik.touched
                                                                .gender && (
                                                                <div className="my-2 w-full bg-red-800 p-1">
                                                                    <p className="text-red-50">
                                                                        {
                                                                            formik
                                                                                .errors
                                                                                .gender
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div className="mb-4 flex justify-between">
                                                        <div className="flex flex-col items-start">
                                                            <label htmlFor="age">
                                                                age
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="border"
                                                                id="age"
                                                                name="age"
                                                                value={
                                                                    formik
                                                                        .values
                                                                        .age
                                                                }
                                                                onChange={
                                                                    formik.handleChange
                                                                }
                                                                onBlur={
                                                                    formik.handleBlur
                                                                }
                                                            />
                                                            {formik.errors
                                                                .age &&
                                                                formik.touched
                                                                    .age && (
                                                                    <div className="my-2 w-full bg-red-800 p-1">
                                                                        <p className="text-red-50">
                                                                            {
                                                                                formik
                                                                                    .errors
                                                                                    .age
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="flex flex-col items-start">
                                                            <label htmlFor="phone">
                                                                phone
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="border"
                                                                id="phone"
                                                                name="phone"
                                                                value={
                                                                    formik
                                                                        .values
                                                                        .phone
                                                                }
                                                                onChange={
                                                                    formik.handleChange
                                                                }
                                                                onBlur={
                                                                    formik.handleBlur
                                                                }
                                                            />

                                                            {formik.errors
                                                                .phone &&
                                                                formik.touched
                                                                    .phone && (
                                                                    <div className="my-2 w-full bg-red-800 p-1">
                                                                        <p className="text-red-50">
                                                                            {
                                                                                formik
                                                                                    .errors
                                                                                    .phone
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
                                                            onClick={() =>
                                                                setShowModal(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Discard
                                                        </button>
                                                    </TERipple>
                                                    <TERipple rippleColor="light">
                                                        <button
                                                            type="submit"
                                                            className="ml-2 inline-block rounded !bg-Orange px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-black hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-Orange focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-orange-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                        >
                                                            update
                                                        </button>
                                                    </TERipple>
                                                </form>
                                            </div>
                                        </TEModalBody>
                                    </TEModalContent>
                                </TEModalDialog>
                            </TEModal>
                        </div>
                    </div>
                </div>
                {/* Card end */}
            </div>
        </div>
    );
}
