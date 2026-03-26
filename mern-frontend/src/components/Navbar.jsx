import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background when scrolled
      setScrolled(currentScrollY > 20);
      
      // Hide/show on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled ? "py-3" : "py-5"}`}
    >
      {/* Glassmorphism background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled
            ? "bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-slate-900/20"
            : "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
        }`}
      />
      
      {/* Animated gradient border bottom */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/dashboard")}>
            {/* Animated logo icon */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-cyan-500/25">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            
            {/* Brand text */}
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:tracking-wide">
                MERN App
              </h1>
              <span className="text-xs text-slate-400 font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0">
                Dashboard
              </span>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user && (
              <>
                {/* User Profile Card */}
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 group">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
                  </div>
                  
                  {/* User name */}
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors duration-300">
                    {user.name}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="relative group overflow-hidden px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300"
                >
                  {/* Button background layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 transition-all duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  {/* Button content */}
                  <span className="relative flex items-center gap-2 text-white">
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </span>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full blur-xl bg-red-500/50 opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar at top */}
      <div
        className={`absolute top-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-300 ${
          scrolled ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
        style={{
          transition: "width 0.3s ease-out, opacity 0.3s ease-out"
        }}
      />
    </nav>
  );
};

export default Navbar;