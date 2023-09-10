import React, { useState } from "react"
import { BsFillChatQuoteFill, BsLightningCharge } from "react-icons/bs"
import {
    AiFillDashboard,
    AiOutlineUser,
    AiOutlineUserAdd,
} from "react-icons/ai"
import { useDispatch } from "react-redux"
import { TbDiscountCheck } from "react-icons/tb"
import {
    MdArrowDropUp,
    MdArrowDropDown,
    MdOutlineAddTask,
    MdEmail,
    MdOutlineSettings,
} from "react-icons/md"
import { FaCalendarCheck } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { BiLogIn } from "react-icons/bi"
import { logout } from "../features/authSlice"
function Sidebar() {
    const [openCatalog, setOpenCatalog] = useState(null)

    const toggleDropdown = (index) => {
        if (openCatalog === index) {
            setOpenCatalog(null)
        } else {
            setOpenCatalog(index)
        }
    }
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const logOut = async () => {
        localStorage.removeItem("token")
        window.localStorage.removeItem("isLoggedIn")
        console.log("User logged out successfully")
        dispatch(logout())
        navigate("/")
    }

    const toUser = () => {
        navigate("user")
    }
    return (
        <div className="md:min-h-screen">
            <img
                className="mb-2"
                src="https://portal.nysc.org.ng/nysc1/img/banner1.png"
                alt=""
            />

            <div className="border border-gray-600 py-3 border-x-0 border-t-0 mb-7">
                <Heading title={"Activities"} Icon={BsLightningCharge} />
                <Heading title={"Task"} Icon={MdOutlineAddTask} />
            </div>
            <Heading
                onClick={() => navigate("/admin")}
                title={"Dashboard"}
                Icon={AiFillDashboard}
            />
            <Heading onClick={toUser} title={"Users"} Icon={AiOutlineUser} />

            <div>
                {/* Drop Down 2 */}
                <div className="mb-3">
                    <div
                        onClick={() => toggleDropdown(2)}
                        className="drop-down"
                    >
                        <div className="items-center flex  gap-x-3">
                            <TbDiscountCheck className="h-5 w-5 " />
                            <h2 className="font-Belanosima cursor-pointer hover:text-white">
                                PPA Posting
                            </h2>
                        </div>

                        {openCatalog === 2 ? (
                            <MdArrowDropUp className="h-5 w-5 " />
                        ) : (
                            <MdArrowDropDown className="h-5 w-5 " />
                        )}
                    </div>
                    {openCatalog === 2 && (
                        <div className=" pb-2 px-2 py-1 bg-[#3c763d]/70 mt-1 rounded-md text-white font-Roboto slide-bottom">
                            <Component
                                title={"Post Corper to PPA"}
                                Icon={AiOutlineUserAdd}
                                onClick={() => navigate("ppa-posting")}
                            />
                            <Component
                                title={"Assign State Code"}
                                Icon={AiOutlineUserAdd}
                            />
                            {/* <Component
                                title={"Post User"}
                                Icon={AiOutlineUserAdd}
                            /> */}
                        </div>
                    )}
                </div>
                {/* Drop Down 3 */}
                <div className="mb-5">
                    <div
                        onClick={() => toggleDropdown(3)}
                        className="flex relative border border-black items-center justify-between w-full hover:text-white  hover:bg-[#3c763d] py-1 px-2 rounded-md cursor-pointer"
                    >
                        <div className="items-center flex  gap-x-3">
                            <TbDiscountCheck className="h-5 w-5 " />
                            <h2 className="font-Belanosima cursor-pointer hover:text-white">
                                Correction
                            </h2>
                        </div>
                        {openCatalog === 2 ? (
                            <MdArrowDropUp className="h-5 w-5 " />
                        ) : (
                            <MdArrowDropDown className="h-5 w-5 " />
                        )}
                    </div>
                    {openCatalog === 3 && (
                        <div className=" pb-2 bg-[#3c763d]/70  mt-1 px-2 py-1 rounded-md text-black font-Roboto slide-bottom">
                            <Component
                                title={"General Correction"}
                                Icon={AiOutlineUserAdd}
                                onClick={() => navigate("general-correction")}
                            />
                            <Component
                                title={"Course Correction"}
                                Icon={AiOutlineUserAdd}
                                onClick={() => navigate("course-correction")}
                            />
                            {/* <Component
                                title={"Post User"}
                                Icon={AiOutlineUserAdd}
                            /> */}
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <Heading title={"Inbox"} Icon={MdEmail} />
                    <Heading title={"Chat"} Icon={BsFillChatQuoteFill} />
                    <Heading
                        onClick={() => navigate("calender")}
                        title={"Calender"}
                        Icon={FaCalendarCheck}
                    />
                    <Heading title={"Settings"} Icon={MdOutlineSettings} />
                    <Heading
                        onClick={logOut}
                        title={"Log out"}
                        Icon={BiLogIn}
                    />
                </div>
                {/* <div className="flex flex-col">
                    <Heading title={"Inbox"} Icon={MdEmail} />
                    <Heading title={"Chat"} Icon={BsFillChatQuoteFill} />
                    <Heading title={"Calender"} Icon={FaCalendarCheck} />
                    <Heading title={"Settings"} Icon={MdOutlineSettings} />
                </div>
                <div className="flex flex-col">
                    <Heading title={"Inbox"} Icon={MdEmail} />
                    <Heading title={"Chat"} Icon={BsFillChatQuoteFill} />
                    <Heading title={"Calender"} Icon={FaCalendarCheck} />
                    <Heading title={"Settings"} Icon={MdOutlineSettings} />
                </div> */}
            </div>
        </div>
    )
}

function Component({ title, Icon, onClick }) {
    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }
    return (
        <div className="sub-section" onClick={handleClick}>
            <Icon />
            <h2 className="cursor-pointer text-[12px]">{title}</h2>
        </div>
    )
}

function Heading({ title, Icon, onClick }) {
    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }
    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-x-3 hover:bg-[#3c763d] hover:text-white py-1 px-2 rounded-md mb-3 cursor-pointer"
        >
            <Icon className="h-5 w-5 " />
            <h2 className="font-Belanosima cursor-pointer">{title}</h2>
        </div>
    )
}

export default Sidebar
