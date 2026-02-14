import { useState, useEffect } from "react";
import AdminHeader from "../../../components/admin/AdminHeader";
import api from "../../../services/api";
import toast from "react-hot-toast";
import {
  FaUserPlus,
  FaTrashAlt,
  FaSearch,
  FaTimes,
  FaIdCard,
  FaPhoneAlt,
  FaEnvelope,
  FaEdit,
} from "react-icons/fa";

export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState({
    memberCode: "",
    name: "",
    email: "",
    phone: "",
  });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/members");
      setMembers(res.data);
    } catch (err) {
      toast.error("Lỗi tải dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEditClick = (member) => {
    setEditingMember(member);
    setFormData({
      memberCode: member.memberCode,
      name: member.name,
      email: member.email,
      phone: member.phone,
    });
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditingMember(null);
    setFormData({ memberCode: "", name: "", email: "", phone: "" });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await api.put(`/members/${editingMember.id}`, formData);
        toast.success("Cập nhật thành công!");
      } else {
        await api.post("/members", formData);
        toast.success("Đăng ký thành công!");
      }
      setShowModal(false);
      fetchMembers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Thao tác thất bại!");
    }
  };

  const handleDelete = async (id, code) => {
    if (window.confirm(`Xóa thành viên ${code}?`)) {
      try {
        await api.delete(`/members/${id}`);
        toast.success("Đã xóa!");
        fetchMembers();
      } catch (err) {
        toast.error("Lỗi xóa!");
      }
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-64 bg-gray-50 min-h-screen relative">
      <AdminHeader title="Quản lý thành viên" />

      <div className="p-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-black text-[#012e4a]">
            Hồ sơ thành viên
          </h2>
          <button
            onClick={handleAddClick}
            className="bg-[#012e4a] text-white px-8 py-3.5 rounded-3xl font-bold flex items-center gap-2 hover:bg-orange-500 transition-all shadow-lg active:scale-95"
          >
            <FaUserPlus /> Đăng ký thành viên
          </button>
        </div>

        <div className="relative mb-8">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-14 pr-6 py-4 bg-white rounded-3xl shadow-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white p-6 rounded-[2rem] border border-transparent hover:border-orange-200 shadow-sm hover:shadow-lg transition-all relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#d0e1e7] text-[#012e4a] rounded-2xl flex items-center justify-center text-xl font-black">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-[#012e4a]">{member.name}</h3>
                  <p className="text-[10px] font-black text-orange-500 uppercase">
                    Member
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-8 text-gray-500 text-sm">
                <div className="flex items-center gap-3">
                  <FaIdCard className="text-gray-300" />{" "}
                  <span className="font-bold">{member.memberCode}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-300" />{" "}
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-gray-300" />{" "}
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-black">
                  ACTIVE
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(member)}
                    className="text-gray-300 hover:text-blue-500 p-2 transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id, member.memberCode)}
                    className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[#012e4a]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative animate-in zoom-in duration-300">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors"
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-2xl font-black mb-8 text-[#012e4a]">
              {editingMember ? "Cập nhật thông tin" : "Đăng ký thành viên"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">
                  Mã thành viên *
                </label>
                {/* Khi sửa thì khóa mã thành viên lại */}
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                  required
                  value={formData.memberCode}
                  onChange={(e) =>
                    setFormData({ ...formData, memberCode: e.target.value })
                  }
                  disabled={!!editingMember}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <button className="w-full bg-[#012e4a] text-white py-4 rounded-2xl font-black mt-6 hover:bg-orange-500 transition-all active:scale-95">
                {editingMember ? "Lưu thay đổi" : "Xác nhận cấp thẻ"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
