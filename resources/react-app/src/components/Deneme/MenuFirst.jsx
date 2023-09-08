import React, { useState } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

function Deneme() {
    const [isOpen, setIsOpen] = useState(false);

    const genericHamburgerLine = `h-1 w-6 my-2 rounded-full bg-black transition ease transform duration-300`;
    const menuItem = [
        {
            name: "Anasayfa",
            path: "/",
        },
        {
            name: "Blog",
            path: "/blog",
        },
        {
            name: "Hakkımızda",
            path: "/",
        },
        {
            name: "Deneme",
            path: "/",
        },
        {
            name: "İletişim",
            path: "/",
        },
    ];

    var styles = {
        bmCrossButton: {
            height: "24px",
            width: "24px",
        },
        bmCross: {
            background: "#bdc3c7",
        },
        bmMenuWrap: {
            position: "fixed",
            height: "100%",
        },
        bmMenu: {
            background: "#373a47",
            padding: "2.5em 1.5em 0",
            fontSize: "1.15em",
        },
        bmMorphShape: {
            fill: "#373a47",
        },
        bmItemList: {
            color: "#b8b7ad",
            padding: "0.8em",
        },
        bmItem: {
            display: "inline-block",
        },
        bmOverlay: {
            background: "rgba(0, 0, 0, 0.3)",
        },
        bmBurgerButton: {
            display: "none",
        },
        bmCrossButton: {
            display: "none",
        },
    };
    return (
        <>
            <nav className="bg-slate-600">
                {/* Full Size */}
                <div className="w-full h-12 max-md:hidden flex justify-between items-center px-10">
                    <div className="text-white">Logo</div>
                    <div className="w-full flex justify-end">
                        <ul className="flex items-baseline space-x-4 ">
                            {menuItem.map((item, i) => (
                                <li
                                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    key={i}
                                >
                                    <Link to={item.path}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Mobil Size */}
                <div className="w-full h-12 hidden max-md:flex justify-between items-center px-10">
                    <div className="basis-1/2 text-white">
                        <div
                            className={`${genericHamburgerLine} ${
                                isOpen
                                    ? "rotate-45 bg-white translate-y-3 opacity-90 group-hover:opacity-100"
                                    : "opacity-90 group-hover:opacity-100 bg-white "
                            }`}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                        <div
                            className={`${genericHamburgerLine} ${
                                isOpen
                                    ? "opacity-0 "
                                    : "opacity-90 group-hover:opacity-100 bg-white "
                            }`}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                        <div
                            className={`${genericHamburgerLine} ${
                                isOpen
                                    ? "-rotate-45 bg-white  -translate-y-3 opacity-90 group-hover:opacity-100"
                                    : "opacity-90 bg-white  group-hover:opacity-100"
                            }`}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </div>

                    <div className="basis-1/2 text-white">
                        <p>Logo</p>
                    </div>
                    {/* Açılacak Menu */}
                </div>
            </nav>
            <Menu
                styles={styles}
                isOpen={isOpen}
                width={"50%"}
                onClose={() => setIsOpen(false)}
            >
                <ul className="flex items-baseline space-x-4 ">
                    {menuItem.map((item, i) => (
                        <li
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            key={i}
                        >
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </Menu>
        </>
    );
}

export default Deneme;
