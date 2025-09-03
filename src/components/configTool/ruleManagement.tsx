import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, message, Form, Input, InputNumber, Table,ConfigProvider, theme } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { createRoot } from 'react-dom/client';
import  RulesCreationEdit  from '../configTool/rulesCreationEdit';

const UploadDevice = () => {
  const [file, setFile] = useState(null); // State to track the selected file
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [dataSourceinit, setDatasourceinit]=useState([{rule_id:'123',equipment_id:'eid1',associated_equipment_id:'aeid1',rules_condition:'condition1',time_duration:'time_duration', alarm:'alarm1'}]);
  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the selected file in the state
      console.log('Selected file: ', selectedFile);
    } else {
      setFile(null); // Reset if no file is selected
    }
  };


  useEffect(()=>{

    getRulesListAPI()
  },[])
  const getRulesListAPI = () => {
  
    // Make the API request using axios
    axios(window.config.CG_CONFIG_FETCH_RULE_LIST, {
      method: 'GET',
    })
      .then((resp) => {
        
        setDatasourceinit(resp.data.data);
        console.log('Response inside feeder file upload: ', resp);
      })
      .catch((error) => {
        // Handle error
        message.error( error.response.data.error, 2);
        console.log('Error while uploading Feeder File', error.response.data.error);
      });
  };

  // Handle upload button click
  const onupload = () => {
    if (!file) {
      message.error('Please select a file before submitting.');
      return; // Return early if no file is selected
    }
    // Trigger the API upload with the selected file
    getRulesListAPI(file);
  };

  

  const dataSource = [
    {
      key: '1',
      RID: 'rule1',
      EID: 'eid4',
      AEID: 'ghbkb32',
      rulesCondition:'',
      timeDuration: '2hr 20 mins',
      alarmDescription:'alarm description'

    },
    {
      key: '2',
      RID: 'rule2',
      EID: 'gkb22',
      AEID: 'gg67',
      rulesCondition:'a>5',
      timeDuration: '2hr 20 mins',
      alarmDescription:'alarm description..'

    },{
      key: '3',
      RID: 'rule3',
      EID: 'gkb32',
      AEID: 'ghbkb32',
      rulesCondition:'',
      timeDuration: '1hr 24 mins',
      alarmDescription:'alarm description..'

    },{
      key: '4',
      RID: 'rule4',
      EID: 'ghbkb32',
      AEID: 'ghbkb32',
      rulesCondition:'',
      timeDuration: '1hr 22 mins',
      alarmDescription:'alarm description..'

    },{
      key: '5',
      RID: 'rule5',
      EID: 'ghbkb32',
      AEID: 'ghbkb32',
      rulesCondition:'',
      timeDuration: '1hr 1 min',
      alarmDescription:'alarm description..'

    },{
      key: '6',
      RID: 'rule6',
      EID: 'ghbkb32',
      AEID: 'ghb3',
      rulesCondition:'',
      timeDuration: '1hr 10 mins',
      alarmDescription:'alarm description..'

    },{
      key: '7',
      RID: 'rule7',
      EID: 'ghbkb32',
      AEID: '32e',
      rulesCondition:'',
      timeDuration: '1hr 20 mins',
      alarmDescription:'alarm description..'

    },
    
  ];
  
  const columns = [
    {
      title: 'Rule ID',
      dataIndex: 'rule_id',
      key: 'rule_id',
    },
    {
      title: 'EID',
      dataIndex: 'equipment_id',
      key: 'equipment_id',
    },
    {
      title: 'AEID',
      dataIndex: 'associated_equipment_id',
      key: 'associated_equipment_id',
    },
    {
      title: 'Rules Condition',
      dataIndex: 'rules_condition',
      key: 'rules_condition',
    },
    {
      title: 'Time Duration',
      dataIndex: 'time_duration',
      key: 'time_duration',
    },
  {
    title: 'Alarm Description',
    dataIndex: 'alarm',
    key: 'alarm',

  },
  {
    title: 'Actions',
    dataIndex: 'alarmDescription',
    key: 'alarmDescription',
render:()=>{
  return(<div><EditOutlined /><DeleteOutlined/></div>)
}
  }
    
  ];

  const onClickOfNew=(e)=>{
    console.log('e:', e)
    location.hash = '#/#configCreateEditRules';
    const root = createRoot(document.getElementById("configWorkArea"));
    root.render(
      <><RulesCreationEdit id="1"/></>
    )
  }
  return (
    <div>
      <div className='ruleManagementHeader'><div className='newButtonRuleManagement'><Button onClick={e=>onClickOfNew(e)}>Create</Button></div> <div>
      <span className="search-wrapper" onMouseEnter={() => setIsSearching(true)} onMouseLeave={() => { if (searchText == '') { setIsSearching(false) } }}>
            {isSearching ? (
              <Input placeholder="Search..." prefix={<SearchOutlined />}
                onChange={(e) => setSearchText(e.target.value.trim())} />
            ) : (
              <SearchOutlined className="search-icon" />
            )}
          </span>


        </div></div>
      

      <div className="ruleManagementTable">
      <ConfigProvider
    theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}>
        <Table className='tableRuleManagement'  scroll={{y:'60vh'}} dataSource={dataSourceinit.filter((item) =>
            item.equipment_id && item.equipment_id.toLowerCase().includes(searchText.toLowerCase()) ||
            item.associated_equipment_id && item.associated_equipment_id.toLowerCase().includes(searchText.toLowerCase()) ||
            item.alarm && item.alarm.toLowerCase().includes(searchText.toLowerCase())
          )} columns={columns}/>
         </ConfigProvider>
      </div>
    </div>
  );
};

export default UploadDevice;
