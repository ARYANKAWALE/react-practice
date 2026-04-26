import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-posts", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 h-20 flex justify-evenly items-center" style={{
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}>
      <Container>
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen(false)}>
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#7c3aed] to-[#ae7aff] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#ae7aff]/20 group-hover:shadow-[#ae7aff]/40 transition-all duration-300 group-hover:scale-105">
              B
            </div>
            <span className="text-lg font-bold text-white/90 group-hover:text-white transition-colors hidden sm:block">
              BlogApp
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1 gap-10 text-20">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-[10px] hover:bg-white/5 transition-all duration-200 cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-slate-400 rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-slate-400 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-slate-400 rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => { navigate(item.slug); setMobileOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-slate-400 hover:text-white rounded-[10px] hover:bg-white/5 transition-all duration-200 cursor-pointer"
                >
                  {item.name}
                </button>
              ) : null,
            )}
            {authStatus && (
              <div onClick={() => setMobileOpen(false)}>
                <LogoutBtn />
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
