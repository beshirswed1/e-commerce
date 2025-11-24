import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsCards() {
  const stats = [
    { title: "Total Revenue", value: "$45,231.89", diff: "+20.1% from last month", icon: DollarSign },
    { title: "Orders", value: "2,345", diff: "+12.5% from last month", icon: ShoppingCart },
    { title: "Customers", value: "1,234", diff: "+8.2% from last month", icon: Users },
    { title: "Products", value: "567", diff: "+4 new this week", icon: Package },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </div>
  );
}
