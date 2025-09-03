import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Form, Button, InputNumber, Checkbox, Select, message } from 'antd';
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
const App = (props) => {
  console.log("props:", props);

  const [regionOptions, setRegionOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [campusOptions, setCampusOptions] = useState([]);
  const [buildingOptions, setBuildingOptions] = useState([]);
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
  const [checkedID, setCheckedID] = useState(5);
  const [regionCode, setRegionCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [cityCode, setCityCode]=useState('');
  const [campusCode,setCampusCode]=useState('');
  const [buildingCode,setBuildingCode]=useState('');
  useEffect(() => {
    getLocations();
  }, []);
  const getLocations = () => {
    var locationList = [];
    let locationFilterURL = window.config.CG_CONFIG_FETCH_LOCATIONS;
    axios({
      method: 'GET', url: locationFilterURL, headers: { "Content-Type": "application/json" }

    }).then(response => {

      console.log('response: ', response);
      response.data.data.data.forEach(region => {
        region.countries.forEach(country => {

          country.cities.forEach(city => {
            city.campuses.forEach(campus => {
              campus.buildings.forEach(building => {

                locationList.push({ 
                  region: region.region_name, regionValue: region.region_code, 
                  country: country.country_name, countryValue: country.country_code, 
                  city: city.city_name, cityValue: city.city_code, 
                  campus: campus.campus_name, campusValue: campus.campus_code,
                  building:building.building_name, buildingValue: building.building_code
                 });
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
  }
  if (dropdownOptions && dropdownOptions.length > 0) {

    var regionListOptions=_.uniqBy(dropdownOptions.map(item => {return {label: item.region, value:'region::'+item.region+'::'+item.regionValue}}), 'value');
    var countryListOptions=_.uniqBy(dropdownOptions.map(item => {return {label: item.country, value:'country::'+item.country+'::'+item.countryValue}}), 'value');
    var cityListOptions=_.uniqBy(dropdownOptions.map(item => {return {label: item.city, value:'city::'+item.city+'::'+item.cityValue}}), 'value');
    var campusListOptions=_.uniqBy(dropdownOptions.map(item => {return {label: item.campus, value:'campus::'+item.campus+'::'+item.campusValue}}), 'value');
    var buildingListOptions=_.uniqBy(dropdownOptions.map(item => {return {label: item.building, value:'building::'+item.building+'::'+item.buildingValue}}), 'value');


  }
  var dropdownList = [];
  var textFieldList= [];
  
  
  if(props.selectedNodeFromTree && props.selectedNodeFromTree.project_id){
dropdownList=  [{ title: 'Region', name: 'Region', options: regionListOptions }, { title: 'Country', name: 'Country', options: countryListOptions }, { title: 'City', name: 'City', options: cityListOptions }, { title: 'Campus', name: 'Campus', options: campusListOptions },{title: 'Building', name:'Building', options:buildingListOptions}];
textFieldList=['0', '1', '2', '3','4'];
  }
  else{
  dropdownList=  [{ title: 'Region', name: 'Region', options: regionListOptions }, { title: 'Country', name: 'Country', options: countryListOptions }, { title: 'City', name: 'City', options: cityListOptions }, { title: 'Campus', name: 'Campus', options: campusListOptions }];
  textFieldList=['0', '1', '2', '3'];

  }
  document.title = 'Configuration Tool';
  const createLocation = () => {
    let url = '';
    let payload = '';
    if (props.selectedNodeFromTree && props.selectedNodeFromTree.project_id) {
      url = window.config.CG_CONFIG_CREATE_LOCATION_PROJECT;
      payload = { region_code: regionCode, country_code: countryCode, city_code: cityCode, campus_code: campusCode, building_code: buildingCode,building_name: buildingValue, project_id: props.selectedNodeFromTree.project_id };
    }
    else {
      url = window.config.CG_CONFIG_CREATE_LOCATION;
      payload = { region_name: regionValue, country_name: countryValue, city_name: cityValue, campus_name: campusValue, building_name: buildingValue }
    }
    axios({ url: url, method: 'POST', data: payload }).then(response => {
      console.log('response: ', response);
      message.success('Successfully created location');
      props.setRefreshFlagFn('createLocation' + Math.random());
    }).catch(error => {
      props.setRefreshFlagFn('createLocation' + Math.random());
      console.log('error:', error)
    })
  }

  const onChange = (e) => {

    console.log('onchange e:', e);
console.log('dropdownOptions:',dropdownOptions)
    let type = '';
    if (e.split('::')[0] == 'region') {
      type = 'region';
    }
    else if (e.split('::')[0] == 'country') {
      type = 'country';
    }
    else if (e.split('::')[0] == 'city') {
      type = 'city';
    }
    else if (e.split('::')[0] == 'campus') {
      type = 'campus';
    }
    else if (e.split('::')[0] == 'building') {
      type = 'building';
    }

    var regionVar = '';
    var countryVar = '';
    var cityVar = '';
    var campusVar = '';
    var buildingVar = '';

    dropdownOptions.filter(item => item[type] == e.split('::')[1]).map(item => {
      //console.log('item:',item);

      regionVar = item.region;
      countryVar = item.country;
      cityVar = item.city;
      campusVar = item.campus;
      buildingVar = item.building;
      if (type == 'region') { setRegionValue(item.region) }
      else if (type == 'country' && item.region != 'ALL') {
        setRegionValue(item.region);
        setCountryValue(item.country);
        setRegionCode(item.regionValue);
        setCountryCode(item.countryValue);
      }
      else if (type == 'city' && item.region != 'ALL') {
        setRegionValue(item.region);
        setCountryValue(item.country);
        setCityValue(item.city);
        setRegionCode(item.regionValue);
        setCountryCode(item.countryValue);
      }
      else if (type == 'campus' && item.region != 'ALL') {
        setRegionValue(item.region);
        setCountryValue(item.country);
        setCityValue(item.city);
        setCampusValue(item.campus);
        setRegionCode(item.regionValue);
        setCountryCode(item.countryValue);
        setCityCode(item.cityValue);
        setCampusCode(item.campusValue);
      }
      else if(type=='building' && item.region!='ALL'){
        setRegionValue(item.region);
        setCountryValue(item.country);
        setCityValue(item.city);
        setCampusValue(item.campus);
        setRegionCode(item.regionValue);
        setCountryCode(item.countryValue);
        setCityCode(item.cityValue);
        setCampusCode(item.campusValue);
        setBuildingCode(item.buildingValue);
        setBuildingValue(item.building);
      }






    });


    if (type == 'building') {

    }


    if (type == 'region') {
      //setCountryList([...new Set(dropdownOptions.filter(item=>item.region==e.split('::')[1]).map(item=>({label:item.country,value:'country::'+item.country})).map(item=>({label:item.country,value:'country::'+item.country})))]);


      let filteredCountryList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.country, value: 'country::' + item.country+'::'+item.countryValue })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.country, value: 'country::' +item.country+'::'+ item.countryValue })), 'value');
      if (JSON.stringify(filteredCountryList).indexOf('ALL') == -1) {
        //          filteredCountryList.unshift({ label: 'ALL', value: 'country::ALL' });

      }
      let filteredCityList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.city, value: 'city::' + item.city+'::'+item.cityValue })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.city, value: 'city::' + item.city+'::'+item.cityValue })), 'value');
      if (JSON.stringify(filteredCityList).indexOf('ALL') == -1) {
        //    filteredCityList.unshift({ label: 'ALL', value: 'city::ALL' });

      }
      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.campus, value: 'campus::' + item.campus+'::'+item.campusValue })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.campus, value: 'campus::' +item.campus+'::'+ item.campusValue })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        //    filteredCampusList.unshift({ label: 'ALL', value: 'campus::ALL' });

      }
      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.building, value: 'building::' +item.building+'::'+ item.buildingValue })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' +item.building+'::'+ item.buildingValue })), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        //    filteredBuildingList.unshift({ label: 'ALL', value: 'building::ALL' });

      }
      setCountryList(filteredCountryList);
      setCityList(filteredCityList);
      setCampusList(filteredCampusList);
      setBuildingList(filteredBuildingList);

      // setCountryValue('All');
      //  setCityValue('All');
      //setCampusValue('All');
      //setBuildingValue('All');
      let jsonObject = { places: [{ place: 'India', co2: '1223', energyConsumed: '214' }, { place: 'France', co2: '1224', energyConsumed: '215' }] };

    } else if (type == 'country') {
      let filteredCityList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.city, value: 'city::' + item.city+'::'+item.cityValue })), 'value')  : _.uniqBy(dropdownOptions.filter(item => item.country == e.split('::')[1]).map(item => ({ label: item.city, value: 'city::' +item.city+'::'+ item.cityValue })), 'value');
      if (JSON.stringify(filteredCityList).indexOf('ALL') == -1) {
        //    filteredCityList.unshift({ label: 'ALL', value: 'city::ALL' });

      }
      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.campus, value: 'campus::' + item.campusValue })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == e.split('::')[1]).map(item => ({ label: item.campus, value: 'campus::' +item.campus+'::'+ item.campusValue })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        //    filteredCampusList.unshift({ label: 'ALL', value: 'campus::ALL' });

      }

      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.building, value: 'building::' +item.building+'::'+ item.buildingValue })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' +item.building+'::'+ item.buildingValue})), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        //     filteredBuildingList.unshift({ label: 'ALL', value: 'building::ALL' });

      }
      setCityList(filteredCityList);
      setCampusList(filteredCampusList);
      setBuildingList(filteredBuildingList);
      //setCityValue('All');
      //setCampusValue('All');
      //setBuildingValue('All');
  

    } else if (type == 'city') {
      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.campus, value: 'campus::' + item.campusValue })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.city == e.split('::')[1]).map(item => ({ label: item.campus, value: 'campus::' +item.campus+'::'+ item.campusValue })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        //     filteredCampusList.unshift({ label: 'ALL', value: 'campus::ALL' });

      }

      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.building, value: 'building::' +item.building+'::'+ item.buildingValue })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.city == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' +item.building+'::'+ item.buildingValue })), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        //    filteredBuildingList.unshift({ label: 'ALL', value: 'building::ALL' });

      }
      setCampusList(filteredCampusList);
      setBuildingList(filteredBuildingList);

      //setCampusValue('All');
      //setBuildingValue('All');
      let jsonObject = { places: [{ place: 'epip', co2: '1223', energyConsumed: '214' }, { place: 'dtp', co2: '1224', energyConsumed: '215' }] };


    } else if (type == 'campus') {
      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.building, value: 'building::' +item.building+'::'+ item.buildingValue })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.campus == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' +item.building+'::'+ item.buildingValue })), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        //     filteredBuildingList.unshift({ label: 'ALL', value: 'building::ALL' });

      }

      setBuildingList(filteredBuildingList);

      //setBuildingValue('All');
      let jsonObject = { places: [{ place: 'SEZ1', co2: '1223', energyConsumed: '214' }, { place: 'SEZ2', co2: '1224', energyConsumed: '215' }] };

    }
    //widget data onchange of dropdown:
    if (type == 'region') {
      countryVar = 'ALL';
      cityVar = 'ALL';
      campusVar = 'ALL';
      buildingVar = 'ALL';
    }
    else if (type == 'country') {
      cityVar = 'ALL';
      campusVar = 'ALL';
      buildingVar = 'ALL';
    }
    else if (type == 'city') {
      campusVar = 'ALL';
      buildingVar = 'ALL';
    }
    else if (type == 'campus') {

      buildingVar = 'ALL';
    }

  }
  const handleDropdownVisibleChange = (visible, index) => {
    setOpenIndexes((prev) => ({ ...prev, [index]: visible }));
  };

  const onSearch = (e) => {
    console.log('e:', e);
    setIsDropdownOpen(true);
  }

  const onCheckChange = (e) => {
    console.log(e.target.checked, '::', e.nativeEvent.srcElement.id);
    if (e.target.checked) {
      setCheckedID(e.nativeEvent.srcElement.id);
    }
    else {
      setCheckedID(5);
    }
  }


  const submitCreateLocation = (e) => {
    console.log('e:', e, 'region:', regionValue, 'country', countryValue);
    createLocation();
  }


  const onChangeBuildingText = (e) => {
    console.log('e inside building text:', e);
    setBuildingValue(e.target.value);
  }

  const onChangeTextValues = (e, index) => {
    console.log('e inside building text:', e);
    index == 0 ? setRegionValue(e.target.value) : index == 1 ? setCountryValue(e.target.value) : index == 2 ? setCityValue(e.target.value) : index == 3 ? setCampusValue(e.target.value) : '';
  }
  return (


    <Layout
      className='configIndividualLayoutClass'
    >
      <div>{props.selectedNodeFromTree && props.selectedNodeFromTree.project_id ? "Selected Project ID: " + props.selectedNodeFromTree.project_id : ""}</div>
      {/* <div style={{ display: 'flex' }}>{dropdownList.map((item, i) => (<div style={{ width: '25%' }}>{item.name}</div>))}</div> */}
      <div style={{ display: 'flex', width: '100%' }}>

        {dropdownList.map((item, i) => (<div style={{ width: '25%' }}><div >{item.name}</div><Select disabled={i>=checkedID?true:false}className="createLocationDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false} open={!!openIndexes[i]} // Dynamically control dropdown open state
          onDropdownVisibleChange={(visible) => handleDropdownVisibleChange(visible, i)} style={{ width: '100%', borderRadius: '4px' }} value={i>=checkedID?'':item.name == 'Region' ? regionValue : item.name == 'Country' ? countryValue : item.name == 'City' ? cityValue : item.name == 'Campus' ? campusValue : item.name == 'Building' ? buildingValue : 'Select ' + item.name} key={i} id={item.name} showSearch={true} title={item.title}
          dropdownStyle={{
            border: '1px solid #50bc3d',
            backgroundColor: '#000000', color: '#ffffff'
          }} placeholder={'All'} defaultValue={'All'} options={item.name == 'Region' && regionList.length != 0 ? regionList : item.name == 'Country' && countryList.length != 0 ? countryList : item.name == 'City' && cityList.length != 0 ? cityList : item.name == 'Campus' && campusList.length != 0 ? campusList : item.name == 'Building' && buildingList.length != 0 ? buildingList : item.options} onChange={onChange}
          onSearch={onSearch} optionFilterProp="label"
        /> <Checkbox key={i} id={i} onChange={onCheckChange} className={'check' + item.name} /></div>))}

      </div>
      <div className="textInputWrapper" style={{ display: 'flex' }}>{textFieldList.map(item => (item == checkedID || item > checkedID) ? <Input type='text' onChange={e => onChangeTextValues(e, item)} value={item == 0 ? regionValue : item == 1 ? countryValue : item == 2 ? cityValue : item == 3 ? campusValue : ''} /> : <Input className="hiddenTextField" type='text' disabled />)}</div>

      {props.selectedNodeFromTree && props.selectedNodeFromTree.project_id?'':
      <><div>Building<Input type="text" onChange={e => onChangeBuildingText(e)} value={buildingValue} key="buildingTextInput" /></div></>
}
      <Button disabled={regionValue == '' || countryValue == '' || cityValue == '' || campusValue == '' || buildingValue == ''} onClick={e => submitCreateLocation(e)}>Submit</Button>
    </Layout>

  );
};
export default App;