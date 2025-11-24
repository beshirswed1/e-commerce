import React from "react";
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import SalesOverview from "./SalesOverview";
import WeeklyOrders from "./WeeklyOrders";
import RecentActivity from "./RecentActivity"
const dashboard = () => {
    const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
  ];

  const OrdersData =[
    { name: "Mon", orders: 120 },
    { name: "Tue", orders: 150 },
    { name: "Wed", orders: 170 },
    { name: "Thu", orders: 140 },
    { name: "Fri", orders: 200 },
    { name: "Sat", orders: 160 },
    { name: "Sun", orders: 135 }
  ]
    return (
        <div className="m-10 ">
        <DashboardHeader />
        <StatsCards/> 
        <SalesOverview  data={salesData} />
        <WeeklyOrders data={OrdersData} />
        <RecentActivity/>
        </div>
    );
};

export default dashboard;
