import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { Link,useNavigate} from 'react-router-dom';

const LeftPanel: React.FC = (props) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  
  const handleToggle = (panel: string) => {
    // Toggle the expansion state of each panel
    setExpanded(expanded === panel ? null : panel);
    setActiveLink(null);
    
    // Send data to the landing page on panel click
    if (panel !== 3) {
      const stringForData = panel === 1 ? 'Resource' :panel.toString();
      props.sendDataToLandingPage('menuClicked::' + stringForData);
    }
    let stringForSessionStorage=panel==1?'Resource':panel=='resourceEnergy'?'Energy':panel=='resourceWater'?'Water':panel=='resourceWaste'?'Waste':'';
    sessionStorage.setItem('clickedPath', stringForSessionStorage);
  };
 
  const handleLinkClick = (link: string) => {
    console.log('link: ',link);
    // Set the active link
    setActiveLink(link);
 
    // Send data to the landing page on submenu link click
    if (link !== 'Operations') {
      props.sendDataToLandingPage('submenuClicked::' + link);
    }
    location.hash=link;
    if(link.toLowerCase().includes('realtimealarm') || link.toLowerCase().includes('taskmanagement') ){
      window.location.reload();
    }
    let stringForSessionStorage=link==1?'Resource':link=='resourceEnergy'?'Energy':link=='resourceWater'?'Water':link=='resourceWaste'?'Waste':'';
    sessionStorage.setItem('clickedPath', stringForSessionStorage);
  };
 
  return (
    <div>
      {/* Menu 1 - Resource */}
      <div className={`${expanded === 1 ? 'active-menu' : ''}`}>
        <button className="w-full focus:outline-none" onClick={() => handleToggle(1)}>
          <span className="resource-menu">Resource</span>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 1 ? 'h-auto' : 'h-0'}`}>
          <div className="sub-menu">
            <a className={`energy ${activeLink === 'resourceEnergy' ? 'active-link' : ''}`} onClick={() => handleLinkClick('resourceEnergy')}>Energy</a>
            <a className={`water ${activeLink === 'resourceWater' ? 'active-link' : ''}`} onClick={() => handleLinkClick('resourceWater')}>Water</a>
            <a className={`waste ${activeLink === 'resourceWaste' ? 'active-link' : ''}`} onClick={() => handleLinkClick('resourceWaste')}>Waste</a>
          </div>
        </div>
      </div>
 
      {/* Menu 2 - Integrated Work Place Management */}
      <div className={`${expanded === 2 ? 'active-menu' : ''}`}>
        <button className="w-full focus:outline-none" onClick={() => handleToggle(2)}>
          <span className="integrated-menu">Integrated Work<br/> Place Management</span>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 2 ? 'h-auto' : 'h-0'}`}>
          <div className="sub-menu">
            <a className={`space ${activeLink === 'space' ? 'active-link' : ''}`} onClick={() => handleLinkClick('space')}>Space</a>
            <a className={`parking ${activeLink === 'parking' ? 'active-link' : ''}`} onClick={() => handleLinkClick('parking')}>Parking</a>
            <a className={`aqi ${activeLink === 'aqi' ? 'active-link' : ''}`} onClick={() => handleLinkClick('aqi')}><Tooltip title="Air Quality Index">AQI </Tooltip></a>
            <a className={`occupancy ${activeLink === 'occupancy' ? 'active-link' : ''}`} onClick={() => handleLinkClick('occupancy')}>Occupancy</a>
          </div>
        </div>
      </div>
 
      {/* Menu 3 - Operations */}
      <div className={`${expanded === 3 ? 'active-menu' : ''}`}>
        <button className="w-full focus:outline-none" onClick={() => handleToggle(3)}>
          <span className="operations-menu">Operations</span>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 3 ? 'h-auto' : 'h-0'}`}>
          <div className="sub-menu">
          <Link to="/realtimeAlarm" className={`realtime-alarm ${activeLink === 'realtimeAlarm'||location.hash==='#realtimeAlarm' ? 'active-link' : ''}`} onClick={() => handleLinkClick('realtimeAlarm')}>Realtime Alarm</Link>
          <a className={`dynamic-control ${activeLink === 'dynamicControl' ? 'active-link' : ''}`} onClick={() => handleLinkClick('dynamicControl')}>Dynamic Control</a>
          </div>
        </div>
      </div>
 
      {/* Menu 4 - AI Analysis */}
      <div className={`${expanded === 4 ? 'active-menu' : ''}`}>
        <button className="w-full focus:outline-none" onClick={() => handleToggle(4)}>
          <span className="aianalysis-menu">AI Analysis</span>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 4 ? 'h-auto' : 'h-0'}`}>
          <div className="sub-menu">
            <a className={`predictive-analytics ${activeLink === 'predictiveAnalytics' ? 'active-link' : ''}`} onClick={() => handleLinkClick('predictiveAnalytics')}>Predictive Analytics</a>
            <a className={`ai-simulation ${activeLink === 'aiSimulation' ? 'active-link' : ''}`} onClick={() => handleLinkClick('aiSimulation')}>AI Simulation</a>
            <a className={`ai-inference ${activeLink === 'aiInference' ? 'active-link' : ''}`} onClick={() => handleLinkClick('aiInference')}>AI Inference</a>
          </div>
        </div>
      </div>
 
      {/* Menu 5 - CMMS */}
      <div className={`${expanded === 5 ? 'active-menu' : ''}`}>
        <button className="w-full focus:outline-none" onClick={() => handleToggle(5)}>
          <span className="cmms-menu"> <Tooltip title="Computerized Maintanence Management System">CMMS </Tooltip></span>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 5 ? 'h-auto' : 'h-0'}`}>
          <div className="sub-menu">
            <a className={`ppm ${activeLink === 'ppm' ? 'active-link' : ''}`} onClick={() => handleLinkClick('ppm')}><Tooltip title="Planned Preventive Maintenance"> PPM</Tooltip></a>
            <a className={`fdd ${activeLink === 'fdd' ? 'active-link' : ''}`} onClick={() => handleLinkClick('fdd')}><Tooltip title="Fault Detection and Diagnostics"> FDD</Tooltip></a>
            <a className={`mtbf ${activeLink === 'mtbf' ? 'active-link' : ''}`} onClick={() => handleLinkClick('mtbf')}><Tooltip title="Mean Time between failure "> MTBF</Tooltip></a>
            <a className={`mttr ${activeLink === 'mttr' ? 'active-link' : ''}`} onClick={() => handleLinkClick('mttr')}><Tooltip title="Mean Time to Repair"> MTTR</Tooltip></a>
            <a className={`rul ${activeLink === 'rul' ? 'active-link' : ''}`} onClick={() => handleLinkClick('rul')}><Tooltip title="Remaining Useful Life"> RUL</Tooltip></a>
          </div>
        </div>
      </div>
 
      {/* Menu 6 - Safety & Security */}
      <div className={`${expanded === 6 ? 'active-menu' : ''}`}>
        <button className="w-full focus:outline-none" onClick={() => handleToggle(6)}>
          <span className="safetynsecurity-menu">Safety & Security</span>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 6 ? 'h-auto' : 'h-0'}`}>
          <div className="sub-menu">
            <a className={`firealaram-system ${activeLink === 'firealaramSystem' ? 'active-link' : ''}`} onClick={() => handleLinkClick('firealaramSystem')}>Fire Alarm System</a>
            <a className={`fire-fighting ${activeLink === 'fireFighting' ? 'active-link' : ''}`} onClick={() => handleLinkClick('fireFighting')}>Fire Fighting</a>
            <a className={`elevator ${activeLink === 'elevator' ? 'active-link' : ''}`} onClick={() => handleLinkClick('elevator')}>Elevator</a>
            <a className={`accesscontrol-system ${activeLink === 'accessControlSystem' ? 'active-link' : ''}`} onClick={() => handleLinkClick('accessControlSystem')}>Access Control System</a>
          </div>
        </div>
      </div>
 
      {/* Menu 7 - Benchmarking KPI's */}
      <div className={`${expanded === 7 ? 'active-menu' : ''}`}>
        <button className="w-full focus:outline-none" onClick={() => handleToggle(7)}>
          <span className="benchmarking-menu">Benchmarking KPI's</span>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 7 ? 'h-auto' : 'h-0'}`}>
          <div className="sub-menu">
            <a className={`epi ${activeLink === 'epi' ? 'active-link' : ''}`} onClick={() => handleLinkClick('epi')}><Tooltip title=" Energy Performance Index, Energy Use Intencity"> EPI, EUI, Kwh/Person</Tooltip></a>
            <a className={`waterper-person ${activeLink === 'waterPerPerson' ? 'active-link' : ''}`} onClick={() => handleLinkClick('waterPerPerson')}>Water/Person</a>
            <a className={`ikw ${activeLink === 'ikw' ? 'active-link' : ''}`} onClick={() => handleLinkClick('ikw')}><Tooltip title="PUE - Power Usage Effectiveness"> Ikw/TR & PUE</Tooltip></a>
            <a className={`renewable-energy ${activeLink === 'renewableEnergy' ? 'active-link' : ''}`} onClick={() => handleLinkClick('renewableEnergy')}>Renewable Energy</a>
          </div>
        </div>
      </div>
 
      {/* Menu 8 - Sustainability KPI's */}
      <div className={`${expanded === 8 ? 'active-menu' : ''}`}>
        <button className="w-full focus:outline-none" onClick={() => handleToggle(8)}>
          <span className="sustainability-menu">Sustainability KPI's</span>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 8 ? 'h-auto' : 'h-0'}`}>
          <div className="sub-menu">
            <a className={`scope-1 ${activeLink === 'scope1' ? 'active-link' : ''}`} onClick={() => handleLinkClick('scope1')}>Scope 1</a>
            <a className={`scope-2 ${activeLink === 'scope2' ? 'active-link' : ''}`} onClick={() => handleLinkClick('scope2')}>Scope 2</a>
            <a className={`scope-3 ${activeLink === 'scope3' ? 'active-link' : ''}`} onClick={() => handleLinkClick('scope3')}>Scope 3</a>
            <a className={`renewable-energy-percentage ${activeLink === 'renewableEnergyPercentage' ? 'active-link' : ''}`} onClick={() => handleLinkClick('renewableEnergyPercentage')}>Renewable Energy %</a>
          </div>
        </div>
      </div>
 
      {/* Menu 9 - Workflow Management */}
      <div className={`${expanded === 9 ? 'active-menu' : ''}`}>
        <button className="w-full focus:outline-none" onClick={() => handleToggle(9)}>
          <span className="workflow-menu">Workflow Management</span>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 9 ? 'h-auto' : 'h-0'}`}>
          <div className="sub-menu">
            <a className={`task-management ${activeLink === 'taskManagement'||location.hash==='#taskManagement' ? 'active-link' : ''}`} onClick={() => handleLinkClick('taskManagement')}>Task Management</a>
            <a className={`asset-management ${activeLink === 'assetManagement' ? 'active-link' : ''}`} onClick={() => handleLinkClick('assetManagement')}>Asset Management</a>
          </div>
        </div>
      </div>
 
      {/* Menu 10 - Resource Forecasting */}
      <div className={`${expanded === 10 ? 'active-menu' : ''}`}>
        <button className="w-full focus:outline-none" onClick={() => handleToggle(10)}>
          <span className="resourceforecasting-menu">Resource Forecasting</span>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 10 ? 'h-auto' : 'h-0'}`}>
          <div className="sub-menu">
            <a className={`energy ${activeLink === 'energy' ? 'active-link' : ''}`} onClick={() => handleLinkClick('energy')}>Energy</a>
            <a className={`water ${activeLink === 'water' ? 'active-link' : ''}`} onClick={() => handleLinkClick('water')}>Water</a>
            <a className={`cost ${activeLink === 'cost' ? 'active-link' : ''}`} onClick={() => handleLinkClick('cost')}>Cost</a>
          </div>
        </div>
      </div>
 
      {/* Menu 11 - Energy Conservation Measures */}
      <div className={`${expanded === 11 ? 'active-menu' : ''}`}>
<button className="w-full focus:outline-none" onClick={() => handleToggle(11)}>
<span className="energyconservation-menu">Energy Conservation Measures</span>
</button>
<div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 11 ? 'h-auto' : 'h-0'}`}>
<div className="sub-menu">
<a className={`mrv-table ${activeLink === 'mrvTable' ? 'active-link' : ''}`} onClick={() => handleLinkClick('mrvTable')}><Tooltip title="Measurement Reporting and Verification"> MRV Table </Tooltip></a>
<a className={`issues ${activeLink === 'issues' ? 'active-link' : ''}`} onClick={() => handleLinkClick('issues')}>Issues With Recommendation</a>
<a className={`saving-summary ${activeLink === 'savingSummary' ? 'active-link' : ''}`} onClick={() => handleLinkClick('savingSummary')}>Saving Summary</a>
</div>
</div>
</div>

<div className={`${expanded === 12 ? 'active-menu' : ''}`}>
<button className="w-full focus:outline-none" onClick={() => handleToggle(12)}>
<span className="reports-menu">Reports</span>
</button>
<div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === 12 ? 'h-auto' : 'h-0'}`}>
<div className="sub-menu">
<a className={`energyncost ${activeLink === 'energyncost' ? 'active-link' : ''}`} onClick={() => handleLinkClick('energyncost')}>Energy & Cost</a>
<a className={`ecm-reports ${activeLink === 'ecmReports' ? 'active-link' : ''}`} onClick={() => handleLinkClick('ecmReports')}>ECM Reports</a>
<a className={`kpi-reports ${activeLink === 'kpiReports' ? 'active-link' : ''}`} onClick={() => handleLinkClick('kpiReports')}>KPI Reports</a>
<a className={`operational-reports ${activeLink === 'operationalReports' ? 'active-link' : ''}`} onClick={() => handleLinkClick('operationalReports')}>Operational Reports</a></div>
</div>
</div>
</div>
 );
 };
 export default LeftPanel;
 
