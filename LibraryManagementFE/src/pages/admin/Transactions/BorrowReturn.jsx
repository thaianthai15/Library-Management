import { useState, useEffect } from 'react';
import AdminHeader from "../../../components/admin/AdminHeader";
import api from "../../../services/api";
import toast from "react-hot-toast";
import { FaExchangeAlt, FaHistory, FaCalendarPlus, FaCheckCircle, FaExclamationTriangle, FaSearch } from "react-icons/fa";

export default function BorrowReturn() {
  const [activeTab, setActiveTab] = useState("borrow");
  const [activeRecords, setActiveRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [borrowData, setBorrowData] = useState({ memberId: '', bookId: '' });

  const fetchActiveRecords = async () => {
    try {
      const res = await api.get('/borrow/active');
      setActiveRecords(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (activeTab === 'return') fetchActiveRecords();
  }, [activeTab]);

  const handleBorrow = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/borrow/borrow?memberId=${borrowData.memberId}&bookId=${borrowData.bookId}`);
      toast.success("Cho mượn sách thành công!");
      setBorrowData({ memberId: '', bookId: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi: Kiểm tra lại ID hoặc số lượng sách!");
    }
  };

  const handleReturn = async (memberId, bookId) => {
    if (window.confirm("Xác nhận thành viên đã trả sách?")) {
      try {
        await api.post(`/borrow/return?memberId=${memberId}&bookId=${bookId}`);
        toast.success("Đã xử lý trả sách!");
        fetchActiveRecords();
      } catch (err) { toast.error("Lỗi khi trả sách!"); }
    }
  };

  const handleExtend = async (borrowId) => {
    const days = prompt("Nhập số ngày muốn gia hạn (Tối đa 30 ngày):", "7");
    if (days) {
      try {
        await api.post(`/borrow/extend?borrowId=${borrowId}&extraDays=${days}`);
        toast.success(`Đã gia hạn thêm ${days} ngày!`);
        fetchActiveRecords();
      } catch (err) {
        toast.error(err.response?.data?.message || "Không thể gia hạn (có thể do đã quá hạn)!");
      }
    }
  };

  const calculateFinePreview = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    if (today > due) {
      const diffTime = Math.abs(today - due);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays * 5000;
    }
    return 0;
  };

  return (
    <div className="ml-64 bg-gray-50 min-h-screen">
      <AdminHeader title="Quản lý giao dịch Thư viện" />
      
      <div className="p-10 max-w-6xl mx-auto">
        {/* TABS CÂN ĐỐI */}
        <div className="bg-[#012e4a] p-2 rounded-[2rem] inline-flex mb-10 shadow-xl">
          <button 
            onClick={() => setActiveTab("borrow")}
            className={`px-10 py-3 rounded-[1.8rem] font-black text-sm transition-all flex items-center gap-2 ${activeTab === 'borrow' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <FaExchangeAlt /> MƯỢN SÁCH
          </button>
          <button 
            onClick={() => setActiveTab("return")}
            className={`px-10 py-3 rounded-[1.8rem] font-black text-sm transition-all flex items-center gap-2 ${activeTab === 'return' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <FaHistory /> TRẢ SÁCH / GIA HẠN
          </button>
        </div>

        {activeTab === 'borrow' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in duration-500">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h3 className="text-2xl font-black text-[#012e4a] mb-8">Lập phiếu mượn mới</h3>
              <form onSubmit={handleBorrow} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 block mb-2 uppercase tracking-widest">ID Thành viên (Database ID)</label>
                  <input type="number" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-bold" required value={borrowData.memberId} onChange={e => setBorrowData({...borrowData, memberId: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 block mb-2 uppercase tracking-widest">ID Sách (Database ID)</label>
                  <input type="number" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-bold" required value={borrowData.bookId} onChange={e => setBorrowData({...borrowData, bookId: e.target.value})} />
                </div>
                <div className="bg-orange-50 p-4 rounded-2xl text-xs text-orange-700 font-medium">
                   ⚠️ Hệ thống tự động đặt hạn trả là 14 ngày. Thành viên không được mượn quá 3 cuốn.
                </div>
                <button className="w-full bg-[#012e4a] text-white py-4 rounded-2xl font-black shadow-xl hover:bg-orange-500 transition-all active:scale-95">
                  XÁC NHẬN CHO MƯỢN
                </button>
              </form>
            </div>
            
            <div className="hidden lg:flex items-center justify-center bg-blue-50 rounded-[2.5rem] border-2 border-dashed border-blue-100">
                <div className="text-center p-10">
                    <div className="text-6xl text-blue-200 mb-4 flex justify-center"><FaExchangeAlt /></div>
                    <p className="text-blue-400 font-bold italic">Kéo thẻ hoặc nhập mã để bắt đầu giao dịch</p>
                </div>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-[#012e4a]">Sách đang được lưu thông ({activeRecords.length})</h3>
                <div className="relative w-72">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input type="text" placeholder="Tìm tên thành viên..." className="w-full pl-10 pr-4 py-2 bg-white rounded-full border-none shadow-sm text-sm" onChange={e => setSearchTerm(e.target.value)} />
                </div>
             </div>

             <div className="grid grid-cols-1 gap-4">
                {activeRecords.filter(r => r.member.name.toLowerCase().includes(searchTerm.toLowerCase())).map((record) => {
                  const fine = calculateFinePreview(record.dueDate);
                  return (
                    <div key={record.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-orange-200 transition-all">
                        <div className="flex gap-6 items-center">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${fine > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                {fine > 0 ? <FaExclamationTriangle /> : <FaCheckCircle />}
                            </div>
                            <div>
                                <h4 className="font-bold text-[#012e4a]">{record.member.name} <span className="text-[10px] text-gray-400 ml-2 font-mono">{record.member.memberCode}</span></h4>
                                <p className="text-xs text-gray-500 italic">Mượn cuốn: <span className="font-bold text-gray-700">{record.book.title}</span></p>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hạn trả</p>
                            <p className={`font-bold ${fine > 0 ? 'text-red-500' : 'text-gray-700'}`}>{record.dueDate}</p>
                            {fine > 0 && <p className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full mt-1">Phạt: {fine.toLocaleString()}đ</p>}
                        </div>

                        <div className="flex gap-2">
                            <button onClick={() => handleExtend(record.id)} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
                                <FaCalendarPlus /> Gia hạn
                            </button>
                            <button onClick={() => handleReturn(record.member.id, record.book.id)} className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-bold hover:bg-orange-500 hover:text-white transition-all">
                                <FaCheckCircle /> Trả sách
                            </button>
                        </div>
                    </div>
                  );
                })}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}