import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import './breadcrumb.css'; // Import the CSS file 

interface BreadcrumbItem {
  title: string;
  path: string;
  className?: string; // Add className as an optional property
}

interface BreadcrumbComponentProps {
  items: BreadcrumbItem[];
  className?: string; // Add className as an optional prop
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  items,
  className,
}) => {

  const onclickPath=(e)=>{
    if(e=='/dashboard'){
      location.hash="#/dashboard";
location.reload();
    }
  }
  return (
    <Breadcrumb 
    separator=">"
    className={className}> {/* Apply the className */}
      {items.map((item, index) => (
        <Breadcrumb.Item key={index}>
          <Link onClick={e=>onclickPath(item.path)} className={item?.className} to={item.path}>{item.title}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;