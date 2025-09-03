import React, { useEffect, useRef, useState } from "react";
import { Select, Button, Input, message, Spin, DatePicker, Space, Avatar, Tooltip, Modal, Layout } from "antd";
import "./index.css";
import { ResponsiveContainer } from 'recharts';

// import areaImg from "../../images/area.svg";
// import employeeImg from "../../images/peopleicon.svg";
import axios from "axios";
import { Doughnut, Line, Bar, Pie } from 'react-chartjs-2';
import ResponsiveDoughnutChart from '../charts/responsiveDoughnutChart';


function usePrevious(value) {

  const ref = useRef();

  useEffect(() => {

    ref.current = value;

  }, [value]);

  return ref.current;

}

export default function MainWorkAreaComponent(props) {
  console.log("props inside main work area", props);
  const handleDashboardClick = (e) => {
    // Change the URL hash to '#dashboard' and the page will be redirected
    window.location.hash = '#/dashboard';
    // window.location.reload();
    console.log("props inside main work area", props);
    //location.reload();

    props.sendDataToLandingPage('::landingPage')

  };


  const prevPropValuePath = usePrevious(props.path);

  const prevPropValueData = usePrevious(props.data);
  console.log(props);
  const [gradient, setGradient] = useState(null);
  const [chartsData, setChartsData] = useState(null);
  const chartRef = useRef(null);
  const barDataList = props.data;
  const [dataPoints2, setDataPoints2] = useState([]);
  const [barDataLabel2, setBarDataLabel2] = useState('');
  const [type, setType] = useState(props.path == 'Resource' ? 'energy' : props.path == 'Energy' ? 'electricity' : props.path == 'Water' ? 'municipal' : props.path == 'Waste' ? 'Construction Waste' : '');
  //options: energy, water,waste, Building Electricity, Building Energy, Electric Vehicle, Municipal, Tanker,Treated, BorewellAlternative, Construction Waste, Wet Waste, Organic Waste, Ewaste etc..
  //{energyBarData:{},waterBarData:{},wasteBarData:{},emissionReductionBarData:{}};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [widgetType, setWidgetType] = useState('');

  let barDataResourceVar = {
    labels: [],
    datasets: [
      {
        label: 'Gwh',
        maxBarThickness: 50,
        data: [],
        // backgroundColor: gradient || 'rgba(75,192,192,0.2)',
        backgroundColor: '#2F9342',
        //  borderRadius: 1,
        borderRadius: 10,  // This is the key to rounding the bars
        // borderRadius: [
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 }, // Apply to each bar individually
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        // ],
        // borderSkipped: false,
        // fill: true
      },

      // {
      //   label: 'Expenses',
      //   data: [8, 15, 2, 3, 1, 2],
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
    ],
  };
  let barDataEnergyVar = {
    labels: [],
    datasets: [
      {
        label: 'Gwh',
        maxBarThickness: 50,
        data: [],
        backgroundColor: '#2F9342',
        //  borderRadius: 1,
        borderRadius: 10,  // This is the key to rounding the bars
        //borderRadius: [
        // { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 }, // Apply to each bar individually
        // { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        // { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        // { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        //],
        //borderSkipped: false,
        fill: true
      },

      // {
      //   label: 'Expenses',
      //   data: [8, 15, 2, 3, 1, 2],
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
    ],
  };
  let barDataWaterVar = {
    labels: [],
    datasets: [
      {
        label: 'MGal',//This is for tooltip over bar
        data: [],
        maxBarThickness: 50,
        backgroundColor: '#0fb5ae',
        //  borderRadius: 1,
        borderRadius: 10,  // This is the key to rounding the bars
        // borderRadius: [
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 }, // Apply to each bar individually
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        // ],
        // borderSkipped: false,
        // fill: true
      },

      // {
      //   label: 'Expenses',
      //   data: [8, 15, 2, 3, 1, 2],
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
    ],
  };

  let barDataWasteVar = {
    labels: [],
    datasets: [
      {
        label: 'Tonne',
        maxBarThickness: 50,
        data: [],
        backgroundColor: '#14d7ed',
        //  borderRadius: 1,
        borderRadius: 10,  // This is the key to rounding the bars
        // borderRadius: [
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 }, // Apply to each bar individually
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        // ],
        // borderSkipped: false,
        // fill: true
      },

      // {
      //   label: 'Expenses',
      //   data: [8, 15, 2, 3, 1, 2],
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
    ],
  };
  const [alternativeData, setalternativeData] = useState('');
  const [borewellData, setborewellData] = useState('');
  const [municipalData, setmunicipalData] = useState('');
  const [tankerData, settankerData] = useState('');
  const [treatedData, settreatedData] = useState('');
  const [electric, setelectric] = useState('');
  const [buildingElectricity, setbuildingElectricity] = useState('');
  const [electricVehicle, setelectricVehicle] = useState('');
  const [barDataWater, setBarDataWater] = useState(barDataWaterVar);
  const [barDataEnergy, setBarDataEnergy] = useState(barDataEnergyVar);

  const [barDataWaste, setBarDataWaste] = useState(barDataWasteVar);
  const [waterDoughnutData, setWaterDoughnutData] = useState('');
  const [energyDoughnutData, setEnergyDoughnutData] = useState('');
  const [dataPointsResource, setdataPointsResource] = useState({});
  const [barDataResource, setBarDataResource] = useState(barDataResourceVar);
  const [barDataResourceWater, setBarDataResourceWater] = useState(barDataResourceVar);
  const [barDataResourceWaste, setBarDataResourceWaste] = useState(barDataResourceVar);

  const [activeWidget, setActiveWidget] = useState(props.path == 'Resource' ? 'resourceEnergy' : props.path == 'Energy' ? 'electricity' : props.path == 'Water' ? 'municipal' : props.path == 'Waste' ? 'municipal' : '');
  const [activewidgetLabel, setActiveWidgetLabel] = useState('Energy Consumption Over Time');
  const [activeWidgetDoughnutLabel, setActiveWidgetDoughnutLabel] = useState('Energy Comparison');
  const [spinning, setSpinning] = useState(true);
  const [graphSectionTwo, setGraphSectionTwo] = useState(null);
  const [graphSectionTwoDoughnut1, setGraphSectionTwoDoughnut1] = useState(null);
  const [graphSectionTwoDoughnut2, setGraphSectionTwoDoughnut2] = useState(null);

  const setTypeFn = (e) => {
    sessionStorage.setItem('activeWidget', e);
    sessionStorage.setItem('clickedPath', e);
    //setstate variable
    console.log('e inside settypefn:', e);
    setActiveWidget(e);
    if (e == 'resourceEnergy') {
      setActiveWidgetLabel('Energy Consumption Over Time');
      setActiveWidgetDoughnutLabel('Energy Comparison');
    }
    else if (e == 'resourceWater') {
      setActiveWidgetLabel('Water Consumption Over Time');
      setActiveWidgetDoughnutLabel('Water Comparison');
    }
    else if (e == 'resourceWaste') {
      setActiveWidgetLabel('Waste Generation Over Time');
      setActiveWidgetDoughnutLabel('Waste Comparison');
    }
    else if (e == 'electricity') {
      setActiveWidgetLabel('Electricity Generation Over Time');
      setActiveWidgetDoughnutLabel('Electricity Generation Comparison');
    }
    else if (e == 'building_energy') {
      setActiveWidgetLabel('Building Energy Consumption Over Time');
      setActiveWidgetDoughnutLabel('Building Energy Comparison');
    }
    else if (e == 'electric_vehicle') {
      setActiveWidgetLabel('EV Consumption Over Time');
      setActiveWidgetDoughnutLabel('EV Consumption Comparison');
    }

    else if (props.path == 'Waste' && e == 'municipal') {
      setActiveWidgetLabel('Construction Waste Over Time');
      setActiveWidgetDoughnutLabel('Waste Comparison');
    }
    else if (props.path == 'Waste' && e == 'tanker') {
      setActiveWidgetLabel('Wet Waste Over Time');
      setActiveWidgetDoughnutLabel('Waste Comparison');
    }
    else if (props.path == 'Waste' && e == 'borewell') {
      setActiveWidgetLabel('EWaste Over Time');
      setActiveWidgetDoughnutLabel('Waste Comparison');
    }
    else if (props.path == 'Waste' && e == 'alternative') {
      setActiveWidgetLabel('EWaste Over Time');
      setActiveWidgetDoughnutLabel('Waste Comparison');
    }
    else if (props.path == 'Waste' && e == 'treated') {
      setActiveWidgetLabel('Organic Waste Over Time');
      setActiveWidgetDoughnutLabel('Waste Comparison');
    }
    else if (e == 'municipal') {
      setActiveWidgetLabel('Municipal Water Consumption Over Time');
      setActiveWidgetDoughnutLabel('Water Comparison');
    }
    else if (e == 'treated') {
      setActiveWidgetLabel('Treated Water Over Time');
      setActiveWidgetDoughnutLabel('Water Comparison');
    }
    else if (e == 'borewell') {
      setActiveWidgetLabel('Borewell Water Over Time');
      setActiveWidgetDoughnutLabel('Water Comparison');
    }
    else if (e == 'alternative') {
      setActiveWidgetLabel('Alternative Water Over Time');
      setActiveWidgetDoughnutLabel('Water Comparison');
    }
    else if (e == 'tanker') {
      setActiveWidgetLabel('Water Tanker Consumption Over Time');
      setActiveWidgetDoughnutLabel('Water Comparison');
    }


    console.log('onclick of header items:', e);
    setType(e);
    getGraphs(e, 'mouseClick');
  }

  var energybarOptions = {
    responsive: true,
    id: "barChartId",
    className: "barchartClass",
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    plugins: {
      legend: {
        display: false,
        maxWidth: '20'
      },
      datalabels: {
        display: true,  // Show data labels
        color: 'white', // Label text color
        font: {
          weight: 'bold', // Font weight
          size: 10,       // Font size
        },
        align: 'end',    // Position the labels at the top of the bars
        anchor: 'end',   // Anchor the labels to the top
        padding: {
          top: -20
        },     // Add padding above the bar to space the label away from the bar
      },
    },

    scales: {

      x: {
        barPercentage: 0.2,
        grid: { display: false },
        ticks: {
          color: 'white',
          beginAtZero: true
        }
      },

      y: {
        ticks: {
          color: 'white',
          beginAtZero: true
        },
        beginAtZero: true,
        title: {
          display: true,
          text: 'Gwh',
          color: 'white'
        },
        padding: {
          bottom: '20'
        },
        grid: {
          display: true,
          color: '#ffffff33'
        }


      }
    }
  };
  var waterbarOptions = {
    responsive: true,
    id: "barChartId",
    className: "barchartClass",
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    plugins: {
      legend: {
        display: false,
        maxWidth: '20'
      },
      datalabels: {
        display: true,  // Show data labels
        color: 'white', // Label text color
        font: {
          weight: 'bold', // Font weight
          size: 10,       // Font size
        },
        align: 'top',    // Position the labels at the top of the bars
        anchor: 'end',
        clip: false,
        clamp: true,   // Anchor the labels to the top
        padding: {
          top: -15
        }     // Add padding above the bar to space the label away from the bar
      },
      tooltip: {

        enabled: true,

      }
    },

    scales: {

      x: {
        barPercentage: 0.2,
        grid: { display: false },
        ticks: {
          color: 'white',
          beginAtZero: true
        }
      },

      y: {
        ticks: {
          color: 'white',
          beginAtZero: true
        },
        beginAtZero: true,
        title: {
          display: true,
          text: 'Million Gallons',
          color: 'white'
        },
        padding: {
          bottom: '20'
        },
        grid: {
          display: true,
          color: '#ffffff33'
        }


      }
    }
  };

  var wastebarOptions = {
    responsive: true,
    id: "barChartId",
    className: "barchartClass",
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    plugins: {
      legend: {
        display: false,
        maxWidth: '20'
      },
      datalabels: {
        display: true,  // Show data labels
        color: 'white', // Label text color
        font: {
          weight: 'bold', // Font weight
          size: 10,       // Font size
        },
        align: 'end',    // Position the labels at the top of the bars
        anchor: 'end',   // Anchor the labels to the top

        clip: false,
        clamp: true,   // Anchor the labels to the top
        padding: {
          top: -15 // Add padding above the bar to space the label away from the bar
        }
      },
    },

    scales: {

      x: {
        ticks: {
          color: 'white',
          beginAtZero: true
        },
        barPercentage: 0.2,
        grid: { display: false }

      },

      y: {
        ticks: {
          color: 'white',
          beginAtZero: true
        },
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tonne',
          color: 'white'
        },
        padding: {
          bottom: '20'
        },
        grid: {
          display: true,
          color: '#ffffff33'
        }


      }
    }
  };
  const elementHeightRef = useRef(null);
  const elementHeightRefDoughnut1 = useRef(null);
  const elementHeightRefDoughnut2 = useRef(null);
  useEffect(() => {


    console.log('useeffect of main work area:', JSON.stringify(props));
    if (elementHeightRef.current) {
      const elementHeight = elementHeightRef.current.offsetHeight;
      console.log('elementHeight', elementHeight);
      setGraphSectionTwo(elementHeight - 30);
    }

    if (elementHeightRefDoughnut1.current) {
      const elementHeightDoughnut = elementHeightRefDoughnut1.current.offsetHeight;
      console.log('elementHeightDoughnut1:', elementHeightDoughnut);
      setGraphSectionTwoDoughnut1(elementHeightDoughnut * 0.7);
    }
    if (elementHeightRefDoughnut2.current) {
      const elementHeightDoughnut = elementHeightRefDoughnut2.current.offsetHeight;
      console.log('elementHeightDoughnut2:', elementHeightDoughnut);
      setGraphSectionTwoDoughnut2(elementHeightDoughnut * 0.7);
    }
    if (prevPropValuePath !== props.path || prevPropValueData !== props.data) {
      let type = ''
      props.path == 'Energy' ? type = 'electricity' : props.path == 'Water' ? type = 'municipal' : props.path == 'Waste' ? type = 'municipal' : props.path == 'Resource' ? type = 'resourceEnergy' : '';
      getGraphs(type, null);

    }

  }, [props.path, props.data]);


  const divStyle: React.CSSProperties = {
    height: `${graphSectionTwo}px`
  }
  const divStyleDoughnut1: React.CSSProperties = {
    height: `${graphSectionTwoDoughnut1}px`,
    textAlign: 'left',

  }
  const divStyleDoughnut2: React.CSSProperties = {
    height: `${graphSectionTwoDoughnut2}px`,
    textAlign: 'left',
    paddingLeft: '5px'
  }


  const getGraphs = (typeVar, mouseClick) => {
    console.log('typeVar:', typeVar);
    setSpinning(true);
    //CG_WATER_SUBMENU_HEADER: water and waste submenus header
    if ((props.path == "Water" || props.path == "Waste")) {
      if (props.path == "Waste" && sessionStorage.getItem('clickedPath') == "Waste" && !mouseClick) {
        setActiveWidget('municipal');
        setActiveWidgetLabel("Construction Waste Over Time");
        setActiveWidgetDoughnutLabel("Waste Comparison");

      }
      else if (props.path == "Water" && sessionStorage.getItem('clickedPath') == "Water" && !mouseClick) {
        setActiveWidget('municipal');
        setActiveWidgetLabel("Municipal Water Consumption Over Time");
        setActiveWidgetDoughnutLabel("Water Comparison");
      }
      else {
        typeVar = sessionStorage.getItem('clickedPath');
      }
      //receiving water/waste submenu header data:
      props.data.filter(item => { return item.name == 'headerPayload' })[0].payload.sumColumn ? delete props.data.filter(item => { return item.name == 'headerPayload' })[0].payload.sumColumn : typeVar;
      let headerwaterPayload = props.data.filter(item => { return item.name == 'headerPayload' })[0].payload;
      headerwaterPayload.variableTypes = ["Water Consumption Through Tanker Water", "Water Consumption Through Ground Water","Treated","Alternative","Tanker", "Food Waste Consumption", "Organic Waste Consumption", "E-Waste Consumption", "Real Estate Waste Consumption"];
      axios({
        method: 'POST', url: window.config.CG_HEADER_NEW,
        data: headerwaterPayload

      }).then(resp => {
        console.log('resp for water headers:', resp);

        if (props.path == 'Water') {
          setalternativeData(resp.data[0]["alternativeData"] || 0);
          setborewellData(parseFloat(resp.data[0]["Water Consumption Through Ground Water"]).toFixed(0));

          setmunicipalData(parseFloat(resp.data[0]["Water Consumption Through Tanker Water"]).toFixed(0));
          settankerData(resp.data[0]["Tanker Water"] || 0);
          settreatedData(resp.data[0]["Treated Water"] || 0);
        }
        else if (props.path == 'Waste') {

          setborewellData(parseFloat(resp.data[0]["E-Waste Consumption"]).toFixed(0));
          setmunicipalData(parseFloat(resp.data[0]["Real Estate Waste Consumption"]).toFixed(0));
          settankerData(parseFloat(resp.data[0]["Food Waste Consumption"]).toFixed(0));
          settreatedData(parseFloat(resp.data[0]["Organic Waste Consumption"]).toFixed(0));

        }

        //set second doughnut chart data for water/waste submenu from the header response:

        if (props.path == 'Water' || props.path == 'Waste') {
          let dataPoints2 = [];

          let colors = ['#2C98BD', '#49B4D8', '#3C829D', '#2E5F72', '#9CE8B7', '#7DC696', '#6CB385', '#55A471', '#468F60', '#39774F'];
          let total = 0;
          if (props.path == 'Water') {
            dataPoints2 = [];
            total = parseFloat(resp.data[0]["Water Consumption Through Ground Water"]) + parseFloat(resp.data[0]["Water Consumption Through Tanker Water"]);

            dataPoints2.push({ name: "Borewell", y: (parseFloat(resp.data[0]["Water Consumption Through Ground Water"] / total) * 100).toFixed(2), color: colors[0], indexLabelFontColor: '#ffffff' });
            dataPoints2.push({ name: "Municipal", y: (parseFloat(resp.data[0]["Water Consumption Through Tanker Water"] / total) * 100).toFixed(2), color: colors[1], indexLabelFontColor: '#ffffff' });


          }
          else if (props.path == 'Waste') {
            dataPoints2 = [];
            total = 0;
            total = parseFloat(resp.data[0]["Real Estate Waste Consumption"]) + parseFloat(resp.data[0]["E-Waste Consumption"]) + parseFloat(resp.data[0]["Food Waste Consumption"]) + parseFloat(resp.data[0]["Organic Waste Consumption"]);
            console.log('waste total: ', total, "construction waste", ((Math.round(parseFloat(resp.data[0]["Real Estate Waste Consumption"] / total) * 100)).toFixed(2)));

            dataPoints2.push({ name: "E-Waste", y: (parseFloat(resp.data[0]["E-Waste Consumption"] / total) * 100).toFixed(2), color: colors[1], indexLabelFontColor: '#ffffff' });

            dataPoints2.push({ name: "Wet Waste", y: (parseFloat(resp.data[0]["Food Waste Consumption"] / total) * 100).toFixed(2), color: colors[2], indexLabelFontColor: '#ffffff' });

            dataPoints2.push({ name: "Organic", y: (parseFloat(resp.data[0]["Organic Waste Consumption"] / total) * 100).toFixed(2), color: colors[3], indexLabelFontColor: '#ffffff' });

            dataPoints2.push({ name: "Construction Waste", y: (parseFloat(resp.data[0]["Real Estate Waste Consumption"] / total) * 100).toFixed(2), color: colors[0], indexLabelFontColor: '#ffffff' });

          }
          console.log("dataPoints2:", dataPoints2)
          if (total != 0) { setDataPoints2(dataPoints2); }
          else { setDataPoints2([]); }

        }

        setSpinning(false);
      }).catch(e => {
        console.log('e::', e);
        setSpinning(false);
      })

      //water charts bar graph data:
      let payload = props.data.filter(item => { return item.name == 'headerPayload' })[0].payload;
      payload.sumColumn = typeVar || type;
      if (typeVar == "municipal" && props.path == 'Water') {
        payload.variableType = "Water Consumption Through Tanker Water";
      }
      else if (typeVar == "treated" && props.path == 'Water') {
        payload.variableType = "Treated";
      }
      else if (typeVar == "borewell" && props.path == 'Water') {
        payload.variableType = "Water Consumption Through Ground Water";
      }
      else if (typeVar == "alternative" && props.path == 'Water') {
        payload.variableType = "Alternative";
      }
      else if (typeVar == "tanker" && props.path == 'Water') {
        payload.variableType = "Tanker";
      }
      else if (typeVar == "tanker" && props.path == 'Waste') {
        payload.variableType = "Food Waste Consumption";
      }
      else if (typeVar == "treated" && props.path == 'Waste') {
        payload.variableType = "Organic Waste Consumption";
      }
      else if (typeVar == "borewell" && props.path == 'Waste') {
        payload.variableType = "E-Waste Consumption";
      }
      else if (typeVar == "municipal" && props.path == 'Waste') {
        payload.variableType = "Real Estate Waste Consumption";
      }
      else {
        payload.variableType = ''
      }

      axios({
        method: 'POST', url: window.config.CG_BAR_NEW,
        data: payload

      }).then(resp => {
        setSpinning(false);

        if (props.path == 'Water' && (typeVar == 'treated' || typeVar == 'municipal' || typeVar == 'borewell' || typeVar == 'alternative' || typeVar == 'tanker')) {
          console.log('resp for municipal water graph data:', resp);
          barDataWaterVar.labels = [];
          barDataWaterVar.datasets[0].data = [];
          barDataWaterVar.datasets[0].label = 'MGal';
          let barDataLabel2 = '';
          resp.data.forEach(item => {
            barDataWaterVar.datasets[0].data.push(item[payload.variableType]);
            barDataWaterVar.labels.push(item.month ? item.month : item.year);
          })
          setBarDataWater(barDataWaterVar);
          window.barDataWater = barDataWaterVar;
          setBarDataLabel2(barDataLabel2)
        }
        else if (props.path == "Waste" && (typeVar == 'municipal' || typeVar == 'tanker' || typeVar == 'borewell' || typeVar == 'alternative' || typeVar == 'treated')) {


          console.log('resp for municipal water graph data:', resp);
          barDataWasteVar.labels = [];
          barDataWasteVar.datasets[0].data = [];
          resp.data && resp.data.forEach(item => {
            barDataWasteVar.datasets[0].data.push(item[payload.variableType]);
            barDataWasteVar.labels.push(item.month ? item.month : item.year);
            barDataWasteVar.datasets[0].label = 'Tonne';
          })
          setBarDataWaste(barDataWasteVar)
          window.barDataWaste = barDataWasteVar;
        }
      }).catch(e => {
        console.log('e::', e);
        setSpinning(false);
        setBarDataWater(barDataWaterVar);
        window.barDataWater = barDataWaterVar;
        setBarDataWaste(barDataWasteVar);
        window.barDataWaste = barDataWasteVar;
        setBarDataLabel2('');
      })

      //doughnut for water:
      let payloadDoughnut = props.data.filter(item => { return item.name == 'doughnutPayload' })[0].payload;
      payloadDoughnut.sum_column = typeVar || type;
      if (typeVar == 'municipal' && props.path == 'Water') {
        payloadDoughnut.variableType = "Water Consumption Through Tanker Water"
      }
      else if (typeVar == 'treated' && props.path == 'Water') {
        payloadDoughnut.variableType = "Treated"
      }
      else if (typeVar == 'treated' && props.path == 'Waste') {
        payloadDoughnut.variableType = "Organic Waste Consumption"
      }
      else if (typeVar == 'alternative' && props.path == 'Water') {
        payloadDoughnut.variableType = "Alternative"
      }
      else if (typeVar == 'tanker' && props.path == 'Water') {
        payloadDoughnut.variableType = "Tanker"
      }
      else if(typeVar == 'tanker' && props.path == 'Waste'){
payloadDoughnut.variableType = "Food Waste Consumption";
      }
      else if (typeVar == 'borewell' && props.path == 'Water') {
        payloadDoughnut.variableType = "Water Consumption Through Ground Water"
      }
      else if (typeVar == "borewell" && props.path == 'Waste') {
        payloadDoughnut.variableType = "E-Waste Consumption";
      }
      else if (typeVar == "municipal" && props.path == 'Waste') {
        payloadDoughnut.variableType = "Real Estate Waste Consumption";
      }
      /*
      if (typeVar == "municipal" && props.path == 'Water') {
              payload.variableType = "Water Consumption Through Tanker Water";
            }
            else if (typeVar == "borewell" && props.path == 'Water') {
              payload.variableType = "Water Consumption Through Ground Water";
            }
            else if (typeVar == "tanker" && props.path == 'Waste') {
              payload.variableType = "Food Waste Consumption";
            }
            else if (typeVar == "treated" && props.path == 'Waste') {
              payload.variableType = "Organic Waste Consumption";
            }
            else if (typeVar == "borewell" && props.path == 'Waste') {
              payload.variableType = "E-Waste Consumption";
            }
            else if (typeVar == "municipal" && props.path == 'Waste') {
              payload.variableType = "Real Estate Waste Consumption";
            }
      */


      axios({
        method: 'POST', url: window.config.CG_DOUGHNUT_LOCATION_BASED_COMPARISON, headers: { "Content-Type": "application/json" },
        data: payloadDoughnut

      }).then(resp => {
        setSpinning(false);
        console.log('water doughnut response:', resp.data);
        //{"electric": "500","buildingElectricity": "300","electricVehicle": "200"}
        let datapoints = [];

        let colors = ['#2C98BD', '#49B4D8', '#3C829D', '#2E5F72', '#9CE8B7', '#7DC696', '#6CB385', '#55A471', '#468F60', '#39774F'];
        let total = 0;
        resp.data && resp.data.forEach((item, i) => {
          // datapoints.push({name: item['location'], y:item[typeVar]});

          total = total + parseFloat(item["variableData"]);
        })

        resp.data && resp.data.forEach((item, i) => {
          // datapoints.push({name: item['location'], y:item[typeVar]});
          total != 0 && datapoints.push({ name: item['location'], y: ((item["variableData"] / total) * 100).toFixed(2), 'color': colors[i], indexLabelFontColor: '#ffffff' });

        })
        console.log("datapoints water/waste:", datapoints);
        setWaterDoughnutData(datapoints);

        //setChartData(oldArray => [...oldArray,{type:'energy', data:response.data}] );

      }).catch(e => {
        setSpinning(false);
        console.log('error:', e);
        dataPoints = [];
        setWaterDoughnutData(datapoints);
      })
    }
    else if (props.path == "Energy") {
      if (sessionStorage.getItem('clickedPath') == 'Energy' && !mouseClick) {
        setActiveWidget('electricity');
        setActiveWidgetLabel('Electricity Generation Over Time');
        setActiveWidgetDoughnutLabel('Electricity Generation Comparison');
      }
      else {
        typeVar = sessionStorage.getItem('clickedPath');
      }
      console.log('typevar inside energy:', typeVar)
      //header data for energy:
      //barOptions.scales.y.title.text = 'Gwh';
      let newHeaderPayload = props.data.filter(item => { return item.name == 'headerPayload' })[0].payload;


      delete newHeaderPayload.variableType;
      delete newHeaderPayload.sumColumn;


      newHeaderPayload.variableTypes = ["Building Energy", "Building Electricity", "EV Energy Consumption", "On-site Solar Energy Consumption",
        "OFF-site Solar Energy Consumption",
        "Renewable Energy Certificate Energy Consumption",
        "Green Utility Program Energy Consumption",
        "Building Non-Renewable Energy Consumption",
        "Diesel Energy Consumption",
        "Gas Energy Consumption",
        "Bio Gas Energy Consumption",
        "Office Commute",
        "Personal Commute"];



      axios({ url: window.config.CG_HEADER_NEW, method: 'POST', data: newHeaderPayload }).then(resp => {
        console.log('energy doughnut 2 resp:', resp)
        if (resp.data && resp.status != 204) {


          setSpinning(false);
          console.log('response:', resp);
          //{"electric": "500","buildingElectricity": "300","electricVehicle": "200"}
          setelectric(resp.data[0]["Building Electricity"]);
          window.electric = resp.data[0]["Building Electricity"];

          setbuildingElectricity(resp.data[0]["Building Energy"] || 0);
          window.buildingElectricity = resp.data[0]["Building Energy"];
          setelectricVehicle(resp.data[0]["EV Energy Consumption"] || 0);
          window.electricVehicle = resp.data[0]["EV Energy Consumption"];
          //setChartData(oldArray => [...oldArray,{type:'energy', data:response.data}] );
          let dataPoints2 = [];
          if (typeVar == 'electricity') {
            dataPoints2 = [];
            let colors = ['#2A5FBA', '#26788C', '#52DCFF', '#A19547', '#0A9A7C'];
            if (resp.data[0]["On-site Solar Energy Consumption"]) {
              let total = parseFloat(resp.data[0]["On-site Solar Energy Consumption"]) + parseFloat(resp.data[0]["OFF-site Solar Energy Consumption"]) + parseFloat(resp.data[0]["Renewable Energy Certificate Energy Consumption"]) + parseFloat(resp.data[0]["Green Utility Program Energy Consumption"]) + parseFloat(resp.data[0]["Building Non-Renewable Energy Consumption"]);

              dataPoints2.push({ name: "On-site Solar", y: ((resp.data[0]["On-site Solar Energy Consumption"] / total) * 100).toFixed(2), color: colors[0], indexLabelFontColor: '#ffffff' });
              dataPoints2.push({ name: "OFF-site Solar", y: ((resp.data[0]["OFF-site Solar Energy Consumption"] / total) * 100).toFixed(2), color: colors[1], indexLabelFontColor: '#ffffff' });
              dataPoints2.push({ name: "REC", y: ((resp.data[0]["Renewable Energy Certificate Energy Consumption"] / total) * 100).toFixed(2), color: colors[2], indexLabelFontColor: '#ffffff' });

              dataPoints2.push({ name: "GUP", y: ((resp.data[0]["Green Utility Program Energy Consumption"] / total) * 100).toFixed(2), color: colors[3], indexLabelFontColor: '#ffffff' })
              dataPoints2.push({ name: "Non-Renewable", y: ((resp.data[0]["Building Non-Renewable Energy Consumption"] / total) * 100).toFixed(2), color: colors[4], indexLabelFontColor: '#ffffff' })
            }
          }
          else if (typeVar == 'building_energy') {
            dataPoints2 = [];//"Onsite Solar": 124188
            let colors = ['#359bb5', '#7c9f4d', '#9c6565', '#247e96'];

            let total = parseFloat(resp.data[0]["Diesel Energy Consumption"]) + parseFloat(resp.data[0]["Gas Energy Consumption"]) + parseFloat(resp.data[0]["Bio Gas Energy Consumption"]);
            console.log('total:', total, "Diesel Energy Consumption: ", ((parseFloat(resp.data[0]["Diesel Energy Consumption"]) / total) * 100).toFixed(2));
            if (total != 0) {
              dataPoints2.push({ name: "Diesel Energy Consumption", y: ((parseFloat(resp.data[0]["Diesel Energy Consumption"]) / total) * 100).toFixed(2), color: colors[0], indexLabelFontColor: '#ffffff' });
              dataPoints2.push({ name: "Gas Energy Consumption", y: ((parseFloat(resp.data[0]["Gas Energy Consumption"]) / total) * 100).toFixed(2), color: colors[1], indexLabelFontColor: '#ffffff' });
              dataPoints2.push({ name: "Bio Gas Energy Consumption", y: ((parseFloat(resp.data[0]["Bio Gas Energy Consumption"]) / total) * 100).toFixed(2), color: colors[2], indexLabelFontColor: '#ffffff' });
            }


          }
          else if (typeVar == 'electric_vehicle') {
            dataPoints2 = [];
            let colors = ['#3564b5', '#0dc1ce'];
            let total = parseFloat(resp.data[0]["EV Energy Consumption"]);
            //resp.data[0]["EV Energy Consumption"]
            if (total != 0) {
              dataPoints2.push({ name: "EV Energy", y: ((parseFloat(resp.data[0]["EV Energy Consumption"]) / total) * 100).toFixed(2), color: colors[0], indexLabelFontColor: '#ffffff' });

            }


            //commenting below code to fix no data for EV sub categories:
            // if (resp.data["Office Commute"]) {
            // dataPoints2.push({ name: "Office Commute", y: resp.data["Office Commute"], color: colors[0], indexLabelFontColor: '#ffffff' });
            // dataPoints2.push({ name: "Personal Commute", y: resp.data["Personal Commute"], color: colors[1], indexLabelFontColor: '#ffffff' });
            //}
            if (total != 0) { setDataPoints2(dataPoints2); }
            else { setDataPoints2([]); }
          }



        }
        else {
          //handling 204 case:
          setelectric(0);
          window.electric = 0;
          setbuildingElectricity(0);
          window.buildingElectricity = 0
          setelectricVehicle(0);
          window.electricVehicle = 0;
          setDataPoints2([]);
        }
      }).catch(error => {
        console.log('error:', error);
        setDataPoints2(dataPoints2);
      })



      //get bar graph data for energy items: 
      // building electricity: sumColumn=electricity, building energy: sumColumn=building_energy, electric vehicle:sumColumn=electric_vehicle
      console.log('typevar inside energy:', typeVar)
      let payload = props.data.filter(item => { return item.name == 'headerPayload' })[0].payload;
      delete payload.variableTypes;
      if (typeVar == 'building_energy') {
        payload.variableType = 'Building Energy';
      }
      else if (typeVar == 'electricity') {
        payload.variableType = 'Building Electricity';
      }
      else if (typeVar == 'electric_vehicle') {
        payload.variableType = 'EV Energy Consumption';
      }
      axios({
        method: 'POST', url: window.config.CG_BAR_NEW, headers: { "Content-Type": "application/json" },
        data: payload

      }).then(resp => {
        setSpinning(false);
        console.log('energy bar response:', resp);
        //{"electric": "500","buildingElectricity": "300","electricVehicle": "200"}

        barDataEnergyVar.datasets[0].data = [];
        barDataEnergyVar.labels = [];
        resp.data && resp.data.forEach(item => {
          console.log('energy bar data item:', item)
          barDataEnergyVar.datasets[0].data.push(item[payload.variableType]);
          barDataEnergyVar.labels.push(item.month ? item.month : item.year);

        })
        setBarDataEnergy(barDataEnergyVar);
        window.barDataEnergy = barDataEnergyVar;
        console.log('barDataEnergyVar: ', barDataEnergyVar, ":", energybarOptions)
        //setChartData(oldArray => [...oldArray,{type:'energy', data:response.data}] );

      }).catch(e => {
        setSpinning(false);
        console.log('error:', e);
        setBarDataEnergy(barDataEnergyVar);
        window.barDataEnergy = barDataEnergyVar
      })

      //location based doughnut for energy:
      let payloadDoughnut = props.data.filter(item => { return item.name == 'doughnutPayload' })[0].payload;
      payloadDoughnut.sum_column = typeVarPayload;
      var typeVarPayload = ''
      if (typeVar == 'electricity') {
        typeVarPayload = 'electricity';
        payloadDoughnut.variableType = 'Building Electricity';
      }
      else if (typeVar == 'building_energy') {
        typeVarPayload = 'building_energy';
        payloadDoughnut.variableType = 'Building Energy';
      }
      else if (typeVar == 'electric_vehicle') {
        typeVarPayload = 'electric_vehicle';
        payloadDoughnut.variableType = 'EV Energy Consumption';
      }
      console.log('typevar inside energy:', typeVar);

      axios({
        method: 'POST', url: window.config.CG_DOUGHNUT_LOCATION_BASED_COMPARISON, headers: { "Content-Type": "application/json" },
        data: payloadDoughnut

      }).then(resp => {
        setSpinning(false);
        console.log('energy doughnut response:', resp);
        //{"electric": "500","buildingElectricity": "300","electricVehicle": "200"}
        let datapoints = [];

        let colors = ['#2C98BD', '#49B4D8', '#3C829D', '#2E5F72', '#9CE8B7', '#7DC696', '#6CB385', '#55A471', '#468F60', '#39774F']
        let total = 0;
        resp.data && resp.data.forEach((item, i) => {
          total = total + parseFloat(item['variableData']);
        })
        if (total != 0) {
          resp.data && resp.data.forEach((item, i) => {
            // datapoints.push({name: item['location'], y:item[typeVar]});


            datapoints.push({ name: item['location'], y: ((item['variableData'] / total) * 100).toFixed(2), 'color': colors[i], indexLabelFontColor: '#ffffff' });
          })
        }
        setEnergyDoughnutData(datapoints);

        //setChartData(oldArray => [...oldArray,{type:'energy', data:response.data}] );

      }).catch(e => {
        setSpinning(false);
        console.log('error:', e);
      })


    }
    else if (props.path == 'Resource') {

      if (sessionStorage.getItem('clickedPath') == 'Resource' && !mouseClick) {
        setActiveWidget('resourceEnergy');
        setActiveWidgetLabel('Energy Consumption Over Time');
        setActiveWidgetDoughnutLabel('Energy Comparison');
      }
      else {
        typeVar = sessionStorage.getItem('clickedPath');
      }

      let resourceBarpayload = props.data.filter(item => { return item.name == 'headerPayload' })[0].payload;
      if (typeVar == 'resourceEnergy') {
        resourceBarpayload.variableType = 'Energy Consumption';
      }
      else if (typeVar == 'resourceWater') {
        resourceBarpayload.variableType = 'Water Consumption';
      }
      else if (typeVar == 'resourceWaste') {
        resourceBarpayload.variableType = 'Waste Consumption';
      }
      axios({
        method: 'POST', url: window.config.CG_BAR_NEW, headers: { "Content-Type": "application/json" },
        data: resourceBarpayload

      }).then(resp => {
        setSpinning(false);
        console.log('resource bar response:', resp);
        //{"electric": "500","buildingElectricity": "300","electricVehicle": "200"}

        barDataResourceVar.datasets[0].data = [];
        barDataResourceVar.labels = [];
        resp.data && resp.data.forEach(item => {
          console.log('energy bar data item:', item)
          barDataResourceVar.datasets[0].data.push(item[payload.variableType]);
          barDataResourceVar.labels.push(item.month ? item.month : item.year);

        })
        setBarDataResource(barDataResourceVar);
        setBarDataResourceWater(barDataResourceVar);
        setBarDataResourceWaste(barDataResourceVar);
        window.barDataResource = barDataResourceVar;
        console.log('barDataResourceVar: ', barDataResourceVar, ":", energybarOptions)
        //setChartData(oldArray => [...oldArray,{type:'energy', data:response.data}] );

      }).catch(e => {
        setSpinning(false);
        console.log('error:', e);
        setBarDataResource(barDataResourceVar);
        setBarDataResourceWater(barDataResourceVar);
        setBarDataResourceWaste(barDataResourceVar);
        window.barDataResource = barDataResourceVar
      })

      let datapoints2payload = props.data.filter(item => { return item.name == 'headerPayload' })[0].payload;
      if (typeVar == "resourceEnergy") {
        datapoints2payload.variableTypes = ["Building Energy", "Building Electricity", "EV Energy Consumption"]
      }
      else if (typeVar == "resourceWater") {
        datapoints2payload.variableTypes = ["Borewell", "Alternative", "Tanker", "Municipal", "Treated"]
      }
      else if (typeVar == "resourceWaste") {
        datapoints2payload.variableTypes = ["Organic Waste", "Wet Waste", "Construction Waste", "Waste"]
      }

      //getting water and waste header data inside resource:
      props.data.filter(item => { return item.name == 'headerPayload' })[0].payload.sumColumn ? delete props.data.filter(item => { return item.name == 'headerPayload' })[0].payload.sumColumn : typeVar;
      let payloadWaterResource = props.data.filter(item => { return item.name == 'headerPayload' })[0].payload;
      if (typeVar == 'resourceWater') {
        payloadWaterResource.variableTypes = ["Water Consumption Through Ground Water", "Water Consumption Through Tanker Water"];
      }
      else if (typeVar == 'resourceWaste') {
        payloadWaterResource.variableTypes = ["Food Waste Consumption", "Organic Waste Consumption", "E-Waste Consumption", "Real Estate Waste Consumption"];
      }
      else if (typeVar == 'resourceEnergy') {
        payloadWaterResource.variableTypes = ["Building Energy", "Building Electricity", "EV Energy Consumption"];
      }

      axios({
        method: 'POST', url: window.config.CG_HEADER_NEW,
        data: payloadWaterResource

      }).then(resp => {
        console.log('resp for water headers:', resp);

        setSpinning(false);
        setalternativeData(resp.data["alternativeData"]);
        setborewellData(resp.data["borewellData"]);

        setmunicipalData(resp.data["municipalData"]);
        settankerData(resp.data["tankerData"]);
        settreatedData(resp.data["treatedData"]);

        let dataPoints2 = [];


        if (typeVar == 'resourceWater') {
          dataPoints2 = [];
          let data = [resp.data["Water Consumption Through Ground Water"] != 'None' ? resp.data["municipalData"] : 0, resp.data["treatedData"] != 'None' ? resp.data["treatedData"] : 0, resp.data["borewellData"] != 'None' ? resp.data["borewellData"] : 0, resp.data["alternativeData"] != 'None' ? resp.data["alternativeData"] : 0, resp.data["tankerData"] != 'None' ? resp.data["tankerData"] : 0];

          let total = parseFloat(resp.data[0]["Water Consumption Through Ground Water"]) + parseFloat(resp.data[0]["Water Consumption Through Tanker Water"]);
          if (isNaN(total)) {
            setDataPoints2(dataPoints2);
          }
          else {
            let labels = ["Water Consumption Through Ground Water", "Water Consumption Through Tanker Water"];
            let colors = ['#2C98BD', '#49B4D8', '#3C829D', '#2E5F72', '#9CE8B7', '#7DC696', '#6CB385', '#55A471', '#468F60', '#39774F']

            dataPoints2.push({ name: labels[0], y: ((resp.data[0]["Water Consumption Through Ground Water"] / total) * 100).toFixed(2), color: colors[0], indexLabelFontColor: '#ffffff' });
            dataPoints2.push({ name: labels[1], y: ((resp.data[0]["Water Consumption Through Tanker Water"] / total) * 100).toFixed(2), color: colors[1], indexLabelFontColor: '#ffffff' });



            setDataPoints2(dataPoints2);
          }
        }
        else if (typeVar == 'resourceWaste') {
          dataPoints2 = [];


          let total = parseFloat(resp.data[0]["E-Waste Consumption"]) + parseFloat(resp.data[0]["Food Waste Consumption"]) + parseFloat(resp.data[0]["Organic Waste Consumption"]) + parseFloat(resp.data[0]["Real Estate Waste Consumption"]);
          if (isNaN(total)) {
            setDataPoints2(dataPoints2);
          }
          else {

            let labels = ["E-Waste", "Food Waste", "Organic Waste", "Construction Waste"];
            let colors = ['#2C98BD', '#49B4D8', '#3C829D', '#2E5F72', '#9CE8B7', '#7DC696', '#6CB385', '#55A471', '#468F60', '#39774F']

            dataPoints2.push({ name: labels[0], y: ((resp.data[0]["E-Waste Consumption"] / total) * 100).toFixed(2), color: colors[0], indexLabelFontColor: '#ffffff' });
            dataPoints2.push({ name: labels[1], y: ((resp.data[0]["Food Waste Consumption"] / total) * 100).toFixed(2), color: colors[1], indexLabelFontColor: '#ffffff' });
            dataPoints2.push({ name: labels[2], y: ((resp.data[0]["Organic Waste Consumption"] / total) * 100).toFixed(2), color: colors[2], indexLabelFontColor: '#ffffff' });
            dataPoints2.push({ name: labels[3], y: ((resp.data[0]["Real Estate Waste Consumption"] / total) * 100).toFixed(2), color: colors[3], indexLabelFontColor: '#ffffff' });

            setDataPoints2(dataPoints2);
          }
        }
        else if (typeVar == 'resourceEnergy') {
          dataPoints2 = [];


          let total = parseFloat(resp.data[0]["Building Electricity"]) + parseFloat(resp.data[0]["Building Energy"]) + parseFloat(resp.data[0]["EV Energy Consumption"]);
          if (isNaN(total)) {
            setDataPoints2(dataPoints2);
          }
          else {

            let labels = ["Building Electricity", "Building Energy", "EV Energy Consumption"];
            let colors = ['#2C98BD', '#49B4D8', '#3C829D', '#2E5F72', '#9CE8B7', '#7DC696', '#6CB385', '#55A471', '#468F60', '#39774F']

            dataPoints2.push({ name: labels[0], y: ((resp.data[0]["Building Electricity"] / total) * 100).toFixed(2), color: colors[0], indexLabelFontColor: '#ffffff' });
            dataPoints2.push({ name: labels[1], y: ((resp.data[0]["Building Energy"] / total) * 100).toFixed(2), color: colors[1], indexLabelFontColor: '#ffffff' });
            dataPoints2.push({ name: labels[2], y: ((resp.data[0]["EV Energy Consumption"] / total) * 100).toFixed(2), color: colors[2], indexLabelFontColor: '#ffffff' });

            setDataPoints2(dataPoints2);
          }
        }

      }).catch(e => {
        setSpinning(false);
        console.log('e::', e);
      })

      let payloadtypeVar = '';
      if (typeVar == 'resourceEnergy') {
        payloadtypeVar = 'energy';
      }
      else if (typeVar == 'resourceWater' || typeVar == 'resourceWaste') {
        payloadtypeVar = 'water';
      }
      let payload = props.data.filter(item => { return item.name == 'headerPayload' })[0].payload;
      payload.sumColumn = payloadtypeVar;
      let propdata = [];
      if (typeVar == 'resourceEnergy') {
        propdata = props.data.filter(item => { return item.name == 'Energy Consumption' && item.type == 'bar' });
      }
      else if (typeVar == 'resourceWater' || typeVar == 'resourceWaste') {
        propdata = props.data.filter(item => { return item.name == 'Water Consumption' && item.type == 'bar' });
      }


      //doughnut for resource:
      let payloadTypeVar = '';
      if (typeVar == 'resourceEnergy') {
        payloadTypeVar = 'energy_consumption';
      }
      else if (typeVar == 'resourceWater' || typeVar == 'resourceWaste') {
        payloadTypeVar = 'water_consumption';
      }

      let payloadDoughnut = props.data.filter(item => { return item.name == 'doughnutPayload' })[0].payload;
      payloadDoughnut.sum_column = payloadTypeVar;

      let url = '';
      if (typeVar == 'resourceWater') {
        url = window.config.CG_DOUGHNUT_LOCATION_BASED_COMPARISON;
        payloadDoughnut.variableType = "Water Consumption";
      }
      else if (typeVar == 'resourceEnergy') {
        url = window.config.CG_DOUGHNUT_LOCATION_BASED_COMPARISON;
        payloadDoughnut.variableType = "Energy Consumption";
      }
      else if (typeVar == 'resourceWaste') {
        url = window.config.CG_DOUGHNUT_LOCATION_BASED_COMPARISON;
        payloadDoughnut.variableType = "Waste Consumption";
      }
      axios({
        method: 'POST', url: url, headers: { "Content-Type": "application/json" },
        data: payloadDoughnut

      }).then(resp => {
        setSpinning(false);
        console.log('doughnut response:', resp);
        //{"electric": "500","buildingElectricity": "300","electricVehicle": "200"}
        let datapoints = [];

        // let colors=['#2C98BD', '#49B4D8', '#3C829D', '#2E5F72', '#9CE8B7', '#7DC696', '#6CB385', '#55A471', '#468F60', '#39774F']
        let colors = ['#47eb65', '#2ea4e1', '#e9e212'];
        let total = 0;
        resp.data && resp.data.forEach((item, i) => {
          total = total + parseFloat(item['variableData']);
        })
        resp.data && resp.data.forEach((item, i) => {
          // datapoints.push({name: item['location'], y:item[typeVar]});
          // datapoints.push({name: item['location'], y:{typeVar=='water'?item['water']:item['energy_kwh']}, 'color':colors[i], indexLabelFontColor:'#ffffff'});
          if (typeVar == 'resourceEnergy') {


            datapoints.push({ name: item['location'], y: ((item['variableData'] / total) * 100).toFixed(2), 'color': colors[i], indexLabelFontColor: '#ffffff' });
          }
          else if (typeVar == 'resourceWater') {
            datapoints.push({ name: item['location'], y: ((item['variableData'] / total) * 100).toFixed(2), 'color': colors[i], indexLabelFontColor: '#ffffff' });
          }
          else if (typeVar == 'resourceWaste') {

            datapoints.push({ name: item['location'], y: ((item['variableData'] / total) * 100).toFixed(2), 'color': colors[i], indexLabelFontColor: '#ffffff' });
          }


        })
        console.log("data points doughnut resource:", datapoints)
        setdataPointsResource(datapoints);
      }).catch(e => {

        setdataPointsResource([]);
        setSpinning(false);
        console.log('error:', e);
      })
    }

    //Second doughnut charts:
    let data = {
      labels: [], // Label for each segment
      datasets: [
        {
          label: ' MW',
          data: [], // Data for each segment
          //backgroundColor: ['#72edf2', '#1a8fa0', '#423393', '#4e95ca', '#3276a9', '#3070a1','#69917f','#d9e3de'], // Segment colors
          backgroundColor: ['#2C98BD', '#49B4D8', '#3C829D', '#2E5F72', '#9CE8B7', '#7DC696', '#6CB385', '#55A471', '#468F60', '#39774F'],
          //backgroundColor:['#5959ed','#6161f5','#6767fb','#7070ff','#7a7aff','#8282ff'],
          borderColor: ['black', 'black', 'black'], // Border colors
          borderWidth: 0,
          borderRadius: 10
        },
      ],
    };

    let dataPoints = [];
    if (data && data.datasets[0] && data.datasets[0].data) {
      data.datasets[0].data.forEach((item, index) => {
        dataPoints.push({ name: data.labels[index], y: item, color: '#2C98BD', indexLabelFontColor: '#ffffff' });
      })
    }
    else {
      dataPoints = []
    }

    //category-based doughnut charts:

  }

  { (document.getElementsByClassName("canvasjs-chart-canvas") && document.getElementsByClassName("canvasjs-chart-canvas")[1]) ? document.getElementsByClassName("canvasjs-chart-canvas")[1].style.display = 'None' : '' }
  // Layout for Water and Waste (No changes)


  const openModal = (data, type, title, options) => {
    console.log("inside open modal: ", data, "::", type, "::", title, "::", options);
    if (type == 'bar') {
      window.barData = data;
      window.type = 'bar';
      window.label = title;
      window.barOptions = options;
    }
    else if (type == 'doughnut') {
      window.dataPoints = data;
      window.type = 'doughnut';
      window.label = title;
    }


    setIsModalOpen(true);

  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (props.path === "Water") {
    return (
      <div className="water-page resource-page">
        <div className="header-Path page-title">
          <span style={{ color: "gray", fontSize: "12px", pointerEvents: 'auto', cursor: 'pointer' }} onClick={e => handleDashboardClick(e)} >Dashboard &gt;</span>
          <span style={{ fontSize: '12px' }}>   {props.path}</span>
        </div>
        <div className="cards-list">
          <div className={activeWidget == 'municipal' ? "cards  municipal-card active-card " : "cards municipal-card"} onClick={e => setTypeFn('municipal')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{municipalData != 'None' ? municipalData : '0'}</span>
              <span className="card-unit">MGal</span>
              <span className="card-text">Municipal</span>
            </div>
          </div>
          <div className={activeWidget == 'treated' ? "cards treated-card active-card" : "cards treated-card"} onClick={e => setTypeFn('treated')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{treatedData != 'None' ? treatedData : '0'}</span>
              <span className="card-unit">MGal</span>
              <span className="card-text">Treated</span>
            </div>
          </div>
          <div className={activeWidget == 'borewell' ? "cards borewell-card active-card" : "cards borewell-card"} onClick={e => setTypeFn('borewell')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{borewellData != 'None' ? borewellData : '0'}</span>
              <span className="card-unit">MGal</span>
              <span className="card-text">Borewell</span>
            </div>
          </div>
          <div className={activeWidget == 'alternative' ? "cards alternative-card active-card" : "cards alternative-card"} onClick={e => setTypeFn('alternative')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{alternativeData != 'None' ? alternativeData : '0'}</span>
              <span className="card-unit">MGal</span>
              <span className="card-text">Alternative</span>
            </div>
          </div>
          <div className={activeWidget == 'tanker' ? "cards tanker-card active-card" : "cards tanker-card"} onClick={e => setTypeFn('tanker')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{tankerData != 'None' ? tankerData : '0'}</span>
              <span className="card-unit">MGal</span>
              <span className="card-text">Tanker</span>
            </div>
          </div>



        </div>
        <div className="section-wrapper">
          <div className="left-section" >
            {activewidgetLabel}
            <div className="unity-wrapper expand-icon" onClick={e => openModal(barDataWater, 'bar', activewidgetLabel, waterbarOptions)}>

            </div>
            <div className='unity-section-graphs' ref={elementHeightRef}  >
              <Bar ref={chartRef} style={divStyle} data={window.barDataWater || barDataWater} options={waterbarOptions} maintainAspectRatio={true} />
              <div className="label2Class">{window.label2Water || barDataLabel2}</div>
            </div>

          </div>
          <div className="right-section">
            <div className="graph-section-wrapper">
              <div className="graph-section-one" ref={elementHeightRefDoughnut2}>
                <div style={divStyleDoughnut2}>Location - Wise Comparison
                  {graphSectionTwoDoughnut2 && <ResponsiveDoughnutChart dataPoints={waterDoughnutData} canvasHeight={graphSectionTwoDoughnut2} />}
                </div>
                <span className="expand-icon" onClick={e => openModal(waterDoughnutData, 'doughnut', activeWidgetDoughnutLabel)}></span>

              </div>
              <div className="graph-section-two" ref={elementHeightRefDoughnut2} >

                <div style={divStyleDoughnut2}>&nbsp; &nbsp; Source Comparison
                  {graphSectionTwoDoughnut2 && <ResponsiveDoughnutChart dataPoints={dataPoints2} canvasHeight={graphSectionTwoDoughnut2} />}
                </div>
                <span className="expand-icon" onClick={e => openModal(dataPoints2, 'doughnut', activeWidgetDoughnutLabel)}></span>

              </div>
            </div>
          </div>
        </div>

        <Modal wrapClassName="custom-modal-wrapper" title={window.label} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width='100vw' height='80vh' footer={null} destroyOnClose={true}>

          {window.type == 'doughnut' ? graphSectionTwo && <ResponsiveDoughnutChart dataPoints={window.dataPoints} /> : window.type == 'bar' ? <ResponsiveContainer width="100%" height="100%"><Bar ref={chartRef} data={window.barData} options={window.barOptions} maintainAspectRatio={false} /><div className="label2Class">{window.label2Water || barDataLabel2}</div></ResponsiveContainer> : ''}
        </Modal>
      </div>
    );
  }
  else if (props.path == "Waste") {
    return (
      <div className="resource-page waste-page">
        <div className="header-Path page-title">
          <span style={{ color: "gray", fontSize: "12px", pointerEvents: 'auto', cursor: 'pointer' }} onClick={e => handleDashboardClick(e)} >Dashboard &gt;</span>
          <span style={{ fontSize: '12px' }}>   {props.path}</span>
        </div>
        <div className="cards-list">
          <div className={activeWidget == 'municipal' ? "cards  constructionWaste-card active-card " : "cards constructionWaste-card"} onClick={e => setTypeFn('municipal')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{municipalData != 'None' ? municipalData : '0'}</span>
              <span className="card-unit">Tonne</span>
              <span className="card-text">Construction Waste</span>
            </div>
          </div>
          <div className={activeWidget == 'tanker' ? "cards wetWaste-card active-card" : "cards wetWaste-card"} onClick={e => setTypeFn('tanker')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{tankerData != 'None' ? tankerData : '0'}</span>
              <span className="card-unit">Tonne</span>
              <span className="card-text">Wet Waste</span>
            </div>
          </div>
          <div className={activeWidget == 'treated' ? "cards organicWaste-card active-card" : "cards organicWaste-card"} onClick={e => setTypeFn('treated')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{treatedData != 'None' ? treatedData : '0'} </span>
              <span className="card-unit">Tonne</span>
              <span className="card-text">Organic</span>
            </div>
          </div>
          <div className={activeWidget == 'borewell' ? "cards eWaste-card active-card" : "cards eWaste-card"} onClick={e => setTypeFn('borewell')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{borewellData != 'None' ? borewellData : '0'}</span>
              <span className="card-unit">Tonne</span>
              <span className="card-text">EWaste</span>
            </div>
          </div>
        </div>
        <div className="section-wrapper">
          <div className="left-section" >
            {activewidgetLabel}
            <div className="unity-wrapper expand-icon" onClick={e => openModal(barDataWaste, 'bar', activewidgetLabel, wastebarOptions)}>

            </div>
            <div className='unity-section-graphs' ref={elementHeightRef}  >
              <Bar ref={chartRef} data={window.barDataWaste || barDataWaste} style={divStyle} options={wastebarOptions} maintainAspectRatio={false} />
              <div className="label2Class">{window.label2Waste || barDataLabel2}</div>
            </div>

          </div>
          <div className="right-section">
            <div className="graph-section-wrapper">
              <div className="graph-section-one" ref={elementHeightRefDoughnut2}>
                <div style={divStyleDoughnut2}>Location - Wise Comparison
                  {graphSectionTwoDoughnut2 && <ResponsiveDoughnutChart dataPoints={waterDoughnutData} canvasHeight={graphSectionTwoDoughnut2} />}
                </div>
                <span className="expand-icon" onClick={e => openModal(waterDoughnutData, 'doughnut', activeWidgetDoughnutLabel)}></span>

              </div>
              <div className="graph-section-two" ref={elementHeightRefDoughnut2} >

                <div style={divStyleDoughnut2}>&nbsp; &nbsp; Source Comparison
                  {graphSectionTwoDoughnut2 && <ResponsiveDoughnutChart dataPoints={dataPoints2} canvasHeight={graphSectionTwoDoughnut2} />}
                </div>
                <span className="expand-icon" onClick={e => openModal(dataPoints2, 'doughnut', activeWidgetDoughnutLabel)}></span>

              </div>
            </div>
          </div>
        </div>

        <Modal wrapClassName="custom-modal-wrapper" title={window.label} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width='100vw' height='80vh' footer={null} destroyOnClose={true}>
          {window.type == 'doughnut' ? graphSectionTwo && <ResponsiveDoughnutChart dataPoints={window.dataPoints} /> : window.type == 'bar' ? <ResponsiveContainer width="100%" height="100%"><Bar ref={chartRef} data={window.barData} options={window.barOptions} maintainAspectRatio={false} /><div className="label2Class">{window.label2Waste || barDataLabel2}</div></ResponsiveContainer> : ''}

        </Modal>
      </div>
    );
  }

  else if (props.path === "Resource") {
    // Layout for Resource and Energy (with conditional rendering for different labels)
    return (
      <div className="resource-page">
        <div className="header-Path page-title">
          <span style={{ color: "gray", fontSize: "12px", pointerEvents: 'auto', cursor: 'pointer' }} onClick={e => handleDashboardClick(e)} >Dashboard &gt;</span>
          <span style={{ fontSize: '12px' }}>   {props.path}</span>
        </div>
        <div className="cards-list">
          <div className={activeWidget == 'resourceEnergy' ? "cards active-card energy-card" : "cards energy-card"} style={{ paddingRight: '90px' }} onClick={e => setTypeFn('resourceEnergy')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{(props.headerData[0].data && props.headerData[0].data != 'None') ? parseFloat(props.headerData[0].data).toFixed(0) : '0'}</span>
              <span className="card-unit">Gwh</span>
              <span className="card-text">Energy</span>
            </div>
          </div>
          <div className={activeWidget == 'resourceWater' ? "cards water-card active-card" : "cards water-card"} style={{ paddingRight: '90px' }} onClick={e => setTypeFn('resourceWater')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{(props.headerData[1].data && props.headerData[0].data != 'None') ? parseFloat(props.headerData[1].data).toFixed(0) : '0'}</span>
              <span className="card-unit">MGal</span>
              <span className="card-text">Water</span>
            </div>
          </div>
          <div className={activeWidget == 'resourceWaste' ? "cards waste-card active-card" : "cards waste-card"} style={{ paddingRight: '90px' }} onClick={e => setTypeFn('resourceWaste')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{(props.headerData[4]?.data && props.headerData[4]?.data != 'None') ? parseFloat(props.headerData[4]?.data).toFixed(0) : '0'}</span>
              <span className="card-unit">Tonne</span>
              <span className="card-text">Waste</span>
            </div>
          </div>
        </div>
        <div className="section-wrapper">
          <div className="left-section" >
            {activewidgetLabel}
            <div className="unity-wrapper expand-icon" onClick={e => openModal(activeWidget == "resourceEnergy" ? (window.barDataResource || barDataResource) : activeWidget == "resourceWater" ? barDataResourceWater : activeWidget == "resourceWaste" ? barDataResourceWaste : '', 'bar', activewidgetLabel, activeWidget == "resourceEnergy" ? energybarOptions : activeWidget == "resourceWater" ? waterbarOptions : activeWidget == "resourceWaste" ? wastebarOptions : '')}>

            </div>
            <div className='unity-section-graphs' ref={elementHeightRef}  >
              <Bar ref={chartRef} data={activeWidget == "resourceEnergy" ? (window.barDataResource || barDataResource) : activeWidget == "resourceWater" ? barDataResourceWater : activeWidget == "resourceWaste" ? barDataResourceWaste : ''} style={divStyle} options={activeWidget == "resourceEnergy" ? energybarOptions : activeWidget == "resourceWater" ? waterbarOptions : activeWidget == "resourceWaste" ? wastebarOptions : ''} maintainAspectRatio={false} />

              <div className="label2Class">{window.label2 || barDataLabel2}</div>
            </div>

          </div>
          <div className="right-section">
            <div className="graph-section-wrapper">
              <div className="graph-section-one" ref={elementHeightRefDoughnut2}>
                <div style={divStyleDoughnut2}>Location - Wise Comparison
                  {graphSectionTwoDoughnut2 && <ResponsiveDoughnutChart dataPoints={dataPointsResource} canvasHeight={graphSectionTwoDoughnut2} />}
                </div>
                <span className="expand-icon" onClick={e => openModal(dataPointsResource, 'doughnut', activeWidgetDoughnutLabel)}></span>

              </div>
              <div className="graph-section-two" ref={elementHeightRefDoughnut2} >

                <div style={divStyleDoughnut2}>&nbsp; &nbsp; Source Comparison
                  {graphSectionTwoDoughnut2 && <ResponsiveDoughnutChart dataPoints={dataPoints2} canvasHeight={graphSectionTwoDoughnut2} />}
                </div>
                <span className="expand-icon" onClick={e => openModal(dataPoints2, 'doughnut', activeWidgetDoughnutLabel)}></span>

              </div>
            </div>
          </div>
        </div>

        <Modal wrapClassName="custom-modal-wrapper" title={window.label} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width='100vw' height='80vh' footer={null} destroyOnClose={true}>
          {window.type == 'doughnut' ? graphSectionTwo && <ResponsiveDoughnutChart dataPoints={window.dataPoints} /> : window.type == 'bar' ? <ResponsiveContainer width="100%" height="100%"><Bar ref={chartRef} data={window.barData} options={window.barOptions} maintainAspectRatio={false} /><div className="label2Class">{window.label2 || barDataLabel2}</div></ResponsiveContainer> : ''}
        </Modal>
      </div>
    );
  }
  else if (props.path === "Energy") {
    // Layout for Resource and Energy (with conditional rendering for different labels)
    return (
      <div className="resource-page">
        <div className="header-Path page-title">
          <span style={{ color: "gray", fontSize: "12px", pointerEvents: 'auto', cursor: 'pointer' }} onClick={e => handleDashboardClick(e)} >Dashboard &gt;</span>
          <span style={{ fontSize: '12px' }}>   {props.path}</span>
        </div>
        <div className="cards-list">
          <div className={activeWidget == 'electricity' ? "cards active-card bldgElectricity-card" : "cards bldgElectricity-card"} onClick={e => setTypeFn('electricity')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{electric != 'None' ? parseFloat(electric).toFixed(0) : '0'} </span>
              <span className="card-unit">Gwh</span>
              <span className="card-text">Building Electricity</span>
            </div>
          </div>
          <div className={activeWidget == 'building_energy' ? "cards bldgEnergy-card active-card" : "cards bldgEnergy-card"} onClick={e => setTypeFn('building_energy')}>
            <span></span>
            <div className="card-info">
              <span className="card-amt">{buildingElectricity != 'None' ? parseFloat(buildingElectricity).toFixed(0) : '0'}</span>
              <span className="card-unit">Gwh</span>
              <span className="card-text">Building Energy</span>
            </div>
          </div>
          <div className={activeWidget == 'electric_vehicle' ? "cards ev-card active-card" : "cards ev-card"} onClick={e => setTypeFn('electric_vehicle')}>

            <span></span>
            <div className="card-info">
              <span className="card-amt">{electricVehicle != 'None' ? parseFloat(electricVehicle).toFixed(0) : '0'}</span>
              <span className="card-unit">Gwh</span>
              <span className="card-text">Electric Vehicle</span>
            </div>
          </div>
        </div>
        <div className="section-wrapper">
          <div className="left-section">
            {activewidgetLabel}
            <div className="unity-wrapper expand-icon" onClick={e => openModal(barDataEnergy, 'bar', activewidgetLabel, energybarOptions)}>
            </div>
            <div className='unity-section-graphs' ref={elementHeightRef}  >
              <Bar ref={chartRef} data={window.barDataEnergy || barDataEnergy} style={divStyle} options={energybarOptions} maintainAspectRatio={false} />
              <div className="label2Class">{window.label2Energy || barDataLabel2}</div>
            </div>
          </div>
          <div className="right-section">
            <div className="graph-section-wrapper">
              <div className="graph-section-one" ref={elementHeightRefDoughnut2}>
                <div style={divStyleDoughnut2}>Location - Wise Comparison
                  {graphSectionTwoDoughnut2 && <ResponsiveDoughnutChart dataPoints={energyDoughnutData} canvasHeight={graphSectionTwoDoughnut2} />}
                </div>
                <span className="expand-icon" onClick={e => openModal(energyDoughnutData, 'doughnut', activeWidgetDoughnutLabel)}></span>

              </div>
              <div className="graph-section-two" ref={elementHeightRefDoughnut2}>

                <div style={divStyleDoughnut2}>&nbsp; &nbsp; Source Comparison
                  {graphSectionTwoDoughnut2 && <ResponsiveDoughnutChart dataPoints={dataPoints2} canvasHeight={graphSectionTwoDoughnut2} />}
                </div>
                <span className="expand-icon" onClick={e => openModal(dataPoints2, 'doughnut', activeWidgetDoughnutLabel)}></span>

              </div>
            </div>
          </div>

          <Modal wrapClassName="custom-modal-wrapper" title={window.label} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width='100vw' height='80vh' footer={null} destroyOnClose={true}>
            {window.type == 'doughnut' ? graphSectionTwo && <ResponsiveDoughnutChart dataPoints={window.dataPoints} /> : window.type == 'bar' ? <ResponsiveContainer width="100%" height="100%"><Bar ref={chartRef} data={window.barData} options={window.barOptions} maintainAspectRatio={false} /><div className="label2Class">{window.label2Energy || barDataLabel2}</div></ResponsiveContainer> : ''}
          </Modal>
        </div>
      </div>
    );
  }
};



const WidgetCard = ({ imgSrc, value, label, unit, widgetType, onClick }) => {
  return (
    <div className="submenu-widget-card">
      {/* Icon Section */}
      <div className={`submenu-widget-icon-container icon-${widgetType}`}>
        <img src={imgSrc} alt={label} className={`submenu-widget-icon icon-${widgetType}`} />
      </div>

      {/* Value Section */}
      <div className="submenu-widget-value-container">
        <span className={`submenu-widget-value value-${widgetType}`}>
          {value}
        </span>
        {/* Unit Section */}
        <span className={`submenu-widget-unit unit-${widgetType}`}>
          {unit}
        </span>
      </div>

      {/* Label Section */}
      <div className={`submenu-widget-label-container label-${widgetType}`}>
        <div className={`submenu-widget-label label-${widgetType}`}>{label}</div>
      </div>
    </div>
  );
};
