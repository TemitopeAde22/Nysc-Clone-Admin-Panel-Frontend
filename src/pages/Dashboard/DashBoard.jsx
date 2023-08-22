import React from "react"
import { BsArrowDownRight } from "react-icons/bs"
import { Table } from "antd"

function DashBoard() {
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
            dataIndex: "name",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
    ]
    const data = []
    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            callUpNo: "NYSC/DEMO/9230888",
            status: `London, Park Lane no. ${i}`,
        })
    }
    return (
        <div className="border-2 bg-[#f5f5f5] px-5 py-3 md:mt-5 ml-3 mt-3">
            <h1 className="text-[30px] md:text-4xl font-semibold mb-10">
                Dashboard
            </h1>
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
                <h3 className=" font-Belanosima text-[20px] md:text-[25px] mb-3">Recent Activity</h3>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default DashBoard
