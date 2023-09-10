import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../../features/userSlice2"
import { useForm } from "react-hook-form"
import axios from "axios"
import { base_url } from "../../utils/baseUrl"
import { LuEdit } from "react-icons/lu"
import { toast } from "react-toastify"
import ToastMsg from "../../components/ToastContainer"
import camps from "../../constants/Camps.json"
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} from "../../features/userUpdateSlice.jsx"
import universities from "../../constants/universities.json"
import states from "../../constants/states.json"
import Loader from "../../components/Loader"

function NameCorrection() {
    const user = useSelector((state) => state.user2.value)
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const loading = useSelector((state) => state.update.loading)
    const [successMessage, setSuccessMessage] = useState("")

    //react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    //user fetching details api
    const fetchData = async (data, e) => {
        e.preventDefault()
        const { userId } = data

        try {
            const response = await axios.get(`${base_url}user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

            if (response.status === 200) {
                dispatch(setUser(response.data))
                toast.success("User data fetched successfully", {
                    position: "top-right",
                })
                setSuccessMessage("User data fetched Successfully!!")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 3000)
            } else {
                console.error("Unexpected response status:", response.status)
                if (response.data && response.data.message) {
                    toast.error(response.data.message, {
                        position: "top-right",
                    })
                    setSuccessMessage(response.data.message)
                    setTimeout(() => {
                        setSuccessMessage("")
                    }, 3000)
                } else {
                    toast.error("Unexpected response status", {
                        position: "top-right",
                    })
                }
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, {
                    position: "top-right",
                })
            } else if (error.request) {
                toast.error("No response received", { position: "top-right" })
            } else {
                toast.error("An error occurred", { position: "top-right" })
                setSuccessMessage("An Error Occured")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 3000)
            }
        }
    }

    // user updating api
    const onSubmit = async (data) => {
        const { userId } = data
        dispatch(updateUserStart())
        try {
            const response = await axios.put(
                `${base_url}user/${userId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )

            if (response.status === 200) {
                dispatch(updateUserSuccess())
                toast.success(response.data.message)
                setSuccessMessage("User Data Updated Successfully!!")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 3000)
            } else {
                throw new Error(response.data.message)
            }
        } catch (err) {
            console.log(err)
            dispatch(updateUserFailure(err.message))
            const errorMessage = "An error occured"
            toast.error(errorMessage)
            setSuccessMessage("An Error Occured")
            setTimeout(() => {
                setSuccessMessage("")
            }, 3000)
        }
        console.log(data)
    }
    return (
        <div className="border-2 bg-[#f5f5f5] px-5 py-3 md:mt-5 ml-3 mt-3 ">
            {loading ? (
                <Loader />
            ) : (
                <div>
                    {" "}
                    <h3 className="font-Belanosima text-[20px] md:text-[25px] mb-3">
                        NYSC General Correction / Posting
                    </h3>
                    <form
                        className="w-full flex flex-col gap-y-4"
                        onSubmit={handleSubmit((data, e) => fetchData(data, e))}
                    >
                        <div>
                            <input
                                className="w-full md:w-[70%] border outline-none py-2 px-3 rounded-md shadow-md"
                                type="text"
                                name="userId"
                                placeholder="Enter Corper ID/E-mail"
                                {...register("userId", { required: true })}
                            />
                            {errors.userId && (
                                <p className="italic text-[10px] font-semibold  text-red-500 mt-2">
                                    Required.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="bg-green-500 text-white py-1 px-5 rounded-md mt-7 w-full md:w-[10%]"
                        >
                            Submit
                        </button>
                    </form>
                    {user && (
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-y-4"
                        >
                            <div className="flex justify-end mt-3">
                                <LuEdit
                                    className="h-5 w-5 cursor-pointer"
                                    onClick={() => {
                                        setEdit(true)
                                    }}
                                />
                            </div>
                            <h1>
                                {successMessage && (
                                    <div className="text-green-600 font-Belanosima text-center">
                                        {successMessage}
                                    </div>
                                )}
                            </h1>

                            <div className="mt-7 flex flex-col md:flex-row gap-y-4  md:gap-x-4">
                                <InputField
                                    type={"text"}
                                    label="Firstname"
                                    defaultValue={user.user.firstname}
                                    disabled={!edit}
                                    register={register}
                                    name="firstname"
                                />
                                <InputField
                                    type={"text"}
                                    label="Lastname"
                                    defaultValue={user.user.lastname}
                                    disabled={!edit}
                                    register={register}
                                    name="lastname"
                                />
                                <InputField
                                    type={"email"}
                                    disabled={!edit}
                                    register={register}
                                    name="email"
                                    label="Email"
                                    defaultValue={user.user.email}
                                />
                                <InputField
                                    disabled={!edit}
                                    register={register}
                                    name="gender"
                                    label="Gender"
                                    defaultValue={user.user.gender}
                                />
                                <InputField
                                    type={"tel"}
                                    disabled={!edit}
                                    register={register}
                                    name="mobile"
                                    label="Mobile"
                                    defaultValue={user.user.mobile}
                                />
                            </div>

                            <div className="flex flex-col md:flex-row gap-y-4  md:gap-x-4">
                                <InputField
                                    type={"text"}
                                    disabled={!edit}
                                    register={register}
                                    name="address"
                                    label="Address"
                                    defaultValue={user.user.address}
                                />
                                <div className="w-full mt-2">
                                    <SelectInput
                                        label=" Orientation Camp"
                                        name="OrientationCamp"
                                        register={register}
                                        options={camps.map((camp) => ({
                                            value: camp.camp,
                                            label: camp.camp,
                                        }))}
                                        defaultValue={user.user.OrientationCamp}
                                        disabled={!edit}
                                    />
                                </div>

                                <InputField
                                    type={"text"}
                                    disabled={!edit}
                                    register={register}
                                    name="statePostedTo"
                                    label="State Posted"
                                    defaultValue={user.user.statePostedTo}
                                />
                            </div>

                            <div className="flex flex-col md:flex-row gap-y-4  md:gap-x-4">
                                <InputField
                                    type={"text"}
                                    disabled={!edit}
                                    register={register}
                                    name="matric"
                                    label="Matric Number"
                                    defaultValue={user.user.matric}
                                />

                                <InputField
                                    type={"text"}
                                    disabled={!edit}
                                    register={register}
                                    name="qualification"
                                    label="Qualification"
                                    defaultValue={user.user.qualification}
                                />
                                <InputField
                                    type={"text"}
                                    disabled={!edit}
                                    register={register}
                                    name="status"
                                    label="Status"
                                    defaultValue={user.user.status}
                                />
                                <InputField
                                    disabled={!edit}
                                    register={register}
                                    name="CallUpNumber"
                                    label="Call up Number"
                                    defaultValue={user.user.CallUpNumber}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
                                <div className="w-full">
                                    <SelectInput
                                        label="State of Origin"
                                        name="stateOfOrigin"
                                        register={register}
                                        options={states.map((state) => ({
                                            value: state.name,
                                            label: state.name,
                                        }))}
                                        defaultValue={user.user.stateOfOrigin}
                                        disabled={!edit}
                                    />
                                </div>
                                <SelectInput
                                    label="School Name"
                                    name="school"
                                    register={register}
                                    options={universities.map((university) => ({
                                        value: university.name,
                                        label: university.name,
                                    }))}
                                    defaultValue={user.user.school}
                                    disabled={!edit}
                                />
                                <InputField
                                    type={"text"}
                                    disabled={!edit}
                                    register={register}
                                    name="Batch"
                                    label="Batch"
                                    defaultValue={user.user.Batch}
                                />
                                <InputField
                                    type={"text"}
                                    disabled={!edit}
                                    register={register}
                                    name="StateCode"
                                    label="State Code"
                                    defaultValue={user.user.StateCode}
                                />
                                <InputField
                                    type={"text"}
                                    disabled={!edit}
                                    register={register}
                                    name="PPA"
                                    label="PPA"
                                    defaultValue={user.user.PPA}
                                />
                            </div>
                            <div className="mt-3">
                                <button
                                    type="submit"
                                    className="bg-[#22C55E] py-1 px-5 text-white rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    )}
                    <ToastMsg />
                </div>
            )}
        </div>
    )
}
const InputField = ({
    label,
    value,
    disabled,
    register,
    name,
    type,
    defaultValue,
}) => (
    <div className="flex flex-col gap-y-1 w-full">
        <label className="font-Belanosima" htmlFor={name}>
            {label}
        </label>
        <input
            name={name}
            defaultValue={defaultValue}
            className="input"
            type={type}
            value={value}
            disabled={disabled}
            {...register(name)}
        />
    </div>
)

const SelectInput = ({
    label,
    name,
    register,
    options,
    defaultValue,
    disabled,
    value,
}) => (
    <div className="-mt-2 md:w-[100%]">
        <label
            className="font-Belanosima font-normal text-[16px]"
            htmlFor={name}
        >
            {label}
            <span className="text-red-700 self-center">*</span>
        </label>
        <select
            defaultValue={defaultValue}
            disabled={disabled}
            value={value}
            className="mt-1 rounded-md appearance-none w-full border-[#d5d0d0]  
            text-[14px] border px-4 py-2 pr-8 font-normal outline-none font-Roboto"
            name={name}
            id={name}
            {...register(name, { required: true })}
        >
            <option value="">Select an Option...</option>
            {options.map((option, index) => (
                <option
                    key={index}
                    value={option.value}
                    className="cursor-pointer px-7 mb-3"
                >
                    {option.label}
                </option>
            ))}
        </select>
    </div>
)

export default NameCorrection
