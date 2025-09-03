import React, { useState, useEffect, useMemo } from "react";
import { Card, Select, Modal, Spin, Flex } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ArrowsAltOutlined } from "@ant-design/icons";
import {
  renderFlatLineLegend,
  CustomTooltip,
  fetchAlarmGraphData,
} from "./utils";
import { LoadingOutlined } from "@ant-design/icons";
import "./graphDetails.css";
const { Option } = Select;

const formatTimeLabel = (timeStr: string) => {
  const cleanTimeStr = timeStr.replace(/ \w+$/, "");
  const date = new Date(cleanTimeStr);
  if (isNaN(date.getTime())) return "";
  return date
    .toLocaleString(undefined, {
      hour: "2-digit",
      day: "2-digit",
      hour12: false,
    })
    .replace(",", "/");
};

interface AlarmDetailsData {
  equipment_id: string;
  point_ids: string[];
  influx_data: {
    [equipmentId: string]: {
      [pointId: string]: {
        object_type: string;
        point_name: string;
        data: Array<{
          time: string;
          value: number;
        }>;
      };
    };
  };
}

interface GraphDetailsProps {
  alarmDetailsData: AlarmDetailsData;
}

const MultiLineChart: React.FC<GraphDetailsProps> = ({ alarmDetailsData }) => {
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  const [combinedData, setCombinedData] = useState<string[]>([]);

  const [isExpanded, setIsExpanded] = useState(false); // State to toggle expanded view
  const [screenHeight, setScreenHeight] = useState(window.innerHeight); // State to store screen height
  const [timePeriod, setTimePeriod] = useState<string>("24"); // State to store time period
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading screen
  const [alarmId, setAlarmId] = useState<string | null>(
    alarmDetailsData?.alarm_id || null
  );
  const [equipmentId, setEquipmentId] = useState<string | null>(
    alarmDetailsData?.equipment_id || null
  );

  const [selectedEquipments, setSelectedEquipments] = useState<any>(
    alarmDetailsData.point_ids
  ); // State to store selected equipment points
  const jsonData = alarmDetailsData;
  const [influxPoints, setFluxPoints] = useState<any>(
    alarmDetailsData.influx_data[alarmDetailsData.equipment_id]
  );

  // Update time labels when selectedEquipments or influxPoints change

  useEffect(() => {
    if (!influxPoints) return;

    const allTimeSet = new Set<string>();
    selectedEquipments.forEach((pid) => {
      influxPoints[pid]?.data.forEach((d) => {
        const iso = new Date(d.time.replace(/ \w+$/, "")).toISOString();
        allTimeSet.add(iso);
      });
    });

    const sortedTimeLabels = Array.from(allTimeSet).sort();
    setTimeLabels(sortedTimeLabels);
  }, [selectedEquipments, influxPoints]);

  useEffect(() => {
    // Function to update screen height
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   fetchData(alarmId, equipmentId, selectedEquipments, timePeriod);
  // }, [alarmDetailsData]);

  const fetchData = async (
    alarm_id: string | null,
    equipment_id: string | null,
    point_ids: string[],
    timePeriod: string
  ) => {
    if (!alarm_id || !equipment_id) return;

    setLoading(true); // Set loading to true before fetching data

    try {
      const data = await fetchAlarmGraphData(Number(alarm_id), timePeriod);
      setFluxPoints(data.influx_data[equipment_id]); // Update influxPoints with the fetched data
    } catch (error) {
      console.error("Error fetching alarm graph data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is processed
    }
  };

  // Combine data for the chart
  useEffect(() => {
    if (!timeLabels.length || !influxPoints) {
      setCombinedData([]); // Reset combinedData if dependencies are missing
      return;
    }

    const newCombinedData = Array.from(new Set(timeLabels)).map((isoTime) => {
      const entry: any = {};

      // Normalize time to hourly precision
      const date = new Date(isoTime);
      date.setMinutes(0, 0, 0); // truncate to hour
      entry.time = date.toISOString();

      selectedEquipments.forEach((key) => {
        const point = influxPoints[key]?.data.find((d) => {
          const cleanTime = new Date(d.time.replace(/ \w+$/, ""));
          cleanTime.setMinutes(0, 0, 0); // also truncate data point time
          return cleanTime.toISOString() === entry.time;
        });
        entry[key] = point ? point.value : null;
      });

      return entry;
    });

    console.log("updated influxPoints:", influxPoints);

    console.log("updated newCombinedData:", newCombinedData);
    setCombinedData(newCombinedData); // Update combinedData with unique hourly data

    // setCombinedData(newCombinedData); // Update the combinedData state
  }, [timeLabels, selectedEquipments, influxPoints]); // Dependencies
  // Handle equipment selection change
  const handleChange = (value: string[]) => {
    setSelectedEquipments(value);
  };

  const handleTimePeriodChange = (value: string) => {
    setTimePeriod(value);
    // console.log("calling graph from handleTimePeriodChange");
    fetchData(alarmId, equipmentId, selectedEquipments, value);
  };

  const handleExpand = () => {
    setIsExpanded(true); // Open expanded view
  };

  const handleCloseExpand = () => {
    setIsExpanded(false); // Close expanded view
  };
  const colors = ["#ff7300", "#82ca9d", "#8884d8", "#ff6384", "#36a2eb"];

  // Render loading state if data is not yet available
  if (!jsonData || !influxPoints) {
    return <div>Loading...</div>;
  }

  const topMargin = screenHeight > 700 ? 40 : 30; // Increase top margin for larger screens
  const graphHeight = screenHeight > 700 ? 300 : 250; // Default graph height

  const topMarginExpandedGraph = screenHeight > 700 ? 80 : 70; // Increase top margin for larger screens
  const graphHeightExpanded = screenHeight > 700 ? 450 : 350; // Default graph height

  const dedupedData = useMemo(() => {
    return Array.from(
      new Map(combinedData.map((item) => [item.time, item])).values()
    );
  }, [combinedData]);
  return (
    <div className="alarm-graph-container">
      <div className="alarm-details-title-container">
        <span className="alarm-details-title">Graphical view</span>
        <div className="dropdownContainer">
          <div className="custom-dropdown dateRange">
            <p className="dropdown-label">Date Range</p>
            <Select
              defaultValue="24h"
              style={{ width: 150 }}
              className="dropdown-select "
              onChange={(value) => handleTimePeriodChange(value)}
              popupClassName="custom-dropdown-options "
            >
              <Option value="24">24 Hours</Option>
              <Option value="48">48 Hours</Option>
              <Option value="72">72 Hours</Option>
              <Option value="last_week">Last week</Option>
            </Select>
          </div>

          <div className="custom-dropdown multiSelect">
            <p className="dropdown-label">Equipment points</p>
            <Select
              mode="multiple"
              style={{ width: 150 }}
              className="dropdown-select "
              placeholder="Multi Select"
              onChange={handleChange}
              value={selectedEquipments} // Pre-select default values
              popupClassName="alarmGraphDropdown no-cursor"
              maxTagCount={0}
              maxTagPlaceholder="Multi Select"
            >
              {Object.keys(influxPoints).map((key) => (
                <Option key={key} value={key}>
                  {`${influxPoints[key].point_name} `}
                </Option>
              ))}
            </Select>
          </div>
          <button
            onClick={handleExpand}
            style={{
              marginLeft: "10px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            <ArrowsAltOutlined />
          </button>
        </div>
      </div>
      {loading ? (
        <Flex align="center" gap="middle">
          <Spin
            indicator={
              <LoadingOutlined
                style={{ color: "#FFFFFF", fontSize: 24, textAlign: "center" }}
                spin
              />
            }
          />
        </Flex>
      ) : (
        <ResponsiveContainer width="100%" height={graphHeight}>
          <LineChart
            data={dedupedData}
            margin={{ top: topMargin, right: 30, left: 15, bottom: 70 }}
          >
            <CartesianGrid
              stroke="#e0e0e0" // Color of the grid lines
              strokeDasharray="3 3" // Makes the lines dotted
              opacity={0.1} // Adjusts the transparency of the grid lines
            />
            <XAxis
              dataKey="time"
              angle={-45}
              textAnchor="end"
              interval={0}
              minTickGap={15}
              tickFormatter={formatTimeLabel}
              stroke="#fff"
              tick={{ fontSize: 10 }}
              label={{
                value: "Time", // Label for X-axis
                position: "insideBottom", // Position the label inside the bottom of the chart
                offset: -20, // Adjust the offset for better alignment
                fill: "white", // Set label color to white
                fontSize: 12, // Set font size for the label
              }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tick={{ fill: "#fff", fontSize: 10 }}
              stroke="#fff"
              label={{
                value: "Value",
                angle: -90,
                offset: 10,
                position: "insideLeft",
                fill: "#fff",
                fontSize: 11,
              }}
              domain={["auto", "auto"]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 1]}
              ticks={[0, 1]}
              stroke="#fff"
              label={({ viewBox }) => {
                const { x, y, height } = viewBox;
                return (
                  <text
                    x={x + 30} // Fine-tune this value to adjust distance from axis line
                    y={y + height / 2}
                    fill="#fff"
                    fontSize={11}
                    textAnchor="middle"
                    transform={`rotate(-90, ${x + 30}, ${y + height / 2})`}
                  >
                    Binary
                  </text>
                );
              }}
            />

            <Tooltip content={<CustomTooltip influxPoints={influxPoints} />} />
            {/* <Legend wrapperStyle={{ color: "#fff" }} /> */}
            <Legend content={renderFlatLineLegend} />

            {selectedEquipments.map((key, index) => {
              const yAxisId = influxPoints[key]?.object_type?.includes("binary")
                ? "right"
                : "left";
              const strokeColor = influxPoints[key]?.object_type?.includes(
                "binary"
              )
                ? "#00e5ff"
                : colors[index % colors.length];
              const lineType = influxPoints[key]?.object_type?.includes("binary")
                ? "stepAfter"
                : "monotone";
              return (
                <Line
                  key={key}
                  type={lineType}
                  dataKey={key}
                  yAxisId={yAxisId}
                  name={`${influxPoints[key].point_name}`}
                  stroke={strokeColor}
                  connectNulls
                  dot={false}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      )}
      <Modal
        visible={isExpanded}
        onCancel={handleCloseExpand}
        className="expanded-chart-modal custom-modal-body"
        footer={null}
        width="90%"
        centered
      >
        <ResponsiveContainer width="100%" height={graphHeightExpanded}>
          <LineChart
            data={dedupedData}
            margin={{
              top: topMarginExpandedGraph,
              right: 30,
              left: 50,
              bottom: 70,
            }}
          >
            <CartesianGrid
              stroke="#ccc" // Color of the grid lines
              strokeDasharray="3 3" // Makes the lines dotted
              opacity={0.5} // Adjusts the transparency of the grid lines
            />
            <XAxis
              dataKey="time"
              angle={-45}
              textAnchor="end"
              interval={0}
              minTickGap={15}
              tickFormatter={formatTimeLabel}
              stroke="#fff"
              tick={{ fontSize: 10 }}
              label={{
                value: "Time", // Label for X-axis
                position: "insideBottom", // Position the label inside the bottom of the chart
                offset: -30, // Adjust the offset for better alignment
                fill: "white", // Set label color to white
                fontSize: 12, // Set font size for the label
              }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tick={{ fill: "#fff", fontSize: 10 }}
              stroke="#fff"
              label={{
                value: "Value",
                angle: -90,
                position: "insideLeft",
                offset: 20,
                fill: "#fff",
                fontSize: 11,
              }}
              domain={["auto", "auto"]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 1]}
              ticks={[0, 1]}
              stroke="#fff"
              label={({ viewBox }) => {
                const { x, y, height } = viewBox;
                return (
                  <text
                    x={x + 30} // Fine-tune this value to adjust distance from axis line
                    y={y + height / 2}
                    fill="#fff"
                    fontSize={11}
                    textAnchor="middle"
                    transform={`rotate(-90, ${x + 30}, ${y + height / 2})`}
                  >
                    Binary
                  </text>
                );
              }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* <Legend wrapperStyle={{ color: "#fff" }} /> */}
            <Legend content={renderFlatLineLegend} />

            {selectedEquipments.map((key, index) => {
              const yAxisId = influxPoints[key]?.object_type?.includes("binary")
                ? "right"
                : "left";
              const strokeColor = influxPoints[key]?.object_type?.includes(
                "binary"
              )
                ? "#00e5ff"
                : colors[index % colors.length];
              const lineType = influxPoints[key]?.object_type?.includes("binary")
                ? "stepAfter"
                : "monotone";
              return (
                <Line
                  key={key}
                  type={lineType}
                  dataKey={key}
                  yAxisId={yAxisId}
                  name={`${influxPoints[key].point_name} `}
                  stroke={strokeColor}
                  connectNulls
                  dot={false}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </Modal>
    </div>
  );
};

export default MultiLineChart;
