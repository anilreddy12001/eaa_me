import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input,Form,Button, InputNumber, Select, message, Modal } from 'antd';
const { Header, Content, Sider } = Layout;
import "./index.css";
import { createRoot } from "react-dom/client";
import _ from 'lodash';
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
    const [options, setOptions]=useState([]);
    const [dropdownOptions,setDropdownOptions]=useState();
    const [selectedType,setSelectedType]=useState('');
    const [selectedValue, setSelectedValue]=useState('');
    const [modalOpen,setModalOpen]=useState(false);
    useEffect(() => {
      getLocations()
    }, []);
    const handleOk=()=>{
      setModalOpen(false);
      //onSubmit();
      deleteLocationsAPI();
          }
          const handleCancel=()=>{
            setModalOpen(false);
          }

          const onSubmit=()=>{
            setModalOpen(true);
            
          }
const deleteLocationsAPI=()=>{

  let payload={
    "locationType": selectedType,
    "locationValue": selectedValue.toString()//"APAC_dummy_2,APAC_dummy_test"
  };
  axios({url:window.config.CG_CONFIG_DELETE_LOCATIONS,method:'DELETE', data:payload}).then(response=>{
    console.log('response: ',response);
    message.success('Successfully deleted the location(s)');
    }).catch(error=>{
    
    })
}
    

    document.title = 'Configuration Tool';

   const onchangeLocationType=(e)=>{
    console.log(e,':dropdownOptions:',dropdownOptions);
    let filteredLocations=[];
    dropdownOptions.forEach(item=>{filteredLocations.push({'label':item[e], value: item[e]})})
    //dropdownOptions.filter(e=>{e==e.value});
    filteredLocations=_.uniqBy(filteredLocations, 'value');
console.log('filteredLocations',filteredLocations);
setSelectedType(e);
    setOptions(filteredLocations);
   }

   const onchangeLocationValue=(e)=>{
console.log(e);
setSelectedValue(e);
   }


   const getLocations=()=>{
    var locationList = [];
    let locationFilterURL=window.config.CG_CONFIG_FETCH_LOCATIONS;
    axios({
      method: 'GET', url: locationFilterURL, headers: { "Content-Type": "application/json" }

    }).then(response => {
      
      console.log('response: ', response);
      response.data.data.data.forEach(region=>{
      region.countries.forEach(country => {
        
          country.cities.forEach(city => {
            city.campuses.forEach(campus => {
              campus.buildings.forEach(building => {

              locationList.push({ region: region.region_name,regionValue:region.region_code,country: country.country_name, countryValue:country.country_code, city: city.city_name, cityValue:city.city_code, campus: campus.campus_name,campusValue:campus.campus_code, building:building.building_name, buildingValue:building.building_code });
              });
            });
          })
        });
      })
      
      //locationList.push({region:'APAC',country:'India',city:'Bangalore',campus:'epip',building:'SEZ'});
      console.log("locationList:", locationList)
      setDropdownOptions(locationList);
    }).catch(e => {
      
      // message.error('Network Error');
      //locationList.push({region:'APAC',country:'India',city:'Bangalore',campus:'epip',building:'SEZ'});
      //locationList = dropdownOptionsBackup;
      // locationList.unshift({ region: 'ALL', country: 'ALL', city: 'ALL', campus: 'ALL', building: 'ALL' });
      setDropdownOptions(locationList);
      console.log('e:', e)
    });

    if (dropdownOptions && dropdownOptions.length > 0) {

      //      Array.from(new Set(a))
      var regionListOptions = Array.from(new Set(dropdownOptions.map(item => item.region))).map(item => ({ label: item, value: 'region::' + item }));
      //console.log('region details: ',dropdownOptions.filter(item => item.region=='France')[0]);
      var countryListOptions = Array.from(new Set(dropdownOptions.map(item => item.country))).map(item => ({ label: item, value: 'country::' + item }));
      var cityListOptions = Array.from(new Set(dropdownOptions.map(item => item.city))).map(item => ({ label: item, value: 'city::' + item }));
      var campusListOptions = Array.from(new Set(dropdownOptions.map(item => item.campus))).map(item => ({ label: item, value: 'campus::' + item }));
     
  
    }
    const dropdownList = [{ title: 'Region', name: 'Region', options: regionListOptions }, { title: 'Country', name: 'Country', options: countryListOptions }, { title: 'City', name: 'City', options: cityListOptions }, { title: 'Campus', name: 'Campus', options: campusListOptions }];
  }

    return (
        
               
                <Layout
                    className='configIndividualLayoutClass'
                >
                  <Modal className='projectDeleteModal' open={modalOpen} width={'auto'}  onOk={handleOk} onCancel={handleCancel} centered >Are you sure you want to delete the location?</Modal>
                   <Select className="deleteLocationsDropdowns" showSearch={true} options={[{label:'Region', value:'region'},{label:'Country', value:'country'},{label:'City', value:'city'},{label:'Campus', value:'campus'},{label:'Building', value:'building'}]} onChange={e=>onchangeLocationType(e)}/>
                   <Select className="deleteLocationsDropdowns" mode="multiple"
      allowClear showSearch={true} options={options} onChange={e=>onchangeLocationValue(e)} />
                    
                    <Button onClick={e=>onSubmit(e)} disabled={selectedType=='' || selectedValue==''} style={{marginLeft:'33%', width:'30%',marginTop: '10px'}}>Submit</Button>
                </Layout>
           
    );
};
export default App;