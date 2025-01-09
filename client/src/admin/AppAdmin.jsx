import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminRoutes from "./routers/AdminRoutes";

function AppAdmin() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64">
                <Navbar />
                <div className="p-6">
                    <AdminRoutes />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default AppAdmin;
