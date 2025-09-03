import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Form, Button, InputNumber, Checkbox, Select, message } from 'antd';
const { Header, Content, Sider } = Layout;
import "./index.css";
import _ from 'lodash';
import { createRoot } from "react-dom/client";


const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const [pointDesc, setPointDesc] = useState('');
  const [pointId, setpointId] = useState([]);
  
  const [formData, setFormData] = useState([]);
  const [deviceDropdownData, setDeviceDropdownData] = useState([]);
  const [deviceIPData, setDeviceIPData] = useState([]);
  const [deviceIDData,setDeviceIDData]=useState([]);
  const [deviceDescData,setDeviceDescData] = useState([]);
  const [indexList, setIndexList] = useState([]);
  const [deviceIdsSelected, setDeviceIdsSelected] = useState([]);
  const [deviceDescsSelected, setDeviceDescSelected] = useState([]);
  const [deviceIpsSelected, setDeviceIpSelected] = useState([]);

  
  const [pointsData,setPointsData]= useState([]);

  useEffect(() => {
    fetchDevices();
 
   // getAssociatedEquipmentDetails();

  }, []);

  const deleteDevice = () => {
   
    let payload={
      "deviceId": deviceIdsSelected,
      "deviceIp": deviceIpsSelected,
      "deviceDesc": deviceDescsSelected
    };
    axios({ url: window.config.CG_CONFIG_DELETE_DEVICE, method: 'DELETE', data: payload }).then(response => {
      console.log('response: ', response);
      message.success('Successfully deleted device(s)');
    }).catch(error => {
      console.log('e:', error)
    })
  }



  const onSearch = (e) => {
    console.log('e:', e);
    setIsDropdownOpen(true);
  }


  const fetchDevices = () => {
    axios({ url: window.config.CG_CONFIG_FETCH_DEVICE, method: 'GET' }).then(response => {
      console.log('response: ', response);
      
      setDeviceDropdownData(response.data.device_descs.map((item, index) =>  {return {label: item?item:'', value: response.data.device_ids[index]+"``"+response.data.device_addresses[index]+"``"+item, key:Math.random() }}));
      setDeviceIPData(response.data.device_addresses);
      setDeviceIDData(response.data.device_ids);
      
      setDeviceDescData(response.data.device_descs);

    }).catch(error => {
      console.log('e:', error)
    })

  }
  const onChangeDeviceDropdown = (e) => {
    console.log('e:', e);

  let deviceIDVar=[];
  let deviceIPVar=[];
  let deviceDescVar=[];

  console.log('deviceDropdownData::',deviceDropdownData);
  //deviceDropdownData.forEach((item, i)=>{if(e.indexOf(item.value)!=-1){indexListVar.push(i)}})
e.forEach(item1=>{
  deviceIDVar.push(item1.split('``')[0]);
  deviceIPVar.push(item1.split('``')[0]);
  deviceDescVar.push(item1.split('``')[0]);
  })

    
    setDeviceIdsSelected(deviceIDVar);
    setDeviceDescSelected(deviceDescVar);
    setDeviceIpSelected(deviceIPVar);

  }

  return (
    <Layout
      className='configIndividualLayoutClass'
    >
      <div style={{ display: 'flex' }}>
        <div style={{ width: '35%' ,marginLeft: '32%'}}>Device
   
        <Select mode="multiple"
          allowClear className="createLocationDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
          // Dynamically control dropdown open state
          style={{ width: '100%', borderRadius: '4px' }} key="1" id="1" showSearch={true} onChange={e=>onChangeDeviceDropdown(e)} options={deviceDropdownData} />
      </div>
        </div>
      <div style={{ display: 'flex' }}>


        

        {/* <div>Associated Equipment Type<Select mode="multiple"
          allowClear={true} className="createLocationDropdowns" defaultValue={mappedAssociatedEquipments} popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={true} value={mappedAssociatedEquipments}
          // Dynamically control dropdown open state
          style={{ width: '100%', borderRadius: '4px' }} key="1" id="1" showSearch={true} title="Associated Equipment Types"
          dropdownStyle={{
            border: '1px solid #50bc3d',
            backgroundColor: '#000000', color: '#ffffff'
          }} placeholder={'Please select'} options={associatedEquipmentTypes} onChange={e => onChange(e, 1)}
          onSearch={onSearch} optionFilterProp="label"
        /> </div> */}

      </div>



      <Button disabled={deviceIpsSelected.length == 0} onClick={e => deleteDevice(e)}>Submit</Button>
    </Layout>

  );
};
export default App;