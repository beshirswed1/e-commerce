import ActivityItem from "./ActivityItem";

export default function RecentActivity() {
  const activities = [
    {
      title: "تم إضافة طلب جديد",
      subtitle: "طلب رقم #1234 - بقيمة 125 دولار",
      time: "منذ 5 دقائق"
    },
    {
      title: "تم تحديث منتج",
      subtitle: "سماعات فاخرة - المخزون: 45 قطعة",
      time: "منذ 12 دقيقة"
    },
    {
      title: "تسجيل عميل جديد",
      subtitle: "محمد أحمد - mohamed@example.com",
      time: "منذ ساعة"
    },
  ];

  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border mt-6">
      <h2 className="font-semibold mb-2">النشاطات الأخيرة</h2>
      <p className="text-gray-500 text-sm mb-4">أحدث التحديثات والمعاملات</p>

      {activities.map((act, i) => (
        <ActivityItem key={i} {...act} />
      ))}
    </div>
  );
}
