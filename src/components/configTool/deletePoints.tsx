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
  const [pointId, setpointId] = useState([]);
  
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
  const getAssociatedEquipmentDetails = () => {
console.log('pointsData:',pointsData);


    axios({
      method: 'POST', url: window.config.CG_CONFIG_ASS_EQP_MAPPING, data:{pointIds:window.pointsData}, headers: { "Content-Type": "application/json" }

    }).then(response => {
      console.log('response:', response);


      let equipmentTypes = [];
      response.data.forEach(item => {
        equipmentTypes.push({ label: item.equipment_id, value: item.equipment_id })
        //associatedEquipmentTypes.push({label:item.equipmentId, value:item.associatedEquipments.map(item=>{item.associatedEquipId}).toString});
      })
      setGlobalEquipData(response.data);

      setEquipmentTypes(_.uniqBy(equipmentTypes,'value'));

    }).catch(e => {
      console.log('error:', e);
    })
  }


  // const dropdownList = [{ title: 'equipmentType', name: 'EquipmentType', options: equipmentTypes }, { title: 'associatedEquipmentType', name: 'associatedEquipmentType', options: associatedEquipmentTypes }];

  document.title = 'Configuration Tool';
  const deletePoint = () => {
    // {
    //   "pointIds" : ["PTID-20","PTID-22","PTID-24"]
    //  }
     
    let payload = {
      "pointIds": pointId,
            }
    

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

    axios({ url: window.config.CG_CONFIG_DELETE_POINTS, method: 'DELETE', data: payload }).then(response => {
      console.log('response: ', response);
      message.success('Successfully deleted point');
    }).catch(error => {
      console.log('e:', error)
    })
  }



  const onSearch = (e) => {
    console.log('e:', e);
    setIsDropdownOpen(true);
  }

  const onChange = (e, i) => {
    console.log('e:', e, 'i:', i);
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


      setSelectedAssociatedEquipments(e);
      setMappedAssociatedEquipments(e);
      // {
      //   "equipment_types": ["AHU", "CAV"],
      //   "associated_equip_types": ["test1", "test2"],
      //   "ass_equi_count": [1, 5]
      // }
    }

    console.log('event:', e, i)
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
        <div style={{ width: '35%' ,marginLeft: '32%'}}>Point Name
        {/* <Input type="text" onChange={e => onChangePointName(e)} /> */}


        <Select mode="multiple"
          allowClear className="createLocationDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
          // Dynamically control dropdown open state
          style={{ width: '100%', borderRadius: '4px' }} key="1" id="1" showSearch={true} onChange={e=>onChangePointDesc(e)} options={pointDescDropdownData} />
      </div>
        </div>
      <div style={{ display: 'flex' }}>


        

        {/* <div>Associated Equipment Type<Select mode="multiple"
          allowClear={true} className="createLocationDropdowns" defaultValue={mappedAssociatedEquipments} popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={true} value={mappedAssociatedEquipments}
          // Dynamically control dropdown open state
          style={{ width: '100%', borderRadius: '4px' }} key="1" id="1" showSearch={true} title="Associated Equipment Types"
          dropdownStyle={{
            border: '1px solid #50bc3d',
            backgroundColor: '#000000', color: '#ffffff'
          }} placeholder={'Please select'} options={associatedEquipmentTypes} onChange={e => onChange(e, 1)}
          onSearch={onSearch} optionFilterProp="label"
        /> </div> */}

      </div>



      <Button disabled={pointDesc == ''} onClick={e => deletePoint(e)}>Submit</Button>
    </Layout>

  );
};
export default App;