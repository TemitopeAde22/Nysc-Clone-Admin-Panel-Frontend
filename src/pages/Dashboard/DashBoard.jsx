/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { BsArrowDownRight } from "react-icons/bs"
import { Table } from "antd"
import { io } from "socket.io-client"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function DashBoard() {
    const [socket, setSocket] = useState(null)


    useEffect(() => {
        const newSocket = io("http://localhost:5000")
        setSocket(newSocket)
        console.log("Successfully connected to the server!")
    }, [])
    const columns = [
        // {
        //     title: "SNo",
        //     dataIndex: "key",
        // },
        {
            title: "Call Up No",
            dataIndex: "callUpNo",
        },
        {
            title: "Name",
            dataIndex: "firstname",
        },
        // {
        //     title: "Status",
        //     dataIndex: "status",
        // },
    ]
    const data = []
    for (let i = 0; i < data.length; i++) {
        data.push({
            key: i,
            firstname: data[i].firstname,
            callUpNo: data[i].CallUpNumber,
        })
    }

    const [message, setMessage] = useState("")

    useEffect(() => {
        // ...

        // Listen for the "user registered" event
        socket?.on("user registered", (data) => {
            console.log(
                'Received "user registered" event with data:',
                data.user.firstname
            )
            setMessage(`New user signed up: ${data.firstname}`)
            toast.info(`New user signed up: ${data.firstname}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        })

        // ...
    }, [socket])

    return (
        <div className="border-2 bg-[#f5f5f5] px-5 py-3 md:mt-5 ml-3 mt-3">
            <h1 className="text-[30px] md:text-4xl font-semibold mb-10">
                Dashboard
            </h1>
            <div>
                <p>{message}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                <div className="border px-6 py-3 bg-white">
                    <h2 className=" font-Roboto font-normal">Total Sells</h2>
                    <div className="flex justify-end items-center gap-x-2">
                        <BsArrowDownRight />
                        <span>32%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-[20px] font-semibold ">$3799.00</h3>

                        <span className="text-[13px]">
                            Compared To April 2023
                        </span>
                    </div>
                </div>

                <div className="border px-6 py-3 bg-white">
                    <h2 className=" font-Roboto font-normal">Total Sells</h2>
                    <div className="flex justify-end items-center gap-x-2">
                        <BsArrowDownRight />
                        <span>32%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-[20px] font-semibold ">$3799.00</h3>

                        <span className="text-[13px]">
                            Compared To April 2023
                        </span>
                    </div>
                </div>

                <div className="border px-6 py-3 bg-white">
                    <h2 className=" font-Roboto font-normal">Total Sells</h2>
                    <div className="flex justify-end items-center gap-x-2">
                        <BsArrowDownRight />
                        <span>32%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-[20px] font-semibold ">$3799.00</h3>

                        <span className="text-[13px]">
                            Compared To April 2023
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-7">
                <h3 className=" font-Belanosima text-[20px] md:text-[25px] mb-3">
                    Recent Activity
                </h3>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default DashBoard
