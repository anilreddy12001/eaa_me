import React,{useState, useRef} from 'react';
import { Select } from 'antd';





const DropdownComp: React.FC = (props) => {
    console.log('props:',props);
    const [isOpen, setIsOpen]=useState(false);
    const selectRef = React.useRef(null);
    const openDropdown=(e)=>{
        alert('hi')
        // console.log('e:',e);
        // sessionStorage.getItem('openIndex')&&sessionStorage.getItem('openIndex')==props.title?setIsOpen(true):setIsOpen(false);
        // setIsOpen(!isOpen);
    }
    
const onSearch = (value: string) => {
    console.log('search:', value);
    setIsOpen(true);
};

const triggerOnClickSelect=(e)=>{
    console.log('selectRef:',selectRef.current);
    selectRef.current?selectRef.current.focus():'';
}

    return (
    <div>
        <span className='drop-name'>{props.title}</span>
        <Select
        ref={selectRef}
        popupMatchSelectWidth={true} listItemHeight={10} listHeight={250} virtual={false}

            showSearch
            placeholder="All"
            optionFilterProp="label"
            dropdownStyle={{
                boxShadow: ' 0px 5px 15px 0px rgb(40, 41, 40)',
                backgroundColor: '#000000', color: '#ffffff',
                top: '50px'
            }}
                     
          
            onChange={props.onChange}
            value={props.value}
            onSearch={onSearch}
            options={props.dropdownOptions}
            className='locationFilterDropdowns'
            
            // open={isOpen}
            //0px 5px 0px 11px
        />
        <span className='dropdown-icon' onClick={e=>triggerOnClickSelect(e)}></span>
    </div>
    )
};

export default DropdownComp;