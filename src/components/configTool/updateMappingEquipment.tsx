import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Input, Button, message } from 'antd';

const { Option } = Select;

const App = () => {
    const [dropdownList, setDropdownList] = useState([]); // To hold equipment types
    const [selectedEquipments, setSelectedEquipments] = useState([]); // Selected equipment types
    const [associatedEquipments, setAssociatedEquipments] = useState([]); // Associated equipment types
    const [equipmentCounts, setEquipmentCounts] = useState([]); // Counts for associated equipment types
    const [selectedAssociatedEquipments, setSelectedAssociatedEquipments] = useState([]); // To hold selected unmapped equipment types
    const [count, setCount]=useState([]);
    const [mappedAssociatedEquipments,setMappedAssociatedEquipments]=useState([]);
    useEffect(() => {
        getEquipments();
    }, []);

    // Fetch available equipment types for selection
    const getEquipments = () => {
        axios({
            method: 'GET',
            url: window.config.CG_CONFIG_GET_EQUIPMENTS_ASSOCIATED_EQUIPMENT_DETAILS,
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            let equipmentTypes = [];
            response.data.equipment_types.forEach(item => {
                equipmentTypes.push({ label: item.type, value: item.type });
            });

            setDropdownList([{ title: 'equipmentType', name: 'Equipment Type', options: equipmentTypes }]);
        }).catch(e => {
            console.error('Error fetching equipment:', e);
            message.error('Failed to load equipment data');
        });
    };

    // Handle equipment type change and fetch associated equipment types
    const handleEquipmentsChange = (selectedItems) => {
        
        setSelectedEquipments(selectedItems);

        // Fetch associated equipment based on selected equipment types
        /*
        {
    "equipmentTypes": ["AHU", "VAV"]  }
        */ 
        axios({url:window.config.CG_CONFIG_FETCH_ASS_EQP_MAPPING, method:'POST', data:{equipmentTypes:selectedItems}})
            .then(response => {
                const associatedEquipmentsData = response.data.map(item => ({
                    associated_equip_type: item.associated_equip_type,
                    isMapped: item.flag,  // true if already mapped
                    count: item.count || 0, // Default count is 0 if not available
                }));
                let associatedEquipmentsMappedArray=[];
                response.data.forEach(item=>{
                    if(item.flag==true){
                        associatedEquipmentsMappedArray.push(item.associated_equip_type)
                    }
                });
                setMappedAssociatedEquipments(associatedEquipmentsMappedArray);

                // Update associated equipment list
                setAssociatedEquipments(associatedEquipmentsData);

                // Initialize counts for both mapped and unmapped items
                const initialCounts = associatedEquipmentsData
                    .filter(item => item.isMapped) // Only keep mapped items
                    .map(item => ({
                        name: item.associated_equip_type,
                        count: item.count || 0 // Set count as 0 for both mapped and unmapped
                    }));
                setEquipmentCounts(initialCounts);
            })
            .catch(error => {
                console.error("Error fetching associated equipment types:", error);
                message.error('Failed to fetch associated equipment types');
            });
    };

    // Handle direct count change for associated equipment
    const handleCountChange = (e, item) => {
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

        console.log('::',count.filter(item=>{return(!item.count || item.count<=0)}));
        console.log('selected associated equipments:',selectedAssociatedEquipments);
        
    };

    // Handle selecting unmapped associated equipment types
    const handleUnmappedEquipmentsChange = (value) => {
        console.log('on change of associated equipments: ',value);
        setSelectedAssociatedEquipments(value);
        setMappedAssociatedEquipments(value);
        // Add selected unmapped equipment to the counts list with initial count 0
        const newCounts = value.map(item => ({
            name: item,
            count: 0,
        }));

        setEquipmentCounts(newCounts);
    };

const handleSubmit = () => {
  // Filter out the equipment types where the count is 0 (only send those with count > 0)
  const filteredEquipmentCounts = equipmentCounts.filter(item => item.count > 0);
  const associatedEquipTypes = filteredEquipmentCounts.map(item => item.name);
  //const counts = filteredEquipmentCounts.map(item => item.count);

  // If no associated equipment types have a count > 0, do not send the request
  //{selectedAssociatedEquipments.length==0 || selectedEquipments.length==0 || count.forEach(item=>{return(item.count==0 || item.count==null)})}
 


  const payload = {
      equipment_types: selectedEquipments,
      associated_equip_types: selectedAssociatedEquipments,
      ass_equi_count: count.map(item=>parseInt(item.count)),
  };

  // Ensure the arrays match in length


  // Make the API call with the filtered payload
  axios.post(window.config.CG_CONFIG_MAP_EQUIPMENT, payload)
      .then(response => {
          if (response.data.status === "success") {
              message.success(response.data.message);
          } else {
              message.error('Failed to update equipment');
          }
      })
      .catch(error => {
          console.error("Error submitting equipment data:", error);
          message.error('Unable to submit equipment data');
      });
};

    // Check if at least one count is greater than 0 (enable button when any count > 0)
    const isSubmitEnabled = selectedAssociatedEquipments.some(item => item.count > 0);

    // Create an array of mapped associated equipment types to be used for defaultValue
    const mappedEquipTypes = associatedEquipments.filter(item => item.isMapped).map(item => item.associated_equip_type);
    // Create an array of unmapped associated equipment types
    const unmappedEquipTypes = associatedEquipments.filter(item => !item.isMapped).map(item => item.associated_equip_type);

    return (
        <div>
            {/* <h1>Equipment Mapping</h1> */}

            {/* Equipment Type Dropdown */}
            <div>
                <label>Equipment Types:</label>
                <Select
                  className="custom-select"
                    mode="multiple"
                    placeholder="Select Equipment Types"
                    onChange={handleEquipmentsChange}
                    style={{ width: '100%' }}
                >
                    {dropdownList.length > 0 &&
                        dropdownList[0].options.map((item, index) => (
                            <Option key={index} value={item.value}>
                                {item.label}
                            </Option>
                        ))
                    }
                </Select>
            </div>

            {/* Associated Equipment Types (Mapped only) with Scrollable Container */}
            {/* <div>
                
                <h3>Mapped Associated Equipment Types</h3>
                {associatedEquipments.length > 0 ? (
                    <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '20px' }}>
                        Show only mapped equipment as defaultValue
                        <Select
                         className="custom-select"
                            mode="multiple"
                            defaultValue={mappedEquipTypes} // Pre-select mapped equipment types
                            onChange={handleEquipmentsChange}
                            style={{ width: '100%' }}
                        >
                            {mappedEquipTypes.length > 0 && mappedEquipTypes.map((mappedItem, index) => (
                                <Option key={index} value={mappedItem}>
                                    {mappedItem} (Mapped)
                                </Option>
                            ))}
                        </Select>

                        Input for count of each associated (mapped) equipment
                        {associatedEquipments.filter(item => item.isMapped).map((item, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <strong>{item.associated_equip_type}</strong>
                                <div style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '10px' }}>
                                    <Input
                                        type="number"
                                        value={equipmentCounts.find(c => c.name === item.associated_equip_type)?.count || 0}
                                        onChange={(e) => handleCountChange(e, item.associated_equip_type)}
                                        style={{ width: '80px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No associated equipment found for selected equipment types.</p>
                )}
            </div> */}

            {/* Unmapped Equipment Types Dropdown */}
            <div>
                {/* <h3>Unmapped Associated Equipment Types</h3> */}
                <Select
                 className="custom-select"
                    mode="multiple"
                    placeholder="Select Unmapped Associated Equipment Types"
                    onChange={handleUnmappedEquipmentsChange}
                    style={{ width: '100%' }}
                    value={mappedAssociatedEquipments}
                >
                    {unmappedEquipTypes.length > 0 && unmappedEquipTypes.map((unmappedItem, index) => (
                        <Option key={index} value={unmappedItem}>
                            {unmappedItem}
                        </Option>
                    ))}
                </Select>

                {/* Input for count of each selected unmapped equipment */}
                <div style={{display:'flex',flexDirection:'row'}}>
                    {/* <div>
                    <div style={{fontWeight:'bold'}}>Mapped:</div>
                    {mappedAssociatedEquipments.map(item=>(<div>{item}</div>))}
                    </div> */}
                    <div style={{maxHeight:'46vh',position: 'relative',
  left: '30%',overflowY:'auto', marginBottom:'10px'}}><div style={{fontWeight:'bold'}}></div>
                        {selectedAssociatedEquipments.length > 0 && selectedAssociatedEquipments.map((item, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{item}</strong>
                        <div style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '10px' }}>
                            <Input
                                type="number"
                                // value={selectedUnmappedEquipments.find(c => c.name === item)?.count || 0}
                                onChange={(e) => handleCountChange(e, item)}
                                style={{ width: '80px' }}
                            />
                        </div>
                    </div>
                ))}
                </div>
                </div>
            </div>

            {/* Submit Button */}
            <div>
                {selectedEquipments.length === 0 || associatedEquipments.length === 0 ? (
                    <p>No equipment selected or no associated equipment available.</p>
                ) : (
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        disabled={selectedAssociatedEquipments.length==0 || selectedEquipments.length==0 || count.filter(item=>{return(!item.count || item.count<=0)}).length>0}
                    >
                        Submit
                    </Button>
                )}
            </div>
            
        </div>
    );
};

export default App;
