import axios from 'axios';
import { LegendProps } from "recharts";

export const fetchAlarmGraphData = async (alarmId: number, timePeriod: string) => {
  try {
    // let url = '/energy-analytics/localJson/individual-alarm.json';
    let url = window.config.CG_CONFIG_INDIVIDUAL_GRAPH_REALTIME_ALARM;
    const payload = {
      alarmId: alarmId.toString(),
      timePeriod: timePeriod
    };
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching alarm graph data:', error);
    throw error;
  }
};

export const fetchAlarmDetailsData = async (alarm_id: number) => {
  try {
    // let url = '/energy-analytics/localJson/individual-alarm.json';
    let url = window.config.CG_CONFIG_INDIVIDUAL_ALARM_DETAILS_REALTIME_ALARM;
    const response = await axios.get(url, {
      params: { alarm_id }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching alarm graph data:', error);
    throw error;
  }
};
 
export const renderFlatLineLegend = (props: any) => {
  const { payload } = props; // Access the legend items
  return (
    <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: 20,
            color: entry.color,
          }}
        >
          {/* Flat line for legend */}
          <div
            style={{
              width: 20,
              height: 2,
              backgroundColor: entry.color,
              marginRight: 8,
            }}
          ></div>
          <span style={{ fontSize: 12, color: "white" }}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};


export const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="tooltip-arrow"></div>
        {payload.map((item: any, index: number) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: item.color,
                borderRadius: "50%",
                border: "2px solid white",
                marginRight: "5px",
              }}
            ></div>
            <span style={{ marginRight: "5px" }}>{`${item.name}:`}</span>
            <span>{item.value !== undefined ? item.value : "N/A"}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
export const tickFormatter = (value: number) => {
  if (value === 0.25 || value === 0.5 || value === 0.75) {
    return "";
  }
  return value;
};


export const getUniqueHourlyData = (data: Array<{ time: string }>): Array<any> => {
  const uniqueDataMap = new Map<string, any>();

  data.forEach((entry) => {
    const date = new Date(entry.time);
    const hourKey = date.toISOString().slice(0, 13); // Extract the hour (e.g., "2023-10-01T14")
    if (!uniqueDataMap.has(hourKey)) {
      uniqueDataMap.set(hourKey, entry);
    }
  });
  return Array.from(uniqueDataMap.values());
};