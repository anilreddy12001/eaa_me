import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input,Form,Button, InputNumber, Checkbox, Select, message } from 'antd';
const { Header, Content, Sider } = Layout;
import "./index.css";
import _ from 'lodash';
import { createRoot } from "react-dom/client";


const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [checkedID0,setCheckedID0]= useState(null);
  const [checkedID1,setCheckedID1]= useState(null);

  const [selectedEquipments, setSelectedEquipments]=useState([]);
  const [selectedAssociatedEquipments, setSelectedAssociatedEquipments]=useState([]);

  const [dropdownList, setDropdownList]=useState([]);
  const [count, setCount]=useState([]);
  const [globalEquipData,setGlobalEquipData]=useState([]);
  const [associatedEquipmentTypes,setAssociatedEquipmentTypes]=useState([]);
  const [equipmentTypes,setEquipmentTypes]=useState([]);

  
  const [pointTypeSelectionText, setPointTypeSelectionText]=useState('');
  const [pointUnitSelectionText, setPointUnitSelectionText]=useState('');
  const [pointDesc, setPointDesc]=useState('');
    useEffect(() => {
       // getEquipments();
        getAssociatedEquipmentDetails();
    }, []);

    const getAssociatedEquipmentDetails=()=>{
      

       
      axios({
        method: 'GET', url: window.config.CG_CONFIG_CREATE_POINT_ASS_EQP, headers: { "Content-Type": "application/json" }
  
      }).then(response => {
        console.log('response:',response);

        
        let equipmentTypes=[];
        let associatedEquipmentTypes=[];
        response.data.equipmentData.forEach(item => {
          equipmentTypes.push({label:item.equipmentType, value:item.equipmentId})
item.associatedEquipments&&item.associatedEquipments.forEach(item2=>{associatedEquipmentTypes.push({label: item2.associatedEquipType, value:item2.associatedEquipId})
window[item2.associatedEquipId]=item.equipmentId;
});
        })
        
        associatedEquipmentTypes=_.uniqBy(associatedEquipmentTypes, 'value');
        setGlobalEquipData(response.data);
        console.log("associatedEquipmentTypes:",associatedEquipmentTypes);
        setEquipmentTypes(equipmentTypes);
        setAssociatedEquipmentTypes(associatedEquipmentTypes);
       

      }).catch(e=>{
console.log('error:', e);
      })
    }
    
   
  
    
    // const dropdownList = [{ title: 'equipmentType', name: 'EquipmentType', options: equipmentTypes }, { title: 'associatedEquipmentType', name: 'associatedEquipmentType', options: associatedEquipmentTypes }];

    document.title = 'Configuration Tool';
const createPoint = () => {

  let payload={
    "pointDesc": pointDesc,
    "pointType": pointTypeSelectionText,
    "pointSiUnit": pointUnitSelectionText,
    "pointTypeFlag": checkedID0?true:false,
    "pointSiUnitFlag": checkedID1?true:false,
    "equipmentData": {
    }
  }
  payload.equipmentData[window[selectedAssociatedEquipments[0]]]=selectedAssociatedEquipments
  ////      "ETID-4": ["AETID-401", "AETID-402"],
 //     "ETID-2": ["AETID-201", "AETID-202"]
  //payload:
  // {
  //   "equipment_types": ["AHU", "CAV"],
  //   "associated_equip_types": ["test1", "test2"],
  //   "ass_equi_count": [1, 5]
  // }
  //::

  // let payload={"equipment_types": selectedEquipments,
  //   "associated_equip_types":selectedAssociatedEquipments,
  //   "ass_equi_count":[]
  // };
  
  axios({url:window.config.CG_CONFIG_CREATE_POINTS,method:'POST', data:payload}).then(response=>{
  console.log('response: ',response);
  message.success('Successfully created point');
  }).catch(error=>{
  console.log('e:', error);
  message.error('Failed to create point');
  })
}
    


    const onSearch = (e) => {
      console.log('e:', e);
      setIsDropdownOpen(true);
    }

    const onChange=(e,i)=>{
console.log('e:',e, 'i:',i);
console.log('globalEquipData: ',globalEquipData);
if(i==0){
setSelectedEquipments(e);

let associatedEquipmentsArray=[];
globalEquipData.equipmentData.forEach(item1=>{if(e==item1.equipmentId){item1.associatedEquipments.forEach(item2=>{associatedEquipmentsArray.push({label:item2.associatedEquipType, value:item2.associatedEquipId})})}});
console.log('associatedEquipmentsArray:',associatedEquipmentsArray);

setAssociatedEquipmentTypes(associatedEquipmentsArray);
setSelectedEquipments(e);
}
else if(i==1){


  setSelectedAssociatedEquipments(e);
  // {
  //   "equipment_types": ["AHU", "CAV"],
  //   "associated_equip_types": ["test1", "test2"],
  //   "ass_equi_count": [1, 5]
  // }
}

console.log('event:',e,i)
    }

    const onCheckChange=(e)=>{
console.log(e.target.checked,'::',e.nativeEvent.srcElement.id);
if(e.target.checked &&e.nativeEvent.srcElement.id==0){
setCheckedID0(true)
}
else if(e.target.checked && e.nativeEvent.srcElement.id==1){
setCheckedID1(true);
}
else if( e.nativeEvent.srcElement.id==0){
  setCheckedID0(false);
}
else if( e.nativeEvent.srcElement.id==1){
  setCheckedID1(false);
}    }


    const submitCreatePoint=(e)=>{

      createPoint();
    }


 

    const onChangeTextValues=(e, i)=>{
      console.log('e: ',e);
if(i==0){
  setPointTypeSelectionText(e.target.value)
}
else if(i==1){
setPointUnitSelectionText(e.target.value)
}
    }

    const  onChangePointTypeSelect=(e)=>{
console.log('e:',e);
setPointTypeSelectionText(e);
    }

    const onChangePointUnitSelect=(e)=>{
setPointUnitSelectionText(e);

    }

    const onChangePointName=(e)=>{
      setPointDesc(e.target.value)
    }

    return (
        
              
                <Layout
                    className='configIndividualLayoutClass'
                >
<div style={{display:'flex'}}><div style={{width:'35%'}}>Point Name
<Input type="text" onChange={e=>onChangePointName(e)}/>
</div>
<div style={{width:'35%'}}>Point Type<br/>
<Select className="configPointTypeSelect" popupMatchSelectWidth={true}  options={[{label:'Analog', value:'analog'},{label:'Digital', value:'digital'},{label:'Boolean', value:'boolean'}]} onChange={e=>onChangePointTypeSelect(e)}/>
<Checkbox key={0} id={0} onChange={onCheckChange} className={'check'} />
{checkedID0?<Input type='text' onChange={e => onChangeTextValues(e, 0)} value={pointTypeSelectionText} />:''}
</div>
<div  style={{width:'35%'}}>Select Unit<br/>
<Select className="configPointUnitSelect" popupMatchSelectWidth={true}  options={[{label:'Celcius', value:'celcius'},{label:'KG', value:'kg'},{label:'Mg', value:'mg'}]}  onChange={e=>onChangePointUnitSelect(e)}/>
<Checkbox key={1} id={1} onChange={onCheckChange} className={'check'} />
{checkedID1?<Input type='text' onChange={e => onChangeTextValues(e, 1)} value={pointUnitSelectionText} />:''}
  </div></div>
<div style={{display:'flex'}}>


               {/* <div>Equipment Type<Select mode="multiple"
      allowClear className="createLocationDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
      
    
              style={{ width: '100%', borderRadius: '4px' }}  key="0" id="0" showSearch={true} title="Equipment Type"
              dropdownStyle={{
                border: '1px solid #50bc3d',
                backgroundColor: '#000000', color: '#ffffff'
              }} placeholder={'Please select'} options={equipmentTypes} onChange={e=>onChange(e,0)}
              onSearch={onSearch} optionFilterProp="label"            
               /> </div> */}

<div>Associated Equipment Type<Select mode="multiple"
      allowClear className="createLocationDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
      // Dynamically control dropdown open state
              style={{ width: '100%', borderRadius: '4px' }}  key="1" id="1" showSearch={true} title="Associated Equipment Types"
              dropdownStyle={{
                border: '1px solid #50bc3d',
                backgroundColor: '#000000', color: '#ffffff'
              }} placeholder={'Please select'} options={associatedEquipmentTypes} onChange={e=>onChange(e,1)}
              onSearch={onSearch} optionFilterProp="label"            
               /> </div>

              </div>

              
              
                <Button disabled={selectedAssociatedEquipments.length==0 || pointUnitSelectionText=='' ||pointTypeSelectionText=='' || pointDesc=='' } onClick={e=>submitCreatePoint(e)}>Submit</Button>
                </Layout>
       
    );
};
export default App;