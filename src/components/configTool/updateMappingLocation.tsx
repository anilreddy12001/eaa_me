import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, Button, message, Row, Col } from 'antd';

const { Option } = Select;

const UpdateLocationMapping = () => {
  const [typeOne, setTypeOne] = useState(null); // Type 1 (Country, City, Building, Campus)
  const [typeTwo, setTypeTwo] = useState(null); // Type 2 (Region, Country, City, etc.)
  const [valueOne, setValueOne] = useState([]); // Selected Value 1
  const [valueTwo, setValueTwo] = useState([]); // Selected Value 2
  const [fetchData, setFetchData] = useState(null); // Data from API
const [optionOneValues,setoptionOneValues]=useState([]);
const [optionTwoValues,setoptionTwoValues]=useState([]);
  // Fetch location data on load (GET request)
  // useEffect(() => {
  //   const fetchLocationData = async () => {
  //     try {
  //       const response = await axios.get(window.config.CG_CONFIG_FETCH_LOCATIONS);
  //       setFetchData(response.data); // Store fetched data
  //     } catch (error) {
  //       console.error('Error fetching location data:', error);
  //     }
  //   };

  //   fetchLocationData();
  // }, []);

  // Handle changes in Type 1 (Country, City, Building, Campus)
  const handleTypeOneChange = async (value) => {
    setTypeOne(value);
    setValueOne([]); // Reset Value 1
    setValueTwo([]); // Reset Value 2

    // Automatically set Type 2 based on Type 1 selection
    if (value === 'Country') {
      setTypeTwo('Region');
    } else if (value === 'City') {
      setTypeTwo('Country');
    } else if (value === 'Building') {
      setTypeTwo('Campus');
    } else if (value === 'Campus') {
      setTypeTwo('City');
    }

    // Make the API call on type change
    await callOnChangeApi(value);
  };

  // API call for `onChange`
  const callOnChangeApi = (selectedType) => {
    console.log('selectedtype:', selectedType);
    
      var payload ={};
      if(typeof selectedType=='object' && selectedType.length>0 ){
      payload= {
        typyData: selectedType, // Send selected type data
      };
    }
    else{
      payload= {
        typyData: [selectedType.toString()], // Send selected type data
      };
    }

      axios.post(window.config.CG_CONFIG_FETCH_LOCATION_DATA, payload).then(response=>{
      setFetchData(response.data); // Update state with the fetched data
      var selectedTypeVar='';
      if(typeof selectedType=='object' && selectedType.length>0 ){
        selectedTypeVar=selectedType;
        renderOptionsForValueTwo(typeTwo, response.data.data);
      }
      else {
        selectedTypeVar=selectedType.toString();
        if(selectedTypeVar!=''){
        renderOptionsForValueOne(selectedTypeVar,response.data.data);
        }
      }
      
      console.log('Fetched data on type change:', response.data);
    }). catch (error=> {
      console.error('Error fetching data on type change:', error);
    })
  }

  // Handle changes in Value 1 (Multi-select for cities, buildings, etc.)
  const handleValueOneChange = async (value) => {
    console.log('value: ',value);
    setValueOne(value);
    // Call the API on value change
    await callOnChangeApi(value);
  };

  // Handle changes in Value 2 (Single-select based on Value 1)
  const handleValueTwoChange = async (value) => {
    setValueTwo(value);

    // Call the API on value change
    await callOnChangeApi('valueTwo');
  };

  // Handle form submit to update mapping (PUT request)
  const handleSubmit = async () => {
    try {
      const payload = {
        typyOneData: valueOne,
        typeOneValue: typeOne.toLowerCase(),
        typeTwoData: valueTwo,
      };

      const response = await axios.put(window.config.CG_CONFIG_MAP_LOCATION, payload);
      console.log('Update response:', response.data);
      message.success('Location mapping updated successfully.');
      document.getElementById('mappedLocation').innerHTML='';
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  // Render dynamic options for Value 1
  const renderOptionsForValueOne = (typeOne,fetchDataparam) => {
console.log('typeOne',typeOne,' fetchdata:', fetchDataparam.flatMap((item)=>item.countries));

      let options = [];

      if (typeOne === 'Country') {


        fetchDataparam.flatMap((item)=>item.countries).forEach(item=>{options.push({value:item.country_code, label:item.country_name})});
      }
      
      else if (typeOne === 'City') {
        fetchDataparam.flatMap((item)=>item.countries).flatMap((country) => country.cities)
          .forEach(city => {
            options.push({ key:city.city_code, value:city.city_code, label:city.city_name})})
              
      }



          //fetchDataparam[0].countries.forEach(item=>{options.push({value:item.country_code, label:item.country_name})});
      
      else if (typeOne === 'Building') {
        fetchDataparam.flatMap((item)=>item.countries)
          .flatMap((country) => country.cities)
          .flatMap((city) => city.campuses)
          .flatMap((campus) => campus.buildings)
          .forEach(building => {
            options.push({ key:building.building_code, value:building.building_code, label:building.building_name})})
      } 
      
      // Handle Campus selection in Type 1
      else if (typeOne === 'Campus') {
        fetchDataparam.flatMap((item)=>item.countries)
          .flatMap((country) => country.cities)
          .flatMap((city) => city.campuses)
          .forEach(campus => {
            options.push({ key:campus.campus_code, value:campus.campus_code, label:campus.campus_name})})
      }


      setoptionOneValues(options);
    

    //return <Option value={null}>No data availableeeee</Option>;
  };

  // Render dynamic options for Value 2
  const renderOptionsForValueTwo = (typeTwo,fetchDataparam) => {
    console.log('typeTwo',typeTwo,' fetchdata:', fetchDataparam.flatMap((item)=>item.countries));

      let options = [];

      if (typeTwo === 'Region') {


        fetchDataparam.flatMap((item)=>item).forEach(item=>{
        if(item.flag=='false'){  options.push({value:item.region_code, label:item.region_name})}
        else{
document.getElementById('mappedLocation').innerHTML='Already mapped to: '+item.region_name;
        }
        });
      }

      if (typeTwo === 'Country') {


        fetchDataparam.flatMap((item)=>item.countries).forEach(item=>{
          if(item.flag=='false'){
          options.push({value:item.country_code, label:item.country_name})
      }else{
        document.getElementById('mappedLocation').innerHTML='Already mapped to: '+item.country_name;
      }

      })
    }
      
      else if (typeTwo === 'City') {
        fetchDataparam.flatMap((item)=>item.countries).flatMap((country) => country.cities)
          .forEach(city => {
            if(city.flag=='false'){
            options.push({ key:city.city_code, value:city.city_code, label:city.city_name})
            }
            else{
              document.getElementById('mappedLocation').innerHTML='Already mapped to: '+city.city_name;
            }
          
          })
              
      }
      
      else if (typeTwo === 'Building') {
        fetchDataparam.flatMap((item)=>item.countries)
          .flatMap((country) => country.cities)
          .flatMap((city) => city.campuses)
          .flatMap((campus) => campus.buildings)
          .forEach(building => {
            if(building.flag=='false'){
            options.push({ key:building.building_code, value:building.building_code, label:building.building_name})
            }
            else{
              document.getElementById('mappedLocation').innerHTML='Already mapped to: '+building.building_name;
            }
          })
      } 
      
      // Handle Campus selection in Type 1
      else if (typeTwo === 'Campus') {
        fetchDataparam.flatMap((item)=>item.countries)
          .flatMap((country) => country.cities)
          .flatMap((city) => city.campuses)
          .forEach(campus => {
          if(campus.flag=='false'){
            options.push({ key:campus.campus_code, value:campus.campus_code, label:campus.campus_name})
          }
          else{
            document.getElementById('mappedLocation').innerHTML='Already mapped to: '+campus.campus_name;
          }
          
          })
      }


      setoptionTwoValues(options);
    
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={12} style={{paddingTop: '10px'}}>
          <Select
          className="locationMappingClass"
            value={typeOne}
            onChange={handleTypeOneChange}
            style={{ width: '100%' }}
            placeholder="Select Type 1"
          >
            <Option value="Country">Country</Option>
            <Option value="City">City</Option>
            <Option value="Building">Building</Option>
            <Option value="Campus">Campus</Option>
          </Select>
        </Col>
        <Col span={12} >
          <Select
          className="locationMappingClass"
            value={typeTwo}
            style={{ width: '100%', marginTop: 10 }}
            disabled
          >
            {typeTwo && <Option value={typeTwo}>{typeTwo}</Option>}
          </Select>
        </Col>
      </Row>

      <Row gutter={16} >
        <Col span={12} style={{paddingTop: '10px'}}>
          <Select
          className="locationMappingClass"
            mode="multiple"
            
            onChange={handleValueOneChange}
            style={{ width: '100%' }}
            placeholder="Select Values"
            options={optionOneValues}
          />
            
        </Col>
        <Col span={12}>
        {<div id='mappedLocation'></div>}
          <Select
          className="locationMappingClass"
            value={valueTwo}
            options={optionTwoValues}
            onChange={handleValueTwoChange}
            style={{ width: '100%', marginTop: 10 }}
            placeholder="Select Value 2"
            disabled={valueOne.length === 0}
          />
           
        </Col>
      </Row>

      <Button onClick={handleSubmit} style={{ marginTop: 20 }} type="primary">
        Submit
      </Button>
    </div>
  );
};

export default UpdateLocationMapping;
