"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function SalesOverview({ data }) {
    return (
        <div className="w-full p-5 bg-white rounded-xl shadow-sm border mb-6">
            <h2 className="font-semibold mb-2">ملخص المبيعات</h2>
            <p className="text-gray-500 text-sm mb-4">إحصائيات المبيعات خلال الشهر</p>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid opacity={0.2} stroke="#1f1f1f" strokeDasharray="3 3" />
                        <XAxis dataKey="name" tickMargin={15} />
                        <YAxis tickMargin={50} />
                        <Tooltip />
                        <Line type="monotone" dataKey="sales" stroke="#D8C2A7" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
