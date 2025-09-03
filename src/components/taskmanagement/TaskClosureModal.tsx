import React, { useState,useEffect } from "react";
import { Modal, Input, Button, Tooltip, Space } from "antd";
import { postTaskClosure } from "./utils";
import Excellent from "../../images/icons/Excellent.svg";
import Average from "../../images/icons/Average.svg";
import Good from "../../images/icons/Good.svg";
import Poor from "../../images/icons/Poor.svg";
import Bad from "../../images/icons/Bad.svg";

const { TextArea } = Input;

interface TaskClosureModalProps {
  visible: boolean;
  onClose: () => void;
  currentRowData: any;
}

const TaskClosureModal: React.FC<TaskClosureModalProps> = ({
  visible,
  onClose,
  currentRowData,
}) => {
  const [taskComment, setTaskComment] = useState<string>(
    currentRowData?.taskComment
  );
  const [feedback, setSelectedFeedback] = useState<string>(
    currentRowData?.feedback
  );

  useEffect(() => {
    setTaskComment(currentRowData?.taskComment || "");
  }, [currentRowData]);
  
  const emojis = [
    { src: Excellent, label: "Excellent" },
    { src: Average, label: "Average" },
    { src: Good, label: "Good" },
    { src: Poor, label: "Poor" },
    { src: Bad, label: "Bad" },
  ];

  const handleEmojiClick = (label: string) => {
    setSelectedFeedback(label);
    console.log(`Selected emoji: ${label}`);
  };

 

  const handleTaskClosure = async () => {
    try {
      const response = await postTaskClosure(
        currentRowData?.taskId,
        taskComment,
        feedback,
        "atul"
      );
      console.log("API Response:", response);
      if (response?.status === "success") {
        console.log("Comment added successfully");
        onClose(); // Close modal after successful submission
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };
  
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      centered
      footer={null}
      closable
      width={600}
      className="task-closure-modal"
      maskClosable={false}
    >
      <h2 className="modal-title">Task Closure</h2>
      <p>Would you like to close this task?</p>

      <div className="closure-modal-textarea" style={{ marginBottom: 24 }}>
        <label>Closure Comment</label>
        <TextArea
          placeholder="Enter your comment"
          value={taskComment}
          rows={4}
          onChange={(e) => {e.stopPropagation();
            setTaskComment(e.target.value)}}
          style={{
            marginBottom: 16,
            backgroundColor: "#fff", // default
            color: "#000", // default
          }}
          onKeyDown={(e) => {
            e.stopPropagation(); // Prevent global keydown listeners
          }}
        />
      </div>

      <h2>Your Feedback:</h2>
      <Space>
        {emojis.map(({ src, label }) => (
          <Tooltip title={label} key={label}>
            <div
              className={`${feedback == label && "selected"}`}
              onClick={() => handleEmojiClick(label)}
              style={{
                cursor: "pointer",
                padding: "8px",
                borderRadius: "50%",
                transition: "all 0.3s",
              }}
            >
              <img src={src} alt={label} width={32} height={32} />
            </div>
          </Tooltip>
        ))}
      </Space>

      <div
        className="closure-modal-btn"
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "green",
            borderColor: "green",
            color: "white",
            marginRight: "10px",
          }}
          onClick={handleTaskClosure}
          disabled={!feedback || !taskComment}
        >
          Close
        </Button>
        <Button
          type="default"
          style={{
            backgroundColor: "#0C5757",
            borderColor: "#green",
            color: "#fff",
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default TaskClosureModal;
