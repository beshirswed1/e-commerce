"use client";
import { useState } from "react";

// صفحة اليوزرز كلها في ملف واحد زي ما طلبت
export default function UsersPage() {
  // بيانات تجريبية
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joined: "2024-01-10" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Manager", status: "Active", joined: "2024-01-12" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Active", joined: "2024-01-15" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Inactive", joined: "2024-01-18" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Manager", status: "Active", joined: "2024-01-20" },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false); // مودال إضافة/تعديل
  const [editingUser, setEditingUser] = useState(null);

  // فلترة اليوزرز
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // فتح مودال الإضافة
  const handleAdd = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  // فتح مودال التعديل
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  // حفظ يوزر جديد أو تعديل
  const handleSave = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const newUser = {
      id: editingUser ? editingUser.id : Date.now(),
      name: form.get("name"),
      email: form.get("email"),
      role: form.get("role"),
      status: form.get("status"),
      joined: editingUser ? editingUser.joined : new Date().toISOString().slice(0, 10),
    };

    if (editingUser) {
      setUsers(users.map(u => (u.id === editingUser.id ? newUser : u)));
    } else {
      setUsers([...users, newUser]);
    }

    setShowModal(false);
  };

  // حذف يوزر
  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="p-6 bg-[#F5EEE6] min-h-screen space-y-6">

      {/* عنوان الصفحة */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Users</h1>
          <p className="text-gray-500">Manage user accounts and permissions</p>
        </div>

        {/* زرار إضافة يوزر */}
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#d6b28c] text-black rounded-lg shadow hover:bg-[#c89c6e] transition flex items-center gap-2"
        >
          ➕ Add User
        </button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={users.length} color="text-blue-600" />
        <StatCard title="Active Users" value={users.filter(u => u.status === "Active").length} color="text-green-600" />
        <StatCard title="Inactive Users" value={users.filter(u => u.status === "Inactive").length} color="text-red-600" />
      </div>

      {/* البحث */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-5">
        <span className="text-gray-500">🔍</span>
        <input
          placeholder="Search users by name or email..."
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* جدول اليوزرز */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <h2 className="text-lg font-bold mb-3 text-center">All Users</h2>

        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-center">Name</th>
              <th className="p-2 text-center">Email</th>
              <th className="p-2 text-center">Role</th>
              <th className="p-2 text-center">Status</th>
              <th className="p-2 text-center">Joined</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-2 text-center">{u.name}</td>
                <td className="p-2 text-center">{u.email}</td>

                <td className="p-2 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm 
                    ${u.role === "Admin" ? "bg-purple-100 text-purple-600" : ""}
                    ${u.role === "Manager" ? "bg-blue-100 text-blue-600" : ""}
                    ${u.role === "User" ? "bg-gray-200 text-gray-700" : ""}
                  `}>
                    {u.role}
                  </span>
                </td>

                <td className="p-2 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm 
                    ${u.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}
                  `}>
                    {u.status}
                  </span>
                </td>

                <td className="p-2 text-center">{u.joined}</td>

                <td className="p-2 text-center flex gap-3">
                  <button onClick={() => handleEdit(u)} className="text-blue-500 text-xl">✏️</button>
                  <button onClick={() => handleDelete(u.id)} className="text-red-500 text-xl">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* مودال الإضافة والتعديل */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4"
          >
            <h2 className="text-xl font-bold">
              {editingUser ? "Edit User" : "Add User"}
            </h2>

            <input name="name" defaultValue={editingUser?.name} required className="w-full p-2 border rounded" placeholder="Name" />
            <input name="email" defaultValue={editingUser?.email} required className="w-full p-2 border rounded" placeholder="Email" />

            <select name="role" defaultValue={editingUser?.role || "User"} className="w-full p-2 border rounded">
              <option>Admin</option>
              <option>Manager</option>
              <option>User</option>
            </select>

            <select name="status" defaultValue={editingUser?.status || "Active"} className="w-full p-2 border rounded">
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}


// كومبوننت صغيرة للكروت
function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
