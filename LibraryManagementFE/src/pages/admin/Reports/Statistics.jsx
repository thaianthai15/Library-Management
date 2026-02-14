import { useState, useEffect } from 'react';
import AdminHeader from "../../../components/admin/AdminHeader";
import api from "../../../services/api";
import toast from "react-hot-toast";
import { FaExclamationTriangle, FaBookDead, FaChartLine, FaArrowRight } from "react-icons/fa";

export default function Statistics() {
  const [outOfStockBooks, setOutOfStockBooks] = useState([]);
  const [lateMembers, setLateMembers] = useState([]);
  const [monthlyBorrowCount, setMonthlyBorrowCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      const [outOfStockRes, borrowStatRes, lateMembersRes] = await Promise.all([
        api.get('/reports/out-of-stock'),
        api.get(`/reports/borrow-stat?month=${currentMonth}&year=${currentYear}`),
        api.get('/reports/late-members')
      ]);

      setOutOfStockBooks(outOfStockRes.data);
      setMonthlyBorrowCount(borrowStatRes.data);
      setLateMembers(lateMembersRes.data);
    } catch (err) {
      toast.error("Lỗi khi tải báo cáo thống kê!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  return (
    <div className="ml-64 bg-gray-50 min-h-screen">
      <AdminHeader title="Báo cáo & Thống kê hệ thống" />
      
      <div className="p-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-2xl shadow-inner">
              <FaChartLine />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Mượn tháng này</p>
              <h3 className="text-3xl font-black text-[#012e4a]">{monthlyBorrowCount} <span className="text-[10px] text-green-500 font-bold ml-1">Lượt</span></h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center text-2xl shadow-inner">
              <FaBookDead />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sách hết kho</p>
              <h3 className="text-3xl font-black text-[#012e4a]">{outOfStockBooks.length} <span className="text-[10px] text-red-500 font-bold ml-1">Cuốn</span></h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center text-2xl shadow-inner">
              <FaExclamationTriangle />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Vi phạm trễ hạn</p>
              <h3 className="text-3xl font-black text-[#012e4a]">{lateMembers.length} <span className="text-[10px] text-red-500 font-bold ml-1">Người</span></h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
            <h3 className="font-black text-[#012e4a] text-lg mb-6 flex items-center gap-3">
              <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
              Sách cần nhập thêm (Qty = 0)
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {outOfStockBooks.length > 0 ? outOfStockBooks.map((book) => (
                <div key={book.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 group hover:border-orange-300 transition-all">
                  <div>
                    <p className="font-bold text-sm text-[#012e4a]">{book.title}</p>
                    <p className="text-[10px] text-gray-400 font-mono uppercase">ISBN: {book.isbn}</p>
                  </div>
                  <button className="p-2 bg-white text-orange-500 rounded-xl shadow-sm hover:bg-orange-500 hover:text-white transition-all">
                    <FaArrowRight size={12} />
                  </button>
                </div>
              )) : (
                <p className="text-center text-gray-400 italic py-10">Kho hàng hiện tại vẫn đầy đủ.</p>
              )}
            </div>
          </div>

          <div className="bg-[#012e4a] p-8 rounded-[3rem] shadow-2xl text-white">
            <h3 className="font-black mb-6 flex items-center gap-3">
               <div className="w-2 h-6 bg-red-500 rounded-full"></div>
               Độc giả đang quá hạn trả sách
            </h3>
            <div className="space-y-3">
              {lateMembers.length > 0 ? lateMembers.map((member) => (
                <div key={member.id} className="bg-[#036280]/50 p-5 rounded-2xl flex justify-between items-center border border-white/5 group hover:bg-[#036280] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center font-black">{member.name.charAt(0)}</div>
                    <div>
                      <p className="font-bold text-sm">{member.name}</p>
                      <p className="text-[10px] opacity-60 font-mono">CODE: {member.memberCode}</p>
                    </div>
                  </div>
                  <div className="text-red-400 animate-pulse"><FaExclamationTriangle /></div>
                </div>
              )) : (
                <p className="text-center opacity-40 italic py-10">Tuyệt vời! Không có ai trễ hạn.</p>
              )}
            </div>
            {lateMembers.length > 0 && (
                <button className="w-full mt-8 py-4 bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-[#012e4a] transition-all shadow-lg">
                    Gửi thông báo nhắc nhở
                </button>
            )}
          </div>
        </div>

        <div className="mt-10 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-10">
                <h3 className="font-black text-[#012e4a] text-lg">Biểu đồ lượt mượn trong năm</h3>
                <div className="px-4 py-2 bg-gray-50 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">Năm 2024</div>
            </div>
            <div className="flex items-end justify-between h-48 px-4 gap-2">
                {[15, 25, 40, 30, 55, 45, 70, 60, 80, 50, 65, monthlyBorrowCount].map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 w-full group">
                        <div 
                          style={{ height: `${Math.min(val, 100)}%` }} 
                          className={`w-full max-w-[40px] rounded-t-xl transition-all relative cursor-help ${i === 11 ? 'bg-orange-500 shadow-lg shadow-orange-200' : 'bg-[#d0e1e7] group-hover:bg-[#036280]'}`}
                        >
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#012e4a] text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-xl font-bold">
                                {val} lượt
                            </span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">T{i+1}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}