import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsCards() {
  const stats = [
    { label: "عدد المستخدمين", value: "1,250", icon: Users },
        { label: "عدد الطلبات", value: "320", icon: ShoppingCart },
        { label: "عدد المنتجات", value: "85", icon: Package },
        { label: "الأرباح", value: "45,000 ج.م", icon: DollarSign },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}
