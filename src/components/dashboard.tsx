import React,{useState,useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../index.css";

// import "./styles.css"; // Add a CSS file for styling adjustments
 
const gradients = {
  // energy: ["#1BC384", "#1C9BA9","#1F54ED","#00806F","#000000"],

  // water: ["#1BC384", "#1C9BA9","#1F54ED","#00806F","#000000"],
  // renewable:["#1BC384", "#1C9BA9","#1F54ED","#00806F","#000000"],
  // emission: ["#1BC384", "#1C9BA9", "#d64747", "#00806F"]
 
};
import energyImg from "../images/energy-widget.svg";
import waterImg from "../images/water-widget.svg";
import EmissionImg from "../images/carbon-widget.svg";
import renewableImg from "../images/renewable-widget.svg";

 
const CircularProgress = ({ value, value1, unit, label, imageSrc, gradientId, gradientColors, className, counterClockwise = true,onClick}) => {
  const[ishovered,setIshovered]=useState(false);
  const wrapperStyle = {
    width: "5vw",
    height: "5vw",
    position: "relative",
    top:'9px',
    display: "flex",
    backgroundColor: "black", 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",  // This makes it circular
    overflow: "hidden", 
   
    // transform: ishovered ? "scale(1.1)" : "scale(1)",
    // filter: ishovered ? "drop-shadow(0px 0px 18px rgba(163, 233, 233, 0.8))" : "none",
  };
// const hoverEffect = {     filter: "drop-shadow(0px 0px 18px rgba(0, 255, 255, 0.8))", };
 
  return (
<div className="circle-container">
<svg width={0} height={0} className="image-svg">
<defs>
<linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor='#1BC384' />
<stop offset="20%" stopColor='#1C9BA9'/>
<stop offset="40%" stopColor='#1F54ED' />
<stop offset="70%" stopColor='#1C9BA9' />



</linearGradient>
</defs>
</svg>
{/* <div className="progress-bar-wrapper" style={{ width: 100, height: 100, position: 'relative' }}> */}
<div style={wrapperStyle}onMouseEnter={() => setIshovered(true)}      
 onMouseLeave={() => setIshovered(false)}   >
  
<CircularProgressbar

          value={value}
        
        //  className="glow"
          styles={buildStyles({
            pathColor: `url(#${gradientId})`,
            trailColor: "#222",
            textColor: "#fff",
            strokeLinecap: "round",
            backgroundColor:"black"
            
      
            
          })}
          counterClockwise={counterClockwise} 
        />
        <div className="progress-content">
<img src={imageSrc} alt={label} style={{ 
width: '20px',
    height: '20px',
   objectFit:'contain',
   position:'relative',
   bottom:'6px'
  //  display:'block',
  //  overflow:'hidden'
    }}  />

  
    
<span className="value"> {value1} {unit}  </span>
</div>

</div>

<div className={label=="Renewable Energy 100% Vs 2019 Baseline"?"label-container renewable-energy":label=="Water"?"label-container waterLabel":"label-container"}>
<div className="widgetLabelClass">{label}</div>
{/* style={{fontSize:'6px'}} */}
</div>
</div>

  );
};
 
const Dashboard = (props) => {     
 
  const [activeWidget,setActiveWidget]=useState('Energy Consumption');
  console.log('testing',props.listOfwidgets[3]);
  
  const clickHandler=(e)=>{
   
    console.log('test:',e);
    
    setActiveWidget(e);
    if(e=='Energy Consumption'){
      document.getElementById('cgchartTitle').innerHTML='Energy';
    }else if(e=='Water Consumption'){
      document.getElementById('cgchartTitle').innerHTML='Water';
    }

    else if(e=="Emission Reduction"){
      document.getElementById('cgchartTitle').innerHTML='Carbon Emission';
    }
    else{
      document.getElementById('cgchartTitle').innerHTML=e;
    }

      }
    useEffect(() => {
         props.sendDataToParent(activeWidget);
        }, [activeWidget]);

  
  return (
<div  className="dashboard" style={{ display: 'flex', gap: '16px',     justifyContent: 'space-evenly', position: 'relative',bottom:'8px'}}>
<div style={{cursor:'pointer'}} className={activeWidget=='Energy Consumption'?'activeWidget':''}onClick={event=>{clickHandler("Energy Consumption")}} ><CircularProgress value1={props.listOfwidgets[0]&&parseFloat(props.listOfwidgets[0].data).toFixed(2)}   value={70} unit="GWh" label="Energy Consumption reduced 41% Vs 2019 Baseline" imageSrc={energyImg} gradientId="energyGradient" gradientColors={gradients.energy}/></div>
<div style={{cursor:'pointer'}}className={activeWidget=='Water Consumption'?'activeWidget':'eneryProgressStyle' } onClick={event=>{clickHandler("Water Consumption")}} ><CircularProgress value={67} value1={props.listOfwidgets[1]&&parseFloat(props.listOfwidgets[1].data).toFixed(2)} unit="MGal" label="Water" imageSrc={waterImg} gradientId="waterGradient" gradientColors={gradients.water} /></div>
<div style={{cursor:'pointer'}} className={activeWidget=='Renewable Energy'?'activeWidget':''}onClick={event=>{clickHandler("Renewable Energy")}} ><CircularProgress value={69} value1={props.listOfwidgets[2] && parseFloat(props.listOfwidgets[2].data).toFixed(2)} unit="GWh" label="Renewable Energy 100% Vs 2019 Baseline" imageSrc={renewableImg} gradientId="renewableGradient" gradientColors={gradients.renewable} /></div>
<div style={{cursor:'pointer'}} className={activeWidget=='Emission Reduction'?'activeWidget':''} onClick={event=>{clickHandler("Emission Reduction")}} ><CircularProgress value={66} value1={props && props.listOfwidgets && props.listOfwidgets.length>0 && props.listOfwidgets[3] && props.listOfwidgets[3].data &&parseFloat(props.listOfwidgets[3].data).toFixed(2).replace(/\.00$/, '')} unit={<span>tCo<sub>2</sub><sub>e</sub></span>}     label=" Scope 1 & 2 
emission reduction 93% Vs baseline 2019" 
        imageSrc={EmissionImg} gradientId="emissionGradient" gradientColors={gradients.emission}  counterClockwise={true}/></div>
</div>
  );
};
 
export default Dashboard;