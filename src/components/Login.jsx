import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Kullanıcı adı veya parola hatalı");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);

      // Giriş başarılı, dashboard sayfasına yönlendir
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-6 text-center">
          <div className="bg-white p-2 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">HASTANE YÖNETİM</h1>
          <p className="text-indigo-200 mt-1">Hastane Yönetim Sistemi</p>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Giriş Yap</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Kullanıcı Adı"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Parola"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-medium transition ${
                isLoading 
                  ? "bg-indigo-400 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FiLogIn className="mr-2" />
              )}
              Giriş Yap
            </button>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
          </form>
        </div>
        
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t border-gray-100">
          © 2023 Hastane Yönetim Sistemi
        </div>
      </div>
    </div>
  );
};

export default Login;