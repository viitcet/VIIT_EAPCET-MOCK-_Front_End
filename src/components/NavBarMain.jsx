import logo from "../assets/viit.png";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function NavBarMain() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#003973] text-white font-poppins">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-white flex items-center justify-center p-1">
                <img
                  src={logo}
                  alt="MOCK AP EAPCET Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="leading-tight">
                <div className="text-base font-semibold">VIGNAN's</div>
                <div className="text-xs text-white/80">
                  Institute of Information Technology
                </div>
              </div>
            </div>
          </div> 

          {/* center: main title */}
          <div className="text-center">
            <div className="text-lg md:text-2xl lg:text-3xl font-bold">
              MOCK AP EAPCET Portal
            </div>
          </div>

          {/* right: profile icon with dropdown */}
          <div className="flex justify-end relative" ref={dropdownRef}>
            <button
              aria-label="profile"
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/5"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <User className="h-5 w-5 text-white/90" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-gradient-to-b from-blue-500 to-purple-600 rounded-lg shadow-xl z-10 p-3 border border-blue-300">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBarMain;
