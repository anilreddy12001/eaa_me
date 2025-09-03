import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { PieChart, Cell, Sector, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

import { createRoot } from 'react-dom/client';

import { Doughnut, Line, Bar, Pie } from 'react-chartjs-2';
import ResponsiveDoughnutChart from '../charts/responsiveDoughnutChart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Widgets from "../widgets";
import MainWorkAreaComponentGraph from "../mainworkAreagraph";
import Dashboard from "../dashboard"
import { ArrowsAltOutlined, DownOutlined,ArrowRightOutlined } from '@ant-design/icons';

import { Modal, Select } from "antd";
import "./charts.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { color } from 'chart.js/helpers';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);
export default function Charts(props) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [co2Data, setCo2Data] = useState('');
  const [chartsData, setChartsData] = useState(null);
  const chartRef = useRef(null);
  const [widgetType, setWidgetType] = useState('Energy Consumption');
  const [gradient, setGradient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [barData, setBarData] = useState(false);
  const [graphSectionTwo, setGraphSectionTwo] = useState(null);
  const [type,setType]=useState(null);
  const [dataPoints,setDataPoints]=useState('');
  const showModal = (data, type) => {
    setIsModalOpen(true);
    if(type=='bar'){
      setType('bar');
    setBarData(data);
    }
    else if(type=='doughnut'){
setType('doughnut');
window.dataPoints=data;
setDataPoints(data);
    }

    document.getElementById("digitalTwinId")? document.getElementById("digitalTwinId").style.display = "none":'';
    document.getElementById("chatbotId")? document.getElementById("chatbotId").style.display = "none":'';

  };
  const elementHeightRef = useRef(null);
  useEffect(()=>{
    if (elementHeightRef.current) {
      const elementHeight = elementHeightRef.current.offsetHeight;
      console.log('elementHeight', elementHeight);
      setGraphSectionTwo(elementHeight - 20);
    }
  },[]);

  const divStyle:React.CSSProperties = {
    height:`${graphSectionTwo}px`
  }
  console.log('props inside charts:', props);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);

    // gradient.addColorStop(0, '#06EFFE ');  // Start color
    // gradient.addColorStop(0.4, '#438BC8 ');
    // gradient.addColorStop(1, '#161f63 ');
    //     #1BB372
    // #3F6FA5
    // #6033D2
    // #740EEE
    // #7C00F9

    // Add color stops
    // gradient.addColorStop(0, '#A1C6EA');   // Light Blue at the top (0% mark)
    // gradient.addColorStop(0.25, '#74A9D8'); // A bit darker blue (25% mark)
    // gradient.addColorStop(0.5, '#3F6FA5');  // Darker Blue at the middle (50% mark)
    // gradient.addColorStop(0.75, '#2C3B6A'); // Even darker blue (75% mark)
    // gradient.addColorStop(1, '#161f63');

  gradient.addColorStop(0, 'green');  
    // End color
    return gradient;
  };
  useEffect(() => {
    const canvas = chartRef.current?.canvas;
    if (canvas) {     // Set custom width, height, and padding    canvas.width = 600;  // Set the canvas width    canvas.height = 400; // Set the canvas height    canvas.style.padding = '20px'; // Add padding    canvas.style.backgroundColor = 'lightgray'; // Optional backgroundconst ctx = canvas.getContext('2d');     if (ctx) { setGradient(createGradient(ctx)); // Set gradient after the component is mounted } } }, []);
      const ctx = chartRef.current?.canvas.getContext('2d');

      if (ctx) {
        //ctx.translate(25, 25);
        setGradient(createGradient(ctx)); // Set gradient after the component is mounted
      }
    }
  }, []);


  var barOptions = {
    responsive: true,
    id: "barChartId",
    className: "barchartClass",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        maxWidth: '20'
      },
      datalabels: {
        display: false,  // Show data labels
        color: 'white', // Label text color
        font: {
          weight: 'bold', // Font weight
          size: 10,       // Font size
        },
        align: 'end',    // Position the labels at the top of the bars
        anchor: 'end',   // Anchor the labels to the top
        padding: -2,     // Add padding above the bar to space the label away from the bar
      },
    },

    scales: {

      x: {
        barPercentage: 0.2,
        grid: { display: false },
      
        ticks: {
            color:'white',
          beginAtZero: true
      },
      },

      y: {
        beginAtZero: true,
ticks: {
            color:'white',
          beginAtZero: true
      },
        title: {
          display: true,
          color:'white',
          font: {
            weight: 'bold', // Font weight
            size: 12,       // Font size
          },

          text:'Gwh'
        },
        padding: {
          bottom: '20',
        },
        grid: {
          display: true,
          color: '#ffffff33'
        }


      }
    }
  };
  console.log('chart props:', props, ' process.env(import.meta.env): ', import.meta.env);
  const getChartFn = (e) => {
    //({ size = 200, strokeWidth = 10 })
   // console.log('e inside charts:', e);


    const options = [];
    if (e && e.type == 'bar' && e.name == widgetType) {
      if (e.content) {

      }

      




      var barDatavar = {
        labels: [],
        datasets: [
          {
            label: 'Gwh',
            data: [],//[12, 19, 13, 15, 12, 9]
            backgroundColor: gradient || 'green',
            maxBarThickness: 50,
//            borderRadius: e.content.data.length < 5 ? 10 : 10/e.content.data.length,
            borderRadius: (30/e.content.data.length)>10?10:2*(30/e.content.data.length),//30/5, 50/6
            fill: true
          },

          // {
          //   label: 'Expenses',
          //   data: [8, 15, 2, 3, 1, 2],
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
        ],
      };

      var yAxisKey = '';

      if (widgetType == "Energy Consumption") {
        yAxisKey = 'Energy Consumption';
        barOptions.scales.y.title.text='Gwh';
      }
      else if (widgetType == "Renewable Energy") {
        yAxisKey = "Renewable Energy Consumption";
        barOptions.scales.y.title.text='Gwh';
      }
      else if (widgetType == "Emission Reduction") {
        yAxisKey = "Corban Emission";
        barOptions.scales.y.title.text='Tonne';
        barDatavar.datasets[0].label='Tonne';
      }
      else if (widgetType == "Water Consumption") {
        yAxisKey = "Water Consumption";
        barOptions.scales.y.title.text='MGal';
        barDatavar.datasets[0].label='MGal';
      }

      //      widgetType=="Energy Consumption"?'energy_kwh':"Renewable":"","Emission":"emission_reduction","Water":"water" };

      if (e.content.data.length > 0) {
        e.content.data.forEach(item => {
          barDatavar.labels.push(item.month?item.month:item.year);
          barDatavar.datasets[0].data.push(item[yAxisKey]);

        })
      }
      //energyConsumption_2023:response.data.energyConsumption_2023,energyConsumption_2024: response.data.energyConsumption_2024,energyConsumption_2025: response.data.energyConsumption_2025





      return <>
      <span className="expand-icon" onClick={e=>showModal(barDatavar, 'bar')}> </span>
        <span className="graphTypeDropdown" > Graph Type  <DownOutlined /></span>
        {/* <Select    placeholder="Graph Type"></Select> */}
        {/* <ArrowsAltOutlined style={{ color: '#ffffff', float: 'right', top: '-3vh', right: '1vw', position: 'relative', zIndex: '2' }} onClick={e => showModal(barDatavar)} /> */}
       {graphSectionTwo && <div className='bar-position-center' style={divStyle} > <Bar ref={chartRef} data={barDatavar} options={barOptions} maintainAspectRatio={false} /><div className="label2ClassLandingPage">{window.label2}</div></div>}

      </>
    }
    else if (e && e.type == 'doughnut' && e.name == widgetType) {
      console.log("doughnut data:", e.data);
      let COLORS = ['#2C98BD', '#49B4D8', '#3C829D', '#2E5F72', '#9CE8B7', '#7DC696', '#6CB385', '#55A471', '#468F60', '#39774F'];


      if (widgetType == "Energy Consumption") {
        yAxisKey = 'variableData';
        barOptions.scales.y.title.text='GWh';
      }
      else if (widgetType == "Renewable Energy") {
        yAxisKey = "variableData";
        barOptions.scales.y.title.text='GWh';
      }
      else if (widgetType == "Emission Reduction") {
        yAxisKey = "variableData";
        barOptions.scales.y.title.text='Tonne';
      }
      else if (widgetType == "Water Consumption") {
        yAxisKey = "variableData";
        barOptions.scales.y.title.text='MGal';
      }


      let data = {
        labels: [], // Label for each segment
        datasets: [
          {
            maxBarThickness: 50,
            label: ' MW',
            data: [], // Data for each segment
            //backgroundColor: ['#72edf2', '#1a8fa0', '#423393', '#4e95ca', '#3276a9', '#3070a1','#69917f','#d9e3de'], // Segment colors
            backgroundColor: ['#2C98BD', '#49B4D8', '#3C829D', '#2E5F72', '#9CE8B7', '#7DC696', '#6CB385', '#55A471', '#468F60', '#39774F'],
            //backgroundColor:['#5959ed','#6161f5','#6767fb','#7070ff','#7a7aff','#8282ff'],
            borderColor: ['black', 'black', 'black'], // Border colors
            borderWidth: 10,
            borderRadius: 0
          },
        ],
      };
      console.log('e.content.data:', e.content.data);
      if (e.content.data && e.content.data.data && e.content.data.data.length > 0 && widgetType == 'Energy Consumption') {
        e.content.data.data.forEach(item => {
          data.datasets[0].data.push(item.energy_consumption);
          data.labels.push(item.year);
        })
      }
      else if (e.content.data && e.content.data.data && e.content.data.data.length > 0 && widgetType == 'Water Consumption') {
        e.content.data.data.forEach(item => {
          data.datasets[0].data.push(item.water_consumption);
          data.labels.push(item.year);
        })
      }
      else {
        // data.datasets[0].data = ['100'];
        // data.labels = ["All"];
      }

      let total=0;
      e.content && e.content.data.length>0 && e.content.data.forEach(item=>{
        total=total+parseFloat(item['variableData']);
      
      })
      e.content && e.content.data.length>0 && e.content.data.forEach(item=>{
        data.datasets[0].data.push(((item['variableData']/total)*100).toFixed(2))
        data.labels.push(item.location)
      })
     

      console.log('doughnut data:', data);

      // Doughnut chart options (optional)
      const options = {
        responsive: true,
        cutout: '75%',
        radius: '80%',
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            },
            position: 'right', // Position of the legend (optional)

            display: true
          },
          tooltip: {
            enabled: true, // Show tooltips when hovering over segments
          },
        },
      };


      const size = 200;
      const strokeWidth = 10;
      const radius = (size - strokeWidth) / 2;

      const center = (size + 40) / 2;
      // Function to render custom labels
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
          <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

      // Center Circles (decorative) code:
      const onPieEnter = (_, index) => {
        setActiveIndex(index);
      };
console.log("doughnut data: ", data);
      let dataPoints = [];
      //expected format for reference:   { name: "APAC", y: 5, color: "#49B4D8", indexLabelFontColor: '#ffffff' },
      //   { name: "Americas", y: 31, color: "#2C98BD", indexLabelFontColor: '#ffffff' },
      //   { name: "Europe", y: 100, color: "#3C829D", indexLabelFontColor: '#ffffff' },
      //   { name: "France", y: 17, color: "#2E5F72", indexLabelFontColor: '#ffffff' },
      //   { name: "Others", y: 70, color: "#9CE8B7", indexLabelFontColor: '#ffffff' },
      // ];
      console.log("doughnut data before loop:",data);
      if (data && data.datasets[0] && data.datasets[0].data) {
        let colors=['#47EB65', '#2EA4E1', '#C4B23E', '#2E5F72', '#9CE8B7', '#7DC696', '#6CB385', '#55A471', '#468F60', '#39774F']
        data.datasets[0].data.forEach((item, index) => {
          dataPoints.push({ name: data.labels[index], y: item, color: colors[index], indexLabelFontColor: '#ffffff' });
        })
      }
      return <> <span className="expand-icon" onClick={e=>showModal(dataPoints,'doughnut')}> </span><div style={divStyle}>

        {/* <div className="chart-wrapper"> */}
        <>

          {/* Donut Chart Rendering */}
          {/* <ArrowsAltOutlined style={{ color: '#ffffff', float: 'right', top: '-3vh', right: '1vw', position: 'relative', zIndex: '2' }} onClick={showModal} /> */}
         {graphSectionTwo && <ResponsiveDoughnutChart dataPoints={dataPoints} canvasHeight={graphSectionTwo}/>}
        {/* <Doughnut
            data={data}
            options={options}
            onElementsClick={onPieEnter}
            height={'200px'}
            maintainAspectRatio={false}
            plugins={{
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    // Customize tooltips if needed
                    return tooltipItem.raw + ' MW';
                  },
                },
              },
            }}
          /> */}


        {/* Labels and Arrows */}
        {/* <div
          className="labels-container"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {data.labels.map((label, index) => (
            <div key={index} style={{ margin: '5px' }}>
              <span style={{ fontWeight: '' }}>{label}</span>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: data.datasets[0].backgroundColor[index],
                  borderRadius: '50%',
                  margin: '5px auto',
                }}
              ></div>
            </div>
          ))}
        </div> */}

        {/* Arrows pointing to respective doughnut chart sections */}







</>
      </div>
      </>


    }
    else if (e && e.type == 'line') {

      const data = [
        ["January", 10000],
        ["February", 12000],
        ["March", 18000],
        ["April", 11000],
        ["May", 9000]
      ];

      
      const series = chart.data(data);
      series.normal().fill(['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC'], true);
      series.normal().stroke('none');
      series.normal().shape('cylinder');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

      const lineData = {
        labels: months,
        datasets: [
          {
            
            label: 'Consumption(Gwh)',
            data: [12, 19, 13, 15, 12, 9],
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
          }
        ],
      };

      const options = {
        responsive: true,

        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };

      return <Line data={lineData} options={options} height={'100%'} maintainAspectRatio={false} />
    }
  }


  const getChart = (e) => getChartFn(e);
  const CustomTooltip = ({ active, payload, label }) => {
    console.log('custom tooltip params:', active, payload, label);
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#333333dd', border: '1px solid #555555', borderRadius: '5px' }}>
          <p className="label" style={{ color: '#ffffff' }}>{` ${payload[0].name}`}</p>
          <div>
            {payload.map((pld) => (
              <div style={{ display: "inline-block", padding: 10 }}>
                <div style={{ color: pld.fill || '#f0f0f0' }}>{pld.payload.displayValue}</div>
                {/* <div>{pld.dataKey}</div> */}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const sendDataToParent = (data) => { // the callback. Use a better name

    let chartWidgetListVar = props.chartWidgetList;
    if (data) {
      //get water data
      //getChart(item);
      console.log('data from child: ', data);
      setWidgetType(data);
    }

    setChartsData(chartWidgetListVar);
  };


  const getWidgetsFn = () => {
 
    // return <Widgets listOfwidgets={props.widgetList} chartWidgetList={props.chartWidgetList} sendDataToParent={e => sendDataToParent(e)} />
  }
  const handlegraphClick = () => {
    const root = createRoot(document.getElementById("mainContentDiv"));
 
    document.getElementById("digitalTwinId")? document.getElementById("digitalTwinId").style.display = "none":'';
    document.getElementById("chatbotId")? document.getElementById("chatbotId").style.display = "none":'';
    props.sendDataToLandingPage('::ViewGraph');
    // Render page based on the clicked label
    //root.render(<MainWorkAreaComponentGraph path={"View graph"} data={props.chartWidgetList}/>);
  };

  const getWidgetsComponentMemo = useMemo(() => getWidgetsFn(), [props.widgetList]);
  const getViewGraph = () => {

    console.log();
    return <span  className="graph-big-arrow" onClick={handlegraphClick}>
    </span>
  }

  const getElementHeight = () =>{
    const height = document.getElementsByClassName("ant-modal-body");
    alert(height[0].offsetHeight)
    return height[0].offsetHeight;
  }

  return (<>
   <div className="graph-section-one">
   <Dashboard listOfwidgets={props.widgetList} chartWidgetList={props.chartWidgetList} sendDataToParent={e => sendDataToParent(e)}/> 
    </div>
    {getWidgetsComponentMemo}
    {/* {"widget type: "+widgetType} */}

    <div className='graph-header'>
    <span className="cgchartTitle" id="cgchartTitle">
      {props.onLoad?'Energy':widgetType=='Energy Consumption'?'Energy':widgetType=='Water Consumption'?'Water':widgetType}
    </span> 
    {getViewGraph()}

    </div>
    <div className='modalPopup'>
      <Modal wrapClassName="custom-modal-wrapper" title={widgetType}  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        
        {type=='doughnut'?graphSectionTwo && <ResponsiveDoughnutChart dataPoints={dataPoints||window.dataPoints} />:type=='bar'?  <ResponsiveContainer width="100%" height="100%"><Bar ref={chartRef} data={barData} options={barOptions} maintainAspectRatio={false} /><div className="label2ClassLandingPage">{window.label2}</div></ResponsiveContainer>:''}
      </Modal>
    </div>

    {props.chartWidgetList.map((item, index) => {
      let chartClass = item.type === 'bar' ? 'graph-section-two' : 'graph-section-three';
      if (item.name == widgetType) {
        return (<div key={index} ref={elementHeightRef} className={chartClass}> {getChart(item)} </div>);
      }

    })

    }


    {/* {props.chartWidgetList.map(item => <><div className="chartWrapper">{getChart(item)}</div></>)} */}
  </>
  )

}
