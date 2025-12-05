"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const MOCK_ORDER_DETAILS = {
  "ORD-1001": {
    id: "ORD-1001",
    customer: "Ahmed Ali",
    phone: "0111111111111",
    address: "Nasr City, Cairo",
    payment: "Cash",
    status: "Processing",
    items: [
      { name: "T-Shirt", qty: 2, price: 300 },
      { name: "Shoes", qty: 1, price: 600 },
    ],
  },

  "ORD-1002": {
    id: "ORD-1002",
    customer: "Sara Mohamed",
    phone: "0111111111111",
    address: "Maadi, Cairo",
    payment: "Visa",
    status: "Shipped",
    items: [{ name: "Bag", qty: 1, price: 850 }],
  },

  "ORD-1003": {
    id: "ORD-1003",
    customer: "Omar Hassan",
    phone: "0111111111111",
    address: "Heliopolis, Cairo",
    payment: "Cash",
    status: "Delivered",
    items: [{ name: "Jacket", qty: 1, price: 640 }],
  },
};

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setOrder(MOCK_ORDER_DETAILS[id]);
  }, [id]);

  if (!order) {
    return <div className="p-6">Loading...</div>;
  }

  const total = order.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <div className="p-6 space-y-6 bg-[#F5EEE6]  min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">Order Details</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-[#d6b28c] text-black rounded-lg shadow hover:bg-[#c89c6e] transition"
        >
          Back
        </button>
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Customer Name</p>
          <p className="font-medium">{order.customer}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{order.phone}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-medium">{order.address}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Payment Method</p>
          <p className="font-medium">{order.payment}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Order Status</p>
          <select
            value={order.status}
            onChange={(e) =>
              setOrder({ ...order, status: e.target.value })
            }
            className={`mt-1 px-3 py-1 rounded-lg font-medium
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
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-4 text-center">Product</th>
              <th className="p-4 text-center">Qty</th>
              <th className="p-4 text-center">Price</th>
              <th className="p-4 text-center">Subtotal</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {order.items.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-4 text-center">{item.name}</td>
                <td className="p-4 text-center">{item.qty}</td>
                <td className="p-4 text-center">{item.price} EGP</td>
                <td className="p-4 text-center">
                  {item.qty * item.price} EGP
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow p-6 flex justify-end">
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold">{total} EGP</p>
        </div>
      </div>
    </div>
  );
}