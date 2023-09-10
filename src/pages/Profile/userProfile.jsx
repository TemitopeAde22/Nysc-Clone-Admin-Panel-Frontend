import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { base_url } from "../../utils/baseUrl"
import { MdEmail, MdLocalPhone, MdLocationPin, MdSchool } from "react-icons/md"
import { AiOutlineUser } from "react-icons/ai"
import { BsBook } from "react-icons/bs"

function Profile() {
    const { id } = useParams()
    const [user, setUser] = useState(null) // Local state to store the fetched user

    const userProfileGet = async () => {
        const response = await axios.get(`${base_url}user/${id}`)
        if (response.status === 200) {
            setUser(response.data.user) // Store the fetched user in the local state
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        userProfileGet()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    // Render the user data
    return user ? (
        <div className="h-screen flex justify-center">
            <div className="bg-white w-full md:w-[50%]">
                <h1 className="mt-2 font-Belanosima text-[20px] flex justify-center mb-3 border-2 mx-2 border-x-0 border-t-0 py-2">
                    USER PROFILE
                </h1>
                <div className="flex justify-end px-7 mb-3">
                    <img
                        src={user.Image}
                        alt=""
                        className="h-24 w-24 object-cover rounded-full"
                    />
                </div>
                <div className="flex justify-center flex-col items-center gap-y-7">
                    <UserData
                        details={`${user.firstname} ${user.lastname}`}
                        Icon={AiOutlineUser}
                    />
                    <UserData details={user.email} Icon={MdEmail} />

                    <UserData details={user.mobile} Icon={MdLocalPhone} />

                    {/* <UserData details={user.address} Icon={MdLocationPin} /> */}
                    <div className="flex items-center gap-x-3">
                        <MdLocationPin className="h-5 w-5" />
                        <h2 className=" font-Montserrat text-[12px] font-semibold">
                            {user.address}
                        </h2>
                    </div>
                    <UserData details={user.school} Icon={MdSchool} />

                    <UserData details={user.course} Icon={BsBook} />
                    <UserData2 details={user.matric} label={"Matric Number"} />
                    <UserData2
                        details={user.stateOfOrigin}
                        label={"State of origin"}
                    />
                    <UserData2
                        details={user.statePostedTo}
                        label={"State Posted"}
                    />
                    <UserData2 details={user.Batch} label={"Batch"} />
                    <UserData2
                        details={user.createdAt}
                        label={"Date Registered"}
                    />
                </div>
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    )
}

function UserData({ details, Icon }) {
    return (
        <div className="flex items-center gap-x-3">
            <Icon className="h-5 w-5" />
            <h2 className=" font-Montserrat font-semibold">{details}</h2>
        </div>
    )
}
function UserData2({ details, label }) {
    return (
        <div className="flex items-center gap-x-3">
            <h2 className=" font-Belanosima text-[17px]" htmlFor="">
                {label}:
            </h2>
            <h2 className=" font-Montserrat font-semibold">{details}</h2>
        </div>
    )
}
export default Profile
