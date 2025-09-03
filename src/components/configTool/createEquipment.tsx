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
const App = (props) => {
  console.log('props:', props, 'window.projectData:',window.projectData);
  
  
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [checkedID,setCheckedID]= useState(null);
  const [selectedEquipments, setSelectedEquipments]=useState([]);
  const [selectedAssociatedEquipments, setSelectedAssociatedEquipments]=useState([]);
  //specific to add equipment(right click):
  const [selectedEquipment, setSelectedEquipment]=useState([]);
  const [selectedAssociatedEquipment, setSelectedAssociatedEquipment]=useState([]);

  const [dropdownList, setDropdownList]=useState([]);
  const [count, setCount]=useState([]);
    useEffect(() => {
        getEquipments();
    }, []);
    const getEquipments=()=>{
   
      
      axios({
        method: 'GET', url: window.config.CG_CONFIG_GET_EQUIPMENTS_ASSOCIATED_EQUIPMENT_DETAILS, headers: { "Content-Type": "application/json" }
  
      }).then(response => {
        
        console.log('response: ', response);
        let associatedEquipmentTypes=[];
        let equipmentTypes=[];
        //Adding both type and id of equipments and associated equipments:
        response.data.associated_equipment_types.forEach(item => {

associatedEquipmentTypes.push({label:item.type, value:item.type+'::'+item.id});
         
        });
        //setAssociatedEquipmentTypes(associatedEquipmentTypes);
        response.data.equipment_types.forEach(item=>{
          equipmentTypes.push({label:item.type, value:item.type+'::'+item.id})
        })
        //setEquipmentTypes(equipmentTypes);

        setDropdownList([{ title: 'equipmentType', name: 'Equipment Type', options: equipmentTypes }, { title: 'associatedEquipmentType', name: 'Associated Equipment Type', options: associatedEquipmentTypes }]);

        //var equipmentListOptions =equipmentTypes.map(item=>{return { label: item, value: item}});
      }).catch(e => {
        
        // message.error('Network Error');
        //locationList.push({region:'APAC',country:'India',city:'Bangalore',campus:'epip',building:'SEZ'});
        //locationList = dropdownOptionsBackup;
        // locationList.unshift({ region: 'ALL', country: 'ALL', city: 'ALL', campus: 'ALL', building: 'ALL' });
        setDropdownList([]);
        console.log('e:', e)
      });
    }
   
  
    
    // const dropdownList = [{ title: 'equipmentType', name: 'EquipmentType', options: equipmentTypes }, { title: 'associatedEquipmentType', name: 'associatedEquipmentType', options: associatedEquipmentTypes }];

    document.title = 'Configuration Tool';
const createEquipment = () => {

  //payload:
  // {
  //   "equipment_types": ["AHU", "CAV"],
  //   "associated_equip_types": ["test1", "test2"],
  //   "ass_equi_count": [1, 5]
  // }
  //::
  var selectedAssociatedEquipmentsVar=[];
  selectedAssociatedEquipments.forEach(item=>{
selectedAssociatedEquipmentsVar.push(item.split('::')[0])

  })

  var selectedEquipmentsVar=[];
  selectedEquipments.forEach(item=>{
    selectedEquipmentsVar.push(item.split('::')[0])

  })

  let payload={"equipment_types": selectedEquipmentsVar,
    "associated_equip_types":selectedAssociatedEquipmentsVar,
    "ass_equi_count":[]
  };
  count&&count.length>0&&count.forEach(item=>{
    payload.ass_equi_count.push(parseFloat(item.count));
  })



  axios({url:window.config.CG_CONFIG_CREATE_EQUIPMENT,method:'POST', data:payload}).then(response=>{
  console.log('response: ',response);
  message.success('Successfully Created Equipment');
  }).catch(error=>{
    message.error('Unable to create Equipment');
  })
}

const addEquipmentTree=()=>{

  console.log('equipments: ',selectedEquipments, 'associated equipments:',selectedAssociatedEquipments, "projectDetails:",window.projectData)
  let projectDetails={};
  if(window.projectData && window.projectData.length>0){
    
    window.projectData.forEach(item=>{
      console.log('item:',item);
      if(item.project_name==window.selectedProjectName){
projectDetails=item;        
      }
    })

  }


  let payload=
    {
      "equipmentId": selectedEquipment.split('::')[1],
      "equipmentName": selectedEquipment.split('::')[0],//"Equipment 4",//selectedEquipments
      "associatedEquipId": selectedAssociatedEquipment.split('::')[1],//"AEID-104",//selectedAssociatedEquipments
      "associatedEquipDesc": selectedAssociatedEquipment.split('::')[0],//"Associated Equipment 4",
      "projectId": projectDetails.project_id,
      "projlocId": props.selectedNodeFromTree.location_id
    };
  
  axios({url:window.config.CG_CONFIG_ADD_EQUIPMENT_TREE,method:'POST', data:payload}).then(response=>{
    console.log('response: ',response);
    
    props.setRefreshFlagFn('addEquipment'+Math.random());
    message.success('Successfully Added Equipment');
    }).catch(e=>{
      console.log('error:', e);
      message.error('Unable to Add Equipment');
      
    })
}

/*{
  "equipmentId": "EID-13",
  "equipmentName": "Equipment 4",
  "associatedEquipId": "AEID-104",
  "associatedEquipDesc": "Associated Equipment 4",
  "projectId": "11",
  "projlocId": "107"
}*/
    


    const onSearch = (e) => {
      console.log('e:', e);
      setIsDropdownOpen(true);
    }

    const onChangeAddEquipment=(e,i)=>{
      console.log('e:',e, 'i:',i);

      if(i==0){
      setSelectedEquipment(e);
      }
      else if(i==1){
     setSelectedAssociatedEquipment(e);
     
      }
      
      console.log('event:',e,i,"window.projectData", window.projectData)

    }
    const onChange=(e,i)=>{
console.log('e:',e, 'i:',i);

if(i==0){
setSelectedEquipments(e);
}
else if(i==1){
let associatedEquipmentsArray=[];
associatedEquipmentsArray=e.forEach(item1=>{console.log( {name:item1, count:''})});
  setSelectedAssociatedEquipments(e);
  console.log('selectedAssociatedEquipments:',selectedAssociatedEquipments);

  let countArray=[];
selectedAssociatedEquipments.forEach(item1=>{
  countArray.push({name:item1,count:window[item1]})
})
console.log('countarray:',countArray);
setCount(countArray);
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
if(e.target.checked){
setCheckedID(e.nativeEvent.srcElement.id);
}
else {
  setCheckedID(null);
}
    }


    const submitCreateEquipment=(e)=>{

createEquipment();
    }


    const updateCount=(e, item)=>{
console.log('e:',e,'item:',item);
window[item]=e.target.value;

let countArray=[];
selectedAssociatedEquipments.forEach(item1=>{if(item1==item){
  countArray.push({name:item1, count:e.target.value});
}else{
  countArray.push({name:item1,count:window[item1]})
}})

setCount(countArray);
console.log("countArray:",countArray);
console.log('selected associated equipments:',selectedAssociatedEquipments);
    }

    return (
        
              
                <Layout
                    className='configIndividualLayoutClass'
                >
<div>{props.selectedNodeFromTree &&props.selectedNodeFromTree.location_id?"Selected Project Location ID: "+props.selectedNodeFromTree.location_id:""}</div>
<div style={{display:'flex'}}>

{(props.selectedNodeFromTree &&props.selectedNodeFromTree.location_id)?dropdownList.map((item, i) => ( <><div>{item.name}<Select  className="createLocationDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
      // Dynamically control dropdown open state
              style={{ width: '100%', borderRadius: '4px' }}  key={i} id={item.name} showSearch={true} title={item.title}
              dropdownStyle={{
                border: '1px solid #50bc3d',
                backgroundColor: '#000000', color: '#ffffff'
              }} placeholder={'Please select'} options={item.options} onChange={e=>onChangeAddEquipment(e,i)}
              onSearch={onSearch} optionFilterProp="label"            
               /> </div></>)):
               dropdownList.map((item, i) => ( <><div>{item.name}<Select mode="multiple"
                allowClear className="createLocationDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
                // Dynamically control dropdown open state
                        style={{ width: '100%', borderRadius: '4px' }}  key={i} id={item.name} showSearch={true} title={item.title}
                        dropdownStyle={{
                          border: '1px solid #50bc3d',
                          backgroundColor: '#000000', color: '#ffffff'
                        }} placeholder={'Please select'} options={item.options} onChange={e=>onChange(e,i)}
                        onSearch={onSearch} optionFilterProp="label"            
                         /> </div></>))
            }



              </div>

              <div >
                {/* {selectedEquipments.map(item=>{return <div>{item}</div>})} */}

                {(props.selectedNodeFromTree &&props.selectedNodeFromTree.location_id)?<></>:selectedAssociatedEquipments.map(item=>{return <div style={{display:'flex',flexBasis:'40%'}}><div style={{width: '80%'}}>{item}</div><Input type='number' onChange={e=>updateCount(e, item)}/></div>})}
              </div>
              {(props.selectedNodeFromTree &&props.selectedNodeFromTree.location_id)?<Button disabled={selectedAssociatedEquipment.length==0 || selectedEquipment.length==0 } onClick={e=>addEquipmentTree(e)}>Submit</Button>:
                <Button disabled={selectedAssociatedEquipments.length==0 || selectedEquipments.length==0 || count.forEach(item=>{return(item.count==0 || item.count==null)})} onClick={e=>submitCreateEquipment(e)}>Submit</Button>}
                </Layout>
       
    );
};
export default App;