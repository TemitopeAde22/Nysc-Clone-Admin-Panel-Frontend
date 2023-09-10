import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import ToastMsg from "../../../src/components/ToastContainer"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { base_url } from "../../utils/baseUrl"
import axios from "axios"
import { login } from "../../features/authSlice"
import Loader from "../../components/Loader"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { AiOutlineEyeInvisible } from "react-icons/ai"
function Login() {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const isLoading = useSelector((state) => state.auth.isLoading)
    const onSubmit = (data) => {
        axios
            .post(`${base_url}user/admin-login`, data)
            .then(async (response) => {
                toast.success("Login Successful", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                // Notify success using toast
                if (response.status && response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    window.localStorage.setItem("isLoggedIn", true)
                }
                setTimeout(() => {
                    navigate("/admin")
                }, 1000)

                dispatch(login(data))
                console.log(response)
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        })
                    } else if (error.response.status === 403) {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        })
                    } else {
                        console.log(error)
                    }
                }
            })
        console.log(data)
    }

    return (
        <div className=" flex justify-center items-center bg-[#f5f5f5] h-screen">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col px-5 py-5 items-center justify-center w-full">
                    <Link to={"/"}>
                        <img
                            className="mb-2"
                            src="https://portal.nysc.org.ng/nysc1/img/banner1.png"
                            alt=""
                        />
                    </Link>

                    <div className="border bg-white rounded-md shadow-md flex flex-col gap-y-5 w-full sm:w-[50%] md:w-[60%] lg:w-[30%] px-5 py-7">
                        <h1 className="text-center font-Belanosima text-[15px]">
                            Welcome to the Administrative Realm: Your Key to
                            Manage, Monitor, and Mold.
                        </h1>
                        <form
                            className="flex flex-col gap-y-5"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col gap-y-2">
                                <label
                                    className="text-[15px] font-Belanosima"
                                    htmlFor="name"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="outline-none border py-1 px-3 placeholder:text-[13px] border-[#d5d0d0] rounded-md"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <p className="italic text-[10px] font-semibold  text-red-500 ">
                                        Email is required.
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <label
                                    className="text-[15px] font-Belanosima"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <div className="flex items-center border border-[#d5d0d0] rounded-md pr-2 ">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Enter Password"
                                        className="outline-none w-full py-1 px-3 placeholder:text-[13px]"
                                        {...register("Password", {
                                            required: true,
                                        })}
                                    />
                                    {errors.Password && (
                                        <p className="italic text-[10px] font-semibold  text-red-500">
                                            Password is required.
                                        </p>
                                    )}
                                    {showPassword ? (
                                        <MdOutlineRemoveRedEye
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                            className="h-5 w-7"
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                            className="h-5 w-7"
                                        />
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-[#2B943A] hover:bg-[#2B943A]/90 active:ring-2 text-white py-2 text-[15px] rounded-lg border-none font-Roboto"
                            >
                                Continue
                            </button>
                        </form>
                        <div>
                            <Link to={"/Forgot-Password"}>
                                <p className="text-[15px] font-Roboto flex justify-end mt-2 text-gray-400 cursor-pointer hover:underline">
                                    Forgot Password?
                                </p>
                            </Link>
                        </div>
                        <ToastMsg />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login
