import React from "react";

function Users() {
    const users = [
        { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", role: "Admin" },
        { id: 2, name: "Trần Thị B", email: "b@gmail.com", role: "Khách hàng" },
        { id: 3, name: "Lê Văn C", email: "c@gmail.com", role: "Khách hàng" },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
            <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 text-left">ID</th>
                        <th className="py-2 px-4 text-left">Tên</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Vai trò</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b">
                            <td className="py-2 px-4">{user.id}</td>
                            <td className="py-2 px-4">{user.name}</td>
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
