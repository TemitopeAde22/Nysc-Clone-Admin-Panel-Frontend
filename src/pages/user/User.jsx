import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table } from "antd"
import { base_url } from "../../utils/baseUrl"
import {
    setUsers,
    setUsersLoading,
    setUsersError,
} from "../../features/allUserSlice"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function User() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const allUsers = useSelector((state) => state.allusers.allUsers)
    useEffect(() => {
        dispatch(setUsersLoading(true))
        axios
            .get(`${base_url}user/all-Users`)
            .then((response) => {
                dispatch(setUsers(response.data))
                dispatch(setUsersLoading(false))
            })
            .catch((error) => {
                console.error("Error fetching user data:", error)
                dispatch(setUsersError("Error fetching user data"))
                dispatch(setUsersLoading(false))
            })
    }, [dispatch])

    const columns = [
        {
            title: "SNo",
            dataIndex: "key",
        },
        {
            title: "Last name",
            dataIndex: "lastname",
        },
        {
            title: "First name",
            dataIndex: "firstname",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Gender",
            dataIndex: "gender",
        },
        {
            title: "Call Up Number",
            dataIndex: "CallUpNumber",
        },
        {
            title: "State Code",
            dataIndex: "StateCode",
        },
        {
            title: "State Posted",
            dataIndex: "statePostedTo",
        },
    ]
    const data = []
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].role !== "admin") {
            data.push({
                key: i,
                _id: allUsers[i]._id,
                firstname: allUsers[i].firstname,
                lastname: allUsers[i].lastname,
                email: allUsers[i].email,
                gender: allUsers[i].gender,
                CallUpNumber: allUsers[i].CallUpNumber,
                StateCode: allUsers[i].StateCode,
                statePostedTo: allUsers[i].statePostedTo,
            })
        }
    }
    return (
        <div className="border-2 bg-[#f5f5f5] px-5 py-3 md:mt-5 ml-3 mt-3 overflow-hidden">
            <h3 className=" font-Belanosima text-[20px] md:text-[25px] mb-3">
                All Users
            </h3>
            <Table
                columns={columns}
                dataSource={data}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                               navigate(`/admin/userprofile/${record._id}`)
                        },
                    }
                }}
            />
        </div>
    )
}

export default User
