
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { UnityLoader } from '../UnityLoader';
import { UnityProvider } from '../../contexts/UnityContext';
import ResponsiveWidgets from '../dashboard';
import MainWorkAreaComponent from '../mainWorkArea';
import RealTimeAlarmComponent from '../realTimeAlarm';
import MainWorkAreaComponentGraph from '../mainworkAreagraph';

import Charts from "../charts";
import { Select, Button, Input, message, Spin, DatePicker, Space, Avatar, Tooltip, Modal, Layout } from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    CaretDownFilled,
    CaretDownOutlined,
    DownOutlined,
  
    ArrowsAltOutlined
  } from '@ant-design/icons';
import UnityMainWrapper from './unityWrapper';
const Dashboard: React.FC = (props) => {
     
console.log('props inside dashboard landing page:', props)

useEffect(() => {
      if (location.hash == '#dashboard') {
        
        //getOnloadData();
      }

    })

    
    console.log("props.clickedLabel:",props.clickedLabel, "location.hash:",location.hash);
if(props.clickedLabel=='landingPage' && location.hash.includes('dashboard')){
    let chartWidgetListVar={
        "chartWidgetList": [
            {
                "name": "Energy Consumption",
                "title": "",
                "type": "bar",
                "content": {
                    "options": "",
                    "data": [
                        {
                            "energy_kwh": 0,
                            "time": "2024"
                        },
                        {
                            "energy_kwh": 0,
                            "time": "2025"
                        }
                    ]
                }
            },
            {
                "name": "Renewable Energy",
                "title": "",
                "type": "bar",
                "content": {
                    "options": "",
                    "data": [
                        {
                            "renewable_engery": 0,
                            "time": "2024"
                        },
                        {
                            "renewable_engery": 0,
                            "time": "2025"
                        }
                    ]
                }
            },
            {
                "name": "Emission Reduction",
                "title": "",
                "type": "bar",
                "content": {
                    "options": "",
                    "data": [
                        {
                            "emission_reduction": 0,
                            "time": "2024"
                        },
                        {
                            "emission_reduction": 0,
                            "time": "2025"
                        }
                    ]
                }
            },
            {
                "name": "Water Consumption",
                "title": "",
                "type": "bar",
                "content": {
                    "options": "",
                    "data": [
                        {
                            "time": "2024",
                            "water": 0
                        },
                        {
                            "time": "2025",
                            "water": 0
                        }
                    ]
                }
            },
            {
                "name": "Energy Consumption",
                "title": "",
                "type": "doughnut",
                "content": {
                    "options": "",
                    "data": [
                        {
                            "energy_kwh": 0,
                            "location": "France"
                        },
                        {
                            "energy_kwh": 0,
                            "location": "Americas"
                        },
                        {
                            "energy_kwh": 0,
                            "location": "APAC"
                        },
                        {
                            "energy_kwh": 0,
                            "location": "Europe"
                        }
                    ]
                }
            },
            {
                "name": "Renewable Energy",
                "title": "",
                "type": "doughnut",
                "content": {
                    "options": "",
                    "data": [
                        {
                            "location": "France",
                            "renewable": 0
                        },
                        {
                            "location": "Americas",
                            "renewable": 0
                        },
                        {
                            "location": "APAC",
                            "renewable": 0
                        },
                        {
                            "location": "Europe",
                            "renewable": 0
                        }
                    ]
                }
            },
            {
                "name": "Emission Reduction",
                "title": "",
                "type": "doughnut",
                "content": {
                    "options": "",
                    "data": [
                        {
                            "emission_reduction": 0,
                            "location": "France"
                        },
                        {
                            "emission_reduction": 0,
                            "location": "Americas"
                        },
                        {
                            "emission_reduction": 0,
                            "location": "APAC"
                        },
                        {
                            "emission_reduction": 0,
                            "location": "Europe"
                        }
                    ]
                }
            },
            {
                "name": "Water Consumption",
                "title": "",
                "type": "doughnut",
                "content": {
                    "options": "",
                    "data": [
                        {
                            "location": "France",
                            "water": 0
                        },
                        {
                            "location": "Americas",
                            "water": 0
                        },
                        {
                            "location": "APAC",
                            "water": 0
                        },
                        {
                            "location": "Europe",
                            "water": 0
                        }
                    ]
                }
            },
            {
                "name": "graphPayload",
                "payload": {
                    "region": "ALL",
                    "countryName": "ALL",
                    "cityName": "ALL",
                    "campusName": "ALL",
                    "buildingName": "ALL",
                    "startDate": "2024-05-15",
                    "endDate": "2024-05-15",
                    "dateRange": "till_date"
                }
            },
            {
                "name": "headerPayload",
                "payload": {
                    "region": "ALL",
                    "countryName": "ALL",
                    "cityName": "ALL",
                    "campusName": "ALL",
                    "buildingName": "ALL",
                    "startDate": "2024-05-15",
                    "endDate": "2024-05-15",
                    "dateRange": "till_date"
                }
            },
            {
                "name": "doughnutPayload",
                "payload": {
                    "locationType": "region",
                    "location": "ALL",
                    "startDate": "2024-05-15",
                    "endDate": "2024-05-15",
                    "dateRange": "till_date"
                }
            }
        ],
        "widgetList": [
            {
                "type": "energyConsumption",
                "data": "666494",
                "label": "Energy Consumption"
            },
            {
                "type": "waterConsumption",
                "data": "671672",
                "label": "Water Consumption"
            },
            {
                "type": "renewableEnergy",
                "data": "870744",
                "label": "Renewable Energy"
            },
            {
                "type": "co2",
                "data": "866887",
                "label": "Carbon Emissions"
            },
            null
        ],
        "onLoad": true
    };
    return (
        <div className="landing-page">
            <p className='page-title'>Dashboard</p>
            <div className='cards-list'>
                <div className='cards country-card'>
                    <span></span>
                    <div className='card-info'><span className='card-amt'>{props.headerCountData.numberOfCountry}</span><span className='card-text'>Country</span></div>
                </div>
                <div className='cards building-card'>
                    <span></span>
                    <div className='card-info'><span className='card-amt'>{props.headerCountData.numberOfBuilding}</span><span className='card-text'>Building</span></div>
                </div>
                <div className='cards area-card'>
                    <span></span>
                    <div className='card-info'><span className='card-amt'>{props.headerCountData.area}</span><span className='card-text'>Area m²</span></div>
                </div>
                <div className='cards profile-card'>
                    <span></span>
                    <div className='card-info'><span className='card-amt'>{props.headerCountData.numberOfEmployees}</span><span className='card-text'>Employee Count</span></div>
                </div>
            </div>
            <div className='section-wrapper'>
                <div className='left-section'>
                    <div className="unityMainWrapper">
                        <UnityMainWrapper unityMessageObject= {props.unityMessageObject} />
                    
                </div>
                </div>
                <div className='right-section'>
                    <div className="graph-section-wrapper">
                        {/* <div className="graph-section-one">
                            <ResponsiveWidgets listOfwidgets={props.widgetData} sendDataToParent={e=>sendDataToParent(e)} /></div> */}
                        
                        <>
                        <Charts chartWidgetList={props.headerData.length>0?props.headerData:chartWidgetListVar.chartWidgetList} widgetList={props.widgetData} sendDataToLandingPage={e=>props.sendDataToLandingPage(e)} onLoad={true}/>
                        {/* <div className="graph-section-two"></div>
                        <div className="graph-section-three"></div> */}
                        </>
                    </div>
                </div>
            </div>
        </div>

    );
}
else if(props.clickedLabel=='Resource' ||props.clickedLabel=='Energy' ||props.clickedLabel=='Water' ||props.clickedLabel=='Waste' ){
    document.getElementById("digitalTwinId")? document.getElementById("digitalTwinId").style.display = "none":'';
    document.getElementById("chatbotId")? document.getElementById("chatbotId").style.display = "none":'';
    return(
        <div className="landing-page">
            
            <MainWorkAreaComponent path={props.clickedLabel} 
      data={props.headerData || []} 
      sendDataToLandingPage={props.sendDataToLandingPage}  
      headerData={props.widgetData} />
        </div>
    )
}
// else if(props.clickedLabel=='realtimeAlarm'){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
//     return(
//         <div className="landing-page">
            
//             <RealTimeAlarmComponent path={props.path||'Resource'} 
//       data={props.data || []} 
//       sendDataToLandingPage={props.sendDataToLandingPage}  
//       headerData={props.headerData} />
//         </div>
//     )
// }
else if(props.clickedLabel=='ViewGraph'){
    return(
        <div className="landing-page">
            
            <MainWorkAreaComponentGraph path={props.path||'Resource'} 
      data={props.headerData || []} 
      sendDataToLandingPage={props.sendDataToLandingPage}  
      headerData={props.headerData} 
   
      />
        </div>
    )
}
else if(props.clickedLabel=="realtimeAlarm" || location.hash.includes('realtimeAlarm')){
    return(
<div className="landing-page">
      {/* <RealTimeAlarmComponent/>       */}
            
        </div>)
}
else{
    console.log('inside else..');
    return(
        <div className="landing-page">
            
            <div> </div>
        </div>
    )
}


};

export default Dashboard;
