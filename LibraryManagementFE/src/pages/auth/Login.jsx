import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import bgImage from "../../assets/background-main.jpg";
import logo from '../../assets/LibLife.png';

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      login(res.data.token);
      toast.success("Đăng nhập thành công!");
      navigate("/admin"); 
    } catch (err) {
      toast.error("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-repeat bg-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4">
            <img
              src={logo}
              alt="LibLife Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-3xl font-black text-white">LibLife</h2>
          <p className="text-white text-lg">Please log in to the system</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-white uppercase mb-2">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-white uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button className="w-full bg-[--highlight-color] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg">
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-lg text-white">
          Don't have an employee account yet?{" "}
          <Link to="/register" className="text-orange-500 font-bold underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
