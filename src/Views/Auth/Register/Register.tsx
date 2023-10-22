import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { IRegister } from "../../../interfaces/register.interface";
import { axiosInstance } from "../../../Api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import GoogleAuth from "../../../Components/GoogleAuth/GoogleAuth";

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik<IRegister>({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            age: 0,
            gender: "",
        },

        validationSchema: yup.object({
            username: yup
                .string()
                .min(3, "username must be more than 3 characters")
                .max(20, "username is too long")
                .required("username is required"),
            email: yup
                .string()
                .email("in-valid email")
                .required("email is required"),
            password: yup
                .string()
                .min(5, "password must be more than 5 characters")
                .required(),
            confirmPassword: yup
                .string()
                .oneOf(
                    [yup.ref("password")],
                    "confirmation Password must match password"
                )
                .required("confirmation password is required"),
            phone: yup
                .string()
                .matches(
                    /^(002|\+2)?(01)[0125][0-9]{8}$/,
                    "in-valid egyptian mobile number"
                )
                .required("phone is required"),
            age: yup
                .number()
                .positive()
                .min(12, "not allowed young children")
                .max(80, "not allowed old people"),
            gender: yup.string(),
        }),

        onSubmit: async (values) => {
            setIsLoading(true);
            const { confirmPassword, age, ...data } = values;
            await axiosInstance
                .post("/register", data)
                .then(({ data }) => {
                    toast.success(data.message);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
    });

    const handleGenderBtn = (e: React.ChangeEvent<HTMLInputElement>) =>
        (formik.values.gender = e.target.value);

    return (
        <section className="relative bg-gradient-to-b from-cyan-700 to-cyan-50">
            <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8">
                <div className="w-full rounded-lg shadow-lg sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-cyan-50 md:text-2xl">
                            Register
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="">
                                <label
                                    htmlFor="username"
                                    className="mb-2 block text-sm font-medium text-cyan-100 dark:text-white"
                                >
                                    username:
                                </label>
                                <input
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-cyan-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                    placeholder="username"
                                />
                                {formik.errors.username &&
                                    formik.touched.username && (
                                        <div className="my-2 rounded-lg bg-red-600 p-1">
                                            <p className="text-red-50">
                                                {formik.errors.username}
                                            </p>
                                        </div>
                                    )}
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-cyan-200 dark:text-white"
                                >
                                    email:
                                </label>
                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-cyan-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                    placeholder="name@company.com"
                                />
                                {formik.errors.email &&
                                    formik.touched.email && (
                                        <div className="my-2 rounded-lg bg-red-600 p-1">
                                            <p className="text-red-50">
                                                {formik.errors.email}
                                            </p>
                                        </div>
                                    )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-cyan-300 dark:text-white"
                                >
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-cyan-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                />
                                {formik.errors.password &&
                                    formik.touched.password && (
                                        <div className="my-2 rounded-lg bg-red-600 p-1">
                                            <p className="text-red-50">
                                                {formik.errors.password}
                                            </p>
                                        </div>
                                    )}
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="mb-2 block text-sm font-medium text-cyan-300 dark:text-white"
                                >
                                    Confirm password:
                                </label>
                                <input
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                />
                                {formik.errors.confirmPassword &&
                                    formik.touched.confirmPassword && (
                                        <div className="my-2 rounded-lg bg-red-600 p-1">
                                            <p className="text-red-50">
                                                {formik.errors.confirmPassword}
                                            </p>
                                        </div>
                                    )}
                            </div>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block text-sm font-medium text-cyan-600 dark:text-white"
                                >
                                    phone number:
                                </label>
                                <input
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                    placeholder="phone number.."
                                />
                                {formik.errors.phone &&
                                    formik.touched.phone && (
                                        <div className="my-2 rounded-lg bg-red-600 p-1">
                                            <p className="text-red-50">
                                                {formik.errors.phone}
                                            </p>
                                        </div>
                                    )}
                            </div>
                            <div className="flex flex-row justify-between">
                                <div>
                                    <label
                                        htmlFor="age"
                                        className="mb-2 block text-sm font-medium text-cyan-800 dark:text-white"
                                    >
                                        age:
                                    </label>
                                    <input
                                        value={formik.values.age}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="number"
                                        name="age"
                                        id="age"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-cyan-800 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                        placeholder="age"
                                    />
                                    {formik.errors.age &&
                                        formik.touched.age && (
                                            <div className="my-2 rounded-lg bg-red-600 p-1">
                                                <p className="text-red-50">
                                                    {formik.errors.age}
                                                </p>
                                            </div>
                                        )}
                                </div>
                                <div className="mx-2 flex flex-row items-end justify-center">
                                    <div className="flex items-center rounded-lg pl-4 dark:border-gray-700">
                                        <input
                                            id="male"
                                            type="radio"
                                            value="male"
                                            onChange={(e) => handleGenderBtn(e)}
                                            name="gender"
                                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                        />
                                        <label
                                            htmlFor="bordered-radio-1"
                                            className="ml-2 w-full py-4 text-sm font-medium text-cyan-700 dark:text-gray-300"
                                        >
                                            Male
                                        </label>
                                    </div>
                                    <div className="flex items-center rounded-lg pl-4 dark:border-gray-700">
                                        <input
                                            id="female"
                                            type="radio"
                                            value="female"
                                            onChange={(e) => handleGenderBtn(e)}
                                            name="gender"
                                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                        />
                                        <label
                                            htmlFor="bordered-radio-2"
                                            className="ml-2 w-full py-4 text-sm font-medium text-cyan-700 dark:text-gray-300"
                                        >
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-light text-cyan-800 dark:text-gray-300"
                                    >
                                        I accept the{" "}
                                        <a
                                            className="font-medium text-cyan-900 hover:underline dark:text-primary-500"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-cyan-500 px-5 py-2.5 text-center text-sm font-medium text-gray-100 border border-cyan-800 hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-primary-300"
                                disabled={
                                    !formik.isValid ||
                                    !formik.dirty ||
                                    isLoading
                                }
                            >
                                {isLoading ? (
                                    <div className="text-center">
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="mr-2 inline h-8 w-8 animate-spin fill-cyan-800 text-gray-200 dark:text-gray-600"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                            <span className="sr-only text-cyan-800">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-cyan-800">Create an account</span>
                                )}
                            </button>
                            <GoogleAuth />
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" position="top-center" />
        </section>
    );
};

export default Register;
