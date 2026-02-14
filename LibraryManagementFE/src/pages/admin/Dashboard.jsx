import { useState, useEffect } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import StatsCard from "../../components/admin/StatsCard";
import api from "../../services/api";
import {
  FaBook,
  FaExchangeAlt,
  FaUserClock,
  FaExclamationCircle,
} from "react-icons/fa";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    totalBooks: 0,
    activeBorrow: 0,
    outOfStock: 0,
    lateMembers: 0,
  });
  const [recentBorrows, setRecentBorrows] = useState([]);
  const [latestMembers, setLatestMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [booksRes, activeRes, stockRes, lateRes, membersRes] =
        await Promise.all([
          api.get("/books"),
          api.get("/borrow/active"),
          api.get("/reports/out-of-stock"),
          api.get("/reports/late-members"),
          api.get("/members"),
        ]);

      setCounts({
        totalBooks: booksRes.data.length,
        activeBorrow: activeRes.data.length,
        outOfStock: stockRes.data.length,
        lateMembers: lateRes.data.length,
      });

      setRecentBorrows(activeRes.data.slice(0, 5));
      setLatestMembers(membersRes.data.reverse().slice(0, 4));
    } catch (err) {
      console.error("Lỗi tải dữ liệu Dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: "Tổng sách",
      count: counts.totalBooks,
      color: "bg-blue-600",
      icon: <FaBook />,
    },
    {
      title: "Đang mượn",
      count: counts.activeBorrow,
      color: "bg-green-600",
      icon: <FaExchangeAlt />,
    },
    {
      title: "Sách hết",
      count: counts.outOfStock,
      color: "bg-red-600",
      icon: <FaExclamationCircle />,
    },
    {
      title: "Vi phạm trễ hạn",
      count: counts.lateMembers,
      color: "bg-orange-600",
      icon: <FaUserClock />,
    },
  ];

  if (loading)
    return (
      <div className="ml-64 p-10 font-bold text-gray-400">
        Đang đồng bộ dữ liệu hệ thống...
      </div>
    );

  return (
    <div className="ml-64 bg-gray-50 min-h-screen">
      <AdminHeader title="Bảng điều khiển hệ thống" />

      <main className="p-8">
        <h1 className="text-2xl font-bold mb-8 text-[#012e4a]">
          Thống kê thư viện hôm nay
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {stats.map((s, i) => (
            <StatsCard
              key={i}
              title={s.title}
              count={s.count}
              color={s.color}
              icon={s.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#012e4a] text-lg">
                Giao dịch đang mượn
              </h3>
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500 font-bold">
                Mới nhất
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-400 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3 text-[#012e4a]">Độc giả</th>
                    <th className="px-4 py-3">Sách</th>
                    <th className="px-4 py-3">Hạn trả</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentBorrows.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-4 py-4 font-bold text-[#012e4a]">
                        {item.member.name}
                      </td>
                      <td className="px-4 py-4 text-gray-500 italic">
                        {item.book.title}
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-orange-600 font-bold">
                        {item.dueDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {recentBorrows.length === 0 && (
                <p className="text-center py-10 text-gray-400 italic">
                  Không có giao dịch nào.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#012e4a] text-lg">
                Độc giả mới gia nhập
              </h3>
              <button className="text-xs font-bold text-orange-500 hover:underline">
                Xem tất cả
              </button>
            </div>
            <div className="space-y-4">
              {latestMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 group hover:border-orange-200 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#036280] text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-blue-900/10 group-hover:bg-orange-500 transition-colors">
                      {member.name.charAt(0)}
                    </div>
                    <div className="text-start">
                      <p className="font-bold text-[#012e4a] text-sm">
                        {member.name}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Mã: {member.memberCode}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-black uppercase">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
