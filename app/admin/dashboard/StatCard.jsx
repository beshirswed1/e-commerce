export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border">
      <div className="flex justify-between items-start">
        <div className="flex flex-col justify-start ">
          <p className="text-gray-500 text-lg">{label}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        {Icon && <Icon className="text-green-600" />}
      </div>
    </div>
  );
}
