import { httpGet } from "../../httpRequest/httpService";

export interface AlarmData {
  rule_id: string;
  alarm_id: number;
  proj_equi_id: number;
  buildingName: string;
  equipmentName: string;
  equipmentType: string;
  alarmSummary: string;
  dateAndTime: string;
  priority: string;
  alarmMeasure: string;
  costAvoided: string;
  energySaved: string;
  alarmStatus: string;
  alarm_measure: string;
}

interface ApiResponse {
  alarms: AlarmData[];
  alarmSummary: { [key: string]: number };
}
 

export const fetchRealTimeAlarmData = async (): Promise<ApiResponse> => {
  // let url = "/energy-analytics/localJson/realtime-alarm.json";
  let url = window.config.CG_CONFIG_FETCH_REALTIME_ALARM_DATA;
  try {
    const data: ApiResponse = await httpGet(url);
    return data; // Return the data directly
  } catch (error) {
    console.error("Error fetching real-time alarm data:", error);
    throw error;
  }
};

export const postDiscardData = async (payload: {
  ruleId: string;
  alarmId: number;
  projEquid: number;
}) => {
  const url = window.config.CG_CONFIG_DISCARD_TASK_REALTIME_ALARM;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error posting discard data:", error);
    throw error;
  }
};
export const postCreateTaskData = async (payload: {
  taskPriority: string;
  issueDetectedTime: string;
  alarmId: number;
  taskName: string;
}) => {
  const url = window.config.CG_CONFIG_CREATE_TASK_REALTIME_ALARM;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error posting create task data:", error);
    throw error;
  }
};

export const handleCreateTask = async (
  selectedAlarm: AlarmData,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchData: () => Promise<void>
) => {
  const payload = {
    alarmId: selectedAlarm.alarm_id,
    buildingName: selectedAlarm.buildingName,
    taskPriority: selectedAlarm.priority,
    equipmentName: selectedAlarm.equipmentName,
    taskName: selectedAlarm.alarmSummary,
  };
  try {
    const response = await postCreateTaskData(payload);
    setOpen(false);
    await fetchData(); // Re-fetch data to update the table and stats
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export const handleDiscard = async (
  rule_id: string,
  alarm_id: number,
  proj_equi_id: number,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchData: () => Promise<void>
) => {
  const payload = {
    ruleId: rule_id,
    alarmId: alarm_id,
    projEquid: proj_equi_id,
  };
  try {
    const response = await postDiscardData(payload);
    console.log("Discard response:", response);
    setOpen(false);
    await fetchData(); // Re-fetch data to update  table
  } catch (error) {
    console.error("Error discarding task:", error);
  }
};

export const countAlarmSummaries = (alarmSummary: {
  [key: string]: number;
}) => {
  const counts = {
    active: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0,
    pending: 0,
  };

  for (const [key, value] of Object.entries(alarmSummary)) {
    switch (key.toLowerCase()) {
      case "activealarm":
        counts.active += value;
        break;
      case "assigned":
        counts.assigned += value;
        break;
      case "inprogress":
        counts.inProgress += value;
        break;
      case "completed":
        counts.completed += value;
        break;
      case "pending":
        counts.pending += value;
        break;
      default:
        break;
    }
  }

  return counts;
};

export const mockData24h: DataPoint[] = [
  { time: "00:00", temperature: 22, pressure: 1.2, conductivity: 0.5, state: 0 },
  { time: "01:00", temperature: 23, pressure: 1.3, conductivity: 0.6, state: 1 },
  { time: "02:00", temperature: 21, pressure: 1.1, conductivity: 0.4, state: 1 },
  { time: "03:00", temperature: 24, pressure: 1.4, conductivity: 0.7, state: 1 },
  { time: "04:00", temperature: 20, pressure: 1.0, conductivity: 0.3, state: 0 },
  { time: "05:00", temperature: 25, pressure: 1.5, conductivity: 0.8, state: 1 },
  { time: "06:00", temperature: 19, pressure: 0.9, conductivity: 0.2, state: 0 },
  { time: "07:00", temperature: 26, pressure: 1.6, conductivity: 0.9, state: 1 },
  { time: "08:00", temperature: 18, pressure: 0.8, conductivity: 0.1, state: 1 },
  { time: "09:00", temperature: 27, pressure: 1.7, conductivity: 1.0, state: 1 },
  { time: "10:00", temperature: 17, pressure: 0.7, conductivity: 0.0, state: 0 },
  { time: "11:00", temperature: 28, pressure: 1.8, conductivity: 1.1, state: 1 },
  { time: "12:00", temperature: 16, pressure: 0.6, conductivity: 0.9, state: 0 },
  { time: "13:00", temperature: 29, pressure: 1.9, conductivity: 1.2, state: 1 },
  { time: "14:00", temperature: 15, pressure: 0.5, conductivity: 0.8, state: 0 },
  { time: "15:00", temperature: 30, pressure: 2.0, conductivity: 1.3, state: 1 },
  { time: "16:00", temperature: 14, pressure: 0.4, conductivity: 0.7, state: 0 },
  { time: "17:00", temperature: 31, pressure: 2.1, conductivity: 1.4, state: 1 },
  { time: "18:00", temperature: 13, pressure: 0.3, conductivity: 0.6, state: 0 },
  { time: "19:00", temperature: 32, pressure: 2.2, conductivity: 1.5, state: 1 },
  { time: "20:00", temperature: 12, pressure: 0.2, conductivity: 0.5, state: 0 },
  { time: "21:00", temperature: 33, pressure: 2.3, conductivity: 1.6, state: 1 },
  { time: "22:00", temperature: 11, pressure: 0.1, conductivity: 0.4, state: 0 },
  { time: "23:00", temperature: 34, pressure: 2.4, conductivity: 1.7, state: 1 },
];

// export const truncateText = (text: string, maxLength: number): string => {
//   if (text.length <= maxLength) {
//     return text;
//   }
//   return text.substring(0, maxLength) + '...';
// };