import React from "react";

function Orders() {
    const orders = [
        { id: 1, customer: "Nguyễn Văn A", total: 1500000, status: "Đã giao" },
        { id: 2, customer: "Trần Thị B", total: 700000, status: "Đang xử lý" },
        { id: 3, customer: "Lê Văn C", total: 300000, status: "Hủy" },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>
            <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 text-left">ID</th>
                        <th className="py-2 px-4 text-left">Khách hàng</th>
                        <th className="py-2 px-4 text-left">Tổng tiền</th>
                        <th className="py-2 px-4 text-left">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b">
                            <td className="py-2 px-4">{order.id}</td>
                            <td className="py-2 px-4">{order.customer}</td>
                            <td className="py-2 px-4">{order.total} VND</td>
                            <td className="py-2 px-4">{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;
