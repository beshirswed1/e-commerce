"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const MOCK_ORDERS = [
  {
    id: "ORD-1001",
    customer: "Ahmed Ali",
    phone: "0111111111111",
    total: 1200,
    payment: "Cash",
    date: "2025-12-01",
    status: "Processing",
  },
  {
    id: "ORD-1002",
    customer: "Sara Mohamed",
    phone: "0111111111111",
    total: 850,
    payment: "Visa",
    date: "2025-12-02",
    status: "Shipped",
  },
  {
    id: "ORD-1003",
    customer: "Omar Hassan",
    phone: "0111111111111",
    total: 640,
    payment: "Cash",
    date: "2025-12-03",
    status: "Delivered",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // مؤقتًا بدل الباك إند
  useEffect(() => {
    setOrders(MOCK_ORDERS);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6  bg-[#F5EEE6]  min-h-screen  ">
      <h1 className="text-4xl font-bold mb-4">Orders Management</h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Search by Order ID or Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/5 px-4 py-2 border rounded-lg"
        >
          <option value="All">All Status</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-4 text-center">Order ID</th>
              <th className="p-4 text-center">Customer</th>
              <th className="p-4 text-center">Phone</th>
              <th className="p-4 text-center">Total</th>
              <th className="p-4 text-center">Payment</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4 text-center ">{order.customer}</td>
                <td className="p-4 text-center ">{order.phone}</td>
                <td className="p-4 text-center ">{order.total} EGP</td>
                <td className="p-4 text-center ">{order.payment}</td>
                <td className="p-4 text-center ">{order.date}</td>

                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className={`px-3 py-1 rounded-lg font-medium
                      ${
                        order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>

                <td className="p-4">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

