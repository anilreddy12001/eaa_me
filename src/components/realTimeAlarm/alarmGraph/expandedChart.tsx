import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./expandedChart.css"; // Import the CSS file
import { renderFlatLineLegend, CustomTooltip, tickFormatter } from "./utils.tsx"; // Import the reusable legend

// Define the structure of alarmDetailsData
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

interface DataPoint {
  time: string;
  [key: string]: any; // Allow dynamic keys for equipment points
}

interface ExpandedChartProps {
  data: DataPoint[];
  selectedEquipment: string[];
  equipmentColors: string[];
  alarmDetailsData: AlarmDetailsData;
  colors: string[];
  equipmentId: string | null;
  onClose: () => void;
}

const ExpandedChart: React.FC<ExpandedChartProps> = ({
  data,
  selectedEquipment,
  alarmDetailsData,
  colors,
  equipmentId,
  equipmentColors,
  onClose,
}) => {
  return (
    <Modal
      open={true}
      onCancel={onClose}
      footer={null}
      width="90%"
      centered
      className="expanded-chart-modal custom-modal-body"
    >
      <div style={{ position: "relative" }}>
        <ResponsiveContainer width="95%" height={350}>
          <LineChart
            data={data} // Pass combined data dynamically
            margin={{ top: 50, right: 50, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              stroke="#ccc" // Light gray color for the grid lines
              opacity={0.1} // Reduce opacity to make it lighter
              strokeDasharray="3 3" // Dotted line style
            />
            <XAxis
              dataKey="time"
              tickFormatter={(time) => {
                const date = new Date(time);
                // Round the time to the nearest hour
                date.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to 0

                return date.toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                });
              }}
              textAnchor="end"
              label={{
                value: "Time", // Label for X-axis
                position: "insideBottom", // Position the label inside the bottom of the chart
                offset: -10, // Adjust the offset for better alignment
                fill: "white", // Set label color to white
                fontSize: 12, // Set font size for the label
              }}
              tick={{ fontSize: 12, fill: "white" }} // Set font size to 12px
            />
            <YAxis
              yAxisId="left" // Explicitly associate this Y-axis with the left side
              label={{
                value: "Value", // Label for Y-axis
                angle: -90, // Rotate the label vertically
                position: "insideLeft", // Position the label inside the left of the chart
                fill: "white", // Set label color to white
                fontSize: 12, // Set font size for the label
              }}
              domain={[0, "dataMax"]}
              tick={{ fontSize: 12, fill: "white" }}
            />
            <YAxis
              yAxisId="right" // Explicitly associate this Y-axis with the right side
              orientation="right"
              domain={[0, 1]}
              ticks={[0, 1]}
              tickFormatter={tickFormatter}
              label={{
                value: "Binary", // Label for the right Y-axis
                angle: -90, // Rotate the label vertically
                position: "insideRight", // Position the label inside the right of the chart
                fill: "white", // Set label color to white
                fontSize: 12, // Set font size for the label
              }}
              tick={{ fontSize: 12, fill: "white" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderFlatLineLegend} />
            {selectedEquipment
              .filter((equipment) => {
                const pointData =
                  alarmDetailsData?.influx_data[equipmentId]?.[equipment];
                return pointData?.object_type !== "binary-input"; // Non-binary-input data
              })
              .map((equipment, index) => {
                const pointData =
                  alarmDetailsData?.influx_data[equipmentId]?.[equipment];
                const pointName = pointData?.point_name;
                return (
                  <Line
                    key={equipment}
                    type="monotone" // Use monotone for non-binary-input
                    dataKey={equipment}
                    name={pointName || equipment}
                    stroke={colors[index % colors.length]}
                    dot={false}
                    data={data} // Use the original data for non-binary-input
                    yAxisId="left" // Associate with the left Y-axis
                  />
                );
              })}

            {selectedEquipment
              .filter((equipment) => {
                const pointData =
                  alarmDetailsData?.influx_data[equipmentId]?.[equipment];
                return pointData?.object_type === "binary-input"; // Binary-input data
              })
              .map((equipment, index) => {
                const pointData =
                  alarmDetailsData?.influx_data[equipmentId]?.[equipment];
                const pointName = pointData?.point_name;
                const sineWaveData = data.map((entry, i) => ({
                  ...entry,
                  [equipment]: Math.sin(i / 10) > 0 ? 1 : 0, // Generate sine wave (0 or 1)
                }));

                return (
                  <Line
                    key={equipment}
                    type="stepAfter" // Use stepAfter for binary-input
                    dataKey={equipment}
                    name={pointName || equipment}
                    stroke={
                      pointData?.object_type === "binary-input"
                      ? "#00FFFF" : equipmentColors[index]
                    }
                    dot={false}
                    data={sineWaveData} // Use sine wave data for binary-input
                    yAxisId="right" // Associate with the right Y-axis
                  />
                );
              })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Modal>
  );
};

export default ExpandedChart;