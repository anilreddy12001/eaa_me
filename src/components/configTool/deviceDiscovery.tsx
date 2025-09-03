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

    const [time, setTime] = useState(() => new Date().toLocaleTimeString());

    const [clickedLink, setClickedLink] = useState('');
    const [current, setCurrent] = useState('mail');
    const[regionOptions, setRegionOptions]=useState([]);
    const[countryOptions, setCountryOptions]=useState([]);
    const[cityOptions, setCityOptions]=useState([]);
    const[campusOptions, setCampusOptions]=useState([]);
    const[buildingOptions, setBuildingOptions]=useState([]);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [openIndexes, setOpenIndexes] = useState({});
    const [regionValue, setRegionValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [campusValue, setCampusValue] = useState('');
  const [buildingValue, setBuildingValue] = useState('');
  const [regionList, setRegionList] = useState('');
  const [countryList, setCountryList] = useState('');
  const [cityList, setCityList] = useState('');
  const [campusList, setCampusList] = useState('');
  const [buildingList, setBuildingList] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [checkedID,setCheckedID]= useState(null);
  const [deviceId,setDeviceId]=useState('');
  const [deviceIp,setDeviceIp]=useState('');
  const [deviceDesc, setDeviceDesc]=useState('');
    useEffect(() => {
       // getLocations();
    }, []);
    const getLocations=()=>{
      var locationList = [];
      let locationFilterURL=window.config.CG_LOCATION_FILTER_API;
      axios({
        method: 'GET', url: locationFilterURL, headers: { "Content-Type": "application/json" },
        data: {
          "countryName": "All",
          "cityName": "ALL",
          "campusName": "ALL",
          "buildingName": "ALL",
          "equipmentName": "ALL"
        }
  
      }).then(response => {
        
        console.log('response: ', response);
        response.data.regionList.forEach(region => {
          region.countryList.forEach(country => {
            country.cityList.forEach(city => {
              city.campusList.forEach(campus => {
                campus.buildingList.forEach(building => {
  
                  locationList.push({ region: region.regionname, country: country.countryname, city: city.cityname, campus: campus.campusname, building: building.buildingname });
                  // locationList.push({region:'Europe',country:country.countryname,city:city.cityname,campus:campus.campusname,building:building.buildingname});
                });
              });
            })
          });
        });
        //locationList.push({region:'APAC',country:'India',city:'Bangalore',campus:'epip',building:'SEZ'});
        console.log("locationList:", locationList)
        setDropdownOptions(locationList);
      }).catch(e => {
        
        setDropdownOptions(locationList);
        console.log('e:', e)
      });
    }
    if (dropdownOptions && dropdownOptions.length > 0) {

      //      Array.from(new Set(a))
      let regionList = Array.from(new Set(dropdownOptions.map(item => item.region)));
  
      var equipmentListOptions = regionList.map(item => ({ label: item, value: 'equipmentType::' + item }));
      console.log('regionlist: ', regionList, 'regionListOptions:', equipmentListOptions);
      //console.log('region details: ',dropdownOptions.filter(item => item.region=='France')[0]);
      var countryListOptions = Array.from(new Set(dropdownOptions.map(item => item.country))).map(item => ({ label: item, value: 'country::' + item }));
      var cityListOptions = Array.from(new Set(dropdownOptions.map(item => item.city))).map(item => ({ label: item, value: 'city::' + item }));
      var campusListOptions = Array.from(new Set(dropdownOptions.map(item => item.campus))).map(item => ({ label: item, value: 'campus::' + item }));
      var buildingListOptions = Array.from(new Set(dropdownOptions.map(item => item.building))).map(item => ({ label: item, value: 'building::' + item }));
  
    }
    const dropdownList = [{ title: 'equipmentType', name: 'EquipmentType', options: equipmentListOptions }, { title: 'Country', name: 'Country', options: countryListOptions }, { title: 'City', name: 'City', options: cityListOptions }, { title: 'Campus', name: 'Campus', options: campusListOptions }, { title: 'Building', name: 'Building', options: buildingListOptions }];

    document.title = 'Configuration Tool';
const createLocation = () => {
  axios({url:window.config.CG_CONFIG_CREATE_LOCATION,method:'POST', data:{region_name:regionValue,country_name:countryValue,city_name:cityValue,campus_name:campusValue,building_name:buildingValue}}).then(response=>{
  console.log('response: ',response);
  
  }).catch(error=>{
  
  })
}
 

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