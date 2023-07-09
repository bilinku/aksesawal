import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {HiOutlineUserGroup} from "react-icons/hi"
import {MdOutlineDashboard} from "react-icons/md"

const BottomNavigationAdmin = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("level");
    window.location.href = "/";
  };

  return (
    <nav className="fixed bottom-0 mx-auto  w-full max-w-xl bg-blue-500 text-white flex items-center justify-around py-2">
      <Link to="/dashboard" className="text-white">
        <HiOutlineUserGroup size={32} />
      </Link>
      <Link to="/dashboard/landing-image" className="text-white">
        <MdOutlineDashboard size={32} />
      </Link>
      <button onClick={handleLogout} className="text-white">
        <FiLogOut size={32} />
      </button>
    </nav>
  );
};

export default BottomNavigationAdmin;
