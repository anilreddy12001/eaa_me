import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input,Form,Button, InputNumber, Select, message , Modal} from 'antd';
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
const [modalOpen,setModalOpen]=useState(false);
    useEffect(() => {
      getProjectData();
       
    }, []);

    
const getProjectData=()=>{
  axios({
    method: 'GET', url: window.config.CG_GET_PROJECTS
  }).then(response => {
    console.log('get projects response', response);
    let options=[];
    response.data.map(item => {
     // options.push(item.projectName);
      options.push({
        label:item.projectName,
        value:item.projectId,
      });
    
    })
    setProjectOptions(options);
    
  }).catch(e => {
    console.log('error:', e);
  })
}

    const items = [
        {
            label: 'Configuration Tool',
            key: 'noLink',

        },
        {
            label: 'Project',
            key: 'project',
            icon: <SettingOutlined />,
            children: [
                {
                    label: 'Create',
                    key: 'createProject',
                },
                {
                    label: 'Edit',
                    key: 'editProject',
                },

            ],
        },
        {
            label: 'Location',
            key: 'location',

        },
        {
            label: 'Equipment',
            key: 'equipment',

        },
        {
            label: 'Points',
            key: 'points',

        },
        {
            label: 'Variables',
            key: 'variables',

        },
        {
            label: 'DM',
            key: 'dm',

        },
        {
            label: 'UM',
            key: 'um',

        },
        {
            label: 'Report',
            key: 'report'
        },


    ];

    const headerList = [
        // { name: 'HOME' }, { name: 'PROJECT' }, { name: 'LOCATION' }, { name: 'EQUIPMENT' }, { name: 'POINTS' }, { name: 'VARIABLES' }, { name: '' }
    ]
    document.title = 'Configuration Tool';

    const onClickOfLinks = (e) => {
        console.log('clicked: ', e);
        if (e.key != 'noLink') {


            const root = createRoot(document.getElementById("configWorkArea"));
            //location.hash = e.key || e.target.innerText;
            setClickedLink(e.key || e.target.innerText);
            if(e.key=='createProject'){
                setClickedLink('Create Project');
            root.render(
                <>
                   <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'name']}
      label="Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label="Email"
      rules={[
        {
          type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'age']}
      label="Age"
      rules={[
        {
          type: 'number',
          min: 0,
          max: 99,
        },
      ]}
    >
      <InputNumber />
    </Form.Item>
    <Form.Item name={['user', 'website']} label="Website">
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'introduction']} label="Introduction">
      <Input.TextArea />
    </Form.Item>
    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
                    {/* <div className='createProjectWrapper'>
                       <div>
                       Project Name
                       <Input type="text"/>
                       </div>
                        <div>Description
                        <Input type="text"/></div>
                        
                        <Input type="submit" value='Submit'/>

                    </div> */}

                </>
            );
        }
        }
    }

    const onFinishDeleteProject = (values) => {
      console.log(values);
window.values=values;
      setModalOpen(true);

    };
    const onSubmit=(values)=>{
      submitFunction(values,'deleteProject');
    }
  
    const submitFunction = (e, type) => {
      console.log('e inside submit function:', e);
  if(type=='deleteProject'){
      console.log('delete project..');
      axios({
        method: 'DELETE', url: window.config.CG_CONFIG_DELETE_PROJECT, data: { projectId: e.project.id}
      }).then(response => {
        console.log('Submit delete project response:', response);
        message.success('Project deleted successfully');
        props.setRefreshFlagFn('deleteProject'+Math.random());
        //onClickOfLinks('deleteProject');
        //fetching list of projects upon successful deletion:
        axios({
          method: 'GET', url: window.config.CG_GET_PROJECTS
        }).then(response => {
          console.log('get projects response', response);
  
          let options=[];
          response.data.map(item => {
           // options.push(item.projectName);
            options.push({
              label:item.projectName,
              value:item.projectId,
            });
          
          })
          setProjectOptions(options);
          
        }).catch(e => {
          console.log('error:', e);
        })
  
    }).catch(e => {
      message.error('Failed to delete project');
      console.log('error:', e);
    })
  }
    }

    const onChangeProjectDropdown=(value)=>{
      console.log('value:',value);
      setSelectedProjectId(value);
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
          <Modal className='projectDeleteModal' open={modalOpen} width={'auto'}  onOk={handleOk} onCancel={handleCancel} centered >Are you sure you want to delete the project?</Modal>
                        <Form
                {...layout} 
                onFinish={onFinishDeleteProject}
                style={{
                  maxWidth: 600,
                   marginTop: '10px'
                }}
                validateMessages={validateMessages}
              >
                <Form.Item label="Select" name={['project', 'id']}>
            <Select options={projectOptions} showSearch={true} onChange= {onChangeProjectDropdown} optionFilterProp="label" className='projectDropdown' dropdownStyle={{
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