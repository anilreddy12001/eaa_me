import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, DownOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Form, Button, InputNumber, message,Select, ConfigProvider } from 'antd';
const { Option } = Select;
const { Header, Content, Sider } = Layout;
import "./index.css";
import { createRoot } from "react-dom/client";
import DirectoryTreeView from '../treeview/index';
import  Home  from '../configTool/home';
import  CreateLocation  from '../configTool/createLocation';
import  CreateEquipment  from '../configTool/createEquipment';
import CreateProject from '../configTool/createProject';
import CreatePoints from '../configTool/createPoints';
import CreateVariables from '../configTool/createVariables';
import EditVariables from '../configTool/editVariables';
import CreateDevices from '../configTool/createDevices';//deviceDiscovery

import DeleteProject from '../configTool/deleteProject';
import DeleteVariables from '../configTool/deleteVariables';
import DeletePoints from '../configTool/deletePoints';
import DeleteDevices from '../configTool/deleteDevices';


import DeleteLocation from '../configTool/deleteLocation';
import DeleteEquipment from '../configTool/deleteEquipment';
import UploadLocation from '../configTool/uploadLocation';
import UploadEquipment from '../configTool/uploadEquipment';
import UploadDevice from '../configTool/uploadDevice';
import UploadPoints  from '../configTool/uploadPoint';
import UploadVariables  from '../configTool/uploadVariables';
import UpdateMappingPoints  from '../configTool/updateMappingPoints';
import RuleManagement from '../configTool/ruleManagement';

import UpdateLocationMapping from '../configTool/updateMappingLocation';
import UpdateEquipment from '../configTool/updateMappingEquipment.tsx';
import RulesCreationEdit  from '../configTool/rulesCreationEdit';
import ReplaceDevice from '../configTool/replaceDevices';
import RenameDevice from '../configTool/renameDevices';
import Tree from './tree.jsx';
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};



const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(true);
//const dates=['Mar 2024','Dec 2024','Jan 2024']; dates.sort((a,b)=>new Date(a)-new Date(b))

  const [clickedLink, setClickedLink] = useState('');
  const [current, setCurrent] = useState('mail');
const [projectOptions,setProjectOptions]=useState([]);
const [selectedProjectId, setSelectedProjectId]=useState([]);
const [selectedNodeFromTree,setSelectedNodeFromTree]=useState();
const [projectData,setProjectData]=useState({
  "projects": [
      {
          "project_desc": "",
          "project_id": '',
          "project_name": "",
          "project_users": "",
          "regions": [

          ]
      }
  ]
});
const [refreshFlag, setRefreshFlag]=useState(false);
const setRefreshFlagFn=(e)=>{

  console.log('set refresh fn:', e);
  setRefreshFlag(e);
  setClickedLink(e);
}
  useEffect(() => {
    getTreeData('onload');


    window.addEventListener(
      "message",
      (event) => {
        //console.log('event:', event)
        if (event && event.data && typeof event.data === 'string' || event.data instanceof String && event.data.indexOf('``')!=-1) {
          console.log("event.data:",event.data);
          setClickedLink(event.data.split('``')[1])

        }})
    
  }, [refreshFlag, selectedNodeFromTree]);

  const getTreeData=(param)=>{

  
    axios({url:window.config.CG_PROJECT_TREE,method:'GET'}).then(response=>{
    console.log("tree response: ",response);
    if(response&& response.data && response.data.projects && response.data.projects.length>0){
      setProjectData(response.data);
    }

    
    //redirection logic based on hashtag:
    const root = createRoot(document.getElementById("configWorkArea"));
if(location.hash.includes("#configcreateLocation")){
 
root.render(
  <><CreateLocation setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/></>
)
setClickedLink('Create Location');
}
else if(location.hash.includes("#configcreateEquipment")){
  setClickedLink('Create Equipment');
  root.render(
    <><CreateEquipment setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/></>
  )
  }
  else if(location.hash.includes("#configcreatePoints")){
    setClickedLink('Create Points');
    root.render(
      <><CreatePoints  setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/></>
    )
    }
    else if(location.hash.includes("#configcreateVariables")){
      setClickedLink('Create Variables');
      root.render(
        <><CreateVariables  setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/></>
      )
      }
      else if(location.hash.includes("#configeditVariables")){
        setClickedLink('Edit Variables');
        root.render(
          <><EditVariables  setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/></>
        )
        }
      else if(location.hash.includes("#configcreateDevices")){
        setClickedLink('Create Devices');
        root.render(
          <><CreateDevices  setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/></>
        )
        }
        else if(location.hash.includes("#configcreateProject")){
          setClickedLink('Create Project');
          root.render(
          <><CreateProject setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree} /></>
          )
        }
        else if(location.hash.includes('#configuploadLocation')){
          setClickedLink('Upload Location');
          root.render(
            <><UploadLocation  setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/></>
          )
      
        }
        else if(location.hash.includes('#configuploadEquipment')){
          setClickedLink('Upload Equipment');
          root.render(
          <UploadEquipment  setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/>
          )
        }
        else if(location.hash.includes('#configuploadDevices')){
          setClickedLink('Upload Devices');
          root.render(
          <UploadDevice  setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/>
          )
        }
       
         else if(location.hash.includes('#configuploadPoints')){
          setClickedLink('Upload Points');
          root.render(
          <UploadPoints  setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/>
          )
        }
        else if(location.hash.includes('#configuploadVariables')){
          setClickedLink('Upload Variables');
          root.render(
          <UploadVariables  setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/>
          )
        }
        else if(location.hash.includes("#configdeleteProject")){
          setClickedLink('Delete Project');
          root.render(
          <><DeleteProject setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree} /></>
        )
        }
        else if(location.hash.includes('#configdeleteDevices')){
          setClickedLink('Delete Devices');
          
          root.render(
            <><DeleteDevices setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }

        else if(location.hash.includes('#configdeleteVariables')){
          setClickedLink('Delete Variables');
          
          root.render(
            <><DeleteVariables setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }
        else if(location.hash.includes('#configdeletePoints')){
          setClickedLink('Delete Points');
          
          root.render(
            <><DeletePoints setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }

        
        else if(location.hash.includes("#configdeleteEquipment")){
          setClickedLink('Delete Equipment');
          root.render(
          <><DeleteEquipment setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree} /></>
        )
        }
        else if(location.hash.includes("#configupdateMappingLocation")){
          setClickedLink('Update Location Mapping');
          root.render(

          <><UpdateLocationMapping setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          )
        }
        else if(location.hash.includes("#configdeleteLocation")){
          setClickedLink('Delete Location');
          root.render(

          <><DeleteLocation setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          )
        }
        else if(location.hash.includes("#configupdateMappingPoints")){
          setClickedLink('Update Points Mapping ');
          root.render(

          <><UpdateMappingPoints setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          )
        }
        else if(location.hash.includes("#configruleManagement")){
          setClickedLink('Rule Management');
          root.render(
            <><RuleManagement  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          )
        }
        else if(location.hash.includes('#configupdateMappingEquipment')){
          setClickedLink('Update Mapping Equipment');
          root.render(
          <UpdateEquipment  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
          );
        }
        else if(location.hash.includes('#configCreateEditRules')){
          setClickedLink('Create/Edit Rule');
          root.render(
            <RulesCreationEdit  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
            );
        }
        else if(location.hash.includes('#configrenameDevices')){
          setClickedLink('Rename Rule');
          root.render(
            <RenameDevice  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
            );
        }
        else if(location.hash.includes('#configreplaceDevices')){
          setClickedLink('Replace Rule');
          root.render(
            <ReplaceDevice  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
            );
        }
        else if(location.hash.includes('#configdeviceDiscovery')){
          setClickedLink('Device Discovery');
          const DeviceDiscovery=require('../configTool/deviceDiscovery');
          root.render(
            <DeviceDiscovery  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
            );
        }
        else if(location.hash.includes("#configeditDevices")){
          const EditDevices=require('../configTool/editDevices');
          setClickedLink('Edit Devices');
                  root.render(
                    <EditDevices  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
                    );
                }
    
    var projectDataVar = [];
    
    response.data.projects.forEach(project => {
       projectDataVar.push({name:project.project_name, children:[{name:'regions',children:project.regions.length>0?[{name:project.regions[0].region_name, children:[]}]:[]}]});
    
    })
    
    //console.log('projectData:',projectData);
    
    
    
    }).catch(e=>{
    
    
    })
    
    
    }

    const onClickOfLinks = (e) => {
      console.log('clicked: ', e);
      location.hash = "#/#config"+e.key;
      if (e.key != 'noLink') {
  
  
        const root = createRoot(document.getElementById("configWorkArea"));
       
        setClickedLink(e.key || e.target.innerText);
        if(e.key == 'home'){
          setClickedLink('');
          root.render(
            <><Home/></>
          )
        }
        else if(e.key == 'createLocation'){
          setClickedLink('Create Location');
  
          root.render(
            <><CreateLocation  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          )
        }
        else if(e.key == 'createEquipment'){
          setClickedLink('Create Equipment');
  
          root.render(
            <><CreateEquipment setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree} /></>
          )
        }
        else if (e.key == 'createPoints') {
          setClickedLink('Create Points');
          root.render(
            <CreatePoints setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
          );
        }
        else if (e.key == 'createVariables') {
          setClickedLink('Create Variables');
          root.render(
            <CreateVariables setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
          );
        }
          else if(e.key=="editVariables"){
            setClickedLink('Edit Variables');
            root.render(
              <><EditVariables  setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/></>
            )
            }
        
        else if (e.key == 'createDevices') {
          setClickedLink('Create Devices');
          root.render(
            <CreateDevices setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
          );
        }
        else if(e.key=='createProject'){
          setClickedLink('Create Project');
          
          root.render(
            <><CreateProject setRefreshFlagFn={setRefreshFlagFn} selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }
        else if(e.key=='deleteProject'){
          setClickedLink('Delete Project');
          
          root.render(
            <><DeleteProject setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }
        else if(e.key=='deleteDevices'){
          setClickedLink('Delete Devices');
          
          root.render(
            <><DeleteDevices setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }
        else if(e.key=='deleteLocation'){
          setClickedLink('Delete Location');
          
          root.render(
            <><DeleteLocation setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }
        else if(e.key=='deleteEquipment'){
          setClickedLink('Delete Equipment');
          
          root.render(
            <><DeleteEquipment setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }
        else if(e.key=='deleteProject'){
          setClickedLink('Delete Project');
          
          root.render(
            <><DeleteProject setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }
        else if(e.key=='deleteVariables'){
          setClickedLink('Delete Variables');
          
          root.render(
            <><DeleteVariables setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }
        else if(e.key=='uploadLocation'){
          setClickedLink('Upload Location');
          
          root.render(
            <><UploadLocation setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
        }
        else if(e.key=='uploadEquipment'){
          setClickedLink('Upload Equipment');
          
          root.render(
            <><UploadEquipment setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
        }
        else if(e.key=='uploadPoints'){
          setClickedLink('Upload Points');
          
          root.render(
            <><UploadPoints setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree} /></>
          );
        }
        else if(e.key=='uploadVariables'){
          setClickedLink('Upload Variables');
          
          root.render(
            <><UploadVariables setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
        }
        else if(e.key=='uploadDevices'){
          setClickedLink('Upload Devices');
          root.render(
          <UploadDevice setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
          )
        }
        else if(e.key=='deleteProject'){
          setClickedLink('Delete Project');
          
          root.render(
            <><DeleteProject setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }
        else if(e.key=='deleteProject'){
          setClickedLink('Delete Project');
          
          root.render(
            <><DeleteProject setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }
        else if(e.key=='deleteProject'){
          setClickedLink('Delete Project');
          
          root.render(
            <><DeleteProject setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
  
          
  
        }
  
        else if(e.key=='updateMappingLocation'){
          setClickedLink('Update Location Mapping');
          root.render(
            <><UpdateLocationMapping setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
        }

        else if(e.key=='updateMappingPoints'){
          setClickedLink('Update Points Mapping');
          root.render(
            <><UpdateMappingPoints setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          );
        }
        else if(e.key=='ruleManagement'){
          setClickedLink('Rule Management');
          root.render(
            <><RuleManagement  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/></>
          )
        }
        
else if(e.key=='updateMappingEquipment'){
          setClickedLink('Update Mapping Equipment');
          root.render(
          <UpdateEquipment />
          );
        }
        
        else if(e.key=='deletePoints'){
          setClickedLink('Delete Points');
          root.render(
          <DeletePoints />
          );
        }
        else if(e.key=='renameDevices'){
          setClickedLink('Rename Device');
          root.render(
            <RenameDevice  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
            );
        }
        else if(e.key=='replaceDevices'){
          setClickedLink('Replace Device');
          root.render(
            <ReplaceDevice  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
            );
      }
      else if(e.key=='deviceDiscovery'){
        const DeviceDiscovery = require('../configTool/deviceDiscovery');
        setClickedLink('Device Discovery');
        root.render(
          <DeviceDiscovery  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
          );
      }
      else if(e.key=="editDevices"){
const EditDevices=require('../configTool/editDevices');
setClickedLink('Edit Devices');
        root.render(
          <EditDevices  setRefreshFlagFn={setRefreshFlagFn}  selectedNodeFromTree={selectedNodeFromTree}/>
          );
      }
    }
  }
  

  const items = [
    {
      label: 'Configuration Tool',
      key: 'noLink',
      className:'configLogoText',

    },
    {
      label: 'Home',
      key: 'home',
      className:'configHomeClass',

    },
    {
      label: 'Project',
      key: 'project',
      icon:<DownOutlined/>,
      children: [
        {
          label: 'Create',
          key: 'createProject',
        },
        {
          label: 'Delete',
          key: 'deleteProject',
        },

      ],
    },
    {
      label: 'Location',
      key: 'location',
      icon:<DownOutlined/>,
      children: [
        {
          label: 'Create',
          key: 'createLocation',
        },
        {
          label: 'Update Mapping',
          key: 'updateMappingLocation',
        },
        {
          label: 'Delete',
          key: 'deleteLocation',
        },
        {
          label: 'Upload',
          key: 'uploadLocation',
        },

      ],

    },
    {
      label: 'Equipment',
      key: 'equipment',
      icon:<DownOutlined/>,
      children: [
        {
          label: 'Create',
          key: 'createEquipment',
        },
        {
          label: 'Update Mapping',
          key: 'updateMappingEquipment',
        },
        {
          label: 'Delete',
          key: 'deleteEquipment',
        },
        {
          label: 'Upload',
          key: 'uploadEquipment',
        },

      ],

    },
    {
      label: 'Points',
      key: 'points',
      icon:<DownOutlined/>,
      children: [
        {
          label: 'Create',
          key: 'createPoints',
        },
        {
          label: 'Update Mapping',
          key: 'updateMappingPoints',
        },
        {
          label: 'Delete',
          key: 'deletePoints',
        },
        {
          label: 'Upload',
          key: 'uploadPoints',
        },

      ],

    },
    {
      label: 'Variables',
      key: 'variables',
      icon:<DownOutlined/>,
      children: [
        {
          label: 'Create',
          key: 'createVariables',
        },
        {
          label: 'Edit Variables',
          key: 'editVariables',
        },
        {
          label: 'Delete',
          key: 'deleteVariables',
        },
        {
          label: 'Upload',
          key: 'uploadVariables',
        },

      ],

    },
    {
      label: 'Device Management',
      icon:<DownOutlined/>,
      key: 'dm',
      children: [
        {
          label: 'Device Discovery',
          key: 'deviceDiscovery',
        },
        {
          label: 'Upload Devices',
          key: 'uploadDevices',
        },
        {
          label: 'Create Devices',
          key: 'createDevices',
        },
        {
          label: 'Edit Devices',
          key: 'editDevices',
        },
        {
          label: 'Rename Devices',
          key: 'renameDevices',
        },
        {
          label: 'Replace Devices',
          key: 'replaceDevices',
        },
        {
          label: 'Delete Devices',
          key: 'deleteDevices',
        },

      ],

    },
    {
      label: 'Rule Management',
      key: 'ruleManagement',
      className:'configHomeClass',
      
    },
    {
      label: 'Report',
      key: 'report',
      children: [
        {
          label: 'Create',
          key: 'createReports',
        }
        

      ],
    },
    {
      label: 'Help',
      key: 'help',
      children: [
        {
          label: '',
          key: 'createHelp',
        }
        

      ],
    },
  


  ];

 
  document.title = 'Configuration Tool';

 

  
console.log("theme:",theme);
const setValueFromTree=(e)=>{
  console.log('value from tree:', e);
setSelectedNodeFromTree(e);
}
  return (
    <ConfigProvider
    theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}>
    <Layout>
      <Header
      className='configMainHeader'
        style={{
          display: 'flex',
          alignItems: 'center',
          color: '#FFFFFF',
          justifyContent: 'space-between',
          backgroundColor:'#0a8120'
        }}
      >
       
        <Menu expandIcon={<DownOutlined />} icon={<DownOutlined/>} theme={'dark'} onClick={onClickOfLinks} selectedKeys={[current]} style={{ width: '100%' }} mode="horizontal" items={items} />
      </Header>
      <Layout>
        
        <Layout
          style={{
            padding: '0 24px 24px',
            backgroundColor:'#001529',
            height: '90vh'
          }}
        >
          
          
          <Content
            style={{
              padding: 5,
              margin: 0,
              minHeight: 280,
              background: theme.backgroundColor,
              borderRadius: borderRadiusLG,
              display:'flex'
            }}
          >
            <div className="configTreeContainer"><Tree data={projectData} setRefreshFlagFn={setRefreshFlagFn} setValueFromTree={setValueFromTree}/></div>
            <div className='configHeaderAndContentwrapper'>
            <ConfigProvider
    theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}><Breadcrumb
    theme={'dark'}
            items={[
              {
                title: 'Home',
              },

              {
                title: clickedLink,
              },
            ]}
            style={{
              margin: '16px 0',
            }}
          />
          </ConfigProvider>
            <div id="configWorkArea">

            </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    </ConfigProvider>
  );
};
export default App;