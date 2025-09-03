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

  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [checkedID0, setCheckedID0] = useState(null);
  const [checkedID1, setCheckedID1] = useState(null);

  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [selectedAssociatedEquipments, setSelectedAssociatedEquipments] = useState([]);

  const [dropdownList, setDropdownList] = useState([]);
  const [count, setCount] = useState([]);
  const [globalEquipData, setGlobalEquipData] = useState([]);
  const [associatedEquipmentTypes, setAssociatedEquipmentTypes] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);


  const [pointTypeSelectionText, setPointTypeSelectionText] = useState('');
  const [pointUnitSelectionText, setPointUnitSelectionText] = useState('');
  const [pointDesc, setPointDesc] = useState('');
  const [pointId, setpointId] = useState('');
  
  const [formData, setFormData] = useState([]);
  const [pointDescDropdownData, setPointDescDropdownData] = useState([]);
  const [pointsData,setPointsData]= useState([]);
const [mappedAssociatedEquipments,setMappedAssociatedEquipments]=useState([]);
const [pointTypeDropdown, setpointTypeDropdown]=useState([]);
const [pointUnitDropdown,setpointUnitDropdown]=useState([]);
  useEffect(() => {
    fetchPointsForEdit();
    fetchPointsTypeAndUnitDropdowns();
   // getAssociatedEquipmentDetails();

  }, []);

  const fetchPointsTypeAndUnitDropdowns=()=>{
    axios({
      method: 'GET', url: window.config.CG_CONFIG_FETCH_POINTS_TYPE_UNIT, data:{pointIds:window.pointsData}, headers: { "Content-Type": "application/json" }

    }).then(response => {
      console.log('response:', response);

let pointTypes=[];
response.data.point_type&&response.data.point_type.forEach(item=>{
  pointTypes.push({label:item, value:item});
});
let pointUnits=[];
response.data.point_unit&&response.data.point_unit.forEach(item=>{
  pointUnits.push({label:item, value:item});
});

setpointTypeDropdown(pointTypes);
setpointUnitDropdown(pointUnits);


    }).catch(e => {
      console.log('error:', e);
    })
  }


  /*
  {
  "pointIds": ["PID-78"],
  "equipmentData": [
    {
      "equipmentId": "EID-9",
      "associatedEquipIds": ["AEID-901", "AEID-902"]
    }
  ],
  "pointType": "Pressure",
  "pointUnit": "newton"
}
  */
  const getAssociatedEquipmentDetails = () => {
console.log('pointsData:',pointsData);


    axios({
      method: 'POST', url: window.config.CG_CONFIG_ASS_EQP_MAPPING, data:{pointIds:window.pointsData}, headers: { "Content-Type": "application/json" }

    }).then(response => {
      console.log('response:', response);


      let equipmentTypes = [];
      let associatedEquipmentTypes=[];
      response.data.forEach(item => {
        equipmentTypes.push({ label: item.equipment_id, value: item.equipment_id });
        associatedEquipmentTypes.push({key:Math.random(),label:item.associated_equip_type, value:item.associated_equip_id+'::'+item.equipment_id});
      })
      setGlobalEquipData(response.data);
      setAssociatedEquipmentTypes(_.uniqBy(associatedEquipmentTypes, 'label'));
      setEquipmentTypes(_.uniqBy(equipmentTypes, 'label'));
      console.log('equipmentTypes:',equipmentTypes);

    }).catch(e => {
      console.log('error:', e);
    })
  }


  // const dropdownList = [{ title: 'equipmentType', name: 'EquipmentType', options: equipmentTypes }, { title: 'associatedEquipmentType', name: 'associatedEquipmentType', options: associatedEquipmentTypes }];

  document.title = 'Configuration Tool';
  const editPoint = () => {
console.log('selectedEquipments:', selectedEquipments, ' mappedAssociatedEquipments:',mappedAssociatedEquipments);
var equipmentDataVar=[];
// {
//   equipmentId: selectedEquipments
//   associatedEquipIds: mappedAssociatedEquipments

// };
selectedEquipments.forEach((item,i)=>{
  equipmentDataVar.push({equipmentId:item, associatedEquipIds:[mappedAssociatedEquipments[i].split("::")[0]]});
})

    let payload = {
      "pointIds": pointId,
      "pointType": pointTypeSelectionText,
      "pointUnit": pointUnitSelectionText,
      
      "equipmentData": 
        equipmentDataVar
      
    }
//setMappedAssociatedEquipments
    // {
    //   "pointIds": ["PTID-10", "PTID-17"],
    //   "equipmentData": [
    //     {
    //       "equipmentId": "ETID-1",
    //       "associatedEquipIds": ["AETID-101", "AETID-102"]
    //     }
    //   ],
    //   "pointType": "Analog",
    //   "pointUnit": "Celsius"
    // }

    axios({ url: window.config.CG_CONFIG_EDIT_POINTS, method: 'PUT', data: payload }).then(response => {
      console.log('response: ', response);
      message.success('Successfully edited point');
    }).catch(error => {
      console.log('e:', error)
    })
  }



  const onSearch = (e) => {
    console.log('e:', e);
    setIsDropdownOpen(true);
  }

  const onChange = (e, i) => {

    console.log('globalEquipData: ', globalEquipData);
    if (i == 0) {
      setSelectedEquipments(e);

      let associatedEquipmentsArray = [];
      let associatedEquipmentsList=[];
      globalEquipData.forEach(item1 => { if (e == item1.equipment_id) {
        if(item1.is_mapped==true){associatedEquipmentsList.push(item1.associated_equip_id);}
         associatedEquipmentsArray.push({ label: item1.associated_equip_id, value: item1.associated_equip_id }) } });
      console.log('associatedEquipmentsArray:', associatedEquipmentsArray);

      setAssociatedEquipmentTypes(_.uniqBy(associatedEquipmentsArray,'value'));
      setSelectedEquipments(e);
      console.log('associatedEquipmentsList:',associatedEquipmentsList);
      setMappedAssociatedEquipments(_.uniqBy(associatedEquipmentsList));
    }
    else if (i == 1) {
console.log('selected associated equipment:',e);
      setSelectedAssociatedEquipments(e);
      console.log('e:', e);
      
let equipmentsListVar=[];
let associatedEquipmentsVar=[];
      e.forEach(item=> {
        equipmentsListVar.push(item.split('::')[1]);
        associatedEquipmentsVar.push(item.split('::')[0]);

      });
      console.log('equipmentsListVar:',equipmentsListVar);
      setSelectedEquipments(equipmentsListVar);
      //setMappedAssociatedEquipments(associatedEquipmentsVar);
      setMappedAssociatedEquipments(e);
      // {
      //   "equipment_types": ["AHU", "CAV"],
      //   "associated_equip_types": ["test1", "test2"],
      //   "ass_equi_count": [1, 5]
      // }
    }

    console.log('event:', e, i)
  }

  const onCheckChange = (e) => {
    console.log(e.target.checked, '::', e.nativeEvent.srcElement.id);
    if (e.target.checked && e.nativeEvent.srcElement.id == 0) {
      setCheckedID0(true)
    }
    else if (e.target.checked && e.nativeEvent.srcElement.id == 1) {
      setCheckedID1(true);
    }
    else if (e.nativeEvent.srcElement.id == 0) {
      setCheckedID0(false);
    }
    else if (e.nativeEvent.srcElement.id == 1) {
      setCheckedID1(false);
    }
  }


  const submiteditPoint = (e) => {

    editPoint();
  }


  const updateCount = (e, item) => {
    console.log('e:', e, 'item:', item);
    window[item] = e.target.value;
    selectedAssociatedEquipments
    let countArray = [];
    selectedAssociatedEquipments.forEach(item1 => {
      if (item1 == item) {
        countArray.push({ name: item1, count: e.target.value });
      } else {
        countArray.push({ name: item1, count: window[item1] })
      }
    })

    setCount(countArray);
    console.log("countArray:", countArray);
    console.log('selected associated equipments:', selectedAssociatedEquipments);
  }

  const onChangeTextValues = (e, i) => {
    console.log('e: ', e);
    if (i == 0) {
      setPointTypeSelectionText(e.target.value)
    }
    else if (i == 1) {
      setPointUnitSelectionText(e.target.value)
    }
  }

  const onChangePointTypeSelect = (e) => {
    console.log('e:', e);
    setPointTypeSelectionText(e);
  }

  const onChangePointUnitSelect = (e) => {
    setPointUnitSelectionText(e);

  }

  const onChangePointName = (e) => {
    setPointDesc(e.target.value)
  }
  const fetchPointsForEdit = () => {

    axios({ url: window.config.CG_CONFIG_FETCH_POINTS_FOR_EDIT, method: 'GET' }).then(response => {
      console.log('response: ', response);
      var pointsVar=response.data.pointData.map(item=>{return item.pointId})
      setPointsData(pointsVar);
      window.pointsData=pointsVar;
      setPointDescDropdownData(response.data.pointData.map(item =>  {return {label: item.pointDesc, value: item.pointId }}));
      getAssociatedEquipmentDetails();
    }).catch(error => {
      console.log('e:', error)
    })

  }
  const onChangePointDesc = (e) => {
    setPointDesc(e);
    setpointId(e);
  }

  return (
    <Layout
      className='configIndividualLayoutClass'
    >
      <div style={{ display: 'flex' }}>
        <div style={{ width: '35%' }}>Point Name
        {/* <Input type="text" onChange={e => onChangePointName(e)} /> */}


        <Select mode="multiple"
          allowClear className="createLocationDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
          // Dynamically control dropdown open state
          style={{ width: '100%', borderRadius: '4px' }} key="1" id="1" showSearch={true} onChange={e=>onChangePointDesc(e)} options={pointDescDropdownData} />
      </div>
        <div style={{ width: '35%' }}>Point Type<br />
          <Select className="configPointTypeSelect" popupMatchSelectWidth={true} options={pointTypeDropdown} onChange={e => onChangePointTypeSelect(e)} />
          {/* <Checkbox key={0} id={0} onChange={onCheckChange} className={'check'} /> */}
          {checkedID0 ? <Input type='text' onChange={e => onChangeTextValues(e, 0)} value={pointTypeSelectionText} /> : ''}
        </div>
        {/*[{ label: 'Celcius', value: 'celcius' }, { label: 'KG', value: 'kg' }, { label: 'Mg', value: 'mg' }]*/}
        {/*[{ label: 'Analog', value: 'analog' }, { label: 'Digital', value: 'digital' }, { label: 'Boolean', value: 'boolean' }]*/}
        <div style={{ width: '35%' }}>Select Unit<br />
          <Select className="configPointUnitSelect" popupMatchSelectWidth={true} options={pointUnitDropdown} onChange={e => onChangePointUnitSelect(e)} />
          {/* <Checkbox key={1} id={1} onChange={onCheckChange} className={'check'} /> */}
          {checkedID1 ? <Input type='text' onChange={e => onChangeTextValues(e, 1)} value={pointUnitSelectionText} /> : ''}
        </div></div>
      <div style={{ display: 'flex' }}>

{/* 
        <div>Equipment Type<Select mode="multiple"
          allowClear className="createLocationDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}


          style={{ width: '100%', borderRadius: '4px' }} key="0" id="0" showSearch={true} title="Equipment Type"
          dropdownStyle={{
            border: '1px solid #50bc3d',
            backgroundColor: '#000000', color: '#ffffff'
          }} placeholder={'Please select'} options={equipmentTypes} onChange={e => onChange(e, 0)}
          onSearch={onSearch} optionFilterProp="label"
        /> </div> */}

        <div>Associated Equipment Type <Select mode="multiple"
          allowClear={true} className="createLocationDropdowns" defaultValue={mappedAssociatedEquipments} popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={true} value={mappedAssociatedEquipments}
          // Dynamically control dropdown open state
          style={{ width: '100%', borderRadius: '4px' }} key="1" id="1" showSearch={true} title="Associated Equipment Types"
          dropdownStyle={{
            border: '1px solid #50bc3d',
            backgroundColor: '#000000', color: '#ffffff'
          }} placeholder={'Please select'} options={associatedEquipmentTypes} onChange={e => onChange(e, 1)}
          onSearch={onSearch} optionFilterProp="label"
        /> </div>

      </div>



      <Button disabled={selectedAssociatedEquipments.length == 0 || selectedEquipments.length == 0 || pointUnitSelectionText == '' || pointTypeSelectionText == '' || pointDesc == ''} onClick={e => submiteditPoint(e)}>Submit</Button>
    </Layout>

  );
};
export default App;