import React from "react";
import SidebarNavigation from "./SidebarNavigation";

function Layout({ children }) {
  return (
    <div className="flex h-screen ">
      <SidebarNavigation />

      <div className="flex-1 ">{children}</div>
    </div>
  );
}

export default Layout;
