import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input,Form,Button, InputNumber, message } from 'antd';
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
const App = (props) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [time, setTime] = useState(() => new Date().toLocaleTimeString());

    const [clickedLink, setClickedLink] = useState('');
    const [current, setCurrent] = useState('mail');
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(interval);
    }, []);


    const onFinishCreateProject = (values) => {
      console.log(values);
      submitFunction(values,'createProject');
    };
    const submitFunction = (e, type) => {
      console.log('e inside submit function:', e);
  if(type=='createProject'){
      axios({
        method: 'POST', url: window.config.CG_CONFIG_CREATE_PROJECT, data: { projectName: e.project.name, projectDescription: e.project.description, users: 'user1' }
      }).then(response => {
        console.log('Submit create project response:', response);
        message.success('Project created successfully');     
  
        props.setRefreshFlagFn('createProject'+e.project.name);
      }).catch(e => {
        message.error('Failed to create project');
        console.log('error:', e);
      })
    }

    }
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
        {
          pattern: new RegExp(/^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i),
          message: "field does not accept special characters"
         }
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

    return (
        <Layout className='configIndividualLayoutClass'>
            
            <>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinishCreateProject}
              style={{
                
                width: '44vw',
                maxWidth: '600px',
                marginLeft: '8vw'
              }}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={['project', 'name']}
                label="Project Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name={['project', 'description']} label="Description">
                <Input.TextArea />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>

          </>
        </Layout>
    );
};
export default App;