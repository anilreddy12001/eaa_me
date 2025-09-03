import { DownOutlined,CaretDownFilled} from '@ant-design/icons';
import React, { useState } from "react";
import "./index.css";
import SidebarItem from "./SidebarItem.tsx";
import { Tooltip } from 'antd';
import MainWorkAreaComponent from "../mainWorkArea";
// Import images (light and dark)
import IntegratedLight from "../../images/IntegratedWork-light.svg";
import IntegratedDark from "../../images/IntegratedWork-dark.svg";
import operationLight from "../../images/Operations-light.svg";
import operationDark from "../../images/Operations-dark.svg"
import ResourceDark from "../../images/Resource-dark.svg";
import ResourceLight from "../../images/Resource-light.svg";
import aiAnalyticsLight from "../../images/AIAnalysis-light.svg";
import aianalyticsDark from "../../images/AIAnalysis-dark.svg";
 import Energy from  "../../images/energy-sub1.svg";
 import Water from "../../images/water-sub1.svg";
 import Waste from "../../images/waste-sub1.svg";
 import space from  "../../images/space.svg";
 import parking from "../../images/parking1.svg";
 import aqi from "../../images/aqi.svg";
 import occupancy from "../../images/occupancy-sub1.png";
 import dynamic from "../../images/DynamicControl (2).svg"
 import predictiveAnalytics from  "../../images/PredictiveAnlytics1.svg";
 import Aiinference from "../../images/AIinference1.svg";
 import Aisimulation from "../../images/AISimulation1.svg";
 import ppm from "../../images/PPM1.svg";
 import realtimealarm from "../../images/Realtimealarm(2).svg";
 import maintainenceLight from "../../images/Maintenance-light.svg";
 import maintainenceDark from "../../images/Maintenance-dark.svg"
 import safetyLight from "../../images/SafetynSecurity-light.svg";
 import safetyDark from "../../images/SafetynSecurity-dark.svg"
 import benchLight from "../../images/BenchMarkingKPI-light.svg";
 import benchDark from "../../images/BenchMarkingKPI.svg"
 import sustainLight from "../../images/SustainabilityKPI-light.svg";
 import sustainDark from "../../images/SustainabilityKPI-dark.svg";
 import workfowLight from "../../images/WorkFlowManagement-light.svg";
 import workflowDark from "../../images/WorkFlowManagement-dark.svg";
 import resourceforecastingLight from "../../images/ResourceForecasting-light.svg";
 import resourceforcastingDark from "../../images/ResourceForecasting-dark.svg";
 import ecmLight from "../../images/ECMMeasures-light.svg";
 import ecmDark from "../../images/ECMMeasures-dark.svg";
 import reportLight from "../../images/Reports-light.svg";
 import reportDark from "../../images/Reports-dark.svg";
 import fdd  from "../../images/fdd.svg";
 import mtbf from "../../images/MTBF.svg";
 import mttr from "../../images/MTTR.svg";
 import rul from "../../images/rul.svg";
 import firealarm  from "../../images/FireAlarmSystem.svg";
 import firefight from "../../images/FireFighting.svg";
 import elivator from "../../images/Elevator.svg";
 import accesscontrol from "../../images/Accesscontrolsystem.svg";
 import epi from "../../images/EPIEUIKwhPerson.svg";
 import waterperson  from "../../images/WaterPerson.svg";
 import ikw from "../../images/IkwTRPUE.svg";
 import renewableenergy from "../../images/Renewableenergy (2).svg";
 import scope1 from "../../images/scope1.svg";
 import scope2 from "../../images/scope2.svg";
 import scope3 from "../../images/scope3.svg";
 import renewablepercentage from "../../images/renewablepercentage-sub.svg";
 import taskmanagement from "../../images/TaskManagement (2).svg";
 import assetmgmt from "../../images/AssetsManagement.svg";
 import mrv from "../../images/MRV-submenu.svg";
 import issues from "../../images/Issues with Recommendation.svg";
 import saving from "../../images/Saving Summary.svg";
 import energyncost from "../../images/EnergynCost (2).svg";
 import ecmreport from "../../images/ECM Reports.svg";
 import kpi from "../../images/KPI Reports.svg";
 import operationalreport from "../../images/Operational Reports.svg";
 import dropdownicon from "../../images/lArrow.png";
 import cost from "../../images/cost.svg";

 
const Sidebar = (props) => {
  // const [openDropdown, setOpenDropdown] = useState(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
 
  // State to track light/dark image for each item
  const [resourceImg, setResourceImg] = useState(ResourceDark);
  // const[dropdownImg,setGropdownImg]=useState(dropdownicon);
  const [IntegratedImg, setIntegratedImg] = useState(IntegratedDark);
  const [maintainenceImg,setmaintainenceImg]=useState(maintainenceDark);
  const [safetyImg,setsafetyImg]=useState(safetyDark);
  const [benchImg,setbenchImg]=useState(benchDark);
  const [sustainImg,setsustainImg]=useState(sustainDark);
  const [workflowImg,setworkflowImg]=useState(workflowDark);
  const [ecmImg,setecmImg]=useState(ecmDark);
  const [reportImg,setreportImg]=useState(reportDark);
  const [resourceforecastingImg,setresourceforecastingImg]=useState(resourceforcastingDark);
  

  const[energyImg,setEnergyImg]=useState(Energy);
  const[waterImg,setWaterImg]=useState(Water);
  const[wasteImg,setWasteImg]=useState(Waste);
  const[spaceImg,setSpaceImg]=useState(space);
  const[dynamicImg,setDynamicImg]=useState(dynamic);

  const [fddImage,setfddImg]=useState(fdd);
  const[mtbfImage,setmtbfImage]=useState(mtbf);
  const [mttrImage,setMttrImage]=useState(mttr);
  const [rulImage,setRulImage]=useState(rul);
  const[aqiImg,setAqiImg]=useState(aqi);
    const[parkingImg,setParkingImg]=useState(parking);
    const[realtimeImg,setRealtimeImg]=useState(realtimealarm);
    const[occupancyImg,setOccupancyImg]=useState(occupancy);
    const[AiinferenceImg,setAiinferenceImg]=useState(Aiinference);
    const [AisimulationImg,setAisimulationImg]=useState(Aisimulation);
    const [predictiveImg,setpredictiveImg]=useState(predictiveAnalytics);
    const[ppmImg,setppmImg]=useState(ppm);
    const[fireImg,setFireImg]=useState(firealarm);
    const[firefightImg,setFirefightImg]=useState(firefight);
    const[elivatorImg,setElevatorImg]=useState(elivator);
    const [accesscontrolImg,setAccesscontrolImg]=useState(accesscontrol);
    const[epiImg,setEpiImg]=useState(epi);
    const[waterpersonImg,setWaterperperson]=useState(waterperson);
    const[ikwImg,setIkwImg]=useState(ikw);
    const[renewableenergyImg,setRenewableenergy]=useState(renewableenergy);
    const[scope1Img,setScope1Img]=useState(scope1);
    const[scope2Img,setscope2Img]=useState(scope2);
    const[scope3Img,setScope3]=useState(scope3);
    const[renewablepercentageImg,setRenewablepercentageImg]=useState(renewablepercentage);
    const[taskmanagementImg,setTaskmanagementImg]=useState(taskmanagement);
    const[assetmgmtImg,setAssetmgmt]=useState(assetmgmt);
    const[mrvImg,setMrvImg]=useState(mrv);
    const[issuesImg,setIssuesImg]=useState(issues);
    const[savingImg,setSavingImg]=useState(saving);
    const[energyncostImg,setEnergyncostImg]=useState(energyncost);
    const[ecmreportImg,setecmreportImg]=useState(ecmreport);
    const [kpiImg,setkpiImg]=useState(kpi);
    const[costImg,setCostImg]=useState(cost);
    const[operationalreportImg,setoperationalreportImg]=useState(operationalreport);
    
    

  const [workplaceImg, setWorkplaceImg] = useState(IntegratedLight);
  const [operationsImg, setOperationsImg] = useState(operationDark);
  const[aianalyticsImg,setAnalyticsImg]=useState(aianalyticsDark);

 
  // State to track the color of "Resource" label and dropdown icon
  const [resourceLabelColor, setResourceLabelColor] = useState("white");
  const [resourceIconColor, setResourceIconColor] = useState("dark");
  const [integratedLabelColor, setIntegratedLabelColor] = useState("white");
  const [integratedIconColor, setIntegratedIconColor] = useState("dark");
  const[operationIconColor,setOperationIconColor]=useState("dark");
  const [operationLabelColor, setOperationLabelColor] = useState("white");
  const[aianalyticsIconColor,setAianalyticsIconColor]=useState("dark");
  const [aianalyticsLabelColor, setAianalyticsLabelColor] = useState("white");
  const[maintainenceIconColor,setmaintainenceIconColor]=useState("dark");
  const [maintainenceLabelColor, setmaintainenceLabelColor] = useState("white");
  const[safetyIconColor,setsafetyIconColor]=useState("dark");
  const [safetyLabelColor, setsafetyLabelColor] = useState("white");
  const[benchIconColor,setbenchIconColor]=useState("dark");
  const [benchLabelColor, setbenchLabelColor] = useState("white");
  const[sustainIconColor,setsustainIconColor]=useState("dark");
  const [sustainLabelColor, setsustainLabelColor] = useState("white");
  const[workflowIconColor,setworkflowIconColor]=useState("dark");
  const [workflowLabelColor, setworkflowLabelColor] = useState("white");
  
  const[resourceforecastingIconColor,setresourceforecastingIconColor]=useState("dark");
  const[resourceforecastingLabelColor, setresourceforecastingLabelColor] = useState("white");
  const[ecmIconColor,setecmIconColor]=useState("dark");
  const [ecmLabelColor, setecmLabelColor] = useState("white");
  const[reportIconColor,setreportIconColor]=useState("dark");
  const [reportLabelColor, setreportLabelColor] = useState("white");
  
  // State for submenu label colors (light by default)
  const [resourceSubMenuColors, setResourceSubMenuColors] = useState({
    Energy: "light",
    Water: "light",
    Waste: "light",
  });
  const [dropdownColors, setDropdownColors] = useState({
    resource: "#7e7f7f",  // Default color for resource
    energy: "#7e7f7f",    // Default color for energy
    water: "#7e7f7f",     // Default color for water
    waste: "#7e7f7f",     // Default color for waste
  });
 
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState<number | null>(null);
  const handleToggle = (dropdownName: string) => {

    if (openDropdown === dropdownName) {
      setOpenDropdown(null);
       // Close the dropdown if it's already open
       setActiveSubMenuIndex(null);
    } else {
      setOpenDropdown(dropdownName); // Open the clicked dropdown
      setActiveSubMenuIndex(null);
      // Reset the other dropdown states
      if (dropdownName !== "resource") {
        setResourceImg(ResourceDark);
        setResourceIconColor("dark");
        setResourceLabelColor("white");
      }
      if (dropdownName !== "integrated") {
        setIntegratedImg(IntegratedDark);
        setIntegratedIconColor("dark");
        setIntegratedLabelColor("white");
      }
      if (dropdownName !== "operations") {
        setOperationsImg(operationDark);
        setOperationIconColor("dark");
        setOperationLabelColor("white");
      }
      if (dropdownName !== "Aianalytics") {
        setAnalyticsImg (aianalyticsDark);
        setAianalyticsIconColor("dark");
        setAianalyticsLabelColor("white");
      }
      if (dropdownName !== "CMMS") {
        setmaintainenceImg(maintainenceDark);
        setmaintainenceIconColor("dark");
        setmaintainenceLabelColor("white");
      }
      if (dropdownName !== "Safety") {
        setsafetyImg(safetyDark);
        setsafetyIconColor("dark");
        setsafetyLabelColor("white");
      }
      if (dropdownName !== "Bench") {
        setbenchImg(benchDark);
        setbenchIconColor("dark");
        setbenchLabelColor("white");
      }
      if (dropdownName !== "Sustainability") {
        setsustainImg(sustainDark);
        setsustainIconColor("dark");
        setsustainLabelColor("white");
      }
      if (dropdownName !== "Workflow") {
        setworkflowImg(workflowDark);
        setworkflowIconColor("dark");
        setworkflowLabelColor("white");
      }
      if (dropdownName !== "resourceforcasting") {
        setresourceforecastingImg(resourceforcastingDark);
        setresourceforecastingIconColor("dark");
        setresourceforecastingLabelColor("white");
      }
      if (dropdownName !== "ECM") {
        setecmImg(ecmDark);
        setecmIconColor("dark");
        setecmLabelColor("white");
      }
      if (dropdownName !== "Reports") {
        setreportImg(reportDark);
        setreportIconColor("dark");
        setreportLabelColor("white");
      }
    }
  };
  // const handleToggle = (dropdown: string) => {
  //   // Check if the clicked dropdown is already open
  //   const newOpenDropdown = openDropdown === dropdown ? null : dropdown;
  
  const handleLabelClick = (label) => {
    setResourceImg(resourceImg === ResourceLight ? ResourceDark : ResourceLight);
        setResourceIconColor(resourceIconColor === "dark" ? "light" : "dark");
        setResourceLabelColor(resourceLabelColor === "white" ? "#00ffff" : "white"); 
  


    const root = createRoot(document.getElementById("mainContentDiv"));
    document.getElementById("digitalTwinId").style.display="none";
    document.getElementById("chatbotId").style.display="none";
    sessionStorage.setItem('clickedPath', label);
//props.sendDatatoLandingPage('submenuClicked');
    // Render page based on the clicked label
    //root.render(<MainWorkAreaComponent path={label} sendDataToLandingPage={props.sendDataToLandingPage} data={props.data}/>);
  };


  
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const changeSubMenuColor = (subMenu) => {
    setActiveSubMenu(subMenu);
  };
 
  // Change image, icon color, and label color on dropdown icon click
  const changeResourceImgAndIconColor = () => {
    setResourceImg(resourceImg === ResourceDark ? ResourceDark : ResourceDark);
    setResourceIconColor(resourceIconColor === "dark" ? "light" : "dark");
    setResourceLabelColor(resourceLabelColor === "#00ffff" ? "white" : "#00ffff"); // Toggle label color
  };
  const changeIntegratedImgAndIconColor=()=>{
    setIntegratedImg(IntegratedImg===IntegratedDark?IntegratedDark:IntegratedDark);
    setIntegratedIconColor(integratedIconColor === "dark" ? "light" : "dark");
    setIntegratedLabelColor(integratedLabelColor === "#00ffff" ? "white" : "#00ffff"); 
  }
  const changeoperationImgAndIconColor=()=>{
    setOperationsImg(operationsImg===operationDark?operationDark:operationDark);
    setOperationIconColor(operationIconColor === "dark" ? "light" : "dark");
    setOperationLabelColor(operationLabelColor === "#00ffff" ? "white" : "#00ffff"); 
  // Change submenu label color on submenu label click
  }
  const changeaianalyticsImgAndIconColor=()=>{
    setAnalyticsImg  (aianalyticsImg===aianalyticsDark?aianalyticsDark:aianalyticsDark);
    setAianalyticsIconColor(aianalyticsIconColor === "dark" ? "light" : "dark");
    setAianalyticsLabelColor(aianalyticsLabelColor === "#00ffff" ? "white" : "#00ffff"); 
  // Change submenu label color on submenu label click
  }

const changemaintainenceImgAndIconColor=()=>{
setmaintainenceImg(maintainenceImg===maintainenceDark?maintainenceDark:maintainenceDark);
setmaintainenceIconColor(maintainenceIconColor === "dark" ? "light" : "dark");
setmaintainenceLabelColor(maintainenceLabelColor==="#00ffff" ? "white" : "#00ffff");
  }
  const changesafetyImgAndIconColor=()=>{
    setsafetyImg(safetyImg===safetyDark?safetyDark:safetyDark);
    setsafetyIconColor(safetyIconColor === "dark" ? "light" : "dark");
    setsafetyLabelColor(safetyLabelColor==="#00ffff" ? "white" : "#00ffff");
      }
         const changebenchImgAndIconColor=()=>{
        setbenchImg(benchImg===benchDark?benchDark:benchDark);
        setbenchIconColor(benchIconColor === "dark" ? "light" : "dark");
        setbenchLabelColor(benchLabelColor==="#00ffff" ? "white" : "#00ffff");
          }
          const changesustainImgAndIconColor=()=>{
            setsustainImg(sustainImg===sustainDark?sustainDark:sustainDark);
            setsustainIconColor(sustainIconColor === "dark" ? "light" : "dark");
            setsustainLabelColor(sustainLabelColor==="#00ffff" ? "white" : "#00ffff");
              }
        
              const changeworkflowImgAndIconColor=()=>{
                setworkflowImg(workflowImg===workflowDark?workflowDark:workflowDark);
                setworkflowIconColor(workflowIconColor === "dark" ? "light" : "dark");
                setworkflowLabelColor(workflowLabelColor==="#00ffff" ? "white" : "#00ffff");
                  }
   const changeresourceforecastingImgAndIconColor=()=>{
   setresourceforecastingImg(resourceforecastingImg===resourceforcastingDark?resourceforcastingDark:resourceforcastingDark);
    setresourceforecastingIconColor(resourceforecastingIconColor === "dark" ? "light" : "dark");
  setresourceforecastingLabelColor(resourceforecastingLabelColor==="#00ffff" ? "white" : "#00ffff");
             }
             const changeecmImgAndIconColor=()=>{
              setecmImg(ecmImg===ecmDark?ecmDark:ecmDark);
               setecmIconColor(ecmIconColor === "dark" ? "light" : "dark");
             setecmLabelColor(ecmLabelColor==="#00ffff" ? "white" : "#00ffff");
                        }
                        const changereportImgAndIconColor=()=>{
                          setreportImg(reportImg===reportDark?reportDark:reportDark);
                           setreportIconColor(reportIconColor === "dark" ? "light" : "dark");
                         setreportLabelColor(reportLabelColor==="#00ffff" ? "white" : "#00ffff");
                                    }                     

  return (
    <div className="sidebar" style={{ width: '16vw', height: '90vh' }}>
     
      <SidebarItem
sendDataToLandingPage={props.sendDataToLandingPage}
data={props.data}
headerData={props.headerData}
        imgSrc={resourceImg}
        imgClass="img-resource"
        icon={<DownOutlined
          style={{
             color: resourceIconColor === "light" ? "#00ffff" : "white",
            // color: dropdownColors.resource === "#ff9800" ? "#000" : "#7e7f7f", // Change icon color based on open state
            position: 'relative',
            top: '-9px',
            left: '54px',
            fontSize: '16px',
            transform: openDropdown === "resource" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
          />
        }
        // icon={
        //   <img
        //     src={dropdownicon}  // Use your image source here
        //     alt="dropdown icon"
        //     style={{
        //            color: resourceIconColor === "light" ? "#ccc" : "#7e7f7f",
        //           // color: dropdownColors.resource === "#ff9800" ? "#000" : "#7e7f7f", // Change icon color based on open state
        //           position: 'relative',
        //           top: '-10px',
        //           left: '54px',
        //           fontSize: '16px',
        //           transform: openDropdown === "resource" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
        //           transition: "transform 0.3s ease" // Smooth transition for the icon rotation
        //         }}
        //   />
        // }
      
      
      
       iconClass="resource-icon"
        label="Resource"
        isOpen={openDropdown === "resource"}
        onClick={() => handleToggle("resource")}
        onIconClick={changeResourceImgAndIconColor}  // Change image, icon color, and label color only on dropdown icon click
        labelColor={resourceLabelColor} // Pass label color state for "Resource"
        iconColor={dropdownColors.resource}
        // iconColor={resourceIconColor} // Pass icon color state
        mainMenuLabelClass="resource-label"  // Apply specific class for "Resource" label
        // subMenuLabelClass="energy-label"  // Add class for submenu label
        subMenus={[
          { 
            imgSrc: energyImg, 
            imgClass: "img-energy", 
            label: "Energy", 
            color: activeSubMenu === "Energy" ? "white" : "white",
            // color: resourceSubMenuColors.Energy, 
            subMenuLabelClass: "energy-label",
            customSubMenuClass: "energy-submenu-class" 
       

           
            
          },
          { 
            imgSrc: waterImg, 
            imgClass: "img-water", 
            label: "Water", 
            color: activeSubMenu === "Water" ? "white" : "white",
            // color: dropdownColors.water, 
            // color: resourceSubMenuColors.Water, 
            subMenuLabelClass: "water-label", // Individual class
            customSubMenuClass: "water-submenu-class" 
       

            
          },
          { 
            imgSrc: wasteImg, 
            imgClass: "img-waste", 
            label: "Waste", 
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "waste-label", // Individual class
            customSubMenuClass: "waste-submenu-class" 
          },
        ]}
        // onSubMenuClick={changeSubMenuColor}
        onSubMenuClick={changeSubMenuColor} 
        onClickLabel={handleLabelClick}
        customHeaderClass="resource-header"
         customSidebarItemClass="resource-sidebar-item"
        
         
       
      
      />

<SidebarItem
sendDataToLandingPage={props.sendDataToLandingPage}
data={props.data}
headerData={props.headerData}
        imgSrc={IntegratedImg}
        imgClass="img-integrated"
        icon={ <DownOutlined
          style={{
            color: integratedIconColor === "light" ? "white" : "white",
            position: 'relative',
            top: '-12px',
            left: '22px',
            fontSize: '16px',
            transform: openDropdown === "integrated" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
        />}
       iconClass="integrated-icon"
 label="Integrated Workplace Management"
      //  label={
      //   <Tooltip title="Integrated Workplace Management ">Integrated WPM </Tooltip>
      // }
        isOpen={openDropdown === "integrated"}
        onClick={() => handleToggle("integrated")}
        onIconClick={changeIntegratedImgAndIconColor}  // Change image, icon color, and label color only on dropdown icon click
        labelColor={integratedLabelColor} // Pass label color state for "Resource"
        iconColor={integratedIconColor} // Pass icon color state
        mainMenuLabelClass="integrated-label"  // Apply specific class for "Resource" label
        // subMenuLabelClass="energy-label"  // Add class for submenu label
        subMenus={[
          { 
            imgSrc: spaceImg, 
            imgClass: "img-space", 
            label: "Space", 
            color: activeSubMenu === "Space" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Space-label", // Individual class
            customSubMenuClass: "Space-submenu-class" 
          },
          { 
            imgSrc: parkingImg, 
            imgClass: "img-parking", 
            label: "Parking" , 
            color: activeSubMenu === "Parking" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Parking-label", // Individual class
            customSubMenuClass: "parking-submenu-class" 
          },
          { 
            imgSrc: aqiImg, 
            imgClass: "img-AQI", 
            label: (<Tooltip title="Air Quality Index">AQI </Tooltip>),
            color: activeSubMenu === "AQI" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "AQI-label", // Individual class
            customSubMenuClass: "AQI-submenu-class" 
          },
          { 
            imgSrc: occupancyImg, 
            imgClass: "img-Occupancy", 
            label: "Occupancy" ,
            color: activeSubMenu === "Occupancy" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Occupancy-label", // Individual class
            customSubMenuClass: "Occupancy-submenu-class" 
          },
        ]}
        onSubMenuClick={changeSubMenuColor}
        customHeaderClass="integrated-header"
         customSidebarItemClass="integrated-sidebar-item"
      
      />

<SidebarItem
sendDataToLandingPage={props.sendDataToLandingPage}
data={props.data}
headerData={props.headerData}
        imgSrc={operationsImg}
        imgClass="img-operations"
        icon={ <DownOutlined
          style={{
            color: operationIconColor === "light" ? "#00ffff" : "white",
            position: 'relative',
            top: '-3px',
            left: '51px',
            fontSize: '16px',
            transform: openDropdown === "operations" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
        />}
        iconClass="operations-icon"
        label="Operations"
        isOpen={openDropdown === "operations"}
        onClick={() => handleToggle("operations")}
        onIconClick={changeoperationImgAndIconColor}
        labelColor={operationLabelColor}
        iconColor={operationIconColor}
        mainMenuLabelClass="operations-label"
        subMenus={[
          { 
            imgSrc: realtimeImg, 
            imgClass: "img-Realtime", 
            label: "Realtime Alarm",
            color: activeSubMenu === "Realtime Alarm" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Realtime-label", // Individual class
            customSubMenuClass: "Realtime-submenu-class" 
          },
          { 
            imgSrc: dynamicImg, 
            imgClass: "img-Dynamic", 
            label: "Dynamic Control" ,
            color: activeSubMenu === "Dynamic Contro" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Dynamic-label", // Individual class
            customSubMenuClass: "Cost-submenu-class" 
          },
        ]}
        onSubMenuClick={changeSubMenuColor}
        onClickLabel={handleLabelClick}
        customHeaderClass="operation-header"
         customSidebarItemClass="operations-sidebar-item"
      />

<SidebarItem
sendDataToLandingPage={props.sendDataToLandingPage}
data={props.data}
headerData={props.headerData}
        imgSrc={aianalyticsImg}
        imgClass="img-Aianalytics"
        icon={ <DownOutlined
          style={{
            color: aianalyticsIconColor === "light" ? "#00ffff" : "white",
            position: 'relative',
            top: '-9px',
            left: '48px',
            fontSize: '16px',
            transform: openDropdown === "Aianalytics" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
        />}
        iconClass="operations-icon"
        label="AI Analytics"
        isOpen={openDropdown === "Aianalytics"}
        onClick={() => handleToggle("Aianalytics")}
        onIconClick={changeaianalyticsImgAndIconColor}
        labelColor={aianalyticsLabelColor}
        iconColor={aianalyticsIconColor}
        mainMenuLabelClass="Aianalytics-label"
        subMenus={[
          { 
            imgSrc: predictiveImg, 
            imgClass: "img-Predictive", 
            label: "Predictive Analytics" ,
            color: activeSubMenu === "Predictive Analytics" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Predictive-label", // Individual class
            customSubMenuClass: "Predictive-submenu-class" 
          },
          { 
            imgSrc: AisimulationImg, 
            imgClass: "img-AISimulation", 
            label: "AI Simulation" ,
            color: activeSubMenu === "AI Simulation" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "AISimulation-label", // Individual class
            customSubMenuClass: "AISimulation-submenu-class" 
          },
          { 
            imgSrc: AiinferenceImg, 
            imgClass: "img-AIInference", 
            label:"AI Inference",
            color: activeSubMenu === "AI Inference" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "AIInference-label", // Individual class
            customSubMenuClass: "Cost-submenu-class" 
          },
        ]}
        onSubMenuClick={changeSubMenuColor}
        onClickLabel={handleLabelClick}
        customHeaderClass="aianalytics-header"
         customSidebarItemClass="aianalytics-sidebar-item"
      />

<SidebarItem
sendDataToLandingPage={props.sendDataToLandingPage}
data={props.data}
headerData={props.headerData}
        imgSrc={maintainenceImg}
        imgClass="img-CMMS"
        icon={ <DownOutlined
          style={{
            color: maintainenceIconColor === "light" ? "#00ffff" : "white",
            position: 'relative',
            top: '-7px',
            left: '60px',
            fontSize: '16px',
            transform: openDropdown === "CMMS" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
        />}
        iconClass="CMMS-icon"
        label={
          <Tooltip title="Compuertized Maintanence Management system">CMMS </Tooltip>
        }
        isOpen={openDropdown === "CMMS"}
        onClick={() => handleToggle("CMMS")}
        onIconClick={changemaintainenceImgAndIconColor}
        labelColor={maintainenceLabelColor}
        iconColor={maintainenceIconColor}
        mainMenuLabelClass="CMMS-label"
        subMenus={[
          { 
            imgSrc: ppmImg, 
            imgClass: "img-PPM", 
            label: (<Tooltip title="Planned Preventive Maintencance"> PPM</Tooltip>) ,
            color: activeSubMenu === "PPM" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "PPM-label", // Individual class
            customSubMenuClass: "PPM-submenu-class" 
          },
          { 
            imgSrc: fddImage, 
            imgClass: "img-FDD", 
            label: (<Tooltip title="Fault Detection and Diagnostics"> FDD</Tooltip>)  ,
            color: activeSubMenu === "FDD" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "FDD-label", // Individual class
            customSubMenuClass: "FDD-submenu-class" 
          },
          { 
            imgSrc: mtbfImage, 
            imgClass: "img-MTBF", 
            label: (<Tooltip title="Mean Time between failure "> MTBF</Tooltip>) ,
            color: activeSubMenu === "MTBF" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "MTBF-label", // Individual class
            customSubMenuClass: "MTBF-submenu-class" 
          },
          { 
            imgSrc: mttrImage, 
            imgClass: "img-MTTR", 
            label: (<Tooltip title="Mean Time to Repair"> MTTR</Tooltip>) ,
            color: activeSubMenu === "MTTR" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "MTTR-label", // Individual class
            customSubMenuClass: "MTTR-submenu-class" 
          },
          { 
            imgSrc: rulImage, 
            imgClass: "img-RUL", 
            label: (<Tooltip title="Remaining Useful Life"> RUL</Tooltip>) ,
            color: activeSubMenu === "RUL" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "RUL-label", // Individual class
            customSubMenuClass: "Cost-submenu-class" 
          },
        ]}
        onSubMenuClick={changeSubMenuColor}
        onClickLabel={handleLabelClick}
        customHeaderClass="cmms-header"
         customSidebarItemClass="cmms-sidebar-item"
      />



<SidebarItem
sendDataToLandingPage={props.sendDataToLandingPage}
data={props.data}
headerData={props.headerData}
        imgSrc={safetyImg}
        imgClass="img-Safety"
        icon={ <DownOutlined
          style={{
            color: safetyIconColor === "light" ? "#00ffff" : "white",
            position: 'relative',
            top: '-12px',
            left: '35px',
            fontSize: '16px',
            transform: openDropdown === "Safety" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
        />}
        iconClass="Safety-icon"
        label="Safety & Security"
        isOpen={openDropdown === "Safety"}
        onClick={() => handleToggle("Safety")}
        onIconClick={changesafetyImgAndIconColor}
        labelColor={safetyLabelColor}
        iconColor={safetyIconColor}
        mainMenuLabelClass="Safety-label"
        subMenus={[
          { 
            imgSrc: fireImg, 
            imgClass: "img-FireAlaramSystem", 
            label: "Fire Alaram System"  ,
            color: activeSubMenu === "Fire Alaram System" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Fire-label", // Individual class
            customSubMenuClass: "FireAlaramSystem-submenu-class" 
          },
          { 
            imgSrc: firefightImg, 
            imgClass: "img-FireFighting", 
            label: "Fire Fighting" ,
            color: activeSubMenu === "Fire Fighting" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "FireFighting-label", // Individual class
            customSubMenuClass: "FireFighting-submenu-class" 
          },
          { 
            imgSrc: elivatorImg, 
            imgClass: "img-Elivator", 
            label:  "Elivator",
            color: activeSubMenu === "Elivator" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Elivator-label", // Individual class
            customSubMenuClass: "Elivator-submenu-class" 
          },
          { 
            imgSrc: accesscontrolImg, 
            imgClass: "img-Acess", 
            label:  "Acess Control System" ,
            color: activeSubMenu === "Acess Control System" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Acess-label", // Individual class
            customSubMenuClass: "Cost-submenu-class" 
          },
          
        ]}
        onSubMenuClick={changeSubMenuColor}
        onClickLabel={handleLabelClick}
        customHeaderClass="safety-header"
         customSidebarItemClass="safety-sidebar-item"
      />
<SidebarItem
sendDataToLandingPage={props.sendDataToLandingPage}
data={props.data}
headerData={props.headerData}
        imgSrc={benchImg}
        imgClass="img-Bench"
        icon={ <DownOutlined
          style={{
            color: benchIconColor === "light" ? "#00ffff" : "white",
            position: 'relative',
            top: '-6px',
            left: '28px',
            fontSize: '16px',
            transform: openDropdown === "Bench" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
        />}
        iconClass="Bench-icon"
        label="Bench Marking KPI's"
        isOpen={openDropdown === "Bench"}
        onClick={() => handleToggle("Bench")}
        onIconClick={changebenchImgAndIconColor}
        labelColor={benchLabelColor}
        iconColor={benchIconColor}
        mainMenuLabelClass="Bench-label"
        subMenus={[
          { 
            imgSrc: epiImg, 
            imgClass: "img-EPI", 
            label: (<Tooltip title=" Energy Performance Index, Energy Use Intencity"> EPI, EUI, Kwh/Person</Tooltip>) ,
            color: activeSubMenu === "EPI" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "EPI-label", // Individual class
            customSubMenuClass: "EPI-submenu-class" 
          },
          { 
            imgSrc: waterpersonImg, 
            imgClass: "img-Waterperperson", 
            label: "Water/Person" ,
            color: activeSubMenu === "Water" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Waterperperson-label", // Individual class
            customSubMenuClass: "Waterperperson-submenu-class" 
          },
          { 
            imgSrc: ikwImg, 
            imgClass: "img-Ikw", 
            label: (<Tooltip title="PUE - Power usage effectiveness"> Ikw/TR & PUE</Tooltip>),
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Ikw-label", // Individual class
            customSubMenuClass: "Ikw-submenu-class" 
          },
          { 
            imgSrc: renewableenergyImg, 
            imgClass: "img-Renewable", 
            label:  "Renewable energy" ,
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Renewable-label", // Individual class
            customSubMenuClass: "Cost-submenu-class" 
          },
          
        ]}
        onSubMenuClick={changeSubMenuColor}
        onClickLabel={handleLabelClick}
        customHeaderClass="Bench-header"
         customSidebarItemClass="Bench-sidebar-item"
      />



<SidebarItem
sendDataToLandingPage={props.sendDataToLandingPage}
data={props.data}
headerData={props.headerData}
        imgSrc={sustainImg}
        imgClass="img-Sustainability"
        icon={ <DownOutlined
          style={{
            color: sustainIconColor === "light" ? "#00ffff" : "white",
            position: 'relative',
            top: '-11px',
            left: '34px',
            fontSize: '16px',
            transform: openDropdown === "Sustainability" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
        />}
        iconClass="Sustainability-icon"
        label="Sustainability KPIs"
        isOpen={openDropdown === "Sustainability"}
        onClick={() => handleToggle("Sustainability")}
        onIconClick={changesustainImgAndIconColor}
        labelColor={sustainLabelColor}
        iconColor={sustainIconColor}
        mainMenuLabelClass="Sustainability-label"
        subMenus={[
          { 
            imgSrc: scope1Img, 
            imgClass: "img-Scope1", 
            label: "Scope 1 "  ,
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Scope1-label", // Individual class
            customSubMenuClass: "Scope1-submenu-class" 
          },
          { 
            imgSrc: scope2Img, 
            imgClass: "img-Scope2", 
            label: "Scope 2"  ,
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Scope2-label", // Individual class
            customSubMenuClass: "Scope2-submenu-class" 
          },
          { 
            imgSrc: scope3Img, 
            imgClass: "img-Scope3", 
            label: "Scope 3" ,
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Scope3-label", // Individual class
            customSubMenuClass: "Scope3-submenu-class" 
          },
          { 
            imgSrc: renewablepercentageImg, 
            imgClass: "img-RenewableEnergypercentage", 
            label:   "Renewable Energy %",
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "RenewableEnergypercentage-label", // Individual class
            customSubMenuClass: "Cost-submenu-class" 
          },
          
        ]}
        onSubMenuClick={changeSubMenuColor}
        onClickLabel={handleLabelClick}
        customHeaderClass="sustain-header"
         customSidebarItemClass="sustain-sidebar-item"
      />
<SidebarItem
sendDataToLandingPage={props.sendDataToLandingPage}
data={props.data}
headerData={props.headerData}
        imgSrc={workflowImg}
        imgClass="img-Workflow"
        icon={ <DownOutlined
          style={{
            color: workflowIconColor === "light" ? "#00ffff" : "white",
            position: 'relative',
            top: '-1px',
            left: '19px',
            fontSize: '16px',
            transform: openDropdown === "Workflow" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
        />}
        iconClass="Workflow-icon"
        label="Workflow Management"
        isOpen={openDropdown === "Workflow"}
        onClick={() => handleToggle("Workflow")}
        onIconClick={changeworkflowImgAndIconColor}
        labelColor={workflowLabelColor}
        iconColor={workflowIconColor}
        mainMenuLabelClass="Workflow-label"
        subMenus={[
          { 
            imgSrc: taskmanagementImg, 
            imgClass: "img-Task", 
            label:  "Task Management "  ,
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Task-label", // Individual class
            customSubMenuClass: "Task-submenu-class" 
          },
          { 
            imgSrc: assetmgmtImg, 
            imgClass: "img-Assest", 
            label: "Assest Management" ,
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Assest-label", // Individual class
            customSubMenuClass: "Cost-submenu-class" 
          },
          
        ]}
        onSubMenuClick={changeSubMenuColor}
        onClickLabel={handleLabelClick}
        customHeaderClass="workflow-header"
         customSidebarItemClass="workflow-sidebar-item"
      />

     



<SidebarItem
sendDataToLandingPage={props.sendDataToLandingPage}
data={props.data}
headerData={props.headerData}
        imgSrc={resourceforecastingImg}
        imgClass="img-resourceforcasting"
        icon={ <DownOutlined
          style={{
            color: resourceforecastingIconColor === "light" ? "#00ffff" : "white",
            position: 'relative',
            top: '-2px',
            left: '25px',
            fontSize: '16px',
            transform: openDropdown === "resourceforcasting" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
        />}
        iconClass="resourceforcasting-icon"
        label="Resource Forecasting"
        isOpen={openDropdown === "resourceforcasting"}
        onClick={() => handleToggle("resourceforcasting")}
        onIconClick={changeresourceforecastingImgAndIconColor}
        labelColor={resourceforecastingLabelColor}
        iconColor={resourceforecastingIconColor}
        mainMenuLabelClass="resourceforcasting-label"
        subMenus={[
          { 
            imgSrc: energyImg, 
            imgClass: "img-Energy", 
            label:  "Energy  "   ,
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Energy-label", // Individual class
            customSubMenuClass: "wasEnergyte-submenu-class" 
          },
          { 
            imgSrc: waterImg, 
            imgClass: "img-Water", 
            label: "Water" ,
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Water-label", // Individual class
            customSubMenuClass: "Water-submenu-class" 
          },
          { 
            imgSrc: costImg, 
            imgClass: "img-Cost", 
            label: "Cost"  ,
            color: activeSubMenu === "Waste" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Cost-label", // Individual class
            customSubMenuClass: "Cost-submenu-class" 
          },
          
        ]}
        onSubMenuClick={changeSubMenuColor}
        onClickLabel={handleLabelClick}
        customHeaderClass="resource-forecating-header"
         customSidebarItemClass="resource-forecasting-sidebar-item"
      />

<SidebarItem
sendDataToLandingPage={props.sendDataToLandingPage}
data={props.data}
headerData={props.headerData}
        imgSrc={ecmImg}
        imgClass="img-ECM"
        icon={ <DownOutlined
          style={{
            color: ecmIconColor === "light" ? "#00ffff" : "white",
            position: 'relative',
            top: '-13px',
            left: '22px',
            fontSize: '16px',
            transform: openDropdown === "ECM" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
        />}
        iconClass="resourceforcasting-icon"
        label="Energy Conservation Measures"
        isOpen={openDropdown === "ECM"}
        onClick={() => handleToggle("ECM")}
        onIconClick={changeecmImgAndIconColor}
        labelColor={ecmLabelColor}
        iconColor={ecmIconColor}
        mainMenuLabelClass="ECM-label"
        subMenus={[
          { 
            imgSrc: mrvImg, 
            imgClass: "img-MRV", 
            label: (<Tooltip title="Measurement Reporting and Verification"> MRV Table </Tooltip>),
            color: activeSubMenu === " MRVTable" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "MRV-label", // Individual class
            customSubMenuClass: "MRV Table-submenu-class" 
          },
          { 
            imgSrc: issuesImg, 
            imgClass: "img-Issues", 
            label: "Issues With Recommendation",
            color: activeSubMenu === "Issues" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Issues-label", // Individual class
            customSubMenuClass: "Issues-submenu-class" 
          },
          { 
            imgSrc: savingImg, 
            imgClass: "img-Saving", 
            label: "Saving Summary" ,
            color: activeSubMenu === "Saving" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "Saving-label", // Individual class
            customSubMenuClass: "Cost-submenu-class" 
          },
          
        ]}
        onSubMenuClick={changeSubMenuColor}
        onClickLabel={handleLabelClick}
        customHeaderClass="ecm-header"
         customSidebarItemClass="ecm-sidebar-item"
      />
     

     <SidebarItem
     sendDataToLandingPage={props.sendDataToLandingPage}
     data={props.data}
     headerData={props.headerData}
        imgSrc={reportImg}
        imgClass="img-Reports"
        icon={ <DownOutlined
          style={{
            color: reportIconColor === "light" ? "#00ffff" : "white",
            position: 'relative',
            top: '-11px',
            left: '61px',
            fontSize: '16px',
            transform: openDropdown === "Reports" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the icon when the dropdown is open
            transition: "transform 0.3s ease" // Smooth transition for the icon rotation
          }}
        />}
        iconClass="Reports-icon"
        label="Reports"
        isOpen={openDropdown === "Reports"}
        onClick={() => handleToggle("Reports")}
        onIconClick={changereportImgAndIconColor}
        labelColor={reportLabelColor}
        iconColor={reportIconColor}
        mainMenuLabelClass="Reports-label"
        subMenus={[
          { 
            imgSrc: energyncostImg, 
            imgClass: "img-EnergynCost ", 
            label: "Energy & Cost ",
            color: activeSubMenu === "EnergynCost" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "EnergynCost-label", // Individual class
            customSubMenuClass: "EnergynCost-submenu-class" 
          },
          { 
            imgSrc: ecmreportImg, 
            imgClass: "img-ECMReports", 
            label: "ECM Reports",
            color: activeSubMenu === "ECMReports" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "ECMReports-label", // Individual class
            customSubMenuClass: "ECMReports-submenu-class" 
          },
          { 
            imgSrc: kpiImg, 
            imgClass: "img-KPI", 
            label: "KPI Reports" ,
            color: activeSubMenu === "KPIReports" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "KPIReports-label", // Individual class
            customSubMenuClass: "KPIReports-submenu-class" 
          },
          { 
            imgSrc: operationalreportImg, 
            imgClass: "img-Operational", 
            label:"Operational Reports" ,
            color: activeSubMenu === "OperationalReports" ? "white" : "white",
            // color: resourceSubMenuColors.Waste, 
            subMenuLabelClass: "OperationalReports-label", // Individual class
            customSubMenuClass: "Cost-submenu-class" 
          },
        ]}
        onSubMenuClick={changeSubMenuColor}
        onClickLabel={handleLabelClick}
        customHeaderClass="reports-header"
         customSidebarItemClass="reports-sidebar-item"
      />
      
      {/* Repeat similar SidebarItem components for other menu items */}
    </div>
  );
};
 
export default Sidebar;