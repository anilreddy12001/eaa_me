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
  fetchRealTimeAlarmData,
  AlarmData,
  countAlarmSummaries,
  handleDiscard,
  handleCreateTask,
} from "./utils";
import StatusFilter from "./StatusFilter"; // Import the StatusFilter component
import useDebounce from "../../hooks/useDebounce"; // Import the debounce hook
import usePagination from "../../hooks/usePagination"; // Import the pagination hook
import "./index.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "./BreadcrumbComponent";

// import AlarmDetails from "./alarmDetails";

const { Search } = Input;
const { Option } = Select;

const RealTimeAlarm: React.FC = () => {
  const [alarmData, setAlarmData] = useState<AlarmData[]>([]);
  const [filteredData, setFilteredData] = useState<AlarmData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedAlarm, setSelectedAlarm] = useState<AlarmData | null>(null);
  const [createLoading, setCreateLoading] = useState(false); // State to manage create task button loading
  const [discardLoading, setDiscardLoading] = useState(false); // State to manage discard button loading
  const [buttonsDisabled, setButtonsDisabled] = useState(false); // State to manage both buttons disabled
  const [error, setError] = useState<string | null>(null); // Error state

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
      const data = await fetchRealTimeAlarmData(); // Fetch data from the API
      if (!data || !data.alarms || data.alarms.length === 0) {
        // Check if data is empty or null
        if (!error) {
          setError("Alarm data is not available.");
        } // Set error message
        setAlarmData([]); // Clear alarm data
        setFilteredData([]); // Clear filtered data
        setAlarmCounts(null); // Clear alarm counts
      } else {
        setAlarmData(data.alarms); // Set alarm data
        setFilteredData(data.alarms); // Set filtered data
        const counts = countAlarmSummaries(data.alarmSummary); // Count alarm summaries
        setAlarmCounts(counts); // Set alarm counts
        setError(null); // Clear any previous errors
      }
    } catch (err) {
      console.error("Error fetching real-time alarm data:", err);
      setError("Failed to fetch alarm data."); // Set error message for API failure
      setAlarmData([]); // Clear alarm data on error
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
      const filtered = alarmData.filter((alarm) => {
        // Normalize each field by converting to lowercase and removing special characters
        const normalizedAlarmSummary = alarm.alarmSummary?.toLowerCase() || "";
        const normalizedBuildingName = alarm.buildingName?.toLowerCase() || "";
        const normalizedEquipmentType =
          alarm.equipmentType?.toLowerCase() || "";
        const normalizedEquipmentName =
          alarm.equipmentName?.toLowerCase() || "";

        // Check if the normalized search term matches any of the normalized fields
        return (
          normalizedAlarmSummary.includes(normalizedSearchTerm) ||
          normalizedBuildingName.includes(normalizedSearchTerm) ||
          normalizedEquipmentType.includes(normalizedSearchTerm) ||
          normalizedEquipmentName.includes(normalizedSearchTerm)
        );
      });
      setFilteredData(filtered);
    } else if (selectedStatuses.length > 0) {
      // filtering based on selected statuses
      const filtered = alarmData.filter((alarm) =>
        selectedStatuses.includes(alarm.alarmStatus.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(alarmData);
    }
  }, [debouncedSearchTerm, selectedStatuses, alarmData]);

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

  const getStatusClass = (status: string): string => {
    switch (status.toLocaleLowerCase()) {
      case "active":
        return "createTaskButton";
      case "assigned":
        return "blue";
      case "in progress":
        return "orange";
      case "complete":
        return "green";
      case "pending":
        return "yellow";
      default:
        return "";
    }
  };

  const showModal = (alarm: AlarmData) => {
    setSelectedAlarm(alarm);
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const individualAlarm = (alarm: AlarmData) => {
    console.log("Alarm clicked:", alarm); // Add console log
    navigate(`/alarmGraph`, { state: { alamData: alarm } });
  };
  const renderAlarmRow = (alarm: AlarmData, index: number) => (
    <div
      key={index}
      className="alarm-row"
      onClick={() => individualAlarm(alarm)} // Apply onClick to the entire row
    >
      <div className="alarm-cell">{alarm.buildingName}</div>
      <div className="alarm-cell">{alarm.equipmentType}</div>
      <div className="alarm-cell styleEquipment">{alarm.equipmentName}</div>
      <div className="alarm-cell leftAligned styleAlarmSummary">
        {alarm.alarmSummary}
      </div>
      <div className="alarm-cell styledateAndTime">{alarm.dateAndTime}</div>
      <div className="alarm-cell">{alarm.priority}</div>
      <div className="alarm-cell">{alarm.alarm_measure}</div>
      <div className="alarm-cell">
        {alarm.energySaved === "N/A" ? "0" : alarm.energySaved}
      </div>
      <div className="alarm-cell">
        {alarm.costAvoided === "N/A" ? "0" : alarm.costAvoided}
      </div>
      <div
        className="alarm-cell statusCell"
        onClick={(e) => e.stopPropagation()} // Prevent row click when interacting with this cell
      >
        <div
          className={`styleAlarmStatus ${getStatusClass(alarm.alarmStatus)}`}
        >
          {alarm.alarmStatus.toLocaleLowerCase() === "active" ? (
            <span
              className="styleAlarmStatusLabel createTaskBtn"
              onClick={() => showModal(alarm)}
            >
              {alarm.alarmStatus.toLowerCase() === "active" ? (
                <span className="createTaskButton">create task</span>
              ) : (
                ""
              )}
            </span>
          ) : (
            <span className="styleAlarmStatusLabel">{alarm.alarmStatus}</span>
          )}
        </div>
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
      title: "Realtime Alarms",
      path: "/realtimeAlarm",
      className: "activeBreadcrumb",
    },
  ];

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <div className="realTimeAlarm">
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
          <Modal
            open={open}
            className="modalContainerRealTimeAlarm"
            centered
            title="Task creation"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_) => (
              <>
                <Button
                  className="creatTask"
                  onClick={async () => {
                    if (selectedAlarm) {
                      setCreateLoading(true); // Disable the create task button
                      setButtonsDisabled(true); // Disable both buttons
                      await handleCreateTask(selectedAlarm, setOpen, fetchData);
                      setCreateLoading(false); // Re-enable the create task button
                      setButtonsDisabled(false); // Re-enable both buttons
                    }
                  }}
                  loading={createLoading} // Add loading state to the create task button
                  disabled={buttonsDisabled} // Disable the button if buttonsDisabled is true
                >
                  Create task
                </Button>
                <Button
                  className="discardTask"
                  onClick={async () => {
                    if (selectedAlarm) {
                      setDiscardLoading(true); // Disable the discard button
                      setButtonsDisabled(true); // Disable both buttons
                      await handleDiscard(
                        selectedAlarm.rule_id,
                        selectedAlarm.alarm_id,
                        selectedAlarm.proj_equi_id,
                        setOpen,
                        fetchData
                      );
                      setDiscardLoading(false); // Re-enable the discard button
                      setButtonsDisabled(false); // Re-enable both buttons
                    }
                  }}
                  loading={discardLoading} // Add loading state to the discard button
                  disabled={buttonsDisabled} // Disable the button if buttonsDisabled is true
                >
                  Discard
                </Button>
              </>
            )}
          >
            <div className="confirmationText">
              {" "}
              Would you like to create a task for this Alarm?
            </div>
            <div className="confirmationText"> Or</div>
            <div className="discardText">
              You can also discard if no action is needed.
            </div>
          </Modal>
        </Col>
      </Row>
      {/* <AlarmDetails /> */}
      <Row gutter={[16, 16]} className="marginBottom ">
        <Col span={24} className="stats-row">
          <div className="stats-box">
            <div className="label activeAlarm">
              Active :
              <span className="label-value">
                {alarmCounts?.active ? alarmCounts.active : "0"}
              </span>
            </div>
          </div>
          <div className="stats-box">
            <div className="label assigned">
              Assigned :
              <span className="label-value">
                {alarmCounts?.assigned ? alarmCounts?.assigned : "0"}
              </span>
            </div>
          </div>
          <div className="stats-box">
            <div className="label in-progress">
              In progress :
              <span className="label-value">
                {alarmCounts?.inProgress ? alarmCounts?.inProgress : "0"}
              </span>
            </div>
          </div>

          <div className="stats-box">
            <div className="label pending ">
              Pending :{" "}
              <span className="label-value">
                {alarmCounts?.pending ? alarmCounts?.pending : "0"}
              </span>
            </div>
          </div>
          <div className="stats-box">
            <div className="label completed">
              Completed :
              <span className="label-value">
                {alarmCounts?.completed ? alarmCounts?.completed : "0"}
              </span>
            </div>
          </div>

          <div className="search-box-container stats-box">
            <Search
              className="search-box"
              placeholder="eg. Alarm summary"
              onSearch={handleSearch}
              onKeyUp={handleKeyUp}
              enterButton={false}
              prefix={<SearchOutlined />}
            />
          </div>
          <div className="StuatusFilter-container stats-box">
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
        <Row gutter={[16, 16]} className="marginBottom">
          <Col span={24}>
            <div className="alarm-table">
              <div className="alarm-header">
                <div className="alarm-cell">Building</div>
                <div className="alarm-cell">
                  Equipment
                  <br />
                  Type
                </div>
                <div className="alarm-cell styleEquipment">Equipment</div>
                <div className="alarm-cell styleAlarmSummary">
                  Alarm Summary
                </div>
                <div className="alarm-cell styledateAndtime">Date & Time</div>
                <div className="alarm-cell">Priority</div>
                <div className="alarm-cell">
                  Alarm
                  <br /> Measure
                </div>

                <div className="alarm-cell">
                  Energy Saved
                  <br /> in kWh
                </div>
                <div className="alarm-cell">
                  Cost Avoided
                  <br /> in €
                </div>
                <div className="alarm-cell">
                  Alarm <br />
                  Status
                </div>
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

              <div className="pagination-container realtimeAlam-pagination">
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
    </div>
  );
};

export default RealTimeAlarm;
