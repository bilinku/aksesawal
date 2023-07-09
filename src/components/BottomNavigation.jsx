import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiCartAdd } from "react-icons/bi";
import { AiOutlineHome, AiOutlineLink } from "react-icons/ai";
import { Link } from "react-router-dom";

const BottomNavigation = () => {

  return (
    <nav className="fixed bottom-0 mx-auto  w-full max-w-xl bg-green-500 text-white flex items-center justify-around py-2">
      <Link to="/home" className="text-white">
        <AiOutlineHome size={32} />
      </Link>
      <Link to="/product/add" className="text-white">
        <BiCartAdd size={32} />
      </Link>
      <Link to="/link" className="text-white">
        <AiOutlineLink size={32} />
      </Link>
      <Link to="/profile" className="text-white">
        <MdOutlineAccountCircle size={32} />
      </Link>
    </nav>
  );
};

export default BottomNavigation;
