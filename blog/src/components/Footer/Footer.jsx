import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-white/5 mt-auto"
      style={{
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#7c3aed] to-[#ae7aff] flex items-center justify-center text-white font-bold text-sm">
                B
              </div>
              <span className="text-lg font-bold text-white/90">BlogApp</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              A modern blogging platform built with React & Appwrite. Share your
              stories with the world.
            </p>
            <p className="text-xs text-slate-600 mt-6">
              &copy; {new Date().getFullYear()} BlogApp. All Rights Reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#ae7aff] mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#ae7aff] mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              {["Account", "Help", "Contact Us", "Customer Support"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Legals */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#ae7aff] mb-4">
              Legals
            </h3>
            <ul className="space-y-2.5">
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
