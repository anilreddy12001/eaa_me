import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input,Form,Button, InputNumber, Select , message} from 'antd';
const { Header, Content, Sider } = Layout;
import "./index.css";
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
    const [dropdownList, setDropdownList] = useState([]);
    const [selectedEquipments, setSelectedEquipments]=useState([]);
    const [selectedAssociatedEquipments, setSelectedAssociatedEquipments]=useState([]);
  
    const [count, setCount]=useState([]);
    useEffect(() => {
        getEquipmentList();
    }, []);
const getEquipmentList=()=>{
    axios({
      method: 'GET', url: window.config.CG_CONFIG_GET_EQUIPMENTS_ASSOCIATED_EQUIPMENT_DETAILS, headers: { "Content-Type": "application/json" }

    }).then(response => {
      
      console.log('response: ', response);
      let associatedEquipmentTypes=[];
      let equipmentTypes=[];
      response.data.associated_equipment_types.forEach(item => {

associatedEquipmentTypes.push({label:item.type, value:item.id});

       
      });
      //setAssociatedEquipmentTypes(associatedEquipmentTypes);
      response.data.equipment_types.forEach(item=>{
        equipmentTypes.push({label:item.type, value:item.type})
      })
      //setEquipmentTypes(equipmentTypes);

      setDropdownList([{ title: 'equipmentType', name: 'Equipment Type', options: equipmentTypes }]);

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


  

  const onSearch = (e) => {
    console.log('e:', e);
    setIsDropdownOpen(true);
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
    document.title = 'Configuration Tool';

    const submitDeleteEquipment=(e)=>{

      deleteEquipment();
          }

    const deleteEquipment = () => {

      // {
      //   "equipmentType": "AHU"
      // }
      let payload={
        "equipmentType": selectedEquipments
      }
      // count&&count.length>0&&count.forEach(item=>{
      //   payload.ass_equi_count.push(parseFloat(item.count));
      // })
      axios({url:window.config.CG_CONFIG_DELETE_EQUIPMENT,method:'DELETE', data:payload}).then(response=>{
      console.log('response: ',response);
      message.success('Successfully Deleted Equipment');
      }).catch(error=>{
      
      })
    }

    return (
        <Layout className='configIndividualLayoutClass'>
            <div>

{dropdownList.map((item, i) => ( <><div>{item.name}<Select mode="multiple"
allowClear className="deleteEquipmentDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
// Dynamically control dropdown open state
style={{ width: '100%', borderRadius: '4px' }}  key={i} id={item.name} showSearch={true} title={item.title}
dropdownStyle={{
border: '1px solid #50bc3d',
backgroundColor: '#000000', color: '#ffffff'
}} placeholder={'Please select'} options={item.options} onChange={e=>onChange(e,i)}
onSearch={onSearch} optionFilterProp="label"            
/> </div></>))}

</div>

{/* <div > */}
{/* {selectedEquipments.map(item=>{return <div>{item}</div>})} */}

{/* {selectedAssociatedEquipments.map(item=>{return <div style={{display:'flex',flexBasis:'40%'}}><div style={{width: '80%'}}>{item}</div><Input type='number' onChange={e=>updateCount(e, item)}/></div>})} */}
{/* </div> */}

<Button disabled={selectedEquipments.length==0} onClick={e=>submitDeleteEquipment(e)}>Submit</Button>
        </Layout>
    );
};
export default App;