import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { FaCog, FaUsers } from "react-icons/fa";
import  SidebarItem from  "./SidebarItem.tsx";
import MainWorkAreaComponent from "../mainWorkArea";
// import LeftSidebar from "./components/sidebar/index.tsx";
//import "../styles.css"; // Updated



const Sidebar = (props) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const handleToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
    if(id=='resource'){
const root = createRoot(document.getElementById("mainContentDiv"));
root.render(<MainWorkAreaComponent path={label} sendDataToLandingPage={sendDataToLandingPage} data={data} headerData={headerData}/>);
    }
  };
 
  return (
<div className="sidebar">
<SidebarItem
        icon={<FaCog />}
        label="Resource"
        isOpen={openDropdown === "resource"}
        onClick={() => handleToggle("resource")}
      />
<SidebarItem
        icon={<FaUsers />}
        label="Integrated Work Place Management"
        isOpen={openDropdown === "workplace"}
        onClick={() => handleToggle("workplace")}
      />
</div>
  );
};
 
export default Sidebar;