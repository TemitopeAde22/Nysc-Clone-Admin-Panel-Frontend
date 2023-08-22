import React from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { base_url } from "../../utils/baseUrl"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {
    forgotPasswordRequested,
    forgotPasswordSuccess,
    forgotPasswordFailed,
} from "../../features/forgotPasswordSlice.js"
import { toast } from "react-toastify"
import ToastMsg from "../../components/ToastContainer"
import Loader from "../../components/Loader"
function ForgotPassword() {
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.forgotPassword)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            dispatch(forgotPasswordRequested())

            const response = await axios.post(
                `${base_url}user/forgot-password-token`,
                data
            )

            if (response.status === 200 && response.data.successMessage) {
                dispatch(forgotPasswordSuccess(response.data.successMessage))
                toast.success(response.data.successMessage)
            } else if (response.status === 404) {
                dispatch(forgotPasswordFailed("User not found"))
                toast.error("User not found") // Show error toast
            } else {
                dispatch(forgotPasswordFailed("Something went wrong."))
                toast.error("Something went wrong.") // Show error toast
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                dispatch(forgotPasswordFailed("User not found"))
                toast.error("User not found") // Show error toast
            } else {
                dispatch(forgotPasswordFailed("Something went wrong."))
                toast.error("Something went wrong.") // Show error toast
            }
            console.log(error)
        }
    }
    return (
        <div className="bg-green-700/20 h-screen">
            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col px-5 py-5 items-center justify-center w-full ">
                    <img
                        className="mb-2 mt-12"
                        src="https://portal.nysc.org.ng/nysc1/img/banner1.png"
                        alt=""
                    />
                    <div className="border bg-white rounded-md shadow-md flex flex-col gap-y-5 w-full sm:w-[50%] md:w-[60%] lg:w-[30%] px-5 py-7">
                        <h1 className="text-center font-Belanosima text-[15px]">
                            Please provide the email address linked to your
                            account to retrieve your password.
                        </h1>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-y-2"
                        >
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

                            <button className="bg-[#2B943A] text-white mt-5 hover:bg-[#2B943A]/90 py-2 active:ring-2 text-[15px] rounded-lg border-none font-Roboto">
                                Continue
                            </button>
                        </form>

                        <div className="">
                            <Link to={"/"}>
                                <p className="text-[15px] font-Roboto text-gray-400 hover:underline cursor-pointer">
                                    Sign-in
                                </p>
                            </Link>
                            <MdOutlineKeyboardBackspace className="h-5 w-5" />
                        </div>

                        <p className="text-center font-Roboto text-[12px]">
                            For further support, you may visit the Help Center
                            or contact our customer service team.
                        </p>
                    </div>
                    <ToastMsg />
                </div>
            )}
        </div>
    )
}

export default ForgotPassword
