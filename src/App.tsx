import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { UnityLoader } from './components/UnityLoader';
import { Gamepad2 } from 'lucide-react';
import { UnityProvider } from './contexts/UnityContext';
import dayjs from 'dayjs';
import dropdownOptionsBackup from './dropdownOptions.js';
import logo from './logo.png';
import ConfigTool from './components/configTool/index.tsx';
import _ from 'lodash';
import ChatbotIcon from './components/chatbot.tsx';
import DigitalTwinIcon from './components/digital-twin.tsx';
import Dashboard from './components/dashboard.tsx';
import RealtimeAlarmComponent from './components/realTimeAlarm/index.tsx';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  CaretDownFilled,
  CaretDownOutlined,
  DownOutlined,

  ArrowsAltOutlined
} from '@ant-design/icons';
import { Select, Button, Input, message, Spin, DatePicker, Space, Avatar, Tooltip, Modal, Layout } from "antd";
import keycloak, { logout } from "./components/utils/keycloak.js";
import Charts from "./components/charts/index.tsx";
import LeftSidebar from "./components/sidebar/index.tsx";
import Sidebar from "./components/sidebar/Sidebar.tsx";

import axios from "axios";

import "./index.css";
import menuClickAudioFile from "./menu-click.mp3";
import ClockComponent from './components/clock/index.tsx';
import HeaderComponent from './components/header/index.tsx';
import MainWorkAreaComponent from './components/mainWorkArea';
import MainWorkAreaComponentGraph from './components/mainworkAreagraph';
import MemoizedMainWorkAreaComponent from './components/mainWorkArea/memoizedMainWorkArea.tsx';

const { RangePicker } = DatePicker;
function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [login, setLogin] = useState(false);
  const [regionValue, setRegionValue] = useState('ALL');
  const [countryValue, setCountryValue] = useState('ALL');
  const [cityValue, setCityValue] = useState('ALL');
  const [campusValue, setCampusValue] = useState('ALL');
  const [buildingValue, setBuildingValue] = useState('ALL');
  const [regionList, setRegionList] = useState('');
  const [countryList, setCountryList] = useState('');
  const [cityList, setCityList] = useState('');
  const [campusList, setCampusList] = useState('');
  const [buildingList, setBuildingList] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [unityMessageObject, setUnityMessageObject] = useState({});
  const [viewMode, setViewMode] = useState('landingPageView');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [countryCount, setCountryCount] = useState('0');
  const [employeeCount, setEmployeeCount] = useState('0');
  const [area, setArea] = useState('0');
  const [buildingCount, setBuildingCount] = useState('0');
  const [chartData, setChartData] = useState([]);
  const [dChartData, setDChartData] = useState([{ energy_consumption: '100%', name: 'ALL' }]);
  const [waterConsumption, setWaterConsumption] = useState('0');
  const [waterConsumptionChartData, setWaterConsumptionChartData] = useState([]);
  const [dateRange, setDateRange] = useState('till_date');
  const [energyConsumption, setEnergyConsumption] = useState('0');
  const [renewableEnergy, setRenewableEnergy] = useState('0');
  const [emissionReduction, setEmissionReduction] = useState('0');
  const [barDataWater, setBarDataWater] = useState([]);
  const [barDataEnergy, setBarDataEnergy] = useState([]);
  const [barDataRenewableEnergy, setBarDataRenewableEnergy] = useState([]);
  const [barDataEmissionReduction, setBarDataEmissionReduction] = useState([]);
  const [doughnutDataWater, setDoughnutDataWater] = useState([]);
  const [doughnutDataEnergy, setDoughnutDataEnergy] = useState([]);
  const [doughnutDataRenewableEnergy, setDoughnutDataRenewableEnergy] = useState([]);
  const [doughnutDataEmissionReduction, setDoughnutDataEmissionReduction] = useState([]);
  const [onLoadFlag, setOnLoadFlag] = useState(true);
  const [type, setType] = useState('ALL');
const [graphPayload, setGraphPayload]=useState({});
const [headerPayload, setHeaderPayload]=useState({});
const [doughnutPayload, setDoughnutPayload]=useState({});


// const { unityProvider, isLoaded, loadingProgression, isError, errorMessage, sendMessage, addEventListener, removeEventListener } =
// useUnity();
  const [openIndexes, setOpenIndexes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRangePickerModalOpen, setIsRangePickerModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('2024-05-15');
  const [endDate, setEndDate] = useState('2024-05-15');
  const [MainWorkAreaComponentClicked,setMainWorkAreaComponentClicked]=useState(false);
  const [MainWorkAreaComponentGraphClicked,setMainWorkAreaComponentGraphClicked]=useState(false);
  const [pageClickedFor, setPageClickedFor]=useState('dashboard');
const [clickedLabel,setClickedLabel]=useState('Resource');
  const [DashboardClicked,setDashboardClicked]=useState(true);
  const showModal = () => {
    setIsModalOpen(true);
    document.getElementById("digitalTwinId").style.display = "none";
    document.getElementById("chatbotId").style.display = "none";
  };
  const sendDataToLandingPage=(e)=>{
    console.log('received data in landing page sendDataToLandingPage:',e);
      

      e.split('::')?(setClickedLabel(e.split('::')[1]), setPageClickedFor(e.split('::')[0])):setPageClickedFor(e);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleRangePickerOk = () => {
    setIsRangePickerModalOpen(false);
  }
  const handleRangePickerCancel = () => {
    setIsRangePickerModalOpen(false);
  }

  const handleIconClick = (index) => {
    setOpenIndexes((prev) => ({ ...prev, [index]: !prev[index] }));
    setIsDropdownOpen(false);

  };


  const handleDropdownClose = (index) => {
    setOpenIndexes((prev) => ({ ...prev, [index]: false }));
  };
  const handleDropdownVisibleChange = (visible, index) => {
    setOpenIndexes((prev) => ({ ...prev, [index]: visible }));
  };
  const handleIconClickdate = () => {
    //setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility };
    setIsDateDropdownOpen((prev) => !prev);
  }

  const [co2Data, setCo2Data] = useState('');

  const menuClickAudio = new Audio(menuClickAudioFile);

  //  console.log("dropdownOptions: ",dropdownOptions);
  if (dropdownOptions && dropdownOptions.length > 0) {

    //      Array.from(new Set(a))
    let regionList = Array.from(new Set(dropdownOptions.map(item => item.region)));

    var regionListOptions = regionList.map(item => ({ label: item, value: 'region::' + item }));
    console.log('regionlist: ', regionList, 'regionListOptions:', regionListOptions);
    //console.log('region details: ',dropdownOptions.filter(item => item.region=='France')[0]);
    var countryListOptions = Array.from(new Set(dropdownOptions.map(item => item.country))).map(item => ({ label: item, value: 'country::' + item }));
    var cityListOptions = Array.from(new Set(dropdownOptions.map(item => item.city))).map(item => ({ label: item, value: 'city::' + item }));
    var campusListOptions = Array.from(new Set(dropdownOptions.map(item => item.campus))).map(item => ({ label: item, value: 'campus::' + item }));
    var buildingListOptions = Array.from(new Set(dropdownOptions.map(item => item.building))).map(item => ({ label: item, value: 'building::' + item }));

  }
  const dropdownList = [{ title: 'Region', name: 'Region', options: regionListOptions }, { title: 'Country', name: 'Country', options: countryListOptions }, { title: 'City', name: 'City', options: cityListOptions }, { title: 'Campus', name: 'Campus', options: campusListOptions }, { title: 'Building', name: 'Building', options: buildingListOptions }];



  let chartWidgetList = [{ name: 'Energy Consumption', title: '', type: 'bar', content: { options: '', data: barDataEnergy } },
  { name: 'Renewable Energy', title: '', type: 'bar', content: { options: '', data: barDataRenewableEnergy } },
  { name: 'Emission Reduction', title: '', type: 'bar', content: { options: '', data: barDataEmissionReduction } },
  { name: 'Water Consumption', title: '', type: 'bar', content: { options: '', data: barDataWater } },

  { name: 'Energy Consumption', title: '', type: 'doughnut', content: { options: '', data: doughnutDataEnergy } },
  { name: 'Renewable Energy', title: '', type: 'doughnut', content: { options: '', data: doughnutDataRenewableEnergy } },
  { name: 'Emission Reduction', title: '', type: 'doughnut', content: { options: '', data: doughnutDataEmissionReduction } },
  { name: 'Water Consumption', title: '', type: 'doughnut', content: { options: '', data: doughnutDataWater } },
{name:'graphPayload',payload:graphPayload},
{name:'headerPayload',payload:headerPayload},
{name:'doughnutPayload',payload:doughnutPayload},
  ];

  let inputData = { countryCount: countryCount, buildingCount: buildingCount, area: area, employeeCount: employeeCount };

  const onclickFn = (e) => {
    console.log("menuclick audio: ", menuClickAudio);
    menuClickAudio.play();
  }
  useEffect(() => {
    if (location.hash == '#dashboard') {
      loginFn();
      getOnloadData();
    }
    
    window.addEventListener(
      "message",
      (event) => {
        if (event && event.data && typeof event.data === 'string' || event.data instanceof String) {
          console.log("event.data:",event.data)
          console.log('Received message from Unity: ', event.data.split(':'));
          //if (event.origin !== "http://example.org:8080") return;
          
          let buildingUnityVar=event.data.split(':')[9].charAt(0).toUpperCase() + event.data.split(':')[9].slice(1);
          let campusUnityVar=event.data.split(':')[7].charAt(0).toUpperCase() + event.data.split(':')[7].slice(1);
          let cityUnityVar=event.data.split(':')[5].charAt(0).toUpperCase() + event.data.split(':')[5].slice(1);
          let countryUnityVar=event.data.split(':')[3].charAt(0).toUpperCase() + event.data.split(':')[3].slice(1);
          let regionUnityVar=event.data.split(':')[1].charAt(0).toUpperCase() + event.data.split(':')[1].slice(1);
          if(regionUnityVar=='Apac'){regionUnityVar='APAC'}
          if(campusUnityVar=='Epip'){campusUnityVar='EPIP'}
          if(campusUnityVar=='Dtp'){campusUnityVar='DTP'}

          // setRegionValue(regionUnityVar);
          // setCountryValue(countryUnityVar);
          // setCityValue(cityUnityVar);
          // setCampusValue(campusUnityVar);
          // setBuildingValue(buildingUnityVar);
          let val='';
          let selectedType='';
          if(buildingUnityVar=='All' && campusUnityVar=='All' && cityUnityVar=='All' && countryUnityVar=='All'){
            val=regionUnityVar;
            selectedType='region';
          }
          else if(buildingUnityVar=='All' && campusUnityVar=='All' && cityUnityVar=='All'){
            val=countryUnityVar;
            selectedType='country';
          }
          else if(buildingUnityVar=='All' &&campusUnityVar=='All'){
            val=cityUnityVar;
            selectedType='city';
          }
          else if(buildingUnityVar=='All'){
val=campusUnityVar;
selectedType='campus';
          }


  var setTargetFlag=event.data.split(':')[12];
  if(setTargetFlag=='false'){
sessionStorage.setItem("setTargetFlag","false");
  }
  console.log('calling onchange with data:',selectedType+'::'+val+'::countryUnityVar: '+countryUnityVar);
  onChange(selectedType+'::'+val);
  //'city::Perth'

  // setUnityMessageObject({ type: type, value: event.data });
        }
      },
      false,
    );
    
  }, []);


  

  const getOnloadData = () => {

    var locationList = [{ region: 'ALL', country: 'ALL', city: 'ALL', campus: 'ALL', building: 'ALL' }];
    var locationFilterURL = window.config.CG_LOCATION_FILTER_API;
    //locationFilterURL="http://10.51.108.48:5120/energyanalytics/api/v1/filter/data"; //for demo
    setSpinning(true);

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
      setSpinning(false);
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
      window.dropdownoptions=locationList;
    }).catch(e => {
      setSpinning(false);
      // message.error('Network Error');
      //locationList.push({region:'APAC',country:'India',city:'Bangalore',campus:'epip',building:'SEZ'});
      locationList = dropdownOptionsBackup;
      locationList.unshift({ region: 'ALL', country: 'ALL', city: 'ALL', campus: 'ALL', building: 'ALL' });
      setDropdownOptions(locationList);
      window.dropdownoptions=locationList;
      console.log('e:', e)
    });
    //onload API call to get co2 data:
    getWidgetDataAPI('ALL', 'ALL', 'ALL', 'ALL', 'ALL', startDate, endDate, dateRange);
    getBarDataAPI('ALL', 'ALL', 'ALL', 'ALL', 'ALL', startDate, endDate, dateRange);

    //onload API call to get header count data:
    axios({
      method: 'POST', url: window.config.CG_HEADER_COUNT_DATA, data:
      {
        "region": "ALL",
        "countryName": "ALL",
        "cityName": "ALL",
        "campusName": "ALL",
        "buildingName": "ALL"
      }
    }
    ).then(response => {
      console.log('response:', response);
      setCountryCount(response.data.numberOfCountry);
      setBuildingCount(response.data.numberOfBuilding);
      setArea(response.data.area);
      setEmployeeCount(response.data.numberOfEmployees);
     
    }).catch(e => {
      console.log('error:', e);
    })


    //on load api to get donut chart data:


    var doughnutChartAPI = window.config.CG_DOUGHNUT_API;

    //http://127.0.0.1:5199/capgemini/api/v1/fetch/water/region/and/country/details
    console.log('doughnutChartAPI:', doughnutChartAPI);
    const encodedUrl = doughnutChartAPI.replace(/_/g, match => encodeURIComponent(match));
    axios({
      method: 'POST', url: doughnutChartAPI, data: { "type": "ALL", "value": "ALL" }
    }).then(response => {
      console.log('doughnut chart response:', response);
      if (response.data && response.data.length > 0 && response.data[0].energy_consumption != null && response.data[0].name != null) {
        setDChartData(response.data);
      }


    }).catch(e => {
      setDChartData([{ energy_consumption: '100%', name: 'ALL' }]);

      console.log('error:', e);
    })

  }

  const onChange = (e) => {
    //setOnLoadFlag(false);
    if(sessionStorage.getItem("setTargetFlag")=="false"){
   // sessionStorage.setItem("setTargetFlag","true");
    }
    else{
    //  sessionStorage.setItem("setTargetFlag","false");
    }
    console.log('onchange e:', e);

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
    setType(type)
    var regionVar = 'ALL';
    var countryVar = 'ALL';
    var cityVar = 'ALL';
    var campusVar = 'ALL';
    var buildingVar = 'ALL';
    var dropdownOptions=window.dropdownoptions;
    dropdownOptions.filter(item => item[type] == e.split('::')[1]).map(item => {
      //console.log('item:',item);


      campusVar = item.campus;
      buildingVar = item.building;
      if (type == 'region') {
        setRegionValue(item.region)
        regionVar = item.region;
      }

      else if (type == 'country') {
        if (item.region != 'ALL') {
          regionVar = item.region;
          setRegionValue(item.region);
        }
        setCountryValue(item.country);
        if(item.region=='ALL'){
        regionVar=regionValue;
        }
        countryVar = item.country;
      }
      else if (type == 'city') {
        if (item.region != 'ALL') {
          regionVar = item.region;
          setRegionValue(item.region);
        }
        if (item.country != 'ALL') {
          setCountryValue(item.country);
          countryVar = item.country;
        }
        if(item.region=='ALL'){
          regionVar=regionValue;
          }
          if(item.country=='ALL'){
            countryVar=countryValue;
            }

        setCityValue(item.city);
        cityVar = item.city;
      }
      else if (type == 'campus') {
        if (item.region != 'ALL') {
          regionVar = item.region;
          setRegionValue(item.region);
        }
        if (item.country != 'ALL') {
          setCountryValue(item.country);
          countryVar = item.country;
        }
        if (item.city != 'ALL') {
          cityVar = item.city;
          setCityValue(item.city);
        }
        if(item.region=='ALL'){
          regionVar=regionValue;
          }
          if(item.country=='ALL'){
            countryVar=countryValue;
            }
            if(item.city=='ALL'){
              cityVar=cityValue;
              }

        setCampusValue(item.campus);
      }
      else if (type == 'building') {

        if (item.region != 'ALL') {
          regionVar = item.region;
          setRegionValue(item.region);
        }
        if (item.country != 'ALL') {
          countryVar = item.country;
          setCountryValue(item.country);
        }
        if (item.city != 'ALL') {
          cityVar = item.city;
          setCityValue(item.city);
        }
        if (item.campus != 'ALL') {
          campusVar = item.campus
          setCampusValue(item.campus);
        }
        if(item.region=='ALL'){
          regionVar=regionValue;
          }
          if(item.country=='ALL'){
            countryVar=countryValue;
            }
            if(item.city=='ALL'){
              cityVar=cityValue;
              }if(item.campus=='ALL'){
                campusVar=campusValue;
                }

        setBuildingValue(item.building);
      }





    });


    if (type == 'building') {
      setUnityMessageObject({ type: type, value: 'region:' + regionVar + ':country:' + countryVar + ':city:' + cityVar + ':campus:' + campusVar + ':building:' + buildingVar });
    }


    if (type == 'region') {
      //setCountryList([...new Set(dropdownOptions.filter(item=>item.region==e.split('::')[1]).map(item=>({label:item.country,value:'country::'+item.country})).map(item=>({label:item.country,value:'country::'+item.country})))]);


      let filteredCountryList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.country, value: 'country::' + item.country })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value');
      if (JSON.stringify(filteredCountryList).indexOf('ALL') == -1) {
        filteredCountryList.unshift({ label: 'ALL', value: 'country::ALL' });

      }
      let filteredCityList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.city, value: 'city::' + item.city })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value');
      if (JSON.stringify(filteredCityList).indexOf('ALL') == -1) {
        filteredCityList.unshift({ label: 'ALL', value: 'city::ALL' });

      }
      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        filteredCampusList.unshift({ label: 'ALL', value: 'campus::ALL' });

      }
      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.building, value: 'building::' + item.building })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        filteredBuildingList.unshift({ label: 'ALL', value: 'building::ALL' });

      }
      setCountryList(filteredCountryList);
      setCityList(filteredCityList);
      setCampusList(filteredCampusList);
      setBuildingList(filteredBuildingList);

      setCountryValue('All');
      setCityValue('All');
      setCampusValue('All');
      setBuildingValue('All');


      let jsonObject = { places: [] };
      filteredCountryList.forEach((item, i) => {
        jsonObject.places.push({ place: item.label, co2: Math.floor(Math.random()*1000), energyConsumed: Math.floor(Math.random()*10000), renewableEnergy: Math.floor(Math.random()*1000), emissionReduction: Math.floor(Math.random()*100) });
      })
      setUnityMessageObject({ type: type, value: 'region:' + regionVar + ':country:ALL:city:ALL:campus:ALL:building:ALL', jsonObject: jsonObject });
    } else if (type == 'country') {
      let filteredCityList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.city, value: 'city::' + item.city })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == e.split('::')[1]).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value');
      if (JSON.stringify(filteredCityList).indexOf('ALL') == -1) {
        filteredCityList.unshift({ label: 'ALL', value: 'city::ALL' });

      }
      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == e.split('::')[1]).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        filteredCampusList.unshift({ label: 'ALL', value: 'campus::ALL' });

      }

      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.building, value: 'building::' + item.building })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        filteredBuildingList.unshift({ label: 'ALL', value: 'building::ALL' });

      }
      setCityList(filteredCityList);
      setCampusList(filteredCampusList);
      setBuildingList(filteredBuildingList);
      setCityValue('All');
      setCampusValue('All');
      setBuildingValue('All');


      let jsonObject = { places: [] };
      filteredCityList.forEach(item => {
        jsonObject.places.push({ place: item.label, co2: Math.floor(Math.random()*1000), energyConsumed: Math.floor(Math.random()*10000), renewableEnergy: Math.floor(Math.random()*1000), emissionReduction: Math.floor(Math.random()*100) });
      })
      setUnityMessageObject({ type: type, value: 'region:' + regionVar + ':country:' + countryVar + ':city:ALL:campus:ALL:building:ALL', jsonObject: jsonObject });



    } else if (type == 'city') {


      let filteredCountryList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.country, value: 'country::' + item.country })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == regionVar).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value');

      if (JSON.stringify(filteredCountryList).indexOf('ALL') == -1) {
        filteredCountryList.unshift({ label: 'ALL', value: 'country::ALL' });

      }

      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.city == e.split('::')[1]).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        filteredCampusList.unshift({ label: 'ALL', value: 'campus::ALL' });

      }

      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.building, value: 'building::' + item.building })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.city == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        filteredBuildingList.unshift({ label: 'ALL', value: 'building::ALL' });

      }
      setCampusList(filteredCampusList);
      setBuildingList(filteredBuildingList);
setCountryList(filteredCountryList);
      setCampusValue('All');
      setBuildingValue('All');


      let jsonObject = { places: [] };
      filteredCampusList.forEach(item => {
        jsonObject.places.push({ place: item.label, co2: Math.floor(Math.random()*1000), energyConsumed: Math.floor(Math.random()*10000), renewableEnergy: Math.floor(Math.random()*1000), emissionReduction: Math.floor(Math.random()*100) });
      })

      setUnityMessageObject({ type: type, value: 'region:' + regionVar + ':country:' + countryVar + ':city:' + cityVar + ':campus:ALL:building:ALL', jsonObject: jsonObject });
    } else if (type == 'campus') {
      let filteredCountryList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.country, value: 'country::' + item.country })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == regionVar).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value');

      if (JSON.stringify(filteredCountryList).indexOf('ALL') == -1) {
        filteredCountryList.unshift({ label: 'ALL', value: 'country::ALL' });

      }

      let filteredCityList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.city, value: 'city::' + item.city })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == countryVar).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value');
      if (JSON.stringify(filteredCityList).indexOf('ALL') == -1) {
        filteredCityList.unshift({ label: 'ALL', value: 'city::ALL' });

      }

      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.building, value: 'building::' + item.building })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.campus == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        filteredBuildingList.unshift({ label: 'ALL', value: 'building::ALL' });

      }
      setCountryList(filteredCountryList);
setCityList(filteredCityList);
      setBuildingList(filteredBuildingList);
      console.log("filteredBuildingList:", filteredBuildingList);
      setBuildingValue('All');
      let jsonObject = { places: [] };
      filteredBuildingList.forEach(item => {
        jsonObject.places.push({ place: item.label, co2: Math.floor(Math.random()*1000), energyConsumed: Math.floor(Math.random()*10000), renewableEnergy: Math.floor(Math.random()*1000), emissionReduction: Math.floor(Math.random()*100) });
      })

      // jsonObject = { places: [{ place: 'SEZ1', co2: '1223', energyConsumed: '214' }, { place: 'SEZ2', co2: '1224', energyConsumed: '215' }] };
      setUnityMessageObject({ type: type, value: 'region:' + regionVar + ':country:' + countryVar + ':city:' + cityVar + ':campus:' + campusVar + ':building:ALL', jsonObject: jsonObject });
    }

    else if (type == 'building') {
      let filteredCountryList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.country, value: 'country::' + item.country })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == regionVar).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value');

      if (JSON.stringify(filteredCountryList).indexOf('ALL') == -1) {
        filteredCountryList.unshift({ label: 'ALL', value: 'country::ALL' });

      }

      let filteredCityList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.city, value: 'city::' + item.city })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == countryVar).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value');
      if (JSON.stringify(filteredCityList).indexOf('ALL') == -1) {
        filteredCityList.unshift({ label: 'ALL', value: 'city::ALL' });

      }
      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.city == cityVar).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        filteredCampusList.unshift({ label: 'ALL', value: 'campus::ALL' });
      }
      
      setCountryList(filteredCountryList);
setCityList(filteredCityList);
setCampusList(filteredCampusList);
      
      
      let jsonObject = { places: [] };
      

      // jsonObject = { places: [{ place: 'SEZ1', co2: '1223', energyConsumed: '214' }, { place: 'SEZ2', co2: '1224', energyConsumed: '215' }] };
      setUnityMessageObject({ type: type, value: 'region:' + regionVar + ':country:' + countryVar + ':city:' + cityVar + ':campus:' + campusVar + ':building:'+buildingVar, jsonObject: jsonObject });
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

    getWidgetDataAPI(regionVar, countryVar, cityVar, campusVar, buildingVar, startDate, endDate, dateRange);

    getBarDataAPI(regionVar, countryVar, cityVar, campusVar, buildingVar, startDate, endDate, dateRange, type);
    //making call for doughnut chart:
    let typeVar = '';
    let valueVar = '';
    if (type == 'region') {
      typeVar = 'region';
      valueVar = regionVar;

    }
    else if (type == 'country' || type == 'city' || type == 'campus') {
      typeVar = 'region';
      valueVar = regionVar;
    }

    var doughnutChartAPI = "http://10.51.108.48:5199/capgemini/api/v1/fetch/region/and/country/details";

    //http://127.0.0.1:5199/capgemini/api/v1/fetch/water/region/and/country/details
    // console.log('doughnutChartAPI:', doughnutChartAPI);
    // const encodedUrl = doughnutChartAPI.replace(/_/g, match => encodeURIComponent(match));
    // axios({
    //   method: 'POST', url: doughnutChartAPI, data: { "type": typeVar, "value": valueVar }
    // }).then(response => {
    //   console.log('doughnut chart response:', response);
    //   setDChartData(response.data);

    // }).catch(e => {
    //   console.log('error:', e);
    // })

    //header count API onchange:
    axios({
      method: 'POST', url: window.config.CG_HEADER_COUNT_DATA,
      data: {
        "region": regionVar,
        "countryName": countryVar,
        "cityName": cityVar,
        "campusName": campusVar,
        "buildingName": buildingVar
      }
    }
    ).then(response => {
      console.log('response:', response);
      setCountryCount(response.data.numberOfCountry);
      setBuildingCount(response.data.numberOfBuilding);
      setArea(response.data.area);
      setEmployeeCount(response.data.numberOfEmployees);
      setChartData({
        type: 'bar', energyConsumption_2023: response.data.energyConsumption_2023, energyConsumption_2024: response.data.energyConsumption_2024, energyConsumption_2025: response.data.energyConsumption_2025,
        waterConsumption_2023: response.data.waterConsumption_2023, waterConsumption_2024: response.data.waterConsumption_2024, waterConsumption_2025: response.data.waterConsumption_2025
      });


    }).catch(e => {
      console.log('error:', e);
    })
    //doughnut chart api onchange:



  }

  const onSearch = (e) => {
    console.log('e:', e);
    setIsDropdownOpen(true);
  }

  const onDateSearch = (e) => {
    setIsDateDropdownOpen(true);
  }
  /*
  Last 24 Hrs
  Yestday
  Last Week
  Month to date
  Last Month
  Year to Date
  Last Year
  Till Date
  Custom Date
  
  */
  // const rangePresets = [
  //   {
  //     label: 'Last 24 Hours',
  //     value: [dayjs().add(-1, 'd'), dayjs()],
  //   },
  //   {
  //     label: 'Yesterday',
  //     value: [dayjs().add(-14, 'd'), dayjs()],
  //   },
  //   {
  //     label: 'Last Week',
  //     value: [dayjs().add(-30, 'd'), dayjs()],
  //   },
  //   {
  //     label: 'Month to date',
  //     value: [dayjs().add(-90, 'd'), dayjs()],
  //   },

  //   {
  //     label: 'Last Month',
  //     value: [dayjs().add(-90, 'd'), dayjs()],
  //   },

  //   {
  //     label: 'Year to date',
  //     value: [dayjs().add(-90, 'd'), dayjs()],
  //   },

  //   {
  //     label: 'Last Year',
  //     value: [dayjs().add(-90, 'd'), dayjs()],
  //   },

  //   {
  //     label: 'Till date',
  //     value: [dayjs().add(-90, 'd'), dayjs()],
  //   }
  // ];

  const onChangeOfDate = (date) => {
    if (date) {
      console.log('Date: ', date);
    } else {
      console.log('Clear');
    }
  };
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
    } else {
      console.log('Clear');

    }
    getWidgetDataAPI(regionValue, countryValue, cityValue, campusValue, buildingValue, dateStrings[0], dateStrings[1], 'custom_date');
    getBarDataAPI(regionValue, countryValue, cityValue, campusValue, buildingValue, dateStrings[0], dateStrings[1], 'custom_date', type);
    setIsRangePickerModalOpen(false);


  };

  function disabledDate(current) {
    // Disable dates after today
    return current && current > Date.now();
  }
  const rangeSelector = () => {
    return <RangePicker />
  }

  const onChangeDateDropdown = (e) => {
    console.log('onchange date dropdown:',e);
    setOnLoadFlag(false);
    setIsDropdownOpen(false);
    setIsDateDropdownOpen(false);
    let startDateVar = '';
    let endDateVar = '';
    let dateRangeVar = '';
    if (e == 'Yesterday') {
      setStartDate(dayjs().add(-1, 'day').format('YYYY-MM-DD'));
      console.log(dayjs().add(-1, 'day').format('YYYY-MM-DD'));
      startDateVar = dayjs().add(-1, 'day').format('YYYY-MM-DD');
      setEndDate(dayjs().format('YYYY-MM-DD'));
      endDateVar = dayjs().format('YYYY-MM-DD');
      setDateRange('yesterday');
      dateRangeVar = 'yesterday';
      //      last_24_hour,yesterday,last_week,month_to_date,last_month,year_to_date,last_year,custom_date
    }
    else if (e == 'Last 24 Hours') {
      setStartDate(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      console.log(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      startDateVar = dayjs().add(-6, 'day').format('YYYY-MM-DD'); 
      setEndDate(dayjs().format('YYYY-MM-DD'));
      endDateVar = dayjs().format('YYYY-MM-DD');
      setDateRange('last_24_hour');
      dateRangeVar = 'last_24_hour';
    }
    else if (e == 'Last Week') {
      setStartDate(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      console.log(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      startDateVar = dayjs().add(-6, 'day').format('YYYY-MM-DD');
      setEndDate(dayjs().format('YYYY-MM-DD'));
      endDateVar = dayjs().format('YYYY-MM-DD');
      setDateRange('last_week');
      dateRangeVar = 'last_week';
    }
    else if (e == 'Month to date') {
      setStartDate(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      console.log(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      startDateVar = dayjs().add(-6, 'day').format('YYYY-MM-DD');
      setEndDate(dayjs().format('YYYY-MM-DD'));
      endDateVar = dayjs().format('YYYY-MM-DD');
      setDateRange('month_to_date');
      dateRangeVar = 'month_to_date';
    }
    else if (e == 'Last Month') {
      setStartDate(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      console.log(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      startDateVar = dayjs().add(-6, 'day').format('YYYY-MM-DD');
      setEndDate(dayjs().format('YYYY-MM-DD'));
      endDateVar = dayjs().format('YYYY-MM-DD');
      setDateRange('last_month');
      dateRangeVar = 'last_month';
    }
    else if (e == 'Year to date') {
      setStartDate(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      console.log(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      startDateVar = dayjs().add(-6, 'day').format('YYYY-MM-DD');
      setEndDate(dayjs().format('YYYY-MM-DD'));
      endDateVar = dayjs().format('YYYY-MM-DD');
      setDateRange('year_to_date');
      dateRangeVar = 'year_to_date';
    }
    else if (e == 'Last Year') {
      setStartDate(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      console.log(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      startDateVar = dayjs().add(-6, 'day').format('YYYY-MM-DD');
      setEndDate(dayjs().format('YYYY-MM-DD'));
      endDateVar = dayjs().format('YYYY-MM-DD');
      setDateRange('last_year');
      dateRangeVar = 'last_year';
    }
    else if (e == 'Till Date') {
      setStartDate(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      console.log(dayjs().add(-6, 'day').format('YYYY-MM-DD'));
      startDateVar = dayjs().add(-6, 'day').format('YYYY-MM-DD');
      setEndDate(dayjs().format('YYYY-MM-DD'));
      endDateVar = dayjs().format('YYYY-MM-DD');
      setDateRange('till_date');
      dateRangeVar = 'till_date';
    }


    else if (e.includes('Custom Date')) {
      setIsRangePickerModalOpen(true);
      setDateRange('custom_date');
      dateRangeVar = 'custom_date';
      return;
    }

    //call on date change APIs:
    getWidgetDataAPI(regionValue, countryValue, cityValue, campusValue, buildingValue, startDateVar, endDateVar, dateRangeVar);
    getBarDataAPI(regionValue, countryValue, cityValue, campusValue, buildingValue, startDateVar, endDateVar, dateRangeVar, type);
  }
  const getWidgetDataAPI = (region, country, city, campus, building, startDate, endDate, dateRangeVar) => {
//get header data for overlay widgets(right panel):
    if(region=='All'){
      region='ALL'
    }
    if(country=='All'){
      country='ALL'
    }
    if(city=='All'){
      city='ALL'
    }if(campus=='All'){
      campus='ALL'
    }if(building=='All'){
      building='ALL'
    }

    var widgetDataURL = window.config.CG_HEADER_RESOURCE_DATA;//"http://10.51.109.90:5000/energyanalytics/api/v1/data";
    axios({
      method: 'POST', url: widgetDataURL, headers: { "Content-Type": "application/json" },
      data: {
        "region": region,
        "countryName": country,
        "cityName": city,
        "campusName": campus,
        "buildingName": building,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar
      }
     

    }).then(response => {
      console.log('response:', response);

      setCo2Data(response.data.emissionReduction);
      setRenewableEnergy(response.data.renewableEnergy);
      setEnergyConsumption(response.data.energyConsumption);
      setWaterConsumption(response.data.waterConsumption);

    }).catch(e => {
      console.log('error:', e);
    })

  }

  const getBarDataAPI = (region, country, city, campus, building, startDate, endDate, dateRangeVar, type) => {
    if(region=='All'){
      region='ALL'
    }
    if(country=='All'){
      country='ALL'
    }
    if(city=='All'){
      city='ALL'
    }if(campus=='All'){
      campus='ALL'
    }if(building=='All'){
      building='ALL'
    }
    
    setGraphPayload({
      "region": region,
      "countryName": country,
      "cityName": city,
      "campusName": campus,
      "buildingName": building,
      "startDate": startDate,//"2024-05-15"
      "endDate": endDate,//"2024-05-15"
      "dateRange": dateRangeVar
    });
    setHeaderPayload({
      "region": region,
      "countryName": country,
      "cityName": city,
      "campusName": campus,
      "buildingName": building,
      "startDate": startDate,//"2024-05-15"
      "endDate": endDate,//"2024-05-15"
      "dateRange": dateRangeVar
    });

    axios({
      method: 'POST', url: window.config.CG_GET_BAR_GRAPH_ENERGY, headers: { "Content-Type": "application/json" },
      data: {
        "region": region,
        "countryName": country,
        "cityName": city,
        "campusName": campus,
        "buildingName": building,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar
      }

    }).then(response => {
      console.log('response:', response);

      setBarDataEnergy(response.data);

      //setChartData(oldArray => [...oldArray,{type:'energy', data:response.data}] );

    }).catch(e => {
      console.log('error:', e);
    })

    axios({
      method: 'POST', url: window.config.CG_GET_BAR_GRAPH_EMISSION, headers: { "Content-Type": "application/json" },
      data: {
        "region": region,
        "countryName": country,
        "cityName": city,
        "campusName": campus,
        "buildingName": building,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar
      }

    }).then(response => {
      console.log('response:', response);

      setBarDataEmissionReduction(response.data);

    }).catch(e => {
      console.log('error:', e);
    })

    axios({
      method: 'POST', url: window.config.CG_GET_BAR_GRAPH_RENEWABLE, headers: { "Content-Type": "application/json" },
      data: {
        "region": region,
        "countryName": country,
        "cityName": city,
        "campusName": campus,
        "buildingName": building,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar
      }

    }).then(response => {
      console.log('response:', response);

      setBarDataRenewableEnergy(response.data);

    }).catch(e => {
      console.log('error:', e);
    })

    axios({
      method: 'POST', url: window.config.CG_GET_BAR_GRAPH_WATER, headers: { "Content-Type": "application/json" },
      data: {
        "region": region,
        "countryName": country,
        "cityName": city,
        "campusName": campus,
        "buildingName": building,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar
      }

    }).then(response => {
      console.log('response:', response);

      setBarDataWater(response.data);

    }).catch(e => {
      console.log('error:', e);
    })
    //doughnut graph APIs:

    let locationType = type ? type : 'region';
    if(locationType=='ALL'){
      locationType='region';
    }
    let locationValue = 'ALL';
    if (locationType == 'building') { locationValue = building }
    else if (locationType == 'campus') { locationValue = campus }
    else if (locationType == 'city') { locationValue = city }
    else if (locationType == 'country') { locationValue = country }
    else if (locationType == 'region') { locationValue = region }

setDoughnutPayload({
  "locationType": locationType,
  "location": locationValue,
  "startDate": startDate,//"2024-05-15"
  "endDate": endDate,//"2024-05-15"
  "dateRange": dateRangeVar
});
    axios({
      method: 'POST', url: window.config.CG_GET_DOUGHNUT_GRAPH_ENERGY, headers: { "Content-Type": "application/json" },
      data: {
        "locationType": locationType,
        "location": locationValue,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar
      }

    }).then(response => {
      console.log('response:', response);

      setDoughnutDataEnergy(response.data);

    }).catch(e => {
      console.log('error:', e);
    })

    axios({
      method: 'POST', url: window.config.CG_GET_DOUGHNUT_GRAPH_WATER, headers: { "Content-Type": "application/json" },
      data: {
        "locationType": locationType,
        "location": locationValue,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar
      }

    }).then(response => {
      console.log('response:', response);

      setDoughnutDataWater(response.data);

    }).catch(e => {
      console.log('error:', e);
    })
    axios({
      method: 'POST', url: window.config.CG_GET_DOUGHNUT_GRAPH_RENEWABLE_ENERGY, headers: { "Content-Type": "application/json" },
      data: {
        "locationType": locationType,
        "location": locationValue,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar
      }

    }).then(response => {
      console.log('response:', response);

      setDoughnutDataRenewableEnergy(response.data);

    }).catch(e => {
      console.log('error:', e);
    })
    axios({
      method: 'POST', url: window.config.CG_GET_DOUGHNUT_GRAPH_EMISSION_REDUCTION, headers: { "Content-Type": "application/json" },
      data: {
        "locationType": locationType,
        "location": locationValue,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar
      }

    }).then(response => {
      console.log('response:', response);

      setDoughnutDataEmissionReduction(response.data);

    }).catch(e => {
      console.log('error:', e);
    })

  }
  const MemoizedComment = ()=>{return React.memo()}

  const getUnityApp = () => {

    var dateDropdownOptions = [{ label: 'Last 24 Hours', value: 'Last 24 Hours', title: "last 24 hrs" }, { label: 'Yesterday', value: 'Yesterday', title: 'Yesterday' }, { label: 'Last Week', value: 'Last Week', title: 'Last Week' }, { label: 'Month to date', value: 'Month to date', title: 'Month to date' }, { label: 'Last Month', value: 'Last Month', title: 'Last Month' }, { label: 'Year to date', value: 'Year to date' }, { label: 'Last Year', value: 'Last Year' }, { label: 'Till date', value: 'Till Date' }, { label: 'Custom Date', value: 'Custom Date'+Math.random(), title: 'Custom Date' }];
    var widgetList = [{ type: 'energyConsumption', data: energyConsumption, label: 'Energy Consumption' }, { type: 'waterConsumption', data: waterConsumption, label: 'Water Consumption' }, { type: 'renewableEnergy', data: renewableEnergy, label: 'Renewable Energy' }, { type: 'co2', data: co2Data, label: 'Carbon Emissions' }, ,];
    return (
      <Layout>
        <Modal wrapClassName="datePickerWrapperModal" title=" " open={isRangePickerModalOpen} onOk={handleRangePickerOk} onCancel={handleRangePickerCancel} width='50vw' footer={null}>
          <RangePicker onChange={onRangeChange} disabledDate={disabledDate} />
        </Modal>
        <Modal wrapClassName="unityWrapperModal" title=" " open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width='100vw' footer={null}>
          <UnityProvider>

            <UnityLoader unityMessageObject={unityMessageObject} />


          </UnityProvider>
        </Modal>
        <div style={{ display: 'flex', width: '100vw', backgroundColor: '#0A8120', color: '#b4ffac', justifyContent: 'Space-Between' }}> <div style={{ display: 'inline-flex', padding: '4px;' }}></div></div>
        <div className="header-section"  style={{backgroundColor:'#0A8120'}}>

          {/* style={{display:'flex',paddingTop:'1px',backgroundColor: '#000000', borderBottom:'3.5px solid #6033D2',color:'#b4ffac',justifyContent:'Space-Between'}} */}
          <div className="energyAnalytics" style={{ width: '38%', paddingTop: '5px', fontSize: '17px' }}></div>
          {/* Energy Analytics */}

          {/* height:'64.5px', */}

          {dropdownList.map((item, i) => (
            <div className="dropdownDiv" style={{ width: '44%', position: 'relative', right: '-28px' }} key={i}> <div className='filterLabel'>{item.name}</div><Select popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false} open={!!openIndexes[i]} // Dynamically control dropdown open state
              onDropdownVisibleChange={(visible) => handleDropdownVisibleChange(visible, i)} style={{ width: '100%', borderRadius: '4px',backgroundColor:'#0A8120' }} value={item.name == 'Region' ? regionValue : item.name == 'Country' ? countryValue : item.name == 'City' ? cityValue : item.name == 'Campus' ? campusValue : item.name == 'Building' ? buildingValue : 'Select ' + item.name} key={i} id={item.name} showSearch={true} title={item.title}
              dropdownStyle={{
                // border: '1px solid rgb(40, 41, 40)',
                boxShadow:' 0px 5px 15px 0px rgb(40, 41, 40)',
                backgroundColor: '#000000', color: '#ffffff'
              }} placeholder={'All'} defaultValue={'All'} options={item.name == 'Region' && regionList.length != 0 ? regionList : item.name == 'Country' && countryList.length != 0 ? countryList : item.name == 'City' && cityList.length != 0 ? cityList : item.name == 'Campus' && campusList.length != 0 ? campusList : item.name == 'Building' && buildingList.length != 0 ? buildingList : item.options} onChange={onChange}
              onSearch={onSearch} optionFilterProp="label"
              className={item.name === 'City' ? 'city-dropdown' : ''} />

              {/* <div className='placeholder'>country</div> */}
              {/* placeholder={'ALL'} */}
              <div
                className="dropdownIcon"
                style={{
                  position: 'absolute',
                  right: '10%',
                  top: '53%',
                  fontSize: ' 15px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  zIndex: 10,
                  color: 'white',

                  transition: 'transform 0.3s ease', // Smooth transition for rotation

                }}
                onClick={() => handleIconClick(i)} // Toggle dropdown on icon click
              >



                <DownOutlined />
              </div>
            </div>
          ))}

          <div className='dropdownDiv-daterange' style={{
            width: '44%', position: 'relative', right: '-28px',
          }}><div className='filterLabel-daterange' >{'Date Range'}</div>
            <Select style={{ width: '100%' }} popupMatchSelectWidth={true} virtual={false} defaultActiveFirstOption={true} id={'dateDropdownId'} showSearch={true} title={'Date Range'} open={isDateDropdownOpen}
              dropdownStyle={{
                border: '1px solid #50bc3d',
                backgroundColor: '#000000', color: '#ffffff'
              }} placeholder={'All'} defaultValue={'Till date'} options={dateDropdownOptions} onChange={onChangeDateDropdown}
              onSearch={onDateSearch} optionFilterProp="label" />


            <div
              className="dropdownIcon"
              style={{
                position: 'absolute',
                right: '10%',
                top: '53%',
                fontSize: ' 15px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                zIndex: 10,
                color: 'white',
              }}
              onClick={handleIconClickdate} // Toggle dropdown on icon click
            >
              <DownOutlined />
            </div>
          </div>






          <div className='logo'></div>
          <div className="avatarClass"><Tooltip placement="bottomRight" title={'Supervisor'}><Avatar
            style={{
              backgroundColor: '#fde3cf',
              color: '#f56a00',
            }}
            size={40}
          >
            SU
          </Avatar></Tooltip></div>

          <p className='timeCurrent'>  <ClockComponent /></p>

        </div>


        <div style={{ display: 'flex', backgroundColor: 'black' }}>
          {/* backgroundImage: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)' */}
          {/* <div className="leftSideBar"><LeftSidebar setViewMode={setViewMode}/></div>  .push({'headerData':[co2Data,emissionReduction,renewableEnergy,energyConsumption]})}*/}
          <div><Sidebar sendDataToLandingPage={e=>sendDataToLandingPage(e)} data={chartWidgetList} headerData={{'co2Data':co2Data,'emissionReduction':emissionReduction,'renewableEnergy':renewableEnergy,'energyConsumption':energyConsumption, 'waterConsumption':waterConsumption,'wasteGeneration':waterConsumption}} /></div>
          <div className="mainContentDiv" id="mainContentDiv" style={{ width: "84vw", height: "90vh" }}>
            {pageClickedFor=='ViewGraph'?<MainWorkAreaComponentGraph data={chartWidgetList} sendDataToLandingPage={e=>sendDataToLandingPage(e)} />:
            ((pageClickedFor=='submenuClicked' || pageClickedFor=='menuClicked') && clickedLabel!='Realtime Alarm')?<MemoizedMainWorkAreaComponent path={clickedLabel} data={chartWidgetList}  sendDatatoLandingPage={e=>sendDataToLandingPage(e)} headerData={{'co2Data':co2Data,'emissionReduction':emissionReduction,'renewableEnergy':renewableEnergy,'energyConsumption':energyConsumption, 'waterConsumption':waterConsumption,'wasteGeneration':waterConsumption}} />:(pageClickedFor=='submenuClicked'&&clickedLabel=='Realtime Alarm')?
            <div><RealtimeAlarmComponent path={clickedLabel} data={chartWidgetList}  sendDatatoLandingPage={e=>sendDataToLandingPage(e)} headerData={{'co2Data':co2Data,'emissionReduction':emissionReduction,'renewableEnergy':renewableEnergy,'energyConsumption':energyConsumption, 'waterConsumption':waterConsumption,'wasteGeneration':waterConsumption}}/></div>:(pageClickedFor=='dashboard')?
            <><div><HeaderComponent inputData={inputData} style={{ width: "84vw" }} /></div>
            <div className='unityAndChartOverlayWrapper' id="unityAndChartOverlayWrapper" style={{
              display: 'flex', height: '78vh',
              width: '84vw'
            }}>
              <div className="unityWrapper" style={{ display: 'flex' }} >


                {viewMode == 'landingPageView' ? <>


                  <UnityProvider>
                    <UnityLoader unityMessageObject={unityMessageObject} />
                    <ArrowsAltOutlined style={{ color: '#ffffff', float: 'right', top: '-36vh', right: '3vw', position: 'relative', zIndex: '2' }} onClick={showModal} />

                  </UnityProvider>

                </> : viewMode == 'resourcePageView' ? <><div className="resourcePageClass">{'Resource page'}</div></> : <></>}

              </div>
              {/* <div><Dashboard/></div> */}

              <div id="overLayWidget" onDoubleClick={e => onclickFn(e)}><Charts chartWidgetList={chartWidgetList} widgetList={widgetList} onLoad={onLoadFlag} sendDataToLandingPage={e=>sendDataToLandingPage(e)}/>

              </div>
            </div>
            </>:''}
          </div>







        </div>
        <div>

        </div>
        <div> <DigitalTwinIcon /></div>
        <div>
          <ChatbotIcon />  {/* Render the chatbot icon */}
        </div>
      </Layout>

    );
  }


  const loginFn = (e) => {
    if ((!localStorage.getItem("loggedInUser") && e) || (localStorage.getItem("loggedInUser") == '' && e)) {
      setSpinning(true);
      if (!e) {

      }
      keycloak
        .init({ onLoad: "login-required" })
        .then((authenticated) => {
          console.log('authenticated..', authenticated);
          if (authenticated) {
            setLogin(true);

            console.log("login success", keycloak);
            localStorage.setItem("react-token", keycloak.token);
            localStorage.setItem("react-refresh-token", keycloak.refreshToken);
            localStorage.setItem("loggedInUser", keycloak.idTokenParsed.name);
            localStorage.setItem(
              "loggedInUserName",
              keycloak.idTokenParsed.preferred_username
            );
            localStorage.setItem(
              "loggedInUserRole",
              keycloak.realmAccess.roles.toString()
            );
            localStorage.setItem(
              "projectList",
              keycloak.idTokenParsed.projects.toString()
            );
            //root.render(<App/>);
            var role =
              localStorage.getItem("loggedInUserRole").indexOf("manager") !== -1
                ? "manager"
                : localStorage
                  .getItem("loggedInUserRole")
                  .indexOf("designEngineer") !== -1
                  ? "designEngineer"
                  : localStorage
                    .getItem("loggedInUserRole")
                    .indexOf("stressEngineer") !== -1
                    ? "stressEngineer"
                    : " ";

            //code to render only if authenticated:
            if (localStorage.getItem("loggedInUser") && localStorage.getItem("loggedInUser") != '') {
              return (
                <></>
              );
            }


          }
        }).catch(e => {
          console.log('e:', e);
          setSpinning(false);
          setLogin(false);
          //alert('unable to connect to keycloak');
          message.error('Unable to connect to Keycloak');
        }
        )
    }
    else {
      if (location.hash.indexOf('#config') != -1) {
        console.log("config");
        setSpinning(false);
        setLogin(true);
        return (<ConfigTool />)
      }
      else {
        console.log("else: env variables : ", import.meta.env);
        location.hash = 'dashboard';
        //setSpinning(false);
        setLogin(true);
        return (<>getUnityApp()</>)
      }
    }
  }
  console.log('login:', login)
  return (<><Spin spinning={spinning} size="large" fullscreen />{(login && location.hash != '#config') ? getUnityApp() : location.hash.indexOf('#config') != -1 ? <ConfigTool /> : ''}</>)

}

export default App;
