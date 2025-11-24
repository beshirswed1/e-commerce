export default function ActivityItem({ title, subtitle, time }) {
  return (
    <div className="flex items-start justify-between py-3 border-b last:border-none">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}
