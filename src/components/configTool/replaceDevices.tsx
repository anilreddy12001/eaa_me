import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input,Form,Button, InputNumber, Checkbox, Select,message } from 'antd';
const { Header, Content, Sider } = Layout;
import "./index.css";
import _ from 'lodash';
import { createRoot } from "react-dom/client";
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

  const onFinish = (values) => {
    console.log(values);
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

  const [replaceType, setReplaceType] = useState('');
  const [replaceWith, setReplaceWith] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [deviceId,setDeviceId]=useState('');
  const [deviceIp,setDeviceIp]=useState('');
  const [deviceDesc, setDeviceDesc]=useState('');
  const [deviceDropdownData, setDeviceDropdownData] = useState([]);
  const [deviceIdsSelected, setDeviceIdsSelected] = useState([]);
  const [deviceDescsSelected, setDeviceDescSelected] = useState([]);
  const [deviceIpsSelected, setDeviceIpSelected] = useState([]);

    useEffect(() => {
       fetchDevices();
    }, []);
  

    document.title = 'Configuration Tool';
    const fetchDevices = () => {
      axios({ url: window.config.CG_CONFIG_FETCH_DEVICE, method: 'GET' }).then(response => {
        console.log('response: ', response);
        
        setDeviceDropdownData(response.data.device_descs.map((item, index) =>  {return {label: item?item:'', value: response.data.device_ids[index]+"``"+response.data.device_addresses[index]+"``"+item, key:Math.random() }}));

  
      }).catch(error => {
        console.log('e:', error)
      })
  
    }
    const onChangeDeviceIdText=(e)=>{

      setDeviceId(e.target.value);
    
    }

    const onChangeDeviceIpText=(e)=>{
      setDeviceIp(e.target.value);

    
    }
    const onChangeDeviceDescText=(e)=>{
      setDeviceDesc(e.target.value);
      // {
      //   "deviceId": "123",
      //   "deviceIp": "1.2.3",
      //   "deviceDesc": "TEST DEVICE"
      // }
    }


    const submitReplaceDevice=(e)=>{

      // {
      //   "deviceId": "123",
      //   "deviceIp": "1.2.3",
      //   "deviceDesc": "TEST DEVICE"
      // }

      /*
      
      {
    "replaceType":"device_desc",
    "replaceString":"abc",
    "replaceWith":"xyz"
}
 
http://127.0.0.1:5010/energyanalytics/api/v1/device/replace
 
      */

var payload={
  "replaceType":replaceType,
  "replaceString":replaceString,
  "replaceWith": replaceWith
}
      axios({url:window.config.CG_CONFIG_REPLACE_DEVICE,method:'PUT', data:payload}).then(response=>{
        console.log('response: ',response);
        message.success('Successfully replaced the devices');
        }).catch(error=>{
        console.log('error:',error);
        })
    }


    const onChangeDeviceDropdown=(e)=>{
console.log('e:',e);
      setReplaceType(e);
    }

    const onChangeStringFromText=(e)=>{
      setReplaceString(e.target.value)
    }

    const onChangeStringToText=(e)=>{
setReplaceWith(e.target.value);
    }

    return (
        
              
                <Layout
                    className='configIndividualLayoutClass'
                >

<div style={{display:'flex'}}>
  <div style={{width:'30%'}}>
    
Select Device Type
<Select 
     className="replaceDeviceTypeDropdown" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
          // Dynamically control dropdown open state
          style={{width:'100%'}}
           key="1" id="1" showSearch={true} onChange={e=>onChangeDeviceDropdown(e)} options={[{label:'Device Description', value:'device_desc'},{label:'Device ID', value:'device_id'},{label:'Device IP', value:'device_ip'}]} />
  </div>
<div>Replace String
                 <Input type="text" onChange={e=>onChangeStringFromText(e)}/>
                 <div className='configReplaceDeviceSuggestionWrapper'>{replaceString!=''&&replaceType=='device_desc'?deviceDropdownData.filter((item) =>
            item.value && item.value.split('``')[2].toLowerCase().includes(replaceString.toLowerCase())
          ).map((item) => (
                  <div style={{ display: "block", padding: 10 }}>
                {item.value.split('``')[2]}
              </div>
                  
            )):replaceString!=''&&replaceType=='device_id'?deviceDropdownData.filter((item) =>
              item.value && item.value.split('``')[0].toLowerCase().includes(replaceString.toLowerCase())
            ).map((item) => (
                    <div style={{ display: "block", padding: 10 }}>
                  {item.value.split('``')[0]}
                </div>
                    
              )):replaceString!=''&&replaceType=='device_ip'?deviceDropdownData.filter((item) =>
                item.value && item.value.split('``')[1].toLowerCase().toLowerCase().includes(replaceString.toLowerCase())
              ).map((item) => (
                      <div style={{ display: "block", padding: 10 }}>
                    {item.value.split('``')[1]}
                  </div>
                      
                )):''}
                </div>
                 </div>

                 <div>
                 Replace With
                 <Input type="text" onChange={e=>onChangeStringToText(e)} />
                 </div>
                 
              </div>
              
                    <Button disabled={replaceType==''|| replaceString==''|| replaceWith==''} onClick={e=>submitReplaceDevice(e)}>Submit</Button>
                </Layout>
       
    );
};
export default App;