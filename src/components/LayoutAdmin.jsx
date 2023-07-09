import React from "react";
import BottomNavigationAdmin from "./BottomNavigationAdmin";

const Layout = ({ children }) => {
  
  return (
    <div className="bg-gray-white min-h-screen">
      <div className="max-w-xl min-h-screen mx-auto bg-gray-200 block ">
        {children}
        <BottomNavigationAdmin />
      </div>
    </div>
  );
};

export default Layout;
