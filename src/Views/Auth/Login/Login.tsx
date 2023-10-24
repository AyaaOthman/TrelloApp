import { useState, useContext } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { ILogin } from "../../../interfaces/register.interface";
import { axiosInstance } from "../../../Api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/auth.context";
import GoogleAuth from "../../../Components/GoogleAuth/GoogleAuth";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik<ILogin>({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: yup.object({
            email: yup
                .string()
                .email("in-valid email")
                .required("email is required"),
            password: yup
                .string()
                .min(5, "password must be more than 5 characters")
                .required(),
        }),

        onSubmit: async (values) => {
            setIsLoading(true);
            await axiosInstance
                .post("/login", values)
                .then(({ data }) => {
                    login(data.token);
                    toast.success(data.message);
                    navigate("/tasks");
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
    });

    return (
        <section className="relative bg-gradient-to-b from-cyan-700 to-cyan-50">
            <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8">
                <div className="w-full rounded-lg shadow-lg sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-cyan-50 dark:text-white md:text-2xl">
                            Login
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={formik.handleSubmit}
                        >
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
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
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
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
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
                            <button
                                type="submit"
                                className="w-full rounded-lg border border-cyan-700 bg-cyan-500 px-5 py-2.5 text-center text-sm font-medium text-gray-100 hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-primary-300"
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
                                                className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-cyan-800">Login</span>
                                )}
                            </button>
                            <GoogleAuth />
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Haven't account?{" "}
                                <Link
                                    to="/register"
                                    className="font-medium text-cyan-800 hover:underline dark:text-primary-500"
                                >
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
