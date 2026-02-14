import { useState, useEffect } from "react";
import AdminHeader from "../../../components/admin/AdminHeader";
import api from "../../../services/api";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaBookOpen,
  FaTimes,
  FaCloudUploadAlt,
} from "react-icons/fa";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    quantity: 0,
    publishDate: "",
  });

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      toast.error("Lỗi tải danh sách sách!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm) {
        try {
          const res = await api.get(`/books/search?keyword=${searchTerm}`);
          setBooks(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        fetchBooks();
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa vĩnh viễn cuốn sách này?")) {
      try {
        await api.delete(`/books/${id}`);
        toast.success("Đã xóa sách!");
        fetchBooks();
      } catch (err) {
        toast.error("Không thể xóa sách đang có giao dịch!");
      }
    }
  };

  const openModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category: book.category,
        quantity: book.quantity,
        publishDate: book.publishedDate || "",
      });
    } else {
      setEditingBook(null);
      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        quantity: 0,
        publishDate: "",
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await api.put(`/books/${editingBook.id}`, formData);
        toast.success("Cập nhật thành công!");
      } else {
        await api.post("/books", formData);
        toast.success("Đã thêm sách vào kho!");
      }
      setShowModal(false);
      fetchBooks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi dữ liệu (Kiểm tra ISBN)");
    }
  };

  return (
    <div className="ml-64 bg-gray-50 min-h-screen relative">
      <AdminHeader title="Quản lý kho sách" />

      <div className="p-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#012e4a]">
              Danh mục sách ({books.length})
            </h2>
            <p className="text-gray-400 text-sm">
              Quản lý nhập xuất và thông tin chi tiết
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-[#012e4a] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-500 transition-all shadow-lg shadow-blue-900/10"
          >
            <FaPlus /> Thêm sách mới
          </button>
        </div>

        <div className="relative mb-8">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="Tìm theo tiêu đề, tác giả hoặc ISBN..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-transparent rounded-[1.5rem] shadow-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#036280] text-white uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="p-5">Thông tin sách</th>
                <th className="p-5">ISBN</th>
                <th className="p-5 text-center">Số lượng</th>
                <th className="p-5">Tình trạng</th>
                <th className="p-5 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-blue-50/40 transition-colors group"
                >
                  <td className="p-5 flex items-center gap-4">
                    <div className="w-10 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-[#012e4a] group-hover:bg-[#012e4a] group-hover:text-white transition-all">
                      <FaBookOpen />
                    </div>
                    <div>
                      <p className="font-bold text-[#012e4a]">{book.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                        {book.author} | {book.category}
                      </p>
                    </div>
                  </td>
                  <td className="p-5 font-mono text-xs font-bold text-gray-400">
                    {book.isbn}
                  </td>
                  <td className="p-5 text-center font-bold text-[#012e4a]">
                    {book.quantity}
                  </td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        book.status === "AVAILABLE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.status === "AVAILABLE" ? "Sẵn sàng" : "Hết hàng"}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openModal(book)}
                        className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[#012e4a]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl relative animate-in zoom-in duration-300">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors"
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-2xl font-black mb-8 text-[#012e4a]">
              {editingBook ? "Cập nhật sách" : "Nhập sách mới"}
            </h3>

            <form onSubmit={handleSave} className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">
                  Tiêu đề sách
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.title}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">
                  Tác giả
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.author}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">
                  Mã ISBN
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.isbn}
                  required
                  disabled={!!editingBook}
                  onChange={(e) =>
                    setFormData({ ...formData, isbn: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">
                  Thể loại
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.category}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">
                  Ngày xuất bản
                </label>
                <input
                  type="date"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.publishDate}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, publishDate: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">
                  Số lượng nhập kho
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.quantity}
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <button className="col-span-2 bg-[#012e4a] text-white py-4 rounded-2xl font-black mt-4 shadow-xl hover:bg-orange-500 transition-all flex items-center justify-center gap-2">
                <FaCloudUploadAlt />{" "}
                {editingBook ? "Lưu thay đổi" : "Xác nhận nhập kho"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
