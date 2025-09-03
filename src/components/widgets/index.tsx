import { Collapse } from 'antd';
import { useState, useEffect } from 'react';
import { Typography } from 'antd';

import { FaBolt } from "react-icons/fa";
import RenewableEnergy from "../../images/RenewableEnergy.png";
import countryImg from "../../images/country-icon.svg";

const { Title } = Typography;
// import countryImg from "../../images/country-icon.svg";

export default function WidgetComponent( props) {

  const [activeWidget,setActiveWidget]=useState('Energy Consumption');
  console.log('props inside widgets', props,' process.env(import.meta.env): ', import.meta.env);

  const WidgetCard = ({  value, label, label1,unit }) => {
    return (
  <div className="wid-card" onClick={e=>{document.getElementById('cgchartTitle').innerHTML=label}}>
  {/* <img src={imgSrc} alt={label} className="widget-icon" /> */}
  <div className="wid-value">
          {value} <div className="widget-unit">{unit}</div>
  </div>
  <div className="wid-label">{label}</div>
  <div className="wid-label1">{label1}</div>
  </div>
    );
  };
  


  const CircularProgress = ({ progress }) => {
    const radius = 50;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
   
    return (
      <div className="progress-container">
        <svg width="100" height="100" viewBox="0 0 120 120">
          <defs>
            {/* Gradient Stroke for Progress Circle */}
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="cyan" stopOpacity="1" />
              <stop offset="50%" stopColor="magenta" stopOpacity="0.8" />
              <stop offset="100%" stopColor="lime" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgba(255, 255, 255, 0.2)" /* Faint Background */
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#neonGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="glow"
          />
          {/* Text in Center */}
          <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="18px">
            {progress}%
          </text>
           <FaBolt x="20%" y="20%"  className="icon"  textAnchor="middle"/> 
           </svg>
         
         
         
       
            
       
      </div>
    );
  };
  const clickHandler=(e)=>{
console.log('e:',e);

setActiveWidget(e);
  }


  useEffect(() => {
     props.sendDataToParent(activeWidget);
    }, [activeWidget]);

  const getWidget = (e) => {
    console.log('e inside widgets:', e);
    
    const options = [];
	
    
    if (e.type == 'co2') {
      
      return   <div style={{height: '12vh', width: '6vw'}}>
        < div className={activeWidget=='Emission Reduction'?'CarbonEmission activeWidget':'CarbonEmission'} onClick={event=>clickHandler("Emission Reduction")} style={{height: '12vh'}}>
        <WidgetCard  value={e.data!='None'?e.data:'0'} label=" Scope 1 & 2" 
       
unit="tCo2"  />
        {/* <div className='co2value'>{parseFloat(e.data).toFixed(1)}</div>
       <div className='co2Unit'>   
       MT Co2</div>
      <div className='ctext'> Emission Reduction</div>
       */}
       {/* <CircularProgress progress={20} 
      
        
       
      /> */}
      
        
       </div>
      </div>

    }
    else if(e.type=='renewableEnergy') {
      return <div style={{height: '12vh', width: '6vw'}}>
        <div className={activeWidget=='Renewable Energy'?'RenewableEnergy activeWidget':'RenewableEnergy'} onClick={event=>clickHandler("Renewable Energy")} style={{height: '12vh'}}>
        <WidgetCard  value={e.data!='None'?e.data:'0'} label={e.label} unit="GWh" />
         {/* <div className='renewableEnergyvalue'>27%</div>
       <div className='renewableEnergyUnit'>   
       (4.22 kWh)</div>
         <div className='rtext'>Renewable Energy </div> */}
       </div>
      </div>
     
    }

    else if(e.type=='energyConsumption'){

      return <div style={{height: '12vh', width: '6vw'}}>
        <div className={activeWidget=='Energy Consumption'?'TotalConsumption activeWidget':'TotalConsumption'} onClick={event=>clickHandler("Energy Consumption")} style={{height: '12vh'}}>

         <WidgetCard  value={e.data!='None'?e.data:'0'} label="Energy"unit="GWh" />

         {/* <div className='totalConsumptionvalue'>2122</div>
       <div className='totalConsumptionUnit'>   
       kWh</div>
         <div className='ttext'>Energy consumption</div>
        */}
        </div>
        
      </div>
    }
    else if(e.type=='waterConsumption'){
      return <div style={{height: '12vh', width: '6vw'}}>
        <div className={activeWidget=='Water Consumption'?'waterConsumption activeWidget':'waterConsumption'} onClick={event=>clickHandler("Water Consumption")} style={{height: '12vh'}}>
          <WidgetCard value={e.data!='None'?e.data:'0'} label="Water " unit="Gal" />

         {/* <div className='totalConsumptionvalue'>2122</div>
       <div className='totalConsumptionUnit'>   
       KLtrs</div>
         <div className='ttext'>Water consumption</div>
        */}
        </div>
        
      </div>
    }
  }

  console.log('props.listOfwidgets:',props.listOfwidgets);

  return (
  <>
{/* {props.map(getWidget)} */}
<div className='widgetWrapper' >

{props.listOfwidgets.map(e=>getWidget(e))}
</div>
</>
  )

}