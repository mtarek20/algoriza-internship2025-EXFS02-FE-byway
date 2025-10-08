import { BookOpen, List, User } from "lucide-react";
import { BellIcon } from "lucide-react";
import Divider from "../../Components/Divider";
import { useDashboardStats } from "../../CustomHooks/useDashboardStats";
import { useEffect } from "react";
import WalletCard from "../../Components/AdminComponents/WalletCard";
import StatisticsCard from "../../Components/AdminComponents/StatsCard";

export default function AdminDashboard() {
  const { stats, refetch } = useDashboardStats();
  const stat = [
    {
      label: "Instructors",
      value: stats?.instructors || 0,
      icon: <User className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Categories",
      value: stats?.categories || 0,
      icon: <List className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Courses",
      value: stats?.courses || 0,
      icon: <BookOpen className="w-5 h-5 text-blue-500" />,
    },
  ];

  useEffect(() => {
    refetch();
  }, [stats]);
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-medium text-[#202637]">Dashboard</h2>

        <div className="w-12 h-12 rounded-full bg-white shadow-notification flex items-center justify-center">
          <BellIcon color="#96A0B6" />
        </div>
      </div>

      <Divider />

      {/*Dashboard Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        {stat.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between bg-white shadow-stats-card rounded-2xl p-4"
          >
            {/*  number + title */}
            <div>
              <p className="text-3xl font-medium">{item.value}</p>
              <p className="text-size-16 font-medium">{item.label}</p>
            </div>

            {/* icon */}
            <div className="bg-[#58A8DC1F] p-2 rounded-lg">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Dashboard Charts */}
      <div className="flex gap-4">
        <div className="flex-1">
          <WalletCard />
        </div>

        <StatisticsCard />
      </div>
    </div>
  );
}
