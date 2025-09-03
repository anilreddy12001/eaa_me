import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input,Form,Button, InputNumber, Select, message , Modal} from 'antd';
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
const deleteProjectApp = (props) => {
  console.log('props inside delete project:', props);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [time, setTime] = useState(() => new Date().toLocaleTimeString());

    const [clickedLink, setClickedLink] = useState('');
    const [current, setCurrent] = useState('mail');
    const [projectOptions,setProjectOptions]=useState([]);
const [selectedProjectId, setSelectedProjectId]=useState([]);
const[selectedVariableType, setselectedVariableType]=useState('');
const [variableNamesDropdown,setvariableNamesDropdown]=useState([]);
const [variableName,setVariableName]=useState([]);
const [modalOpen,setModalOpen]=useState(false);
    useEffect(() => {
      //getProjectData();
       
    }, []);

    
    const getVariableNames=(e)=>{
      let url=window.config.CG_CONFIG_FETCH_VARIABLES+''+e;
      axios({url:url, method:'GET'}).then(resp=>{
console.log('variables list: ',resp);
let variableNamesVar=[];
resp.data.variableData.forEach(item=>{
variableNamesVar.push({label:item.variable_desc, value: item.variable_desc,  key:Math.random()});
})
variableNamesVar=_.uniqBy(variableNamesVar, 'label');
setvariableNamesDropdown(variableNamesVar)
      }).catch(e=>{
        console.log('e:',e);
      })
    }

const  onChangeVariableTypeSelect=(e)=>{
  console.log('e:',e);
  setselectedVariableType(e);
  getVariableNames(e);
      }




    const headerList = [
        // { name: 'HOME' }, { name: 'PROJECT' }, { name: 'LOCATION' }, { name: 'EQUIPMENT' }, { name: 'POINTS' }, { name: 'VARIABLES' }, { name: '' }
    ]
    document.title = 'Configuration Tool';

  
    const onFinishDeleteVariables = (values) => {
      console.log(values);
window.values=values;
      setModalOpen(true);

    };
    const onSubmit=(values)=>{
      submitFunction(values,'deleteVariable');
    }
  
    const submitFunction = (e, type) => {
      console.log('e inside submit function:', e);
  if(type=='deleteVariable'){
      
      axios({
        method: 'DELETE', url: window.config.CG_CONFIG_DELETE_VARIABLES, data: { variableName: variableName, variableTye: selectedVariableType}
      }).then(response => {
        console.log('Submit delete variable response:', response);
        message.success('Variable deleted successfully');
        props.setRefreshFlagFn('deleteVariable'+e);
        //onClickOfLinks('deleteProject');
        //fetching list of variables upon successful deletion:
        
  
    }).catch(e => {
      message.error('Failed to delete variable');
      console.log('error:', e);
    })
  }
    }

    const onChangeVariableName=(value)=>{
      setVariableName(value);
    }

    const handleOk=()=>{
setModalOpen(false);
onSubmit(window.values);
    }
    const handleCancel=()=>{
      setModalOpen(false);
    }

    

    return (
        <Layout className='configIndividualLayoutClass'>
          <Modal className='projectDeleteModal' open={modalOpen} width={'auto'}  onOk={handleOk} onCancel={handleCancel} centered >Are you sure you want to delete the variable?</Modal>

          <div style={{width:'35%',marginLeft: '26%'}}>Variable Type
{/* <Input type="text" onChange={e=>onChangeVariableName(e)}/> */}

<Select className="configVariableTypeSelect" 
           popupMatchSelectWidth={true}  options={[{label:'equipment variable', value:'equipmentvariable'},{label:'building variable', value:'buildingvariable'},{label:'campus variable', value:'campusvariable'},{label:'city variable', value:'cityvariable'},{label:'country variable', value:'countryvariable'},{label:'region variable', value:'regionvariable'}]} onChange={e=>onChangeVariableTypeSelect(e)}/>
</div>
                        <Form
                {...layout} 
                onFinish={onFinishDeleteVariables}
                style={{
                  maxWidth: 600,
                  marginTop: '10px'
                }}
                validateMessages={validateMessages}
              >
                
                <Form.Item label="Select Variable Name" name={['variable', 'id']}>
            <Select  mode="multiple" allowClear options={variableNamesDropdown} showSearch={true} onChange= {onChangeVariableName} optionFilterProp="label" className='projectDropdown'  dropdownStyle={{
                border: '1px solid #50bc3d',
                backgroundColor: '#ffffff', color: '#000000'
              }}>
            
            </Select>
          </Form.Item>
  
              
                <Form.Item label={null}>
                  
                  <Button type="primary" htmlType="submit">
                    Delete
                  </Button>
                </Form.Item>
              </Form>
        </Layout>
    );
};
export default deleteProjectApp;