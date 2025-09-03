import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input,Form,Button, InputNumber,ConfigProvider,Select,Card } from 'antd';
const { Header, Content, Sider } = Layout;
import { CSS } from '@dnd-kit/utilities';
import "./index.css";
import DirectoryTreeView from "../treeview";
import { createRoot } from "react-dom/client";
import { GripVertical } from 'lucide-react';
import { SortableItem } from './draggableItem/draggableItem.tsx';
import {DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors} from '@dnd-kit/core';
import {SortableContext,useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,} from '@dnd-kit/sortable';
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const { TextArea } = Input;
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


const Home = (props) => {
  console.log('props:',props);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable( props.id);
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [clickedLink, setClickedLink] = useState('');
    const [current, setCurrent] = useState('mail');
    const [projectData,setProjectData]=useState({});
    const [items, setItems] = useState([
      { id: '1', title: 'rule item 1' },
      { id: '2', title: 'rule item 2' },
      { id: '3', title: 'rule item 3' },
      
    ]);
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 1 : 0,
    };
  
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
  
      if (over && active.id !== over.id) {
        setItems((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
  
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
    
    useEffect(() => {
     getTreeData('onload');
    }, []);

const getTreeData=(param)=>{

  
axios({url:window.config.CG_PROJECT_TREE,method:'GET'}).then(response=>{
console.log("tree response: ",response);


}).catch(e=>{


})


}

const onClickSaveButton=(e)=>{
  console.log("e:",e, "items",items);

}

    document.title = 'Configuration Tool';

    const onClickOfLinks = (e) => {

    }



    return (
                
                <Layout
                    className='configIndividualLayoutClass'
                >
                   <ConfigProvider
    theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}>

<Card style={{ width: "100%" }}>
                    <div className='rulesCreationEditWrapper'>
                    <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              
              borderRadius: borderRadiusLG,
              display:'flex',
              flexDirection:'row'
            }}
          >
            
            <div className='rulesCreationLeftPanel'>
            <div className='ruleEIDRowHeading'>Rule Management</div>
            <div className='ruleEIDRow'><Select/><Select/></div>
            <div className='rulePIDRow'><Select/><Select/><Select/><Button>Add New Line</Button></div>
            <div className='rulePropertiesHeading'>Rule Properties</div>
            <div className='rulePropertiesDropdownsRow'><Select/><Select/><Select/><Select/><Select/></div>
            <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
             <SortableItem key={item.id} id={item.id} title={item.title} />
            
            ))}
          </SortableContext>
        </DndContext>
            <div className='ruleDescriptionsRow'>
            <TextArea/>
            <TextArea/>
            </div>
            <div className='rulesCreationSubmitRow'><Button>Cancel</Button><Button onClick={onClickSaveButton}>Save</Button></div>
            </div>
            {/* <div className='rulesCreationRightPanelWrapper'>
            right panel</div> */}
            
          </Content>

          </div>
          
          </Card>
          
                   
                    </ConfigProvider>
                </Layout>
            
    );
};
export default Home;