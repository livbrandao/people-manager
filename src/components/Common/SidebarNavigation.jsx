import React from "react";
import SidebarIcons from "./SidebarIcons";

const SidebarNavigation = () => {
  return (
    <div className="relative flex flex-col h-full">
      <div className="relative h-full bg-skyBlue w-16 rounded-r-3xl overflow-hidden">
        {/* Container dos ícones */}
        <div className="pt-16 space-y-12">
          <div className="h-16 bg-white "></div>

          <SidebarIcons />
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
