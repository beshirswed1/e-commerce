export default function StatCard({ title, value, diff, icon: Icon }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border">
      <div className="flex justify-between items-start">
        <div className="flex flex-col justify-start ">
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className="text-xs text-gray-400 mt-1 ">{diff}</p>
        </div>
        {Icon && <Icon className="text-green-600" />}
      </div>
    </div>
  );
}
