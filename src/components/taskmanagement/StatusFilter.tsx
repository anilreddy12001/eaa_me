import React, { useState } from "react";
import { Menu, Checkbox, Dropdown, Button } from "antd";
import downloadIcon from "../../images/icons/download-icon.svg";
import "./statusFilter.css"; // Import the CSS file

interface StatusFilterProps {
  selectedStatuses: string[];
  onStatusChange: (status: string, checked: boolean) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatuses,
  onStatusChange,
}) => {
  const [visible, setVisible] = useState(false); // State to manage dropdown visibility
  const allStatuses = [ "assigned", "inprogress", "completed", "pending"];

  const statusLabels: { [key: string]: string } = {
    assigned: "Assigned",
    inprogress: "In progress",
    completed: "Completed",
    pending: "Pending",
  };
  const handleAllChange = (checked: boolean) => {
    if (checked) {
      allStatuses.forEach((status) => onStatusChange(status, true));
    } else {
      allStatuses.forEach((status) => onStatusChange(status, false));
    }
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    onStatusChange(status, checked);
  };

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const isAllSelected = allStatuses.every((status) =>
    selectedStatuses.includes(status)
  );

  const statusMenu = (
    <Menu>
      <Menu.Item key="all">
        <Checkbox
          checked={isAllSelected}
          onChange={(e) => handleAllChange(e.target.checked)}
        >
          All
        </Checkbox>
      </Menu.Item>
      {allStatuses.map((status) => (
        <Menu.Item key={status}>
          <Checkbox
            checked={selectedStatuses.includes(status)}
            onChange={(e) => handleStatusChange(status, e.target.checked)}
          >
            {statusLabels[status] || status.charAt(0).toUpperCase() + status.slice(1)}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={statusMenu}
      trigger={["click"]}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <Button icon={<img src={downloadIcon} alt="Filter" />}>Filter</Button>
    </Dropdown>
  );
};

export default StatusFilter;