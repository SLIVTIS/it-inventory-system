import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SideBarData } from './SideBarData';
import avatar from '../assets/images/avatar-default.png';

function NewSideBar({ children }) {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        navigate("/login");
    };

    const toggleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const toggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    }

    return (
        <>
            <nav className="fixed top-0 z-50 w-full border-b bg-gray-800 border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar" type="button"
                                onClick={toggleSidebar}
                                className="inline-flex items-center p-2 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="#" className="flex ms-2 md:me-24">
                                <img src="" className="h-8 me-3" alt="" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">Areas</span>
                            </a>
                        </div>
                        <div className="relative">
                            <div className="flex items-center">
                                <div className="flex items-center ms-3">
                                    <div>
                                        <button
                                            type="button"
                                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4  focus:ring-gray-600"
                                            aria-expanded={isOpenMenu}
                                            data-dropdown-toggle="dropdown-user"
                                            onClick={toggleMenu}
                                        >
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src={avatar}
                                                alt="user photo"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {isOpenMenu && (
                                <div className="absolute right-0 w-48 border rounded shadow-lg bg-gray-700 border-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-white" role="none">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm font-medium truncate text-gray-300" role="none">
                                            neil.sims@flowbite.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a
                                                href="#"
                                                onClick={logout}
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                                                role="menuitem">
                                                Sign out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isOpenSidebar ? 'translate-x-0' : '-translate-x-full'}  border-r sm:translate-x-0  bg-gray-800 border-gray-700`}
                aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {SideBarData.map((val, key) => {
                            return <li key={key}>
                                <Link to={val.link} className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                    <svg className="w-5 h-5 transition duration-75 text-gray-400  group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        {val.icon}
                                    </svg>
                                    <span className="ms-3">{val.title}</span>
                                </Link>
                            </li>;
                        })}
                    </ul>
                </div>
            </aside>
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg mt-14">
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default NewSideBar