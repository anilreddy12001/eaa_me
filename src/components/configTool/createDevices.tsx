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

  const [deviceId,setDeviceId]=useState('');
  const [deviceIp,setDeviceIp]=useState('');
  const [deviceDesc, setDeviceDesc]=useState('');
    useEffect(() => {
       // getLocations();
    }, []);
     

    document.title = 'Configuration Tool';
 

    const onChangeDeviceIdText=(e)=>{

      setDeviceId(e.target.value);
      // {
      //   "deviceId": "123",
      //   "deviceIp": "1.2.3",
      //   "deviceDesc": "TEST DEVICE"
      // }
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


    const submitCreateDevice=(e)=>{

      // {
      //   "deviceId": "123",
      //   "deviceIp": "1.2.3",
      //   "deviceDesc": "TEST DEVICE"
      // }
      axios({url:window.config.CG_CONFIG_CREATE_DEVICE,method:'POST', data:{deviceId:parseInt(deviceId) , deviceIp:deviceIp, deviceDesc:deviceDesc}}).then(response=>{
        console.log('response: ',response);
        message.success('Successfully created the device');
        }).catch(error=>{
        console.log('error:',error);
        message.success(error.response.data);
        })
    }
    return (
        
              
                <Layout
                    className='configIndividualLayoutClass'
                >

<div style={{display:'flex'}}>
<div>Device ID
                 <Input type="number" onChange={e=>onChangeDeviceIdText(e)}/>
                 </div>
                 <div>
                 Device IP
                 <Input type="text" onChange={e=>onChangeDeviceIpText(e)} />
                 </div>
                 <div>
                 Device Description
                 <Input type="text" onChange={e=>onChangeDeviceDescText(e)} />
                 </div>
              </div>
              
                    <Button disabled={deviceDesc==''|| deviceId==''|| deviceIp==''} onClick={e=>submitCreateDevice(e)}>Submit</Button>
                </Layout>
       
    );
};
export default App;