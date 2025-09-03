import React, { useEffect, useState,useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fetchAlarmGraphData, fetchAlarmDetailsData } from "./utils.tsx"; // Import both utility functions
import { AlarmData, DataPoint } from "./types";
import GraphDetails from "./graphDetails";
import AlarmDetails from "../alarmDetails";
import BreadcrumbComponent from "../BreadcrumbComponent.tsx";
import { Row, Col } from "antd";
const AlarmGraph: React.FC = () => {
  const [alarmDetailsData, setAlarmDetailsData] = useState<DataPoint[]>([]); // For graph data
  const [alarmDetails, setAlarmDetails] = useState<any>(null); // For additional alarm details
  const [loading, setLoading] = useState<boolean>(false);
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false); // Separate loading state for alarm details
  const [error, setError] = useState<string | null>(null); // Error state for alarm details
  const location = useLocation();
  const [alarmData, setAlarmData] = useState<AlarmData | null>(null);

  const memoizedLocationState = useMemo(() => location.state, [location.state]);
 
  useEffect(() => {
    if (!location.state || !location.state.alamData) return;

    const alamData = location.state.alamData;
    setAlarmData(alamData);

    const alarmId = alamData.alarm_id;

    if (alarmId) {
      // Fetch graph data
      setLoading(true);
      fetchAlarmGraphData(Number(alarmId),'24')
        .then((data: AlarmData[]) => {
          setAlarmDetailsData(data);
        })
        .catch((error) => {
          console.error("Error fetching alarm graph data:", error);
          setError("Error fetching alarm graph data:")
        })
        .finally(() => {
          setLoading(false);
        });

      // Fetch additional alarm details
      setDetailsLoading(true);
      setError(null); // Clear any previous errors
      fetchAlarmDetailsData(alarmId)
        .then((data) => {
          setAlarmDetails(data); // Set the fetched alarm details
        })
        .catch((error) => {
          console.error("Error fetching alarm details data:", error);
          setError("Failed to fetch alarm details data.");
        })
        .finally(() => {
          setDetailsLoading(false);
        });
    }
  }, [memoizedLocationState]);

  // Extract necessary values from alarmData
  const buildingName = alarmData ? alarmData.buildingName : "";
  const equipmentName = alarmData ? alarmData.equipmentName : "";
  const dateAndtime = alarmData ? alarmData.dateAndTime : "";
  const rule_id = alarmData ? alarmData.rule_id : "";
  const point_desc = alarmDetails?.rule_details?.point_desc;
  const recommendations = alarmDetails?.rule_details?.recommendations;
  const alarm_description = alarmDetails?.analysis_details?.alarm_description;
  const breadcrumbItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      className: "inactive",
    },
    {
      title: "Realtime Alarms",
      path: "/realtimeAlarm",
      className: "inactive",
    },
    {
      title: "Alarm Details",
      path: "/alarmGraph",
      className: "activeBreadcrumb",
    },
  ];

  
  return (
    <>
      <Row gutter={[16, 16]} className="breadcrumb-row">
        <Col span={24}>
          <BreadcrumbComponent items={breadcrumbItems} className="breadcrumb" />
          {/* Add className */}
        </Col>
      </Row>
      {alarmData && (
        <AlarmDetails
          buildingName={buildingName}
          equipmentName={equipmentName}
          dateAndtime={dateAndtime}
          rule_id={rule_id}
          alarm_description={alarm_description}
          point_desc={point_desc}
          recommendations={recommendations}
        />
      )}
      {loading || detailsLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading the graph data: {error}</div>
      ) : (
        <>
        
          {Object.keys(alarmDetailsData).length > 0 && (
            <GraphDetails alarmDetailsData={alarmDetailsData} />
          )}
        </>
      )}
    </>
  );
};

export default AlarmGraph;
