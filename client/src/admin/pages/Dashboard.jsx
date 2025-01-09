import React from "react";

function Dashboard() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Trang quản lý</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-lg font-semibold">Doanh thu</h2>
                    <p className="text-2xl font-bold mt-2 text-green-500">50,000,000 VND</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-lg font-semibold">Đơn hàng</h2>
                    <p className="text-2xl font-bold mt-2 text-blue-500">150</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-lg font-semibold">Người dùng</h2>
                    <p className="text-2xl font-bold mt-2 text-purple-500">1,200</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
