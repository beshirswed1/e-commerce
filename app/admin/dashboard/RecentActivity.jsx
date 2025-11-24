import ActivityItem from "./ActivityItem";

export default function RecentActivity() {
  const activities = [
    { title: "New order placed", subtitle: "Order #1234 - $125.00", time: "5 minutes ago" },
    { title: "Product updated", subtitle: "Premium Headphones - Stock: 45", time: "12 minutes ago" },
    { title: "New customer registered", subtitle: "John Doe - john@example.com", time: "1 hour ago" },
  ];

  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border mt-6">
      <h2 className="font-semibold mb-2">Recent Activity</h2>
      <p className="text-gray-500 text-sm mb-4">Latest updates and transactions</p>

      {activities.map((act, i) => (
        <ActivityItem key={i} {...act} />
      ))}
    </div>
  );
}
