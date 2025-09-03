import {React, useEffect, useState} from "react";
import "./index.css";

 

import countryImg from "../../images/country-icon1.svg";
import buildingImg from "../../images/apartment-icon1.svg";
import areaImg from "../../images/area-icon.svg";
import employeeImg from"../../images/people-icon.svg";


export default function HeaderComponent(props) {

const [subPath, setSubPath]=useState('');
console.log(props);

  
  return (
    <>
  <div className=" header-Path"> <span style={{color:'white',fontSize:'12px', cursor:'pointer'}}>Dashboard       </span> <span style={{fontSize:'12px'}}>{subPath}</span></div>
<div className="header-container">
  
<div className="widget widget-country">
<WidgetCard imgSrc={countryImg} value={props.inputData.countryCount} label=" Country" />
</div>
<div className="widget widget-building">
<WidgetCard imgSrc={buildingImg} value={props.inputData.buildingCount} label=" Building"  />
</div>
<div className="widget widget-area">
<WidgetCard imgSrc={areaImg} value={props.inputData.area} label=" Area m²" />
</div>
<div className="widget widget-employee">
<WidgetCard imgSrc={employeeImg} value={props.inputData.employeeCount} label="Employee Count" />
</div>
</div>
</>
  );
}
 
const WidgetCard = ({ imgSrc, value, label, unit }) => {
  return (
<div className="widget-card">
<img src={imgSrc} alt={label} className="widget-icon" />
<div className="widget-value">
        {value} <span className="widget-unit">{unit}</span>
</div>
<div className="widget-label">{label}</div>
</div>
  );
};