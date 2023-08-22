import React, { useState, useEffect } from "react"
// import { BsPersonCircle } from "react-icons/bs"
import Sidebar from "./Sidebar"
import { AiOutlineMenuUnfold } from "react-icons/ai"
import { MdNotifications } from "react-icons/md"
import profileImage from "../images/profile.jpg"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { base_url } from "../utils/baseUrl"
import { setUser, setUserLoading, setUserError } from "../features/userSlice"
import axios from "axios"
import Loader from "../components/Loader"

function MainLayout() {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false)
    const [sidebar, setSidebar] = useState("")
    const { isLoading, user } = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(setUserLoading(true))
        axios
            .get(`${base_url}user/user-data`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                dispatch(setUser(response.data))
                dispatch(setUserLoading(false))
            })
            .catch((error) => {
                console.error("Error fetching user data:", error)
                dispatch(setUserError("Error fetching user data"))
                dispatch(setUserLoading(false))
            })
    }, [dispatch])

    return (
        <div className="w-full">
            {isLoading ? (
                <Loader />
            ) : user ? (
                <div>
                    <div className="relative md:hidden flex px-2 py-2">
                        <div className="flex sticky top-0 items-center justify-between w-full px-2">
                            <AiOutlineMenuUnfold
                                onClick={() => setToggle((prev) => !prev)}
                                className="h-7 w-7"
                            />
                            <img
                                className="h-9 rounded-full w-9 object-cover"
                                src={profileImage}
                                alt=""
                            />
                        </div>

                        {toggle && (
                            <div className="side-bar !h-screen absolute z-50">
                                <Sidebar />
                            </div>
                        )}
                    </div>
                    <div className="w-full flex">
                        {sidebar && (
                            <div className="side-bar border border-solid shadow-md border-[#ffff]">
                                <Sidebar />
                            </div>
                        )}

                        <div
                            className={`border flex-1  cursor-pointer bg-[#f5f5f5]`}
                        >
                            <div className="border py-2 px-3 hidden sm:hidden md:block  sticky top-0 z-50 bg-white">
                                <div className="flex justify-between items-center">
                                    <AiOutlineMenuUnfold
                                        onClick={() =>
                                            setSidebar((prev) => !prev)
                                        }
                                        className="h-6 w-6 text-black hidden md:inline"
                                    />
                                    <div className="flex items-center gap-x-5 ">
                                        <div className="relative">
                                            <MdNotifications className="h-7 w-7" />

                                            <span className="absolute bg-green-500 text-[10px] -top-2 left-4  text-white rounded-full py-[1px] px-[6px]">
                                                3
                                            </span>
                                        </div>

                                        <img
                                            className="h-9 rounded-full w-9 object-cover"
                                            src={profileImage}
                                            alt=""
                                        />
                                        {/* <BsPersonCircle className="h-8 w-8" /> */}
                                        <div className="flex flex-col">
                                            <h3 className=" font-Belanosima">
                                                Hello,{" "}
                                                <span className=" first-letter:uppercase ">
                                                    {user.firstname || "NA"}
                                                </span>
                                            </h3>
                                            <h2 className="font-fira font-normal">
                                                {user.email || "NA"}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default MainLayout
