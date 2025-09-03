import React,{ useState } from 'react';
import { createRoot } from "react-dom/client";
import MainWorkAreaComponent from "../mainWorkArea";
import {DownOutlined, UpOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const SidebarItem = ({
  
  imgSrc,
  imgClass,
  icon,
  label,
  isOpen,
  onClick,
  onIconClick,
  labelColor,
  iconClass,
  iconColor,
  mainMenuLabelClass,
  subMenuLabelClass,
  subMenus,
  onSubMenuClick, // Handler to change submenu label color
  onClickLabel, // New prop for handling label click
  customHeaderClass,
  customSidebarItemClass,
  sendDataToLandingPage,
  data,
  headerData
 

 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(null);
  const [activeMainMenu, setActiveMainMenu] = useState<string | null>(null); 
  const navigate = useNavigate();

  const handleMainLabelClick = (label) => {
    setActiveSubMenuIndex(null);
    // Create the root for rendering the content dynamically
    console.log('clicked main menu:', label)
    const root = createRoot(document.getElementById("mainContentDiv"));
    document.getElementById("digitalTwinId")&&document.getElementById("digitalTwinId").style.display="none";
    document.getElementById("chatbotId")&&document.getElementById("chatbotId").style.display="none";
    if(label!='Operations'){
    sendDataToLandingPage('menuClicked::'+label);
    sessionStorage.setItem('clickedPath', label);
    }
    //root.render(<MainWorkAreaComponent path={label} sendDataToLandingPage={sendDataToLandingPage} data={data} headerData={headerData}/>);
  };
  const handleSubMenuClick = (submenuLabel,index) => {
    setActiveSubMenuIndex(index); 
    onSubMenuClick(submenuLabel);
    console.log('clicked sub menu:', submenuLabel)

    if (submenuLabel === "Realtime Alarm") {
      navigate("/realtimeAlarm");
    }
    else{
      navigate("/");
    }
    // Create the root for rendering the content dynamically for submenu items
    const root = createRoot(document.getElementById("mainContentDiv"));
    document.getElementById("digitalTwinId").style.display="none";
    document.getElementById("chatbotId").style.display="none";
    
    sendDataToLandingPage('submenuClicked::'+submenuLabel);
    sessionStorage.setItem('clickedPath', submenuLabel);


    
//    root.render(<MainWorkAreaComponent path={submenuLabel} sendDataToLandingPage={sendDataToLandingPage} data={data} headerData={headerData}/>);
  };
  const handleToggle = () => {
    setIsDropdownOpen((prev) => !prev);  // Toggle dropdown state
    onClick();  // Call onClick function passed via props
    onIconClick();  // Call onIconClick for icon color change
  };

  const getMainMenuLabelColor = (menuLabel: string) => {
    return activeMainMenu === menuLabel ? 'brightColor' : labelColor; // Replace 'brightColor' with your desired bright color
  };

  return (
    <div className={`sidebar-item ${customSidebarItemClass}`}> 
       <div className={`sidebar-item-header ${customHeaderClass}`}>
        {/* Image will no longer trigger image change */}
        <div className="img-container">
        <img
          src={imgSrc}
          alt={label}
          className={imgClass}
        />
        </div>
        {/* Label will no longer trigger image or icon color change */}
        <span
          className={mainMenuLabelClass}
          style={{ color: getMainMenuLabelColor(label) }} 
          onClick={() => handleMainLabelClick(label)} // Dynamically apply the label color
        >
          {label}
        </span>
        {/* Only the icon click will trigger image change, icon color change, and open/close */}
         <span onClick={() => { onIconClick(); onClick(); handleToggle(label)}}> 
        {icon} 
        </span>
        
          {/* <span onClick={handleToggle}>
          {isDropdownOpen ? (
            <UpOutlined style={{ color: iconColor, position: 'relative', top: '-10px', left: '54px', fontSize: '19px' }} />
          ) : (
            <DownOutlined style={{ color: iconColor, position: 'relative', top: '-10px', left: '54px', fontSize: '19px' }} />
          )}
          
        </span> */}
      </div>
 
      {isOpen && (
        <div className="submenu">
          {subMenus.map((subMenu, index) => (
            <div
              key={index}
           className={`submenu-item submenu-item-${index} ${activeSubMenuIndex === index ? 'active' : ''} ${subMenu.customSubMenuClass || ''}`}
           onClick={() => handleSubMenuClick(subMenu.label, index)}
            >
              <img
                src={subMenu.imgSrc}
                alt={subMenu.label}
                className={subMenu.imgClass}
              />
              <span className={subMenu.subMenuLabelClass} style={{ color: subMenu.color }}>
                {subMenu.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
export default SidebarItem;
 