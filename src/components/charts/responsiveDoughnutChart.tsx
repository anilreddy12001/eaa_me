import React, { useEffect, useRef, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ResponsiveDoughnutChart = (props) => {
  console.log("doughnut chart props: ", props.canvasHeight + "px");
  const chartContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const [chartSize, setChartSize] = useState(400); // Initial chart size
  const [circleSize, setCircleSize] = useState(0); // Initial concentric circle size
  const [chartData, setChartData] = useState(props.dataPoints); // Initial chart data

  const dataPoints = props.dataPoints;

  const discColors = [
    dataPoints[0]?.color || "#6CB385",
    dataPoints[1]?.color || "#55A471",
  ];

  console.log("dataPoints inside doughnut chart: ", dataPoints);

  // Function to update chart size based on container width
  const updateSizes = () => {
    console.log("window resized..");
    if (chartContainerRef.current) {
      const containerWidth = chartContainerRef.current.offsetWidth;
      const newChartSize = Math.min(containerWidth * 0.9, 400); // Max 400px
      const newCircleSize = newChartSize * 0.4; // Ensure circles fit within the chart

      setChartSize(newChartSize);
      setCircleSize(newCircleSize);
    }
  };

  // Run on mount and resize
  useEffect(() => {
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  // Update the concentric circles when circle size changes
  useEffect(() => {
    setTimeout(() => {window.dispatchEvent(new Event('resize')), 200});
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const discRadii = [circleSize * 0.8, circleSize * 0.05]; // Scale radii dynamically

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    discColors.forEach((color, index) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, discRadii[index], 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }, [circleSize]);

  // Reset chart automatically when dataPoints change
  useEffect(() => {
    let dataPointsVar=props.dataPoints;

    if(props.dataPoints && props.dataPoints.length>0 && props.dataPoints[0].y=="NaN"){
dataPointsVar=[];
    }
    else {
      dataPointsVar=props.dataPoints;
    }
    setChartData(dataPointsVar); // Update chart data when props change
  }, [props.dataPoints]);

  const doughnutChartDrilldownHandler = (e) => {
    console.log("e inside doughnutChartDrilldownHandler:", e);
  };

  const options = {
    
    title: {
      text: "",
      fontSize: 22,
      fontColor: "#0FC080",
    },
    backgroundColor: "transparent",
    backgroundImage: "#FF0000",
    fontColor: "#FF0000",
    data: [
      {
        type: "doughnut",
        innerRadius: "45%",
        outerRadius:"80%",
        startAngle: 15,
        showInLegend: false,
        indexLabelFontColor: "red",
        indexLabelFontSize: chartData.length>10?7.45:10,
        indexLabel: "{y}% {name}",
        toolTipContent: "{y}% {name}",
        indexLabelWrap: true,
        indexLabelMaxWidth: chartData.length>10?100:70,
        dataPoints: chartData,
        radius: chartData.length>10?"95%":"85%",
      },
    ],
  };

  // Update the chart's title if no data is available
  if (dataPoints.length === 0 || chartData.length==0) {
    options.title.text = "No Data Available";
    options.title.verticalAlign = "center";
  }

  return (
    <CanvasJSChart
      options={options}
      containerProps={{
        width: "100%",
        height: `${(props.canvasHeight / 0.865) + "px"}`,
        backgroundColor: "transparent",
      }}
    />
  );
};

export default ResponsiveDoughnutChart;
