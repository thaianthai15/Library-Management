import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import bgImage from "../../assets/background-main.jpg";
import toast from "react-hot-toast";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      return toast.error("Mật khẩu phải từ 8 ký tự trở lên!");
    }
    try {
      await api.post("/auth/register", formData);
      toast.success("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data || "Username đã tồn tại!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-repeat bg-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {" "}
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-black text-white mb-2">Register</h2>
        <p className="text-white text-lg mb-8">
          Create a library administrator account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#012e4a]"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password (ít nhất 8 ký tự)"
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#012e4a]"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black shadow-lg hover:shadow-orange-200 transition-all">
            Register
          </button>
        </form>
        <div className="mt-8 text-center">
          <Link to="/login" className="text-white font-bold text-lg">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
