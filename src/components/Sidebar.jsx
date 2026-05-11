import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTasks, FaUser, FaPlus, FaChevronLeft, FaChevronRight, FaSignOutAlt ,FaList} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function Sidebar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
 useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);  


  return (
    <div className={`fixed left-0 top-20 h-[calc(100vh-80px)] bg-white shadow-xl transition-all duration-300 z-20 flex flex-col ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-10 bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}
      </button>

      <nav className="flex-1 mt-10 flex flex-col gap-2 px-4">
      

        <Link to="/profile" className="flex items-center gap-4 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all">
          <FaUser size={20} />
          {isOpen && <span className="font-medium">Profile</span>}
        </Link>
          <Link to="/tasklist" className="flex items-center gap-4 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all">
          <FaList size={20} />
          {isOpen && <span className="font-medium">Task List</span>}
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-all"
        >
          <FaSignOutAlt size={20} />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}
export default Sidebar;
