import { httpGet } from "../../httpRequest/httpService";
import axios from "axios";

export interface TaskData {
  rule_id: string;
  taskId: number;
  proj_equi_id: number;
  buildingName: string;
  equipmentName: string;
  equipmentType: string;
  taskDesc: string;
  taskAssignedDate: string;
  lastStatusTimeStamp: string;
  taskPriority: string;
  escalationLevel: string;
  costAvoided: string;
  energySaved: string;
  taskStatus: string;
  task_measure: string;
}

interface ApiResponse {
  tasks: TaskData[];
  taskSummary: { [key: string]: number };
}

export const fetchTaskManagementData = async (): Promise<ApiResponse> => {
  // let url = "/energy-analytics/localJson/task.json";
  let url = window.config.CG_CONFIG_FETCH_TASK_MANAGEMENT_DATA;
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
  selectedAlarm: TaskData,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchData: () => Promise<void>
) => {
  const payload = {
    alarmId: selectedAlarm.alarm_id,
    buildingName: selectedAlarm.buildingName,
    taskPriority: selectedAlarm.priority,
    equipmentName: selectedAlarm.equipmentName,
    taskName: `${selectedAlarm.buildingName}_task`,
  };
  try {
    const response = await postCreateTaskData(payload);
    console.log("Create task response:", response);
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

export const countCountSummaries = (alarmSummary: {
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

export const formatTaskTimestamp = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid dates

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// export const truncateText = (text: string, maxLength: number): string => {
//   if (text.length <= maxLength) {
//     return text;
//   }
//   return text.substring(0, maxLength) + '...';
// };

export const postTaskStatus = async (
  taskId: string,
  taskComment: string,
  status: string,
  userName: string
): Promise<any> => {
  // const apiUrl = "energyanalytics/api/v1/task/status";
  const url = window.config.CG_CONFIG_FETCH_TASK_MANAGEMENT_POST_TASK_STATUS;

  const payload = {
    taskId,
    taskComment,
    status,
    userName,
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Task status updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const postTaskClosure = async (
  taskId: string,
  taskComment: string,
  feedback: string,
  userName: string
): Promise<any> => {
  // const apiUrl = "energyanalytics/api/v1/task/status";
  const url = window.config.CG_CONFIG_FETCH_TASK_MANAGEMENT_POST_CLOSURE;

  const payload = {
    taskId,
    taskComment,
    feedback,
    userName,
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Task status updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const postComment = async (
  taskId: string,
  comment: string,
  userName: string
): Promise<any> => {
  // const apiUrl = "energyanalytics/api/v1/task/status";
  const url = window.config.CG_CONFIG_FETCH_TASK_MANAGEMENT_POST_COMMENT;

  const payload = {
    taskId,
    comment,
    userName,
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Task comment updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const fetchCommentHistory = async (
  taskId: string
): Promise<ApiResponse> => {
  // let url = "/energy-analytics/localJson/realtime-alarm.json";
  let url = window.config.CG_CONFIG_FETCH_TASK_MANAGEMENT_GET_COMMENT + taskId;
  try {
    const data: ApiResponse = await httpGet(url);
    return data; // Return the data directly
  } catch (error) {
    console.error("Error fetching real-time alarm data:", error);
    throw error;
  }
};
