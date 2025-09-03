import {React, useEffect,useRef , useState} from "react";
import "./index.css";
import { Doughnut, Line, Bar, Pie } from 'react-chartjs-2';
import ResponsiveDoughnutChart from '../charts/responsiveDoughnutChart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Modal } from 'antd';
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
import { color } from "chart.js/helpers";
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
export default function MainWorkAreaComponentGraph(props) {
  const handleDashboardClick = () => {
    // Change the URL hash to '#dashboard' and the page will be redirected
    window.location.hash = '#/dashboard';
    // window.location.reload();
    props.sendDataToLandingPage('::landingPage')
    
  };

    console.log('props inside mainworkareacomponent graph: ', props);
     const [gradient, setGradient] = useState(null);
     const [chartsData, setChartsData] = useState(null);
      const chartRef = useRef(null);
      const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility state
      const [selectedGraphData, setSelectedGraphData] = useState(null);  // Selected graph data
      const [selectedOptions, setSelectedOptions] = useState(null);  // Selected graph options
      const [selectedTitle, setSelectedTitle] = useState('');
    
      // Function to open the modal and set the corresponding data
      const handleExpandClick = (graphData, options,title) => {
        setSelectedGraphData(graphData);
        setSelectedOptions(options);
        setIsModalOpen(true);  // Open modal
        setSelectedTitle(title);
      };
    
      // Function to close the modal
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
    

    const barData = {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor:  gradient || 'rgba(192, 85, 75, 0.2)',
            
            borderRadius: 0,
            fill: true
          },

        ],
      };
       const options = {
              responsive: true,
              id: "barChartId",
              className:"barchartClass",
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
                  grid: { display: false }
      
                },
      
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'GWH'
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
                    gradient.addColorStop(0, 'green');   // Light Blue at the top (0% mark)
                
                 // End color
                return gradient;
              };
             useEffect(() => {
              const canvas=chartRef.current?.canvas;
              if (canvas) {     // Set custom width, height, and padding    canvas.width = 600;  // Set the canvas width    canvas.height = 400; // Set the canvas height    canvas.style.padding = '20px'; // Add padding    canvas.style.backgroundColor = 'lightgray'; // Optional backgroundconst ctx = canvas.getContext('2d');     if (ctx) { setGradient(createGradient(ctx)); // Set gradient after the component is mounted } } }, []);
                const ctx = chartRef.current?.canvas.getContext('2d');
                
                if (ctx) {
                  //ctx.translate(25,25);
                  setGradient(createGradient(ctx)); // Set gradient after the component is mounted
                }
              }


              }, []);


              var barDataEnergyConsumption={
                labels: [],
                datasets: [
                  {
                    label: '',
                    data: [],
                    backgroundColor:   ' #7ed957',
                    maxBarThickness: 50,
                    borderRadius: 0,
                    fill: 'true'
                  },
        
                ],
              };
              var barDataWaterConsumption={
                labels: [],
                datasets: [
                  {
                    label: '',
                    data: [],
                    backgroundColor:  ' #4cb9e7',
                    maxBarThickness: 50,
                    borderRadius: 0,
                    fill: true
                  },
        
                ],
              };
              var barDataRenewableEnergy={
                labels: [],
                datasets: [
                  {
                    label: '',
                    data: [],
                    backgroundColor:   '#9d8234',
                    maxBarThickness: 50,
                    borderRadius: 0,
                    fill: true
                  },
        
                ],
              };
              var barDataEmissionReduction={
                labels: [],
                datasets: [
                  {
                    label: '',
                    data: [],
                    backgroundColor:   ' #e9967a',
                    maxBarThickness: 50,
                    borderRadius: 0,
                    fill: true
                  },
        
                ],
              };
              var optionsEnergyConsumption={
                responsive: true,
                id: "barChartId",
                className:"barchartClass",
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
                      color: 'white',
                      maxRotation: 45,
                      minRotation: 45,
                      autoSkip: false
                }
                   
        
                  },
        
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color:'white',
                      beginAtZero: true
                },
                    title: {
                      display: true,
                      text: 'GWH',
                      color:"#ffff"
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
              var optionsWaterConsumption={
                responsive: true,
                id: "barChartId",
                className:"barchartClass",
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
                      color: 'white',
                      maxRotation: 45,
                      minRotation: 45,
                      autoSkip: false
                }
                   
        
                  },
        
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color:'white'
                },
                   
                    title: {
                      display: true,
                      text: 'GWH',
                      color: '#ffff',
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
              var optionsRenewableEnergy={
                responsive: true,
                id: "barChartId",
                className:"barchartClass",
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
                      color: 'white',
                      maxRotation: 45,
                      minRotation: 45,
                      autoSkip: false
                }
                   
        
                  },
        
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color:'white'
                },
                   
                    title: {
                      display: true,
                      text: 'GWH',
                      color: '#ffff'
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
              var optionsEmissionReduction={
                responsive: true,
                id: "barChartId",
                className:"barchartClass",
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
                      color: 'white',
                      maxRotation: 45,
                      minRotation: 45,
                      autoSkip: false
                },
                   
        
                  },
        
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color:'white'
                },
                   
                    title: {
                      display: true,
                      text: 'GWH',
                      color:'#ffff'
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
props.data.forEach(item=>{

  var yAxisKey = '';

      if (item.name == "Energy Consumption") {
        yAxisKey = 'Energy Consumption';
        optionsEnergyConsumption.scales.y.title.text='GWh';
      }
      else if (item.name == "Renewable Energy") {
        yAxisKey = "Renewable Energy Consumption";
        optionsRenewableEnergy.scales.y.title.text='GWh';
      }
      else if (item.name == "Emission Reduction") {
        yAxisKey = "Corban Emission";
        optionsEmissionReduction.scales.y.title.text='Tonnnes';
      }
      else if (item.name == "Water Consumption") {
        yAxisKey = "Water Consumption";
        optionsWaterConsumption.scales.y.title.text='Million Gallons';
      }


  if(item.name=="Energy Consumption"){
    item.content&&item.content.data&&item.content.data.forEach(item=>{
    barDataEnergyConsumption.labels.push(item.month?item.month:item.year);
    barDataEnergyConsumption.datasets[0].data.push(item[yAxisKey]);
  });
    barDataEnergyConsumption.datasets[0].borderRadius = (30/barDataEnergyConsumption.datasets[0].data.length)>10?10:2*(30/barDataEnergyConsumption.datasets[0].data.length);
  
}
else if(item.name=="Water Consumption"){
  item.content&&item.content.data&&item.content.data.forEach(item=>{
  barDataWaterConsumption.labels.push(item.month?item.month:item.year);
  barDataWaterConsumption.datasets[0].data.push(item[yAxisKey]);
  });
  
    barDataWaterConsumption.datasets[0].borderRadius = (30/barDataWaterConsumption.datasets[0].data.length)>10?10:2*(30/barDataWaterConsumption.datasets[0].data.length);


}
else if(item.name=="Renewable Energy"){
  item.content&&item.content.data&&item.content.data.forEach(item=>{
  barDataRenewableEnergy.labels.push(item.month?item.month:item.year);
  barDataRenewableEnergy.datasets[0].data.push(item[yAxisKey]);
  });

    barDataRenewableEnergy.datasets[0].borderRadius = (30/barDataRenewableEnergy.datasets[0].data.length)>10?10:2*(30/barDataRenewableEnergy.datasets[0].data.length);
    
  
}
else if(item.name=="Emission Reduction"){
  item.content&&item.content.data&&item.content.data.forEach(item=>{
  barDataEmissionReduction.labels.push(item.month?item.month:item.year);
  barDataEmissionReduction.datasets[0].data.push(item[yAxisKey]);
  });

    barDataEmissionReduction.datasets[0].borderRadius = (30/barDataEmissionReduction.datasets[0].data.length)>10?10:2*(30/barDataEmissionReduction.datasets[0].data.length);;
  
}
})
              const onChartReady = (chart) => {
                // This callback is triggered when the chart is fully initialized
                const ctx = chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, "#06EFFE");
                gradient.addColorStop(0.6, "#438BC8");
                gradient.addColorStop(1, "#2727A1");
            
                chart.data.datasets[0].backgroundColor = gradient;
                chart.update();
              };
              
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
            borderRadius: 0
          },
        ],
      };

   let dataPoints=[
        { name: "APAC", y: 5, color: "#49B4D8", indexLabelFontColor: '#ffffff' },
        { name: "Americas", y: 31, color: "#2C98BD", indexLabelFontColor: '#ffffff' },
        { name: "Europe", y: 100, color: "#3C829D", indexLabelFontColor: '#ffffff' },
        { name: "France", y: 17, color: "#2E5F72", indexLabelFontColor: '#ffffff' },
        { name: "Others", y: 70, color: "#9CE8B7", indexLabelFontColor: '#ffffff' },
      ];
      if( data && data.datasets[0] && data.datasets[0].data){
        data.datasets[0].data.forEach((item,index)=>{
      dataPoints.push({name:data.labels[index], y:item,color:'#2C98BD', indexLabelFontColor: '#ffffff'});
        })
      }

  return (
    <>
   
    <Modal 
    wrapClassName="viewgraph-modal-wrapper"
    title={selectedTitle ? `${selectedTitle} Graph` : "Graph"}
        visible={isModalOpen} 
        onCancel={handleCloseModal} 
        footer={null}  // No footer in the modal
        width={500}
        // You can adjust the width as per your need
      >
        {/* Render the chart inside the modal */}
        {selectedGraphData && selectedOptions && (<>
          <Bar data={selectedGraphData} options={selectedOptions} height={'100%'} maintainAspectRatio={false} />
          <div className="label2ClassViewGRaph">{window.label2}</div></>
        )}
      </Modal>
     
<div className=" header-Path" > <span style={{color:'gray',fontSize:'12px', cursor:'pointer'}} onClick={handleDashboardClick}>Dashboard  &gt;   </span><span style={{fontSize:'10px'}}>View Graph</span></div>
<div id='menuPages' style={{display:'flex'}}>

 <div className=" wrapper-graphoptions" style={{display:'grid', flexDirection:'column'}}>

 <div className="bargraph-container">
    <div className="graph-title" style={{ textAlign: 'center',  }}>
      Energy Consumption
      <span className="viewgraph-expand-icon" onClick={() => handleExpandClick(barDataEnergyConsumption, optionsEnergyConsumption,'Energy Consumption')} > </span>
    </div>
    
    <div className="Energygraph-container">
      <Bar ref={chartRef} data={barDataEnergyConsumption} options={optionsEnergyConsumption} height={'100%'} maintainAspectRatio={false} onReady={onChartReady} />
      <div className="label2ClassViewGRaph">{window.label2}</div>
    </div>
  </div>

  <div className="bargraph-container">
    <div className="graph-title" style={{ textAlign: 'center',  }}>
      Water Consumption
      <span className="viewgraph-expand-icon" onClick={() => handleExpandClick(barDataWaterConsumption, optionsWaterConsumption,'Water Consumption')}> </span>
    </div>
    <div className="watergraph-container">
      <Bar ref={chartRef} data={barDataWaterConsumption} options={optionsWaterConsumption} height={'100%'} maintainAspectRatio={false} onReady={onChartReady} />
      <div className="label2ClassViewGRaph">{window.label2}</div>
    </div>
  </div>
<div className="bargraph-container">
    <div className="graph-title" style={{ textAlign: 'center', }}>
      Renewable Energy 
      <span className="viewgraph-expand-icon"  onClick={() => handleExpandClick(barDataRenewableEnergy, optionsRenewableEnergy, 'Renewable Energy' )} > </span>
    </div>
    <div className="renewablegraph-container">
      <Bar ref={chartRef} data={barDataRenewableEnergy} options={optionsRenewableEnergy} height={'100%'} maintainAspectRatio={false} onReady={onChartReady} />
      <div className="label2ClassViewGRaph">{window.label2}</div>
    </div>
  </div>

    <div className="bargraph-container">
    <div className="graph-title" style={{ textAlign: 'center',  }}>
      Carbon Emission 
      <span className="viewgraph-expand-icon" onClick={() => handleExpandClick(barDataEmissionReduction, optionsEmissionReduction,'Carbon Emission ')} > </span>
    </div>
    <div className="emissionreductiongraph-container">
      <Bar ref={chartRef} data={barDataEmissionReduction} options={optionsEmissionReduction} height={'100%'} maintainAspectRatio={false} onReady={onChartReady} />
      <div className="label2ClassViewGRaph">{window.label2}</div>
    </div>
  </div>

{/* <ResponsiveDoughnutChart dataPoints={dataPoints} /> */}
</div>


 

</div>
</>
  );
};