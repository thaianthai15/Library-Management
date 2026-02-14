import {
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaRegHeart,
  FaShoppingCart,
  FaRegComment,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";

export default function Header() {
  const menuData = [
    { name: "Home", path: "/", submenu: null },
    {
      name: "Shop",
      path: "/shop",
      submenu: [
        "Shop Default",
        "Shop List",
        "Shop Details",
        "Shop Cart",
        "Wishlist",
        "Checkout",
      ],
    },
    {
      name: "Pages",
      path: "/pages",
      submenu: ["About Us", "Author", "Faq's", "404 Page"],
    },
    {
      name: "Blog",
      path: "/blog",
      submenu: ["Blog Grid", "Blog List", "Blog Details"],
    },
    { name: "Contact", path: "/contact", submenu: null },
  ];
  return (
    <header className="w-full">
      <div className="w-full bg-[--header-color] text-white text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-lg">
              <FaPhoneAlt />
              +363-520-495
            </span>
            <span className="flex items-center gap-2 text-lg border-x-2 border-white border-height px-5">
              <FaEnvelope />
              nguyenanthai1562004@gmail.com
            </span>
            <span className="flex items-center gap-2 text-lg">
              🕒 Sunday - Fri: 9 AM - 6 PM
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 cursor-pointer hover:text-[--highlight-color] text-lg">
              <FaRegComment />
              Live Chat
            </span>
            <Link
              to="/login"
              className="flex items-center gap-2 cursor-pointer hover:text-[--highlight-color] text-lg"
            >
              <FaUser />
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[--primary--color] rounded-full" />
            <span className="text-2xl font-bold text-[--primary--color]">
              LibLife
            </span>
          </div>

          <nav className="flex items-center gap-8 text-[--primary--color] font-medium">
            {menuData.map((item) => (
              <div key={item.name} className="relative group py-6">
                <div className="flex items-center gap-1 cursor-pointer group-hover:text-[--highlight-color] transition-colors text-xl">
                  {item.name}
                  {item.submenu && (
                    <HiChevronDown className="group-hover:rotate-180 transition-transform" />
                  )}
                </div>

                {item.submenu && (
                  <div className="absolute top-[100%] left-0 w-56 bg-white shadow-xl border-t-2 border-[--highlight-color] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <ul className="py-2">
                      {item.submenu.map((sub, index) => (
                        <li
                          key={index}
                          className="px-6 py-3 text-lg text-gray-700 hover:bg-[--highlight-color] hover:text-white transition-colors cursor-pointer border-b border-gray-50 last:border-none flex justify-between items-center"
                        >
                          {sub}
                          {sub === "Author" && (
                            <HiChevronDown className="-rotate-90 text-lg" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative border border-gray-300 rounded-full p-3">
              <FaRegHeart className="text-2xl cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-[--header-color] text-white text-xs w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                0
              </span>
            </div>

            <div className="relative border border-gray-300 rounded-full p-3">
              <FaShoppingCart className="text-2xl cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-[--header-color] text-white text-xs w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                0
              </span>
            </div>

            <button className="border border-gray-300 rounded-full p-3 hover:bg-gray-100">
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
