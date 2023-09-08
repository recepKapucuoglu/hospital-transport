import React from "react";
import { Outlet, Route, useNavigate } from "react-router-dom";
import logo from "../assets/header/logoo.png";
import { useState } from "react";
import adminService from "../services/adminService";
import Cookies from "js-cookie";

function AdminLayout() {
    const [mobile, setMobile] = useState(true);
    const navigate = useNavigate();
    const exitAccout = async () => {
        const result = await adminService.logOutAdmin();
        if (result.response === 200) {
            navigate("/admin");
        }
        Cookies.remove("jwt");
    };
    return (
        <div className="absolute w-full h-full ">
            <div className="bg-white max-lg:shadow-md h-14">
                <button
                    data-drawer-target="default-sidebar"
                    data-drawer-toggle="default-sidebar"
                    aria-controls="default-sidebar"
                    onClick={() => setMobile(!mobile)}
                    type="button"
                    className="float-right inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-800 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        />
                    </svg>
                </button>
                <aside
                    id="default-sidebar"
                    className={
                        !mobile
                            ? "fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0"
                            : "fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0"
                    }
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg">
                        <ul className="space-y-2 font-medium ">
                            <li className="flex justify-center items-center">
                                <a href="/admin">
                                    <img src={logo} />
                                </a>
                            </li>
                            
                            <li>
                                <a
                                    href="/admin/transfer"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-800 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        className="flex-shrink-0 w-6 h-6 text-gray-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-800"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                                        ></path>
                                    </svg>
                                    <span className="ml-3">
                                        Transfer
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/admin/arac"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-800 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        className="flex-shrink-0 w-6 h-6 text-gray-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-800"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                        ></path>
                                    </svg>

                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                         Araç 
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/admin/yolcu"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-800 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="flex-shrink-0 w-6 h-6 text-gray-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-800"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                                    </svg>
                                    <span className="ml-3">Yolcu </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-800 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => exitAccout()}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="flex-shrink-0 w-6 h-6 text-gray-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-800"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Çıkış
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
            <div className="p-10 max-md:p-4 lg:ml-64 ">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;
