import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input,Form,Button, InputNumber, Checkbox, Select, message } from 'antd';
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
    const[linkedPointType, setlinkedPointType]=useState('');
    const[variableUnit, setvariableUnit]=useState('');
    const[selectedVariableType, setselectedVariableType]=useState('');
    const[campusOptions, setCampusOptions]=useState([]);
    const[buildingOptions, setBuildingOptions]=useState([]);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [openIndexes, setOpenIndexes] = useState({});
    const [regionValue, setRegionValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [campusValue, setCampusValue] = useState('');
  const [buildingValue, setBuildingValue] = useState('');
  const [checkedID0, setcheckedID0] = useState(null);
  const [checkedID1, setcheckedID1]=useState(null);
  const [countryList, setCountryList] = useState('');
  const [cityList, setCityList] = useState('');
  const [campusList, setCampusList] = useState('');
  const [buildingList, setBuildingList] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [variableName, setVariableName]=useState([]);
  const [checkedID,setCheckedID]= useState(null);
  const [changedVariableType,setchangedVariableType]=useState('');
  const [variableNamesDropdown,setvariableNamesDropdown]=useState([]);
    useEffect(() => {
      //  getLocations();
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
        
        // message.error('Network Error');
        //locationList.push({region:'APAC',country:'India',city:'Bangalore',campus:'epip',building:'SEZ'});
        //locationList = dropdownOptionsBackup;
        // locationList.unshift({ region: 'ALL', country: 'ALL', city: 'ALL', campus: 'ALL', building: 'ALL' });
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
const createVariables = () => {


  // {"variableType":"digital","variableName":"d","variableUnit":"kg","linkedPointType":"digital"}

  /*{
  "currentVariableType": "buildingvariable",
  "changedVariableType": "campusvariable",
  "variableName": ["BuildingVar1", "BuildingVar2"],
  "variableUnit": "Updated Comment",
  "linkedPointType": "12345"

//

{
  "currentVariableType": "buildingvariable",
  "changedVariableType": "campusvariable",
  "variableName": ["BuildingVar1", "BuildingVar2"],
  "variableUnit": "Updated Comment",
  "linkedPointType": "12345"
}

//
changedVariableType
: 
"buildingvariable"
linkedPointType
: 
"digital"
variableName
: 
["Campus Water Cost"]
variableType
: 
"campusvariable"
variableUnit
: 
"kg"
//
  //linked point type to be visible only when changed to is campus and building and equipment. else, None. 
}*/
  axios({url:window.config.CG_CONFIG_EDIT_VARIABLES,method:'POST', 
    data: {
      "currentVariableType": selectedVariableType,
      "changedVariableType":changedVariableType,
      "variableName": variableName,
      "variableUnit": variableUnit,
      "linkedPointType": (changedVariableType=='campusvariable'||changedVariableType=='buildingvariable'||changedVariableType=='equipmentvariable')?linkedPointType:'None'
    }

  }).then(response=>{
  console.log('response: ',response);
  message.success('Successfully created variable');
  
  }).catch(error=>{
  
  })
}



    const onCheckChange=(e)=>{
console.log(e.target.checked,'::',e.nativeEvent.srcElement.id);
if(e.target.checked){
setCheckedID(e.nativeEvent.srcElement.id);
}
else {
  setCheckedID(null);
}
    }


    const submitCreateVariables=(e)=>{
console.log('e:',e, 'region:', regionValue, 'country', countryValue);
createVariables();
    }

    const  onChangeVariableTypeSelect=(e)=>{
      console.log('e:',e);
      setselectedVariableType(e);
      getVariableNames(e);
          }

          const getVariableNames=(e)=>{
            let url=window.config.CG_CONFIG_FETCH_VARIABLES+''+e;
            axios({url:url, method:'GET'}).then(resp=>{
console.log('variables list: ',resp);
let variableNamesVar=[];
resp.data.variableData.forEach(item=>{
  variableNamesVar.push({label:item.variable_desc, value: item.variable_desc, key:Math.random()});
})
variableNamesVar=_.uniqBy(variableNamesVar, 'label');
setvariableNamesDropdown(variableNamesVar)
            }).catch(e=>{
              console.log('e:',e);
            })
          }

          const  onChangeVariableChangedTypeSelect=(e)=>{
            console.log('e:',e);
            setchangedVariableType(e);
                }
      
          const onChangeVariableUnitSelect=(e)=>{
      setvariableUnit(e);
      
          }
      
          const onChangeVariableName=(e)=>{
            setVariableName(e)
          }


          const onChangeLinkedPointTypeSelect=(e)=>{
            setlinkedPointType(e);
          }
    return (
        
              
                <Layout
                    className='configIndividualLayoutClass'
                >

<div style={{display:'flex'}}>

<div style={{display:'flex'}}>
<div style={{width:'35%'}}>Variable Type<br/>
<Select className="configVariableTypeSelect" popupMatchSelectWidth={true}  options={[{label:'equipment variable', value:'equipmentvariable'},{label:'building variable', value:'buildingvariable'},{label:'campus variable', value:'campusvariable'},{label:'city variable', value:'cityvariable'},{label:'country variable', value:'countryvariable'},{label:'region variable', value:'regionvariable'}]} onChange={e=>onChangeVariableTypeSelect(e)}/>


{/* 
  {countryvariable
regionvariable} */}

{checkedID0?<Input type='text' onChange={e => onChangeTextValues(e, 0)} value={pointTypeSelectionText} />:''}
</div>
<div style={{width:'35%'}}>Variable Name
{/* <Input type="text" onChange={e=>onChangeVariableName(e)}/> */}

<Select className="configVariableTypeSelect" mode="multiple"
          allowClear popupMatchSelectWidth={true}  options={variableNamesDropdown} onChange={e=>onChangeVariableName(e)}/>
</div>

<div style={{width:'35%'}}>Changed Variable Type<br/>
<Select className="configVariableTypeSelect" popupMatchSelectWidth={true}  options={[{label:'equipment variable', value:'equipmentvariable'},{label:'building variable', value:'buildingvariable'},{label:'campus variable', value:'campusvariable'},{label:'city variable', value:'cityvariable'},{label:'country variable', value:'countryvariable'},{label:'region variable', value:'regionvariable'}]} onChange={e=>onChangeVariableChangedTypeSelect(e)}/>

{checkedID0?<Input type='text' onChange={e => onChangeTextValues(e, 0)} value={pointTypeSelectionText} />:''}
</div>
<div  style={{width:'35%'}}>Select Unit<br/>
<Select className="configVariableUnitSelect" popupMatchSelectWidth={true}  options={[{label:'Celcius', value:'celcius'},{label:'KG', value:'kg'},{label:'Mg', value:'mg'}]}  onChange={e=>onChangeVariableUnitSelect(e)}/>

{checkedID1?<Input type='text' onChange={e => onChangeTextValues(e, 1)} value={pointUnitSelectionText} />:''}
  </div></div>

  <div  style={{width:'35%'}}>Select Linked Point Type<br/>
<Select className="configVariableUnitSelect" popupMatchSelectWidth={true}  options={[{label:'Analog', value:'analog'},{label:'Digital', value:'digital'},{label:'Boolean', value:'boolean'}]}  onChange={e=>onChangeLinkedPointTypeSelect(e)}/>

{checkedID1?<Input type='text' onChange={e => onChangeTextValues(e, 1)} value={pointUnitSelectionText} />:''}
  </div>
              </div>
              {/* <div className="textInputWrapper" style={{display:'flex'}}> 
                {['0','1','2','3','4'].map(item=> (item==checkedID) ?<Input type='text' value={item==0?regionValue:item==1?countryValue:item==2?cityValue:item==3?campusValue:item==4?buildingValue:''} onChange={item==0?setRegionValue:item==1?setCountryValue:item==2?setCityValue:item==3?setCampusValue:item==4?setBuildingValue:''} />:<Input type='text' disabled/>)}
                </div> */}
                    <Button disabled={linkedPointType==''|| variableName==''|| variableUnit=='' || selectedVariableType==''} onClick={e=>submitCreateVariables(e)}>Submit</Button>
                </Layout>
       
    );
};
export default App;