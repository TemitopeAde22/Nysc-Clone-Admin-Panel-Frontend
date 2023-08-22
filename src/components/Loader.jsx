import React from "react"
import { BeatLoader } from "react-spinners"

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <BeatLoader color="#3498db" size={16} margin={2} />
        </div>
    )
}

export default Loader
