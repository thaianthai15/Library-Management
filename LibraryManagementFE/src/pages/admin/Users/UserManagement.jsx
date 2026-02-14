import { useState, useEffect } from "react";
import AdminHeader from "../../../components/admin/AdminHeader";
import api from "../../../services/api";
import toast from "react-hot-toast";
import {
  FaUserShield,
  FaUserEdit,
  FaShieldAlt,
  FaPlus,
  FaTimes,
  FaTrash,
  FaSearch,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Lưu user đang được sửa
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "STAFF",
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Lỗi tải dữ liệu!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xử lý Thêm hoặc Sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Đảm bảo dữ liệu gửi đi có: username, password, role
        const updateData = {
          username: formData.username,
          password: formData.password, // BE sẽ kiểm tra nếu blank thì không đổi
          role: formData.role,
        };

        await api.put(`/users/${editingUser.id}`, updateData);
        toast.success("Cập nhật thành công!");
      } else {
        // Tạo mới
        await api.post("/users", formData);
        toast.success("Tạo tài khoản thành công!");
      }
      closeModal();
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Thao tác thất bại! Kiểm tra lại dữ liệu.");
    }
  };

  // Xử lý Xóa
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản này?")) {
      try {
        await api.delete(`/users/${id}`);
        toast.success("Đã xóa tài khoản!");
        fetchUsers();
      } catch (err) {
        toast.error("Không thể xóa tài khoản này!");
      }
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ username: user.username, password: "", role: user.role });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ username: "", password: "", role: "STAFF" });
  };

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-64 bg-gray-50 min-h-screen">
      <AdminHeader title="Quản trị tài khoản" />

      <div className="p-10 max-w-6xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#012e4a]">
              Quản lý nhân sự
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              Danh sách quản trị viên và nhân viên vận hành hệ thống
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#012e4a] text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-500 transition-all shadow-lg active:scale-95"
          >
            <FaPlus /> Thêm tài khoản mới
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="Tìm kiếm tài khoản..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-5 rounded-3xl border border-transparent shadow-sm hover:shadow-md hover:border-orange-100 transition-all flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                    user.role === "ADMIN"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {user.role === "ADMIN" ? <FaShieldAlt /> : <FaUserShield />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#012e4a]">
                      {user.username}
                    </h3>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-lg border ${
                        user.role === "ADMIN"
                          ? "border-orange-200 text-orange-500 bg-orange-50"
                          : "border-blue-200 text-blue-500 bg-blue-50"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                    ID: {user.id} • Status:{" "}
                    <span
                      className={
                        user.enabled ? "text-green-500" : "text-red-500"
                      }
                    >
                      {user.enabled ? "Hoạt động" : "Đang khóa"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions Group */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => openEditModal(user)}
                  className="p-3 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  title="Sửa"
                >
                  <FaUserEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-3 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  title="Xóa vĩnh viễn"
                >
                  <FaTrash size={18} />
                </button>
                <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>
                <button
                  onClick={() => {
                    const action = user.enabled ? "disable" : "enable";
                    api
                      .put(`/users/${user.id}/${action}`)
                      .then(() => fetchUsers());
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    user.enabled
                      ? "text-red-500 border-red-100 hover:bg-red-50"
                      : "text-green-600 border-green-100 hover:bg-green-50"
                  }`}
                >
                  {user.enabled ? <FaLock /> : <FaLockOpen />}
                  {user.enabled ? "Khóa" : "Mở"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL THÊM/SỬA */}
      {showModal && (
        <div className="fixed inset-0 bg-[#012e4a]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors"
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-2xl font-black mb-8 text-[#012e4a]">
              {editingUser ? "Cập nhật tài khoản" : "Thêm nhân sự mới"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-black text-gray-400 block mb-2 tracking-widest uppercase">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  disabled={!!editingUser} // Không cho đổi username khi sửa
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 block mb-2 tracking-widest uppercase">
                  Mật khẩu {editingUser && "(Bỏ trống nếu không đổi)"}
                </label>
                <input
                  type="password"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  required={!editingUser}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 block mb-2 tracking-widest uppercase">
                  Vai trò hệ thống
                </label>
                <select
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="STAFF">STAFF (Nhân viên mượn trả)</option>
                  <option value="ADMIN">ADMIN (Quản trị toàn quyền)</option>
                </select>
              </div>
              <button className="w-full bg-[#012e4a] text-white py-4 rounded-2xl font-black mt-4 shadow-xl shadow-blue-900/20 hover:bg-orange-500 transition-all transform active:scale-95">
                {editingUser ? "Lưu thay đổi" : "Xác nhận tạo tài khoản"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
