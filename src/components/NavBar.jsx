import logo from "../assets/viit.png";
import { Menu } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

function NavBar({ onMenuToggle }) {

  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-[#003973] text-white font-poppins">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="h-10 w-10 rounded-full overflow-hidden bg-white flex items-center justify-center p-1">
            <img
              src={logo}
              alt="MOCK AP EAPCET Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="ml-3 text-sm sm:text-base eapcet-anim">EAPCET Code : VIVP</span>
        </div>
        
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li className="hover:text-gray-200 cursor-pointer"> <a href="#about" className="hover:text-gray-200 cursor-pointer">About</a> </li>
          <li className="hover:text-gray-200 cursor-pointer"> <a href="#accreditations" className="hover:text-gray-200 cursor-pointer">Accreditations</a> </li>
          <li className="hover:text-gray-200 cursor-pointer"> <a href="#stats" className="hover:text-gray-200 cursor-pointer">Statistics</a> </li>
          <li className="hover:text-gray-200 cursor-pointer"> <a href="#programs" className="hover:text-gray-200 cursor-pointer">Programs</a> </li>
          <li className="hover:text-gray-200 cursor-pointer"> <a href="#placements" className="hover:text-gray-200 cursor-pointer">Placements</a> </li>
          <li className="hover:text-gray-200 cursor-pointer"> <Link to="/login" className="hover:text-gray-200 cursor-pointer">Login</Link> </li>
        </ul>

        {/* Mobile Menu Button (visible only on small screens) */}
        <button
          onClick={onMenuToggle}
          className="md:hidden text-white hover:text-gray-200"
        >
          <Menu size={28} />
        </button>
      </div>
    </nav>
  );
}

export default NavBar;