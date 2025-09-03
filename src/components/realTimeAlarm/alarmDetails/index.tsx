import React,{useState} from "react";
import { Row, Col } from "antd";
import "./alarmDetails.css"; // Import the CSS file

interface AlarmDetailsProps {
  buildingName: string;
  equipmentName: string;
  dateAndtime: string;
  rule_id: string;
  alarm_description: string;
  point_desc: string;
  recommendations: string;
}

const AlarmDetails: React.FC<AlarmDetailsProps> = ({
  buildingName,
  equipmentName,
  dateAndtime,
  rule_id,
  alarm_description,
  point_desc,
  recommendations
}) => {
  // Split recommendations by numbers followed by a period
  const recommendationList = recommendations?.split(/(?=\d+\.)/);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight); // State to store screen height
  const alarmDetailsWindowHeight = screenHeight > 700 ? 300 : 200; // Default graph height

  return (
    <div className="alarm-details-container" style={{ height: alarmDetailsWindowHeight }}>
      <span className="alarm-details-title">Alarm details</span>
      <Row gutter={[16, 16]}>
        <Col span={11}>
          <div className="details-wrapper">
            <Row gutter={[8, 8]} className="alarmDetailsTable">
              <Col span={24}>
                <Row className="detail-row">
                  <Col span={6} className="alarm-details-key">
                    <span>Building Name</span>
                  </Col>
                  <Col span={1} className="colon">
                    <span>:</span>
                  </Col>
                  <Col span={15} className="alarm-details-value">
                    <span>{buildingName}</span>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row className="detail-row">
                  <Col span={6} className="alarm-details-key">
                    <span>Equipment Name</span>
                  </Col>
                  <Col span={1} className="colon">
                    <span>:</span>
                  </Col>
                  <Col span={15} className="alarm-details-value">
                    <span>{equipmentName}</span>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row className="detail-row">
                  <Col span={6} className="alarm-details-key">
                    <span>Date and Time</span>
                  </Col>
                  <Col span={1} className="colon">
                    <span>:</span>
                  </Col>
                  <Col span={15} className="alarm-details-value">
                    <span>{dateAndtime}</span>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row className="detail-row">
                  <Col span={6} className="alarm-details-key">
                    <span>Rule ID</span>
                  </Col>
                  <Col span={1} className="colon">
                    <span>:</span>
                  </Col>
                  <Col span={15} className="alarm-details-value">
                    <span>{rule_id}</span>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row className="detail-row">
                  <Col span={6} className="alarm-details-key">
                    <span>Points considered</span>
                  </Col>
                  <Col span={1} className="colon">
                    <span>:</span>
                  </Col>
                  <Col span={15} className="alarm-details-value">
                    <span className="lineHeightStyle">{point_desc}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
        <div className="divider">
          <div></div>
        </div>
        <Col span={11}>
          <div className="alarm-summary-wrapper">
            <Row gutter={[8, 8]} className="alarmSummaryTable">
              <Col span={24}>
                <Row className="detail-row">
                  <Col span={6} className="alarm-details-key">
                    <span>Alarm Description</span>
                  </Col>
                  <Col span={1} className="colon">
                    <span>:</span>
                  </Col>
                  <Col span={17} className="alarm-details-value">
                    <span className="lineHeightStyle">{alarm_description}</span>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row className="detail-row recommendationCol">
                  <Col span={6} className="alarm-details-key">
                    <span>Recommendations</span>
                  </Col>
                  <Col span={1} className="colon">
                    <span>:</span>
                  </Col>
                  <Col span={17} className="alarm-details-value recommendationValue">
                    {recommendationList?.map((rec, index) => (
                      <span key={index} className="lineHeightRecommendation">
                        {rec.trim()}
                        <br />
                      </span>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AlarmDetails;