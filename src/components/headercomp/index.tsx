
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import Logo from '../../images/icons/logo.svg'
import DropdownComp from '../shared/dropdown';
import { UnityLoader } from './components/UnityLoader';
import { Gamepad2 } from 'lucide-react';
import { UnityProvider } from './contexts/UnityContext';
import dayjs from 'dayjs';
import dropdownOptionsBackup from './dropdownOptions.js';
import { DateRangePicker } from './dateRangePicker';
import logo from './logo.png';

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
import ClockComponent from '../clock/index.tsx';
import axios from "axios";
const { RangePicker } = DatePicker;

const Header: React.FC = (props) => {
  console.log('header props:', props);
  const [dateSubmitButtonDisabled, setdateSubmitButtonDisabled] = useState(true);

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
  const [dropdownList, setDropdownList] = useState([{ title: 'Region', name: 'Region', options: [], value: 'All' }, { title: 'Country', name: 'Country', options: [], value: 'All' }, { title: 'City', name: 'City', options: [], value: 'All' }, { title: 'Campus', name: 'Campus', options: [], value: 'All' }, { title: 'Building', name: 'Building', options: [], value: 'All' }]);
  const [unityMessageObject, setUnityMessageObject] = useState({});
  const [viewMode, setViewMode] = useState('landingPageView');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [countryCount, setCountryCount] = useState('0');
  const [employeeCount, setEmployeeCount] = useState('0');
  const [area, setArea] = useState('0');
  const [buildingCount, setBuildingCount] = useState('0');
  const [waterConsumption, setWaterConsumption] = useState('0');
  const [dateRange, setDateRange] = useState('till_date');
  const [energyConsumption, setEnergyConsumption] = useState('0');
  const [renewableEnergy, setRenewableEnergy] = useState('0');
  const [onLoadFlag, setOnLoadFlag] = useState(true);
  const [type, setType] = useState('ALL');
  const [graphPayload, setGraphPayload] = useState({});
  const [headerPayload, setHeaderPayload] = useState({});
  const [doughnutPayload, setDoughnutPayload] = useState({});

  const [co2Data, setCo2Data] = useState('');
  // const { unityProvider, isLoaded, loadingProgression, isError, errorMessage, sendMessage, addEventListener, removeEventListener } =
  // useUnity();
  const [openIndexes, setOpenIndexes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRangePickerModalOpen, setIsRangePickerModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('2020-03-15');
  const [endDate, setEndDate] = useState('2020-03-15');
  const [startDateCustom, setStartDateCustom] = useState('');
  const [endDateCustom, setEndDateCustom] = useState('');
  
  const [datevalue, setDatevalue] = useState('Till Date');
  useEffect(() => {


    getOnloadData();


    window.addEventListener(
      "message",
      (event) => {
        if (event && event.data && typeof event.data === 'string' || event.data instanceof String) {
          console.log("event.data:", event.data)
          console.log('Received message from Unity: ', event.data.split(':'));
          //if (event.origin !== "http://example.org:8080") return;

          let buildingUnityVar = event.data.split(':')[9];
          let campusUnityVar = event.data.split(':')[7];
          let cityUnityVar = event.data.split(':')[5];
          let countryUnityVar = event.data.split(':')[3];
          let regionUnityVar = event.data.split(':')[1];

          // setRegionValue(regionUnityVar);
          // setCountryValue(countryUnityVar);
          // setCityValue(cityUnityVar);
          // setCampusValue(campusUnityVar);
          // setBuildingValue(buildingUnityVar);
          let val = '';
          let selectedType = '';
          if (buildingUnityVar == 'all' && campusUnityVar == 'all' && cityUnityVar == 'all' && countryUnityVar == 'all') {
            val = regionUnityVar;
            selectedType = 'region';
          }
          else if (buildingUnityVar == 'all' && campusUnityVar == 'all' && cityUnityVar == 'all') {
            val = countryUnityVar;
            selectedType = 'country';
          }
          else if (buildingUnityVar == 'all' && campusUnityVar == 'all') {
            val = cityUnityVar;
            selectedType = 'city';
          }
          else if (buildingUnityVar == 'all') {
            val = campusUnityVar;
            selectedType = 'campus';
          }
          else {
            val = buildingUnityVar;
            selectedType = 'building';
          }


          var setTargetFlag = event.data.split(':')[12];
          if (setTargetFlag == 'false') {
            sessionStorage.setItem("setTargetFlag", "false");
          }
          console.log('calling onchange with data:', selectedType + '::' + val + '::countryUnityVar: ' + countryUnityVar);




          let val2 = window.dropdownoptions.filter(item => { return item[selectedType].toLowerCase() == val.toLowerCase() })[0][selectedType];
          console.log('selectedType:', selectedType, 'val2:', val2);
          onChange(selectedType + '::' + val2);

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
      window.dropdownoptions = locationList;
      if (locationList && locationList.length > 0) {

        //      Array.from(new Set(a))
        let regionList = Array.from(new Set(locationList.map(item => item.region)));

        var regionListOptions = regionList.map(item => ({ label: item, value: 'region::' + item }));

        regionListOptions = _.sortBy(regionListOptions,
          [function (o) { return o.label; }]);
        //console.log('region details: ',dropdownOptions.filter(item => item.region=='France')[0]);
        var countryListOptions = Array.from(new Set(locationList.map(item => item.country))).map(item => ({ label: item, value: 'country::' + item }));
        countryListOptions = _.sortBy(countryListOptions,
          [function (o) { return o.label; }]);
        var cityListOptions = Array.from(new Set(locationList.map(item => item.city))).map(item => ({ label: item, value: 'city::' + item }));
        cityListOptions = _.sortBy(cityListOptions,
          [function (o) { return o.label; }]);

        var campusListOptions = Array.from(new Set(locationList.map(item => item.campus))).map(item => ({ label: item, value: 'campus::' + item }));
        campusListOptions = _.sortBy(campusListOptions,
          [function (o) { return o.label; }]);
        var buildingListOptions = Array.from(new Set(locationList.map(item => item.building))).map(item => ({ label: item, value: 'building::' + item }));
        buildingListOptions = _.sortBy(buildingListOptions,
          [function (o) { return o.label; }]);
        setDropdownList([{ title: 'Region', name: 'Region', options: regionListOptions, value: 'All' }, { title: 'Country', name: 'Country', options: countryListOptions, value: 'All' }, { title: 'City', name: 'City', options: cityListOptions, value: 'All' }, { title: 'Campus', name: 'Campus', options: campusListOptions, value: 'All' }, { title: 'Building', name: 'Building', options: buildingListOptions, value: 'All' }]);

      }



    }).catch(e => {
      setSpinning(false);
      // message.error('Network Error');
      //locationList.push({region:'APAC',country:'India',city:'Bangalore',campus:'epip',building:'SEZ'});
      locationList = dropdownOptionsBackup;
      locationList.unshift({ region: 'ALL', country: 'ALL', city: 'ALL', campus: 'ALL', building: 'ALL' });
      setDropdownOptions(locationList);
      window.dropdownoptions = locationList;
      console.log('e:', e)
    });
    //onload API call to get widget and bar data:
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
      let headerData = { 'numberOfCountry': response.data.numberOfCountry, 'numberOfBuilding': response.data.numberOfBuilding, 'area': response.data.area, 'numberOfEmployees': response.data.numberOfEmployees };



      props.setHeaderCountData(headerData);
    }).catch(e => {
      console.log('error:', e);
    })


  }

  const onChangeDateDropdown = (e) => {
    console.log('onchange date dropdown:', e);
    setDatevalue(e.split('::') ? e.split('::')[0] : e);
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
      setStartDateCustom(null);
      setEndDateCustom(null);
      sessionStorage.setItem('startDate', null);
      sessionStorage.setItem('endDate', null);
      sessionStorage.setItem('dateSelection', dateRangeVar)
      return;
    }
    sessionStorage.setItem('dateSelection', dateRangeVar)
    //call on date change APIs:
    getWidgetDataAPI(regionValue, countryValue, cityValue, campusValue, buildingValue, startDateVar, endDateVar, dateRangeVar);
    getBarDataAPI(regionValue, countryValue, cityValue, campusValue, buildingValue, startDateVar, endDateVar, dateRangeVar, type);
  }

  const onChange = (e) => {
    //setOnLoadFlag(false);
    if (sessionStorage.getItem("setTargetFlag") == "false") {
      // sessionStorage.setItem("setTargetFlag","true");
    }
    else {
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
    var dropdownOptions = window.dropdownoptions;
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
        if (item.region == 'ALL') {
          regionVar = regionValue;
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
        if (item.region == 'ALL') {
          regionVar = regionValue;
        }
        if (item.country == 'ALL') {
          countryVar = countryValue;
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
        if (item.region == 'ALL') {
          regionVar = regionValue;
        }
        if (item.country == 'ALL') {
          countryVar = countryValue;
        }
        if (item.city == 'ALL') {
          cityVar = cityValue;
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
        if (item.region == 'ALL') {
          regionVar = regionValue;
        }
        if (item.country == 'ALL') {
          countryVar = countryValue;
        }
        if (item.city == 'ALL') {
          cityVar = cityValue;
        } if (item.campus == 'ALL') {
          campusVar = campusValue;
        }

        setBuildingValue(item.building);
      }





    });


    if (type == 'building') {

    }

    let regionListOptions = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.region, value: 'region::' + item.region })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == item.region).map(item => ({ label: item.region, value: 'region::' + item.region })), 'value');
    if (JSON.stringify(regionListOptions).indexOf('ALL') == -1) {
      regionListOptions.unshift({ label: 'All', value: 'region::ALL' });

    }
    if (type == 'region') {
      //setCountryList([...new Set(dropdownOptions.filter(item=>item.region==e.split('::')[1]).map(item=>({label:item.country,value:'country::'+item.country})).map(item=>({label:item.country,value:'country::'+item.country})))]);

      // let regionListOptions=e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.country, value: 'region::' + item.region })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == item.region).map(item => ({ label: item.region, value: 'region::' + item.region })), 'value');


      let filteredCountryList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.country, value: 'country::' + item.country })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value');
      if (JSON.stringify(filteredCountryList).indexOf('ALL') == -1) {
        filteredCountryList.unshift({ label: 'All', value: 'country::ALL' });

      }
      let filteredCityList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.city, value: 'city::' + item.city })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value');
      if (JSON.stringify(filteredCityList).indexOf('ALL') == -1) {
        filteredCityList.unshift({ label: 'All', value: 'city::ALL' });

      }
      filteredCityList = _.sortBy(filteredCityList,
        [function (o) { return o.label; }]);

      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        filteredCampusList.unshift({ label: 'All', value: 'campus::ALL' });
      }
      filteredCampusList = _.sortBy(filteredCampusList,
        [function (o) { return o.label; }]);
      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.map(item => ({ label: item.building, value: 'building::' + item.building })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        filteredBuildingList.unshift({ label: 'All', value: 'building::ALL' });

      }
      filteredBuildingList = _.sortBy(filteredBuildingList,
        [function (o) { return o.label; }]);
      setCountryList(filteredCountryList);
      setCityList(filteredCityList);
      setCampusList(filteredCampusList);
      setBuildingList(filteredBuildingList);

      setCountryValue('ALL');
      setCityValue('ALL');
      setCampusValue('ALL');
      setBuildingValue('ALL');


      let jsonObject = { places: [] };
      filteredCountryList.forEach((item, i) => {
        jsonObject.places.push({ place: item.label, co2: Math.floor(Math.random() * 1000), energyConsumed: Math.floor(Math.random() * 10000), renewableEnergy: Math.floor(Math.random() * 1000), emissionReduction: Math.floor(Math.random() * 100) });
      })

      setDropdownList([{ title: 'Region', name: 'Region', options: regionListOptions, value: regionVar }, { title: 'Country', name: 'Country', options: filteredCountryList, value: 'All' }, { title: 'City', name: 'City', options: filteredCityList, value: 'All' }, { title: 'Campus', name: 'Campus', options: filteredCampusList, value: 'All' }, { title: 'Building', name: 'Building', options: filteredBuildingList, value: 'All' }]);
    } else if (type == 'country') {
      console.log("regionValue:", regionValue, "regionVar:", regionVar);
      let filteredCityList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => { return (countryValue != 'ALL' ? item.country == countryValue : regionValue != 'ALL' ? item.region == regionValue : item.city == item.city) }).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == e.split('::')[1]).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value');
      if (JSON.stringify(filteredCityList).indexOf('ALL') == -1) {
        filteredCityList.unshift({ label: 'ALL', value: 'city::ALL' });
      }
      filteredCityList = _.sortBy(filteredCityList,
        [function (o) { return o.label; }]);
      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => { return (countryValue != 'ALL' ? item.country == countryValue : regionValue != 'ALL' ? item.region == regionValue : item.campus == item.campus) }).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == e.split('::')[1]).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        filteredCampusList.unshift({ label: 'ALL', value: 'campus::ALL' });
      }
      filteredCampusList = _.sortBy(filteredCampusList,
        [function (o) { return o.label; }]);

      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => { return (countryValue != 'ALL' ? item.country == countryValue : regionValue != 'ALL' ? item.region == regionValue : item.building == item.building) }).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        filteredBuildingList.unshift({ label: 'ALL', value: 'building::ALL' });

      }
      filteredBuildingList = _.sortBy(filteredBuildingList,
        [function (o) { return o.label; }]);

      let filteredCountryList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => regionValue!='ALL'?item.region == regionValue:item.region==item.region).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == regionVar).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value');

      if (JSON.stringify(filteredCountryList).indexOf('ALL') == -1) {
        filteredCountryList.unshift({ label: 'ALL', value: 'country::ALL' });

      }
      setCityList(filteredCityList);
      setCampusList(filteredCampusList);
      setBuildingList(filteredBuildingList);
      setCityValue('ALL');
      setCampusValue('ALL');
      setBuildingValue('ALL');


      let jsonObject = { places: [] };
      filteredCityList.forEach(item => {
        jsonObject.places.push({ place: item.label, co2: Math.floor(Math.random() * 1000), energyConsumed: Math.floor(Math.random() * 10000), renewableEnergy: Math.floor(Math.random() * 1000), emissionReduction: Math.floor(Math.random() * 100) });
      })


      setDropdownList([{ title: 'Region', name: 'Region', options: regionListOptions, value: regionVar }, { title: 'Country', name: 'Country', options: filteredCountryList, value: countryVar }, { title: 'City', name: 'City', options: filteredCityList, value: 'All' }, { title: 'Campus', name: 'Campus', options: filteredCampusList, value: 'All' }, { title: 'Building', name: 'Building', options: filteredBuildingList, value: 'All' }]);

    } else if (type == 'city') {


      let filteredCountryList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => regionValue!='ALL'?item.region==regionValue:item.region==item.region).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == regionVar).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value');

      if (JSON.stringify(filteredCountryList).indexOf('ALL') == -1) {
        filteredCountryList.unshift({ label: 'All', value: 'country::ALL' });

      }
      filteredCountryList = _.sortBy(filteredCountryList,
        [function (o) { return o.label; }]);

      let filteredCityList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => countryValue!='ALL'?item.country == countryValue:regionValue!='ALL'?item.region==regionValue:item.region==item.region).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == countryVar).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value');
      if (JSON.stringify(filteredCityList).indexOf('ALL') == -1) {
        filteredCityList.unshift({ label: 'All', value: 'city::ALL' });

      }
      filteredCityList = _.sortBy(filteredCityList,
        [function (o) { return o.label; }]);
      //.filter(item=>{return (cityValue!='ALL'?item.city == cityValue:countryValue!='ALL'?item.country==countryValue:regionValue!='ALL'?item.region==regionValue:'')})
      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => { return (countryValue != 'ALL' ? item.country == countryValue : regionValue != 'ALL' ? item.region == regionValue : item.region==item.region) }).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.city == e.split('::')[1]).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        filteredCampusList.unshift({ label: 'All', value: 'campus::ALL' });

      }
      filteredCampusList = _.sortBy(filteredCampusList,
        [function (o) { return o.label; }]);

      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => { return (countryValue != 'ALL' ? item.country == countryValue : regionValue != 'ALL' ? item.region == regionValue : item.region==item.region) }).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.city == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        filteredBuildingList.unshift({ label: 'All', value: 'building::ALL' });

      }
      filteredBuildingList = _.sortBy(filteredBuildingList,
        [function (o) { return o.label; }]);
      setCampusList(filteredCampusList);
      setBuildingList(filteredBuildingList);
      setCountryList(filteredCountryList);
      setCampusValue('ALL');
      setBuildingValue('ALL');


      let jsonObject = { places: [] };
      filteredCampusList.forEach(item => {
        jsonObject.places.push({ place: item.label, co2: Math.floor(Math.random() * 1000), energyConsumed: Math.floor(Math.random() * 10000), renewableEnergy: Math.floor(Math.random() * 1000), emissionReduction: Math.floor(Math.random() * 100) });
      })



      setDropdownList([{ title: 'Region', name: 'Region', options: regionListOptions, value: regionVar }, { title: 'Country', name: 'Country', options: filteredCountryList, value: countryVar }, { title: 'City', name: 'City', options: filteredCityList, value: cityVar }, { title: 'Campus', name: 'Campus', options: filteredCampusList, value: 'All' }, { title: 'Building', name: 'Building', options: filteredBuildingList, value: 'All' }]);
    } else if (type == 'campus') {
      let filteredCountryList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => regionValue!='ALL'?item.region==regionValue:item.region==item.region).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == regionVar).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value');

      if (JSON.stringify(filteredCountryList).indexOf('ALL') == -1) {
        filteredCountryList.unshift({ label: 'All', value: 'country::ALL' });

      }
      filteredCountryList = _.sortBy(filteredCountryList,
        [function (o) { return o.label; }]);
      //
      let filteredCityList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => { return (countryVar != 'ALL' ? item.country == countryVar : regionVar != 'ALL' ? item.region == regionVar : item.region==item.region) }).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == countryVar).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value');
      if (JSON.stringify(filteredCityList).indexOf('ALL') == -1) {
        filteredCityList.unshift({ label: 'All', value: 'city::ALL' });


      }
      filteredCityList = _.sortBy(filteredCityList,
        [function (o) { return o.label; }]);


      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => cityValue!='ALL'?item.city == cityValue:countryValue!='ALL'?item.country==countryValue:regionValue!='ALL'?item.region==regionValue:item.region==item.region).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.city == cityVar).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        filteredCampusList.unshift({ label: 'All', value: 'campus::ALL' });
      }
      filteredCampusList = _.sortBy(filteredCampusList,
        [function (o) { return o.label; }]);
      console.log('cityValue:', cityValue, ' countryValue:', countryValue);
      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => { return (cityValue != 'ALL' ? item.city == cityValue : countryValue != 'ALL' ? item.country == countryValue : regionValue != 'ALL' ? item.region == regionValue : item.region==item.region) }).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.campus == e.split('::')[1]).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value');
      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        filteredBuildingList.unshift({ label: 'All', value: 'building::ALL' });

      }
      filteredBuildingList = _.sortBy(filteredBuildingList,
        [function (o) { return o.label; }]);

      setCountryList(filteredCountryList);
      setCityList(filteredCityList);
      setBuildingList(filteredBuildingList);
      console.log("filteredBuildingList:", filteredBuildingList);
      setBuildingValue('ALL');
      let jsonObject = { places: [] };
      filteredBuildingList.forEach(item => {
        jsonObject.places.push({ place: item.label, co2: Math.floor(Math.random() * 1000), energyConsumed: Math.floor(Math.random() * 10000), renewableEnergy: Math.floor(Math.random() * 1000), emissionReduction: Math.floor(Math.random() * 100) });
      })

      // jsonObject = { places: [{ place: 'SEZ1', co2: '1223', energyConsumed: '214' }, { place: 'SEZ2', co2: '1224', energyConsumed: '215' }] };


      setDropdownList([{ title: 'Region', name: 'Region', options: regionListOptions, value: regionVar }, { title: 'Country', name: 'Country', options: filteredCountryList, value: countryVar }, { title: 'City', name: 'City', options: filteredCityList, value: cityVar }, { title: 'Campus', name: 'Campus', options: filteredCampusList, value: campusVar }, { title: 'Building', name: 'Building', options: filteredBuildingList, value: 'All' }]);
    }

    else if (type == 'building') {


      let filteredCountryList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => regionValue!='ALL'?item.region==regionValue:item.region==item.region).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.region == regionVar).map(item => ({ label: item.country, value: 'country::' + item.country })), 'value');

      if (JSON.stringify(filteredCountryList).indexOf('ALL') == -1) {
        filteredCountryList.unshift({ label: 'All', value: 'country::ALL' });

      }
      filteredCountryList = _.sortBy(filteredCountryList,
        [function (o) { return o.label; }]);

      let filteredCityList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => countryValue!='ALL'?item.country==countryValue:regionValue!='ALL'?item.region==regionValue:item.region==item.region).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.country == countryVar).map(item => ({ label: item.city, value: 'city::' + item.city })), 'value');
      if (JSON.stringify(filteredCityList).indexOf('ALL') == -1) {
        filteredCityList.unshift({ label: 'All', value: 'city::ALL' });

      }
      filteredCityList = _.sortBy(filteredCityList,
        [function (o) { return o.label; }]);
      let filteredCampusList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => cityValue!='ALL'?item.city==cityValue:countryValue!='ALL'?item.country==countryValue:regionValue!='ALL'?item.region==regionValue:item.region==item.region).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.city == cityVar).map(item => ({ label: item.campus, value: 'campus::' + item.campus })), 'value');
      if (JSON.stringify(filteredCampusList).indexOf('ALL') == -1) {
        filteredCampusList.unshift({ label: 'All', value: 'campus::ALL' });
      }
      filteredCampusList = _.sortBy(filteredCampusList,
        [function (o) { return o.label; }]);

      let filteredBuildingList = e.split('::')[1] == 'ALL' ? _.uniqBy(dropdownOptions.filter(item => campusValue!='ALL'?item.campus == campusValue:cityValue!='ALL'?item.city==cityValue:countryValue!='ALL'?item.country==countryValue:regionValue!='ALL'?item.region==regionValue:item.region==item.region).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value') : _.uniqBy(dropdownOptions.filter(item => item.campus == campusVar).map(item => ({ label: item.building, value: 'building::' + item.building })), 'value');

      if (JSON.stringify(filteredBuildingList).indexOf('ALL') == -1) {
        filteredBuildingList.unshift({ label: 'All', value: 'building::ALL' });
      }
      setCountryList(filteredCountryList);
      setCityList(filteredCityList);
      setCampusList(filteredCampusList);


      let jsonObject = { places: [] };
      setDropdownList([{ title: 'Region', name: 'Region', options: regionListOptions, value: regionVar }, { title: 'Country', name: 'Country', options: filteredCountryList, value: countryVar }, { title: 'City', name: 'City', options: filteredCityList, value: cityVar }, { title: 'Campus', name: 'Campus', options: filteredCampusList, value: campusVar }, { title: 'Building', name: 'Building', options: filteredBuildingList, value: buildingVar }]);


      // jsonObject = { places: [{ place: 'SEZ1', co2: '1223', energyConsumed: '214' }, { place: 'SEZ2', co2: '1224', energyConsumed: '215' }] };

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

      let headerData = { 'numberOfCountry': response.data.numberOfCountry, 'numberOfBuilding': response.data.numberOfBuilding, 'area': response.data.area, 'numberOfEmployees': response.data.numberOfEmployees };



      props.setHeaderCountData(headerData);

    }).catch(e => {
      console.log('error:', e);
    })
    //doughnut chart api onchange:


    //end of onchange API
  }





  function disabledDate(current) {
    // Disable dates after today

    if (!startDate) {
      return false; // Allow all dates if no start date is selected yet
    }

    return (current && current < window.startDate) || (current && current > Date.now());
  }
  const onRangeChangeCheck = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1], '::', dayjs(dateStrings[0]));
      console.log("true/false::", dayjs(dateStrings[1]).isBefore(dayjs(dateStrings[0])));
      if (dayjs(dateStrings[1]).isBefore(dayjs(dateStrings[0]))) { return }
      setStartDate(dates[0]);
      window.startDate = dateStrings[0];
      window.startDateParam = dateStrings[0];
      window.endDateParam = dateStrings[1];
      setEndDate(dates[1]);
      setdateSubmitButtonDisabled(false);

    } else {
      setdateSubmitButtonDisabled(true);
      console.log('Clear');
      return;
    }
  }
  const onRangeChange = (startDateParam, endDateParam) => {
    //     if (dates) {
    //       console.log('From: ', dates[0], ', to: ', dates[1]);
    //       console.log('From: ', dateStrings[0], ', to: ', dateStrings[1], '::',dayjs(dateStrings[0]));
    //       console.log("true/false::",dayjs(dateStrings[1]).isBefore(dayjs(dateStrings[0])));
    //       if(dayjs(dateStrings[1]).isBefore(dayjs(dateStrings[0]))){return}
    //       setStartDate(dateStrings[0]);
    //       window.startDate=dateStrings[0];
    //       setEndDate(dateStrings[1]);
    //     } else {
    //       console.log('Clear');
    // return ;
    //     }

    setStartDate(startDateParam);
    setEndDate(endDateParam);
    setIsRangePickerModalOpen(false);
    setStartDateCustom(null);
    setEndDateCustom(null);
    getWidgetDataAPI(regionValue, countryValue, cityValue, campusValue, buildingValue, startDateParam, endDateParam, 'custom_date');
    getBarDataAPI(regionValue, countryValue, cityValue, campusValue, buildingValue, startDateParam, endDateParam, 'custom_date', type);
    setIsRangePickerModalOpen(false);


  };
  const handleRangePickerOk = () => {
    setIsRangePickerModalOpen(false);
  }
  const handleRangePickerCancel = () => {
    setIsRangePickerModalOpen(false);
  }

  const getWidgetDataAPI = (region, country, city, campus, building, startDate, endDate, dateRangeVar) => {
    //get header data for overlay widgets(right panel):
    if (region == 'All') {
      region = 'ALL'
    }
    if (country == 'All') {
      country = 'ALL'
    }
    if (city == 'All') {
      city = 'ALL'
    } if (campus == 'All') {
      campus = 'ALL'
    } if (building == 'All') {
      building = 'ALL'
    }
    var widgetDataURL = window.config.CG_HEADER_NEW;
    //var widgetDataURL = window.config.CG_HEADER_RESOURCE_DATA;//"http://10.51.109.90:5000/energyanalytics/api/v1/data";
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
        "dateRange": dateRangeVar,
        "variableTypes": [
          "Energy Consumption",
          "Water Consumption",
          "Waste Consumption",
          //        "grid_power_consumption",
          "Renewable Energy Consumption",
          "Corban Emission"
        ]
      }


    }).then(response => {
      console.log('new header response:', response.data[0]);

      setCo2Data(response.data[0].carbon_emission_reduction);
      setRenewableEnergy(response.data[0].renewable_energy_consumption);

      
      setEnergyConsumption(response.data[0].energy_consumption);
      setWaterConsumption(response.data[0].water_consumption);

      var widgetList = [{ type: 'energyConsumption', data: window.multiplierConfig["Energy ConsumptionKey"] ? window.multiplierConfig["Energy Consumption"] * response.data[0]["Energy Consumption"] : response.data[0]["Energy Consumption"], label: 'Energy Consumption' }, { type: 'waterConsumption', data: response.data[0]["Water Consumption"], label: 'Water Consumption' },
       { type: 'renewableEnergy', data: response.data[0]["Renewable Energy Consumption"], label: 'Renewable Energy' }, { type: 'co2', data: response.data[0]["Corban Emission"], label: 'Carbon Emissions' },{ type: 'wasteConsumption', data: response.data[0]["Waste Consumption"], label: 'Waste Consumption' }];
      props.setWidgetData(widgetList);
    }).catch(e => {
      console.log('error:', e);
    })

  }

  let barDataResourceVar = {
    labels: [],
    datasets: [
      {
        label: 'Gwh',
        maxBarThickness: 50,
        data: [],
        // backgroundColor: gradient || 'rgba(75,192,192,0.2)',
        backgroundColor: '#2F9342',
        //  borderRadius: 1,
        borderRadius: 10,  // This is the key to rounding the bars
        // borderRadius: [
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 }, // Apply to each bar individually
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        // ],
        // borderSkipped: false,
        // fill: true
      },

      // {
      //   label: 'Expenses',
      //   data: [8, 15, 2, 3, 1, 2],
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
    ],
  };

  const getBarDataAPI = (region, country, city, campus, building, startDate, endDate, dateRangeVar, type) => {
    if (region == 'All') {
      region = 'ALL'
    }
    if (country == 'All') {
      country = 'ALL'
    }
    if (city == 'All') {
      city = 'ALL'
    } if (campus == 'All') {
      campus = 'ALL'
    } if (building == 'All') {
      building = 'ALL'
    }


console.log("region, country, city, campus, building:",region, country, city, campus, building);
    var GraphPayloadVar = {
      "region": region,
      "countryName": country,
      "cityName": city,
      "campusName": campus,
      "buildingName": building,
      "startDate": startDate,//"2024-05-15"
      "endDate": endDate,//"2024-05-15"
      "dateRange": dateRangeVar
    };
    var HeaderPayloadVar = {
      "region": region,
      "countryName": country,
      "cityName": city,
      "campusName": campus,
      "buildingName": building,
      "startDate": startDate,//"2024-05-15"
      "endDate": endDate,//"2024-05-15"
      "dateRange": dateRangeVar,
      "variableTypes": ["Energy Consumption", "Water Consumption", "Waste Consumption", "grid_power_consumption", "renewable_energy_consumption", "Corban Emission"]
    };



    let locationType = type ? type : 'ALL';
    if (locationType == 'ALL') {
      locationType = 'ALL';
    }
    let locationValue = 'ALL';




if(region!='ALL' && country!='ALL' && city=='ALL' && campus=='ALL' && building=='ALL'){
  locationType='country';
  locationValue=country;
}
else if(region!='ALL' && country!='ALL' && city!='ALL' && campus=='ALL' && building=='ALL'){
  locationType='city';
  locationValue=city;
 }
 else if(region!='ALL' && country!='ALL' && city!='ALL' && campus!='ALL' && building=='ALL'){
  locationType='campus';
  locationValue=campus;
 }
 else if(region!='ALL' && country!='ALL' && city!='ALL' && campus!='ALL' && building!='ALL'){
  locationType='building';
  locationValue=building;
 }
 else if(region!='ALL' && country=='ALL' && city=='ALL' && campus=='ALL' && building=='ALL'){
  locationType='region';
  locationValue=region;
 }
 else if(region=='ALL' && country=='ALL' && city=='ALL' && campus=='ALL' && building=='ALL'){
  locationType='region';
  locationValue='ALL';
 }
console.log("locationtype:", locationType);

   
    if (locationValue == 'ALL' && locationType == 'region') {
      locationType = 'ALL';
      locationValue = 'ALL';
    }
    var DoughnutPayloadVar = {
      "locationType": locationType,
      "location": locationValue,
      "startDate": startDate,//"2024-05-15"
      "endDate": endDate,//"2024-05-15"
      "dateRange": dateRangeVar

    };
    var DoughnutPayloadVar2 = {
      "locationType": locationType,
      "location": locationValue,
      "startDate": startDate,//"2024-05-15"
      "endDate": endDate,//"2024-05-15"
      "dateRange": dateRangeVar,
      "variableType": "Energy Consumption"
    };

    axios({
      method: 'POST', url: window.config.CG_DOUGHNUT_LOCATION_BASED_COMPARISON, headers: { "Content-Type": "application/json" },
      data: DoughnutPayloadVar2
    }).then(resp => {
      console.log("doughnut resp:", resp);


    }).catch(e => { console.log('error new doughnut api:', e) })

    /*
    "locationType": "city",
"location": "Bangalore",
"startDate": "2019-03-15",
"endDate": "2025-03-15",
"dateRange": "last_month",
"variableType": "renewable_energy_certificate"
    */


    axios({
      method: 'POST', url: window.config.CG_FETCH_SUB_LOCATIONS_DATA_GLOBE, headers: { "Content-Type": "application/json" },
      data: DoughnutPayloadVar
    }).then(resp => {
      console.log('unity sub location resp:', resp);

      let unityJsonObject = { "places": [] }


      resp && resp.data && resp.data.forEach(item => {

        unityJsonObject.places.push({ "place": item.location, "energyConsumed": item.energy_consumption, "renewableEnergy": item.renewable_energy, "emissionReduction": item.emission_reduction, "co2": item.water_consumption, "waterConsumption": item.water_consumption })
      });
      if (resp.status == 204) {
        console.log('no data found');
      }
      console.log('unityJsonObject:', unityJsonObject);
      if (locationType == 'region') {
        props.setUnityMessageObject({ type: locationType, value: 'region:' + locationValue + ':country:ALL:city:ALL:campus:ALL:building:ALL', jsonObject: unityJsonObject });
      }
      else if (locationType == 'country') {
        props.setUnityMessageObject({ type: locationType, value: 'region:' + region + ':country:' + locationValue + ':city:ALL:campus:ALL:building:ALL', jsonObject: unityJsonObject });
      }
      else if (locationType == 'city') {
        props.setUnityMessageObject({ type: locationType, value: 'region:' + region + ':country:' + country + ':city:' + locationValue + ':campus:ALL:building:ALL', jsonObject: unityJsonObject });
      }
      else if (locationType == 'campus') {
        props.setUnityMessageObject({ type: locationType, value: 'region:' + region + ':country:' + country + ':city:' + city + ':campus:' + locationValue + ':building:ALL', jsonObject: unityJsonObject });
      }
      else if (locationType == 'building') {
        props.setUnityMessageObject({ type: locationType, value: 'region:' + region + ':country:' + country + ':city:' + city + ':campus:' + campus + ':building:' + locationValue, jsonObject: unityJsonObject });
      }

    }).catch(err => {
      console.log('err:', err);
      let unityJsonObject = { "places": [] }
    })
    let promise1 = axios({
      method: 'POST', url: window.config.CG_BAR_NEW, headers: { "Content-Type": "application/json" },
      data: {
        "region": region,
        "countryName": country,
        "cityName": city,
        "campusName": campus,
        "buildingName": building,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar,
        "variableType": "Energy Consumption"
      }

    });


    let promise2 = axios({
      method: 'POST', url: window.config.CG_BAR_NEW, headers: { "Content-Type": "application/json" },
      data: {
        "region": region,
        "countryName": country,
        "cityName": city,
        "campusName": campus,
        "buildingName": building,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar,
        "variableType": "Water Consumption"
      }

    });
    let promise3 = axios({
      method: 'POST', url: window.config.CG_BAR_NEW, headers: { "Content-Type": "application/json" },
      data: {
        "region": region,
        "countryName": country,
        "cityName": city,
        "campusName": campus,
        "buildingName": building,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar,
        "variableType": "Corban Emission"
      }

    });
    let promise4 = axios({
      method: 'POST', url: window.config.CG_BAR_NEW, headers: { "Content-Type": "application/json" },
      data: {
        "region": region,
        "countryName": country,
        "cityName": city,
        "campusName": campus,
        "buildingName": building,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar,
        "variableType": "Renewable Energy Consumption"
      }

    });
    //promise for doughnut energy:
    let promise5 = axios({
      method: 'POST', url: window.config.CG_DOUGHNUT_LOCATION_BASED_COMPARISON, headers: { "Content-Type": "application/json" },
      data: {
        "locationType": locationType,
        "location": locationValue,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar,
        "variableType": "Energy Consumption"
      }

    })
    //promise for doughnut water:
    let promise6 = axios({
      method: 'POST', url: window.config.CG_DOUGHNUT_LOCATION_BASED_COMPARISON, headers: { "Content-Type": "application/json" },
      data: {
        "locationType": locationType,
        "location": locationValue,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar,
        "variableType": "Water Consumption"
      }

    })
    //renewable energy doughnut:
    let promise7 = axios({
      method: 'POST', url: window.config.CG_DOUGHNUT_LOCATION_BASED_COMPARISON, headers: { "Content-Type": "application/json" },
      data: {
        "locationType": locationType,
        "location": locationValue,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar,
        "variableType": "Renewable Energy Consumption"
      }

    })

    //emission reduction doughnut:
    let promise8 = axios({
      method: 'POST', url: window.config.CG_DOUGHNUT_LOCATION_BASED_COMPARISON, headers: { "Content-Type": "application/json" },
      data: {
        "locationType": locationType,
        "location": locationValue,
        "startDate": startDate,//"2024-05-15"
        "endDate": endDate,//"2024-05-15"
        "dateRange": dateRangeVar,
        "variableType": "Corban Emission"
      }

    })

    Promise.allSettled([
      promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8
    ]).then((result) => {
      console.log("result of all promises:", result);
      var barDataEnergyVar = [];
      var barDataWaterVar = [];
      var barDataRenewableEnergyVar = [];

      var barDataEmissionReductionVar = [];

      var doughnutDataEnergyVar = '';
      var doughnutDataWaterVar = '';
      var doughnutDataRenewableEnergyVar = '';
      var doughnutDataEmissionReductionVar = '';
      let label2 = '';
      let label2Energy = '';
      let label2Water = '';
      let label2Waste = '';
      let typeOf = '';
      let energytypeOf = '';
      result.forEach((item, i) => {
        if (item.value && item.value.data && item.value.data.length > 0) {

          i == 0 ? (
            //barDataEnergyVar=item.value.data,
            barDataResourceVar.datasets[0].data = [],
            barDataResourceVar.labels = [],
            label2 = '',
            
            item.value.data.forEach(item2 => {
              barDataResourceVar.datasets[0].data.push(item2["Energy Consumption"]);
              barDataResourceVar.labels.push(item2.month ? item2.month : item2.year);
              console.log("type of:", typeof item2['year']);
              if (item2['year'] && typeof item2['year'] == 'number') {
                typeOf = 'number';
              }
              
              if (item2['month'] && item2['year']) {
                label2.includes(item2['year']) ? '' : label2 = label2 + '-' + item2['year'];
              }
            }),

            label2.charAt(0) == '-' ? label2 = label2.substring(1) : '',
           label2!=''? label2 = 'FY ' + label2:'' ,

            window.label2 = label2,
            console.log("barDataResourceVar:", barDataResourceVar),
            window.barDataResource = barDataResourceVar,
            barDataEnergyVar = item.value.data
          ) : i == 1 ? barDataWaterVar = item.value.data : i == 2 ? barDataEmissionReductionVar = item.value.data : i == 3 ? barDataRenewableEnergyVar = item.value.data : i == 4 ? doughnutDataEnergyVar = item.value.data : i == 5 ? doughnutDataWaterVar = item.value.data : i == 6 ? doughnutDataRenewableEnergyVar = item.value.data : i == 7 ? doughnutDataEmissionReductionVar = item.value.data : '';
        }
        else if (item.status == 'rejected') {

          console.log('failed response')
          window.label2="No Data"
          window.barDataResource=[];
          let chartWidgetList = [{ name: 'Energy Consumption', title: '', type: 'bar', content: { options: '', data: [] } },
          { name: 'Water Consumption', title: '', type: 'bar', content: { options: '', data: [] } },
          { name: 'Renewable Energy', title: '', type: 'bar', content: { options: '', data: [] } },
          { name: 'Emission Reduction', title: '', type: 'bar', content: { options: '', data: [] } },
    
          { name: 'Energy Consumption', title: '', type: 'doughnut', content: { options: '', data: [] } },
          { name: 'Renewable Energy', title: '', type: 'doughnut', content: { options: '', data: [] } },
          { name: 'Emission Reduction', title: '', type: 'doughnut', content: { options: '', data: [] } },
          { name: 'Water Consumption', title: '', type: 'doughnut', content: { options: '', data: [] } },
          { name: 'graphPayload', payload: GraphPayloadVar },
          { name: 'headerPayload', payload: HeaderPayloadVar },
          { name: 'doughnutPayload', payload: DoughnutPayloadVar2 },
          ];
          props.setHeaderData(chartWidgetList);

        }
      })
      // `result` should contain an array of either http responses or errors
      //calling APIs for energy, water and waste screens:
      let barDataEnergySubMenuVar = {
        labels: [],
        datasets: [
          {
            label: 'Gwh',
            maxBarThickness: 50,
            data: [],
            backgroundColor: '#2F9342',
            //  borderRadius: 1,
            borderRadius: 10,  // This is the key to rounding the bars
            //borderRadius: [
            // { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 }, // Apply to each bar individually
            // { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
            // { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
            // { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
            //],
            //borderSkipped: false,
            fill: true
          },

          // {
          //   label: 'Expenses',
          //   data: [8, 15, 2, 3, 1, 2],
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
        ],
      };
      let barDataWaterSubMenuVar = {
        labels: [],
        datasets: [
          {
            label: 'Ltr',//This is for tooltip over bar
            data: [],
            maxBarThickness: 50,
            backgroundColor: '#0fb5ae',
            //  borderRadius: 1,
            borderRadius: 10,  // This is the key to rounding the bars
            // borderRadius: [
            //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 }, // Apply to each bar individually
            //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
            //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
            //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
            // ],
            // borderSkipped: false,
            // fill: true
          },

          // {
          //   label: 'Expenses',
          //   data: [8, 15, 2, 3, 1, 2],
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
        ],
      };

      let barDataWasteVar = {
        labels: [],
        datasets: [
          {
            label: 'Kg',
            maxBarThickness: 50,
            data: [],
            backgroundColor: '#14d7ed',
            //  borderRadius: 1,
            borderRadius: 10,  // This is the key to rounding the bars
            // borderRadius: [
            //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 }, // Apply to each bar individually
            //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
            //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
            //   { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
            // ],
            // borderSkipped: false,
            // fill: true
          },

          // {
          //   label: 'Expenses',
          //   data: [8, 15, 2, 3, 1, 2],
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
        ],
      };
      let payload = HeaderPayloadVar

      let payloadTypes = ["electricity", "municipal", "municipal"]
      payloadTypes.forEach(item => {
        payload.sumColumn = item;
        if (item == 'electricity') {
          payload.variableType = "Building Electricity";
        }
        else if (item == 'municipal') {
          payload.variableType = "Water Consumption Through Tanker Water";
        }
        else {

        }
        axios({
          method: 'POST', url: window.config.CG_BAR_NEW, headers: { "Content-Type": "application/json" },
          data: payload

        }).then(resp => {
          setSpinning(false);
          console.log('energy bar response:', resp);
          //{"electric": "500","buildingElectricity": "300","electricVehicle": "200"}
          if (item == "electricity") {
            barDataEnergySubMenuVar.datasets[0].data = [];
            barDataEnergySubMenuVar.labels = [];
            label2Energy = '';
            let energytypeOf = '';
            resp.data && resp.data.forEach(item => {
              console.log('energy bar data item:', item)
              barDataEnergySubMenuVar.datasets[0].data.push(item[payload.variableType]);

              barDataEnergySubMenuVar.labels.push(item.month?item.month:item.year);

              
              if (item['year'] && typeof item['year'] == 'number') {
                energytypeOf = 'number';
              }
              
              if (item['year'] && item['month']) {
                label2Energy.includes(item['year']) ? '' : label2Energy = label2Energy + '-' + item['year'];
              }



            })

            
            label2Energy.charAt(0) == '-' ? label2Energy = label2Energy.substring(1) : '',
            label2Energy!=''? label2Energy = 'FY ' + label2Energy:'' ,

              window.barDataEnergy = barDataEnergySubMenuVar;
            window.label2Energy = label2Energy;

          }
          else if (item == "municipal") {
            barDataWaterSubMenuVar.labels = [];
            barDataWaterSubMenuVar.datasets[0].data = [];
            barDataWaterSubMenuVar.datasets[0].label = 'Ltr';
            label2Water = '';
            label2Waste = '';
            let typeOfWater = '';
            resp.data && resp.data.forEach(item => {
              barDataWaterSubMenuVar.datasets[0].data.push(item[payload.variableType]);



              if (item['year'] && typeof item['year'] == 'number') {
                typeOfWater = 'number';
              }
              if (item['year'] && item['month']) {
                label2Water.includes(item['year']) ? '' : label2Water = label2Water + '-' + item['year'];
                label2Waste.includes(item['year']) ? '' : label2Waste = label2Waste + '-' + item['year'];
              }

              barDataWaterSubMenuVar.labels.push(item.month?item.month:item.year);
            }
            )
            label2Water && label2Water.charAt(0) == '-' ? label2Water = label2Water.substring(1) : '',
              label2Waste && label2Waste.charAt(0) == '-' ? label2Waste = label2Waste.substring(1) : '',
              label2Water!=''? label2Water = 'FY ' + label2Water : '',
              label2Water!=''? label2Waste = 'FY ' + label2Waste : '',

              window.barDataWater = barDataWaterSubMenuVar;
            window.label2Water = label2Water;
            window.label2Waste = label2Waste;
          }

        }).catch(e => {

          console.log('error:', e);

          window.barDataEnergy = barDataEnergySubMenuVar
          window.barDataWater = barDataWaterSubMenuVar;
          window.label2Water = label2Water;
          window.label2Waste = label2Waste;
        })
      })


      let chartWidgetList = [{ name: 'Energy Consumption', title: '', type: 'bar', content: { options: '', data: barDataEnergyVar } },
      { name: 'Water Consumption', title: '', type: 'bar', content: { options: '', data: barDataWaterVar } },
      { name: 'Renewable Energy', title: '', type: 'bar', content: { options: '', data: barDataRenewableEnergyVar } },
      { name: 'Emission Reduction', title: '', type: 'bar', content: { options: '', data: barDataEmissionReductionVar } },

      { name: 'Energy Consumption', title: '', type: 'doughnut', content: { options: '', data: doughnutDataEnergyVar } },
      { name: 'Renewable Energy', title: '', type: 'doughnut', content: { options: '', data: doughnutDataRenewableEnergyVar } },
      { name: 'Emission Reduction', title: '', type: 'doughnut', content: { options: '', data: doughnutDataEmissionReductionVar } },
      { name: 'Water Consumption', title: '', type: 'doughnut', content: { options: '', data: doughnutDataWaterVar } },
      { name: 'graphPayload', payload: GraphPayloadVar },
      { name: 'headerPayload', payload: HeaderPayloadVar },
      { name: 'doughnutPayload', payload: DoughnutPayloadVar2 },
      ];
      console.log('chartWidgetList:', chartWidgetList);
      props.setHeaderData(chartWidgetList);

    }).catch(err => {
      console.log('error in responses:', err);
      let chartWidgetList = [{ name: 'Energy Consumption', title: '', type: 'bar', content: { options: '', data: [] } },
        { name: 'Water Consumption', title: '', type: 'bar', content: { options: '', data: [] } },
        { name: 'Renewable Energy', title: '', type: 'bar', content: { options: '', data: [] } },
        { name: 'Emission Reduction', title: '', type: 'bar', content: { options: '', data: [] } },
  
        { name: 'Energy Consumption', title: '', type: 'doughnut', content: { options: '', data: [] } },
        { name: 'Renewable Energy', title: '', type: 'doughnut', content: { options: '', data: [] } },
        { name: 'Emission Reduction', title: '', type: 'doughnut', content: { options: '', data: [] } },
        { name: 'Water Consumption', title: '', type: 'doughnut', content: { options: '', data: [] } },
        { name: 'graphPayload', payload: GraphPayloadVar },
        { name: 'headerPayload', payload: HeaderPayloadVar },
        { name: 'doughnutPayload', payload: DoughnutPayloadVar2 },
        ];
        props.setHeaderData(chartWidgetList);
    })

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

  }
  // const MemoizedComment = ()=>{return React.memo()}
  var dateDropdownOptions = [{ label: 'Last 24 Hours', value: 'Last 24 Hours', title: "last 24 hrs" }, { label: 'Yesterday', value: 'Yesterday', title: 'Yesterday' }, { label: 'Last Week', value: 'Last Week', title: 'Last Week' }, { label: 'Month to date', value: 'Month to date', title: 'Month to date' }, { label: 'Last Month', value: 'Last Month', title: 'Last Month' }, { label: 'Year to date', value: 'Year to date' }, { label: 'Last Year', value: 'Last Year' }, { label: 'Till date', value: 'Till Date' }, { label: 'Custom Date', value: 'Custom Date::' + Math.random(), title: 'Custom Date' }];

  const handleIconClick = (index) => {
    setOpenIndexes((prev) => ({ ...prev, [index]: !prev[index] }));
    setIsDropdownOpen(false);

  };
  const onChangeStartDate = (e) => {
    setStartDateCustom(dayjs(e).format('YYYY-MM-DD'));
    console.log('e', e);
    window.startDateParam = dayjs(e).format('YYYY-MM-DD');
  }

  const onChangeEndDate = (e) => {
    console.log('e:', e);
    setEndDateCustom(dayjs(e).format('YYYY-MM-DD'));
    setEndDate(e)
    window.endDateParam = dayjs(e).format('YYYY-MM-DD');
  }

  const disabledStartDate = (e) => {


    return e > Date.now() || (endDateCustom && dayjs(endDateCustom).isBefore(dayjs(e)))
  }
  const disabledEndDate = (e) => {
    return (dayjs(e).isBefore(startDateCustom && dayjs(startDateCustom))) || e > Date.now()
  }

  return (
    <header className="header-wrapper">
      <div className="left-header">
        <div className='app-title'>Energy Analytics</div>
      </div>

      <div className="middle-header">
        <div className='dropdown-wrapper'>

          {dropdownList.map(item => { return <div className='dropdown-list'><DropdownComp dropdownOptions={item.options} value={item.value} onChange={onChange} title={item.title} iconClick={e => handleIconClick()} /></div> })}


          <div className='dropdown-list'><DropdownComp dropdownOptions={dateDropdownOptions} value={datevalue} onChange={onChangeDateDropdown} title="Date Range" /></div>
        </div>
      </div>

      <div className="right-header">
        <div className='app-logo'>
          <img src={Logo} alt="capgemini-logo" />
          <ClockComponent />
        </div>
        <span className='app-avatar'>SU</span>
      </div>
      <Modal wrapClassName="datePickerWrapperModal" title="" open={isRangePickerModalOpen} onOk={handleRangePickerOk} onCancel={handleRangePickerCancel} width='50vw' footer={null} closeIcon={null} destroyOnClose >
        {/* <RangePicker onChange={onRangeChangeCheck} disabledDate={disabledDate} renderExtraFooter={() => <><Button onClick={e=>setIsRangePickerModalOpen(false)}>Cancel</Button> 
               <Button onClick={e=>onRangeChange(window.startDateParam, window.endDateParam)} disabled={dateSubmitButtonDisabled}>Ok</Button></>}
               
                onOpenChange={open => setdateSubmitButtonDisabled(open)}
                needConfirm
                /> */}
        <DateRangePicker

          onChange={dates => {
            console.log('Selected dates:', dates, "dayjs:", dayjs(dates.start).format('YYYY-MM-DD'), "end date:", dayjs(dates.end).format('YYYY-MM-DD'));
            window.startDateParam = dayjs(dates.start).format('YYYY-MM-DD');
            window.endDateParam = dayjs(dates.end).format('YYYY-MM-DD');
          }
          }
          darkMode={true} submit={e => onRangeChange(window.startDateParam, window.endDateParam)}
        />
      
      </Modal>
    </header>
  );
};

export default Header;
