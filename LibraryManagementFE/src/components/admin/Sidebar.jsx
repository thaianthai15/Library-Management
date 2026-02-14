import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaFileAlt,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";
import logo from "../../assets/LibLife.png";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { path: "/admin", name: "Dashboard", icon: <FaChartPie /> },
  { path: "/admin/books", name: "Quản lý Sách", icon: <FaBook /> },
  { path: "/admin/users", name: "Người dùng HT", icon: <FaUserShield /> },
  { path: "/admin/members", name: "Thành viên", icon: <FaUsers /> },
  { path: "/admin/transactions", name: "Mượn / Trả", icon: <FaExchangeAlt /> },
  { path: "/admin/statistics", name: "Thống kê", icon: <FaFileAlt /> },
];

export default function Sidebar() {
  const location = useLocation();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-64 bg-[#012e4a] text-white min-h-screen p-4 flex flex-col fixed left-0 top-0 z-50">
      <div className="text-2xl font-bold mb-10 px-4 flex items-center gap-3 justify-center">
        <div className="w-24 h-24 mx-auto mb-4">
          <img
            src={logo}
            alt="LibLife Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span>LibAdmin</span>
      </div>

      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-all ${
              location.pathname === item.path
                ? "bg-orange-500 text-white"
                : "hover:bg-[#036280] text-gray-300"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 text-gray-400 hover:text-white border-t border-gray-700 mt-auto"
      >
        <FaSignOutAlt /> Đăng xuất
      </button>
    </div>
  );
}
