import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Input, Button, message } from 'antd';

const { Option } = Select;

const App = () => {

    const [associatedEquipments, setAssociatedEquipments] = useState([]); // Associated equipment types
    const [equipmentCounts, setEquipmentCounts] = useState([]); // Counts for associated equipment types
    const [selectedAssociatedEquipments, setSelectedAssociatedEquipments] = useState([]); // To hold selected unmapped equipment types
    const [count, setCount]=useState([]);
    const [mappedAssociatedEquipments,setMappedAssociatedEquipments]=useState([]);
    const [replaceType, setReplaceType] = useState('device_address');
    const [deviceDropdownDataAddr, setDeviceDropdownDataAddr] = useState([]);
    const [deviceDropdownDataDesc, setDeviceDropdownDataDesc] = useState([]);
    const [selectedDeviceAddr,setSelectedDeviceAddr] = useState([]);
    const [selectedDeviceDesc,setSelectedDeviceDesc] = useState([]);
    const [deviceDescValues,setDeviceDescValues] = useState([]);
    const [deviceAddrValues,setDeviceAddrValues] = useState([]);
    
    useEffect(() => {
        fetchDevices();
    }, []);

    // Fetch available equipment types for selection
    const fetchDevices = () => {
        axios({ url: window.config.CG_CONFIG_FETCH_DEVICE, method: 'GET' }).then(response => {
          console.log('response: ', response);
          
          setDeviceDropdownDataAddr(response.data.device_addresses.map((item, index) =>  {return {label: item?item:'', value: item, key:Math.random() }}));

          setDeviceDropdownDataDesc(response.data.device_descs.map((item, index) =>  {return {label: item?item:'', value: item, key:Math.random() }}));
  
    
        }).catch(error => {
          console.log('e:', error)
        })
    
      }
/*
http://127.0.0.1:5009/energyanalytics/api/v1/edit/device
post
{
  "type": "device_address",
  "device_addresses": ["10.0.0.1", "10.0.0.2"],
  "device_descs": ["pramodtest121", "pramodtest1212"]
}
{
  "message": "Device mappings updated successfully.",
  "status": "success"
}

*/


const handleSubmit = () => {
  // Filter out the equipment types where the count is 0 (only send those with count > 0)
  const filteredEquipmentCounts = equipmentCounts.filter(item => item.count > 0);
  const associatedEquipTypes = filteredEquipmentCounts.map(item => item.name);
  //const counts = filteredEquipmentCounts.map(item => item.count);

  // If no associated equipment types have a count > 0, do not send the request
  //{selectedAssociatedEquipments.length==0 || selectedEquipments.length==0 || count.forEach(item=>{return(item.count==0 || item.count==null)})}
 


//   const payload = {
//       equipment_types: selectedEquipments,
//       associated_equip_types: selectedAssociatedEquipments,
//       ass_equi_count: count.map(item=>parseInt(item.count)),
//   };
if(selectedDeviceAddr && selectedDeviceDesc && selectedDeviceAddr.length!= selectedDeviceDesc.length){
message.error("The number of device addresses must match the number of device descriptions.");
return
}
  const payload= {
    "type": replaceType,
    "device_addresses": selectedDeviceAddr,
    "device_descs": selectedDeviceDesc
  }

  // Ensure the arrays match in length


  // Make the API call with the filtered payload
  axios.post(window.config.CG_CONFIG_EDIT_DEVICE, payload)
      .then(response => {
          if (response.data.status === "success") {
              message.success('Successfully Edited Device(s)');
          } else {
              message.error('Error Editing Device(s)');
          }
      })
      .catch(error => {
          console.error("Error Editing Device(s)", error);
          message.error('Error Editing Device(s)');
      });
};

    const getMappedDeviceData=(type, values)=>{
        ///energyanalytics/api/v1/devices/flagged
        console.log(type,": values:", values);
let payload={
    "type": type,
    "values": values
  };

  
        axios.post(window.config.CG_CONFIG_EDIT_DEVICE_MAPPED_DATA, payload)
        .then(response => {
if(type=='device_desc'){
    let deviceAddrVar=[];
    let deviceAddrValuesVar=[];
    response.data.forEach(item=>{if(item.flag){
        console.log('mapped:', item);
        deviceAddrVar.push({label:item.device_address, value:item.device_address, key:Math.random()});
        deviceAddrValuesVar.push(item.device_address);
    
    }else{
        deviceAddrVar.push({label:item.device_address, value:item.device_address, key:Math.random()})
    }});
            setDeviceDropdownDataAddr(deviceAddrVar);
            setDeviceAddrValues(deviceAddrValuesVar);
}
else if(type=='device_address'){
    let deviceDescVar=[];
    let deviceDescValuesVar=[];
    response.data.forEach(item=>{
    if(item.flag){
        console.log('mapped:', item);
        deviceDescVar.push({label:item.device_desc, value:item.device_desc});
        deviceDescValuesVar.push(item.device_desc);
    }
    else{
        deviceDescVar.push({label:item.device_desc, value:item.device_desc});
    }
    });
    console.log("deviceDescValuesVar:", deviceDescValuesVar);
    setDeviceDropdownDataDesc(deviceDescVar);
    setDeviceDescValues(deviceDescValuesVar);
            
}

            
        })
        .catch(error => {
            console.error("Error mapping Device(s)", error);
            
        });


    }

    const onChangeDeviceDropdown=(e)=>{
        console.log('e:',e);
              setReplaceType(e);
              
            }

            
    const onChangeDeviceDropdownAddr=(e)=>{
        console.log('e:',e);
        setDeviceAddrValues(e);
        
        setSelectedDeviceAddr(e);
        if(replaceType=='device_address'){
        getMappedDeviceData(replaceType, e );
        }

            }
            
    const onChangeDeviceDropdownDesc=(e)=>{
        console.log('e:',e);
       
        setDeviceDescValues(e);
              setSelectedDeviceDesc(e);
              if(replaceType=='device_desc'){
              getMappedDeviceData(replaceType, e );
              }
            }

    return (
        <div style={{display:'flex'}} className='configIndividualLayoutClass'>
            {/* <h1>Equipment Mapping</h1> */}

            {/* Equipment Type Dropdown */}
            <div style={{width: '30%'}}>
                <label>Type:</label>
                <Select 
     className="replaceDeviceTypeDropdown" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
          // Dynamically control dropdown open state
          style={{width:'100%'}}
           key="1" id="1" showSearch={true} onChange={e=>onChangeDeviceDropdown(e)} options={[{label:'Device Description', value:'device_desc'},{label:'Device IP', value:'device_address'}]} />
            </div>

            {/* Unmapped Equipment Types Dropdown */}
            {replaceType=="device_address"?<div>
                {/* <h3>Unmapped Associated Equipment Types</h3> */}
                Device Address
                <Select mode="multiple"

          allowClear className="createLocationDropdowns" value={deviceAddrValues} popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
          // Dynamically control dropdown open state
          style={{ width: '100%', borderRadius: '4px' }} key="1" id="1" showSearch={true} onChange={e=>onChangeDeviceDropdownAddr(e)} options={deviceDropdownDataAddr} />
Device Description
<Select mode="multiple"
value={deviceDescValues}
          allowClear className="createLocationDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
          // Dynamically control dropdown open state
          style={{ width: '100%', borderRadius: '4px' }} key="2" id="2" showSearch={true} onChange={e=>onChangeDeviceDropdownDesc(e)} options={deviceDropdownDataDesc} />
                
            </div>:
            replaceType=="device_desc"?
            <div>
                Device Description
<Select mode="multiple"
value={deviceDescValues}
      allowClear className="createLocationDropdowns" popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
      // Dynamically control dropdown open state
      style={{ width: '100%', borderRadius: '4px' }} key="2" id="2" showSearch={true} onChange={e=>onChangeDeviceDropdownDesc(e)} options={deviceDropdownDataDesc} />
            {/* <h3>Unmapped Associated Equipment Types</h3> */}
            Device Address
            <Select mode="multiple"

      allowClear className="createLocationDropdowns" value={deviceAddrValues} popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}
      // Dynamically control dropdown open state
      style={{ width: '100%', borderRadius: '4px' }} key="1" id="1" showSearch={true} onChange={e=>onChangeDeviceDropdownAddr(e)} options={deviceDropdownDataAddr} />

            
        </div>
            :''
        }

            {/* Submit Button */}
            <div>
                
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        disabled={selectedDeviceDesc.length==0 || selectedDeviceAddr.length==0 || replaceType==''}
                    >
                        Submit
                    </Button>
                
            </div>
        </div>
    );
};

export default App;
