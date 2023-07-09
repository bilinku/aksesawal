import React from "react";
import BottomNavigation from "./BottomNavigation";

const Layout = ({ children }) => {
  const role = localStorage.getItem("level")

  if(role === "admin"){
    window.location.href = "/dashboard"
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-xl min-h-screen mx-auto bg-white block ">
        {children}
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Layout;
