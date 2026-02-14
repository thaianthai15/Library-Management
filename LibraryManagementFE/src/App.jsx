import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/user/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Sidebar from "./components/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import BookList from "./pages/admin/Books/BookList";
import BorrowReturn from "./pages/admin/Transactions/BorrowReturn";
import MemberList from "./pages/admin/Members/MemberList";
import Statistics from "./pages/admin/Reports/Statistics";
import UserManagement from "./pages/admin/Users/UserManagement";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <div className="flex min-h-screen bg-gray-50">
                  <Sidebar />

                  <div className="flex-1">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      
                      <Route path="/books" element={<BookList />} />
                      
                      <Route path="/users" element={<UserManagement />} />
                      
                      <Route path="/transactions" element={<BorrowReturn />} />
                      
                      <Route path="/members" element={<MemberList />} />
                      
                      <Route path="/statistics" element={<Statistics />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;