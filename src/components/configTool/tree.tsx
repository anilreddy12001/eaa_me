import React, {useState} from 'react';
import { LaptopOutlined, NotificationOutlined, DoubleRightOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Form, Button, InputNumber, Checkbox, Select, message } from 'antd';
import CreateVariables from '../configTool/createVariables';
import  CreateEquipment  from '../configTool/createEquipment';
import CreateLocation from '../configTool/createLocation';
//  const root = createRoot(document.getElementById("configWorkArea"));
import axios from 'axios';
import { createRoot } from "react-dom/client";
const TreeNode = ({ node, props }) => {
  const [clicked, setClicked]=useState(false);
const [points, setPoints] = useState({
  x: 0,
  y: 0,
});
const [selectedNode, setselectedNode]=useState('');
const [selectedType, setSelectedType]=useState('');
const [selectedProject,setSelectedProject]=useState('');

const contextMenuFn=(e, selectedNode)=>{
  e.preventDefault();
console.log('e:',e, 'selectedNode:', selectedNode);

if(selectedNode.building_code){
let parentNode=e.nativeEvent.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[0].id;
console.log('parent node:',parentNode);
setSelectedProject(parentNode);
window.selectedProjectName=parentNode;
}

setClicked(true);
setPoints({x:e.pageX, y:e.pageY});
setselectedNode(selectedNode);

if(selectedNode.project_id){
  setSelectedType('project')
}
else if(selectedNode.equipment_id){
  setSelectedType('equipment')
}
else if(selectedNode.building_code){
  setSelectedType('building')
}
else if(selectedNode.location_id){
  setSelectedType('location')
}

}


const createFunction=(e)=>{
console.log('Add location Function e:',e);
setClicked(false);
//props.setRefreshFlagFn('Add Location');
window.postMessage("path``Add Location");
location.hash="#/#configcreateLocation";
const root = createRoot(document.getElementById("configWorkArea"));
root.render(
  <><CreateLocation  selectedNodeFromTree={selectedNode}  setRefreshFlagFn={props.setRefreshFlagFn}/></>
)
//props.setValueFromTree(selectedNode);
}



const addVariableFunction=(e)=>{
  console.log('addVariableFunction e:',e);
  setClicked(false);
  
  window.postMessage("path``Add Variable");
  //props.setValueFromTree(selectedNode);
  location.hash="#/#configcreateVariables";
  const root = createRoot(document.getElementById("configWorkArea"));
  root.render(
    <><CreateVariables  selectedNodeFromTree={selectedNode}  setRefreshFlagFn={props.setRefreshFlagFn}/></>
  )
}


const addEquipmentFunction=(e)=>{


console.log('add equipment:',e);
setClicked(false);
window.postMessage("path``Add Equipment");
location.hash="#/#configcreateEquipment";
//props.setValueFromTree(selectedNode);
const root = createRoot(document.getElementById("configWorkArea"));
root.render(
  <><CreateEquipment selectedNodeFromTree={selectedNode} setRefreshFlagFn={props.setRefreshFlagFn}/></>
)

}

const editFunction=(e)=>{
  console.log('editFunction e:',e);
  setClicked(false);
}
const deleteFunction=(e)=>{
  console.log('deleteFunction e:',e);
  setClicked(false);
}

const deleteLocationFunction=(e)=>{
  console.log('setselectedNode e:',selectedNode);


  setClicked(false);

  axios({ url: window.config.CG_CONFIG_DELETE_LOCATION_TREE+'?projLocId='+selectedNode.location_id, method: 'DELETE' }).then(response => {
    console.log('response: ', response);
    message.success('Successfully deleted location');
    props.setValueFromTree(selectedNode);
  }).catch(error => {
    console.log('e:', error)
  })
}

const deleteEquipmentFunction=(e)=>{
  console.log('deleteEquipmentFunction e:',e);
  setClicked(false);
  // http://127.0.0.1:5010/energyanalytics/api/v1/project/delete/equipment?projEquiId=32
  // delete method
  axios({ url: window.config.CG_CONFIG_DELETE_EQUIPMENT_TREE+'?projEquiId='+selectedNode.proj_equi_id, method: 'DELETE' }).then(response => {
    console.log('response: ', response);
    message.success('Successfully deleted equipment');
    props.setValueFromTree(selectedNode);
  }).catch(error => {
    console.log('e:', error)
  })

  
}

const selectFunction=(e)=>{
  props.setValueFromTree(selectedNode);
  // console.log('selectedNode: ',selectedNode);
  // if(selectedNode.split(':')[0]=='project_id'){
 
  // }
  // console.log('deleteFunction e:',e);
  setClicked(false);
}

const expandCollapse=(e)=>{
  console.log('e:',e);
  if(document.getElementById(e).nextElementSibling.style.display!="none"){
  document.getElementById(e).nextElementSibling.style.display="none";
  }else{
    document.getElementById(e).nextElementSibling.style.display="block";

  }

}
  {
  return (
    <li style={{textAlign: "left"}}>
      {(clicked && selectedType=='project')?(
        <div className="configContextMenuDiv" style={{top:points.y, left:points.x}}>
          <ul>
            <li onClick={createFunction}>Add Location</li>
            <li onClick={addVariableFunction}>Add Variable</li>
          </ul>
        </div>
      ):(clicked && selectedType=='building')?(
        <div className="configContextMenuDiv" style={{top:points.y, left:points.x}}>
          <ul>
            <li onClick={deleteLocationFunction}>Delete Location</li>
            <li onClick={addEquipmentFunction}>Add Equipment</li>
            
          </ul>
        </div>
      ):(clicked && selectedType=='equipment')?(
        <div className="configContextMenuDiv" style={{top:points.y, left:points.x}}>
          <ul>
            <li onClick={deleteEquipmentFunction}>Delete Equipment</li>
            
          </ul>
        </div>
      ):''}
      <div className="nodeTextConfigTool" onContextMenu={e=>contextMenuFn(e,node)} onClick={e=>{node?(setClicked(false)):setClicked(false)}} id={node.project_name || node.region_name || node.country_name || node.city_name || node.campus_name || node.building_name || node.equipment_name}><DoubleRightOutlined onClick={e=>expandCollapse(node.project_name || node.region_name || node.country_name || node.city_name || node.campus_name || node.building_name || node.equipment_name)} />{node.project_name || node.region_name || node.country_name || node.city_name || node.campus_name || node.building_name || node.equipment_name}</div>
      {node.regions && (
        <ul onClick={e=>setClicked(false)} className="regionTreeClass" title="region">
          {node.regions.map((region, index) => (
            <TreeNode key={index} node={region} props={props} />
          ))}
        </ul>
      )}
      {node.countries && (
        <ul onClick={e=>setClicked(false)} className="countryTreeClass" title="country">
          {node.countries.map((country, index) => (
            <TreeNode key={index} node={country} props={props} />
          ))}
        </ul>
      )}
      {node.cities && (
        <ul onClick={e=>setClicked(false)} className="cityTreeClass" title="city">
          {node.cities.map((city, index) => (
            <><TreeNode key={index} node={city} props={props} /></>
          ))}
        </ul>
      )}
      {node.campuses && (
        <ul onClick={e=>setClicked(false)} className="campusTreeClass" title="campus">
          {node.campuses.map((campus, index) => (
            <TreeNode key={index} node={campus} props={props} />
          ))}
        </ul>
      )}
      {node.buildings && (
        <ul onClick={e=>setClicked(false)} className="buildingTreeClass" title="building">
          {node.buildings.map((building, index) => (
            building.building_name?<TreeNode key={index} node={building} props={props}  />:''
          
          ))}
        </ul>
      )}
      {node.equipment && (
        <ul onClick={e=>setClicked(false)} className="equipmentTreeClass" title="equipment">
          {node.equipment.map((equipment, index) => (
            <TreeNode key={index} node={equipment} props={props} />
          ))}
        </ul>
      )}
    </li>
  );
};
}

const Tree = (props) => {
  console.log('data inside tree:',props)
  let projectData=props.data.projects;
  window.projectData=projectData;
  return (
    <ul >
      
      {props.data.projects.map((project, index) => (
        <TreeNode key={index} node={project} props={props}/>
      ))}
    </ul>
  );
};

export default Tree;