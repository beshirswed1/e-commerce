    "use client";
    
    import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
    
    export default function WeeklyOrders({ data }) {
        return (
            <div className="w-full p-5 bg-white rounded-xl shadow-sm border mb-6">
                <h2 className="font-semibold mb-2">إحصائيات الطلبات أسبوعياً</h2>
                <p className="text-gray-500 text-sm mb-4">عدد الطلبات حسب أيام الأسبوع</p>
    
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid opacity={0.2} stroke="#1f1f1f" strokeDasharray="3 3" />
                            <XAxis dataKey="name" tickMargin={15} />
                            <YAxis tickMargin={50} />
                            <Tooltip trigger="click" content={() => null} cursor={false} shared={false} />
                            <Bar type="monotone" dataKey="orders" fill="#D8C2A7" barSize={80} radius={[7, 7, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
    