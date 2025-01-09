import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillDashboard, AiOutlineShoppingCart } from "react-icons/ai"; 
import { FiUsers } from "react-icons/fi";
import { MdAnalytics } from "react-icons/md"; 
import { FaProductHunt } from "react-icons/fa"; 

function Sidebar() {
    return (
        <div className="w-64 bg-gray-900 text-white h-screen fixed">
            <ul className="p-4">
                <li className="mb-4 flex items-center">
                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            isActive ? "font-bold text-green-400 flex items-center" : "text-white flex items-center"
                        }
                    >
                        <AiFillDashboard className="mr-2" />
                        Trang quản trị
                    </NavLink>
                </li>
                <li className="mb-4 flex items-center">
                    <NavLink
                        to="/admin/products"
                        className={({ isActive }) =>
                            isActive ? "font-bold text-green-400 flex items-center" : "text-white flex items-center"
                        }
                    >
                        <FaProductHunt className="mr-2" />
                        Sản phẩm
                    </NavLink>
                </li>
                <li className="mb-4 flex items-center">
                    <NavLink
                        to="/admin/orders"
                        className={({ isActive }) =>
                            isActive ? "font-bold text-green-400 flex items-center" : "text-white flex items-center"
                        }
                    >
                        <AiOutlineShoppingCart className="mr-2" />
                        Đơn hàng
                    </NavLink>
                </li>
                <li className="mb-4 flex items-center">
                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            isActive ? "font-bold text-green-400 flex items-center" : "text-white flex items-center"
                        }
                    >
                        <FiUsers className="mr-2" />
                        Người dùng
                    </NavLink>
                </li>
                <li className="flex items-center">
                    <NavLink
                        to="/admin/analytics"
                        className={({ isActive }) =>
                            isActive ? "font-bold text-green-400 flex items-center" : "text-white flex items-center"
                        }
                    >
                        <MdAnalytics className="mr-2" />
                        Phân tích
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
