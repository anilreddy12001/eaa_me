// TaskStatusModal.tsx
import React, { useState,useEffect } from "react";
import { Modal, Select, Input, Button } from "antd";
import type { SelectProps } from "antd";
import { postTaskStatus } from "./utils";

const { TextArea } = Input;

const statusOptions: SelectProps["options"] = [
  { label: "Assigned", value: "assigned" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "inProgress" },
  { label: "Complete", value: "completed" },
];

interface TaskStatusModalProps {
  visible: boolean;
  onClose: () => void;
  currentTask: any;
  status?: string;
}

const TaskStatusModal: React.FC<TaskStatusModalProps> = ({
  visible,
  onClose,
  currentTask,
}) => {
  const [taskComment, setTaskComment] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const statusLabels: { [key: string]: string } = {
    assigned: "Assigned",
    pending: "Pending",
    inProgress: "In Progress",
    completed: "Completed",
  };
  
  const reverseStatusLabels: { [key: string]: string } = {
    Assigned: "assigned",
    Pending: "pending",
    "In Progress": "inProgress",
    Completed: "completed",
  };
  // Reinitialize the status state whenever currentTask changes
  useEffect(() => {
    setStatus(statusLabels[currentTask?.taskStatus] || "");
    setTaskComment(currentTask?.comments || "")
  }, [currentTask]);
  const handleAddComment = async () => {
    try {
      const response = await postTaskStatus(
        currentTask?.taskId,
        taskComment,
        status,
        "user"
      );
      console.log("API Response:", response);
      if (response?.status === "success") {
        onClose(); // Close the modal after successful comment addition
        console.log("Comment added successfully");
      }
      // Handle success (e.g., show a success message or update the UI)
    } catch (error) {
      console.error("Failed to add comment:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closable
      centered
      width={600}
      className="task-status-modal"
      forceRender
      keyboard
      maskClosable={false}
    >
      <h2
        style={{
          color: "white",
          marginBottom: 16,
          borderBottom: "1px solid #fff",
          display: "inline-block",
        }}
      >
        Task Status
      </h2>

      <div style={{ marginBottom: 16 }} className="task-status-select">
        <label style={{ color: "white", display: "block", marginBottom: 4 }}>
          Status
        </label>
        <Select
          placeholder="Select"
          options={statusOptions}
          value={status}
          onChange={(value) => setStatus(reverseStatusLabels[value] || value)}
          style={{ width: "100%" }}
          dropdownStyle={{ backgroundColor: "black", color: "white" }}
        />
      </div>
      <div className="task-status-textarea">
        <TextArea
          placeholder="Enter your comment"
          value={taskComment}
          rows={4}
          onChange={(e) => setTaskComment(e.target.value)}
          style={{
            marginBottom: 16,
            backgroundColor: "#fff", // default
            color: "#000", // default
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          style={{ backgroundColor: "green", borderColor: "green" }}
          onClick={() => handleAddComment(status)}
        >
          Add Comment
        </Button>
      </div>
    </Modal>
  );
};

export default TaskStatusModal;
