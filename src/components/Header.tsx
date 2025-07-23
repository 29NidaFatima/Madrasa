import React from "react";
import logo from "../assets/logo.png";

interface HeaderProps {
  location: string;
  error: string;
}

const Header: React.FC<HeaderProps> = ({ location, error }) => {
  return (
    <header className="bg-white w-full flex items-center justify-between px-4 py-3 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="Madrasa Logo"
          className="h-10 w-auto max-w-[120px] sm:h-12 md:h-14"
        />
      </div>

      {/* Location Info */}
      <div className="text-right leading-tight">
        <button className="text-sm font-semibold text-gray-700">
          📍 {error || location}
        </button>
        <p className="text-[13px] text-purple-700">
          Get accurate namaz time
        </p>
      </div>
    </header>
  );
};

export default Header;
