import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input,Form,Button, InputNumber } from 'antd';
const { Header, Content, Sider } = Layout;
 
import "./index.css";
import DirectoryTreeView from "../treeview";
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
const Home = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

   

    const [clickedLink, setClickedLink] = useState('');
    const [current, setCurrent] = useState('mail');
    const [projectData,setProjectData]=useState({});
    let data={
      name: "parent",
      children: [
        {
          name: "src",
          children: [{ name: "index.js" }, { name: "styles.css" }],
        },
        {
          name: "node_modules",
          children: [
            {
              name: "react-accessible-treeview",
              children: [{ name: "index.js" }],
            },
            { name: "react", children: [{ name: "index.js" }] },
          ],
        },
        {
          name: ".npmignore",
        },
        {
          name: "package.json",
        },
        {
          name: "webpack.config.js",
        },
      ],
    };
    useEffect(() => {
     getTreeData('onload');
    }, []);

const getTreeData=(param)=>{

  
axios({url:window.config.CG_PROJECT_TREE,method:'GET'}).then(response=>{
console.log("tree response: ",response);

// resp.data.projects.forEach((item, index)=>{

  
//   projectData.children.push({name: item.project_name});
//   if(item.region && item.region.length>0){
//     projectData.children[index].children
//       }
// })

var projectData = [];
// const recursiveFunction=(param)=>{
//   if(item.regions){

//   }
//   param.forEach(item=>

//     {if(item.regions){projectData.push({name:param.project_name, children:regions})}
//   });
//   param.regions?recursiveFunction(item.regions):'';
// }

//recursiveFunction(response.data.projects);
// {name:'',children:[{}]}
response.data.projects.forEach(project => {
   projectData.push({name:project.project_name, children:[{name:'regions',children:project.regions.length>0?[{name:project.regions[0].region_name, children:[]}]:[]}]});
// // project.regions.forEach(region => {
// //   region.countries.forEach(country => {
// //     country.cities.forEach(city => {
// //       city.campuses.forEach(campus => {
// //         campus.buildings.forEach(building => {
// //           building.forEach(building => {
// //           projectData.push({ project: project.project_name, region: region.region_name, country: country.country_name, city: city.city_name, campus: campus.campus_name, building: building.building_name });
// //           // locationList.push({region:'Europe',country:country.countryname,city:city.cityname,campus:campus.campusname,building:building.buildingname});
// //           })
// //         })
// //       })
// //     })
// //   })
// // })
})

console.log('projectData:',projectData);


setProjectData({name:'',children:projectData});
}).catch(e=>{


})


}

    document.title = 'Configuration Tool';

    const onClickOfLinks = (e) => {

    }

    return (
                
                <Layout
                    className='configIndividualLayoutClass'
                >
                    <div style={{width:'20vw'}}>
                      {/* <DirectoryTreeView data={projectData}/> */}
                    </div>
                    
                </Layout>
            
    );
};
export default Home;