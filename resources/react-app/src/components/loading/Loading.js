import React from "react";
import "../../Components/loading/Loading.css";

function Loading() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="loader"></div>;
        </div>
    );
}

export default Loading;
