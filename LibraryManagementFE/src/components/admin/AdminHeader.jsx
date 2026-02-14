import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';

export default function AdminHeader({ title }) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
      <h2 className="text-xl font-bold text-[#012e4a]">{title}</h2>
      <div className="flex items-center gap-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm kiếm nhanh..." className="pl-10 pr-4 py-1.5 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 w-64" />
        </div>
        <FaBell className="text-gray-500 cursor-pointer" />
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm font-medium">Quản trị viên</span>
          <FaUserCircle className="text-2xl text-gray-400" />
        </div>
      </div>
    </header>
  );
}