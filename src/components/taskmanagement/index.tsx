import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Input,
  Breadcrumb,
  Pagination,
  Select,
  Space,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  fetchTaskManagementData,
  TaskData,
  countCountSummaries,
  formatTaskTimestamp,
} from "./utils";
import StatusFilter from "./StatusFilter"; // Import the StatusFilter component
import useDebounce from "../../hooks/useDebounce"; // Import the debounce hook
import usePagination from "../../hooks/usePagination"; // Import the pagination hook
import "./index.css"; // Import the CSS file
import "./table.css";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "./BreadcrumbComponent";
import TaskStatusModal from "./TaskStausModal";
import TaskClosureModal from "./TaskClosureModal";
import CommentModal from "./CommentModal";
// import AlarmDetails from "./alarmDetails";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Search } = Input;
const { Option } = Select;

const TaskManagement: React.FC = () => {
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  const [filteredData, setFilteredData] = useState<TaskData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedAlarm, setSelectedAlarm] = useState<TaskData | null>(null);
  const [createLoading, setCreateLoading] = useState(false); // State to manage create task button loading
  const [discardLoading, setDiscardLoading] = useState(false); // State to manage discard button loading
  const [buttonsDisabled, setButtonsDisabled] = useState(false); // State to manage both buttons disabled
  const [error, setError] = useState<string | null>(null); // Error state
  const [modalVisible, setModalVisible] = useState(false);
  const [taskClosureModalVisible, setTaskClosureModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState<string | null>(null); // State to manage the current task ID
  const [currentRowData, setCurrentRowData] = useState<any>();
  const [addCommentModalVisible, setAddCommentModalVisible] = useState(false);
  const [addCommentCurrentRowData, setAddCommentCurrentRowData] =
    useState<any>();

  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Debounce the search term with a delay of 300ms
  const [alarmCounts, setAlarmCounts] = useState({
    active: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0,
    pending: 0,
  });
  const navigate = useNavigate();
  const { currentPage, pageSize, total, onPageChange, paginatedData } =
    usePagination(filteredData.length);

  const fetchData = async () => {
    try {
      const data = await fetchTaskManagementData(); // Fetch data from the API
      if (!data || !data.task || data.task.length === 0) {
        // Check if data is empty or null
        setError("Task data is not available."); // Set error message
        setTaskData([]); // Clear alarm data
        setFilteredData([]); // Clear filtered data
        setAlarmCounts(null); // Clear alarm counts
      } else {
        setTaskData(data.task); // Set alarm data
        setFilteredData(data.task); // Set filtered data
        const counts = countCountSummaries(data.taskSummary); // Count alarm summaries
        setAlarmCounts(counts); // Set alarm counts
        setError(null); // Clear any previous errors
      }
    } catch (err) {
      console.error("Error fetching real-time alarm data:", err);
      setError("Failed to fetch alarm data."); // Set error message for API failure
      setTaskData([]); // Clear alarm data on error
      setFilteredData([]); // Clear filtered data on error
      setAlarmCounts(null); // Clear alarm counts on error
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
       
      // Normalize the search term by converting to lowercase
      const normalizedSearchTerm = debouncedSearchTerm.toLowerCase();

      // Filtering based on search term
      const filtered = taskData.filter((alarm) => {
        // Normalize each field by converting to lowercase and removing special characters
        const normalizedTaskDesc = alarm.taskDesc?.toLowerCase() || "";
        const normalizedTaskId = alarm.taskId?.toLowerCase() || "";
        const normalizedBuildingName =
          alarm.buildingName?.toLowerCase() || "";
        const normalizedEquipmentName =
          alarm.equipmentName?.toLowerCase() || "";

        // Check if the normalized search term matches any of the normalized fields
        return (
          normalizedTaskDesc.includes(normalizedSearchTerm) ||
          normalizedTaskId.includes(normalizedSearchTerm) ||
          normalizedBuildingName.includes(normalizedSearchTerm) ||
          normalizedEquipmentName.includes(normalizedSearchTerm)
        );
      });
      setFilteredData(filtered);
    } else if (selectedStatuses.length > 0) {
      // filtering based on selected statuses
      const filtered = taskData.filter((alarm) =>
        selectedStatuses.includes(alarm.taskStatus.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(taskData);
    }
  }, [debouncedSearchTerm, selectedStatuses, taskData]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchTerm(value);
  };

  const handlePageSizeChange = (value: number) => {
    console.log("Page size changed to:", value); // Add console log
    onPageChange(1, value); // Reset to first page when page size changes
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    setSelectedStatuses((prevStatuses) =>
      checked
        ? [...prevStatuses, status]
        : prevStatuses.filter((s) => s !== status)
    );
  };

  const showModalTaskStatus = (alarm: TaskData) => {
    setModalVisible(true);
    setCurrentTask(alarm); // Set the current task ID
  };

  const showModalAddComment = (alarm: TaskData) => {
    setAddCommentModalVisible(true);
    setAddCommentCurrentRowData(alarm); // Set the current task ID
  };

  const showTaskClosureModal = (rowData: TaskData) => {
    setTaskClosureModalVisible(true);
    setCurrentRowData(rowData);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const individualAlarm = (alarm: TaskData) => {
    console.log("Alarm clicked:", alarm); // Add console log
    navigate(`/alarmGraph`, { state: { alamData: alarm } });
  };

  const renderAlarmRow = (task: AlarmData, index: number) => (
    <div
      key={index}
      className="alarm-row"
      onClick={() => showTaskClosureModal(task)}
    >
      <div className="alarm-cell">{task.taskId}</div>
      <div className="alarm-cell">{task.buildingName}</div>
      <div className="alarm-cell styleEquipment">{task.equipmentName}</div>
      <div className="alarm-cell leftAligned styleAlarmSummary">
        {task.taskDesc}
      </div>
      <div className="alarm-cell styledateAndTime">
        {formatTaskTimestamp(task.taskAssignedDate)}
      </div>
      <div className="alarm-cell styledateAndTime">
        {formatTaskTimestamp(task.lastStatusTimeStamp)}
      </div>
      <div className="alarm-cell">{task.taskPriority}</div>
      <div className="alarm-cell">{task.escalationLevel}</div>
      <div
        className="alarm-cell statusCell taskStatus"
        onClick={(e) => e.stopPropagation()} // Prevent row click when interacting with this cell
      >
        <div
          onClick={() => showModalTaskStatus(task)}
          className={`styleAlarmStatus`}
        >
          <span className="styleAlarmStatusLabel">
            {" "}
            {task.taskStatus === "inProgress" ? "In progress" : task.taskStatus}
          </span>
        </div>
      </div>
      <div className="alarm-cell" onClick={(e) => e.stopPropagation()}>
        <span onClick={() => showModalAddComment(task)}>
          <span className="addCommentBtn">Add comment</span>
        </span>
      </div>
    </div>
  );
  const breadcrumbItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      className: "inactive",
    },
    {
      title: "Task management",
      path: "/taskManagement",
      className: "activeBreadcrumb",
    },
  ];

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <div className="taskManagement">
      <Row gutter={[16, 16]} className="breadcrumb-row">
        <Col span={24}>
          <BreadcrumbComponent items={breadcrumbItems} className="breadcrumb" />{" "}
        </Col>
      </Row>

      <Row
        gutter={[16, 16]}
        className="marginBottom"
        style={{ width: "12.5rem", position: "relative" }}
      >
        <Col span={24}>
          <Space></Space>
          <TaskStatusModal
            currentTask={currentTask}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        </Col>
      </Row>
      {/* <AlarmDetails /> */}
      <Row gutter={[16, 16]} className="marginBottom ">
        <Col span={24} className="stats-row">
          <div className="stats-box">
            <div className="label assigned">
              Assigned :
              <span className="label-value">{alarmCounts?.assigned?alarmCounts.assigned:"0"}</span>
            </div>
          </div>
          <div className="stats-box">
            <div className="label in-progress">
              In progress :
              <span className="label-value">{alarmCounts?.inProgress?alarmCounts.inProgress:"0"}</span>
            </div>
          </div>

          <div className="stats-box">
            <div className="label pending ">
              Pending :{" "}
              <span className="label-value">{alarmCounts?.pending?alarmCounts.pending:"0"}</span>
            </div>
          </div>
          <div className="stats-box">
            <div className="label completed">
              Completed :
              <span className="label-value">{alarmCounts?.completed?alarmCounts.completed:"0"}</span>
            </div>
          </div>

          <div className="search-box-container stats-box">
            <Search
              className="search-box"
              placeholder="eg. Task description"
              onSearch={handleSearch}
              onKeyUp={handleKeyUp}
              enterButton={false}
              prefix={<SearchOutlined />}
            />
          </div>
          <div className="StuatusFilter-container-task-management stats-box">
            <StatusFilter
              selectedStatuses={selectedStatuses}
              onStatusChange={handleStatusChange}
            />
          </div>
        </Col>
      </Row>
      {error ? (
        <div className="alarmErrorMessageDiv">{error}</div> // Show error message
      ) : (
      <Row gutter={[16, 16]} className="task-management-table marginBottom">
        <Col span={24}>
          <div className="alarm-table">
            <div className="alarm-header">
              <div className="alarm-cell">Task ID</div>
              <div className="alarm-cell">Building</div>
              <div className="alarm-cell styleEquipment">Equipment</div>
              <div className="alarm-cell styleAlarmSummary">Description</div>
              <div className="alarm-cell styledateAndTime">Created time</div>
              <div className="alarm-cell styledateAndTime">Last action</div>
              <div className="alarm-cell">Priority</div>
              <div className="alarm-cell">
                Escalation
                <br />
                level
              </div>
              <div className="alarm-cell">Status</div>
              <div className="alarm-cell">Comment</div>
            </div>
            <div className="table-container">
              <div className="alarm-table-body">
                {paginatedData(filteredData).map((alarm, index) => (
                  <React.Fragment key={index}>
                    {renderAlarmRow(alarm, index)}
                    <div className="spacer-row"></div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="pagination-container taskManagementPagination">
              <div className="pagination-info">
                Showing {startItem}-{endItem} of {total}
              </div>
              <Select
                className="page-size-selector"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
              </Select>
              <Pagination
                className="pagination"
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={onPageChange}
                showSizeChanger={false} // Hide the default size changer
              />
            </div>
          </div>
        </Col>
      </Row>
      )}

      {/* <Row gutter={[16, 16]} className="marginBottom">
        <Col span={24}>
          <div className="table-container">
            <Table
              rowClassName={() => "custom-row"}
              columns={columns}
              className="task-table"
              dataSource={paginatedData(filteredData)}
              rowKey="taskId"
              pagination={false} // We're handling pagination manually
              onRow={(record) => ({
                onClick: () => showTaskClosureModal(record),
              })}
              style={{ width: '90%' }}
            />
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {startItem}-{endItem} of {total}
              </div>
              <Select
                className="page-size-selector"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
              </Select>
              <Pagination
                className="pagination"
                current={currentPage}
                pageSize={pageSize}
                total={filteredData.length}
                onChange={handlePageSizeChange}
              />
            </div>
          </div>
        </Col>
      </Row> */}
      {taskClosureModalVisible && (
        <TaskClosureModal
          currentRowData={currentRowData}
          visible={taskClosureModalVisible}
          onClose={() => setTaskClosureModalVisible(false)}
        />
      )}
      {addCommentModalVisible && (
        <CommentModal
          currentRowData={addCommentCurrentRowData}
          open={addCommentModalVisible}
          onClose={() => setAddCommentModalVisible(false)}
        />
      )}
      
    </div>
  );
};

export default TaskManagement;
