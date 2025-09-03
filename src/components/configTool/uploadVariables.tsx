import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, message, Form, Input, InputNumber } from 'antd';
import { createRoot } from 'react-dom/client';

const UploadLocation = () => {
  const [file, setFile] = useState(null); // State to track the selected file

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the selected file in the state
      console.log('Selected file: ', selectedFile);
    } else {
      setFile(null); // Reset if no file is selected
    }
  };

  const locationUploadAPI = (file) => {
    if (!file) {
      message.error('No file found.');
      return; // Return early if no file is found
    }

    const formdata = new FormData();
  
    // Create the payload JSON
    const inputJson = JSON.stringify({
      file: file.name, // File name from the file object
      data: {
        userName: 'Prem', // The user data 
      },
    });
  
    // Append the file to FormData
    formdata.append('file', file);
  
    // Append the JSON as a string to FormData
    formdata.append('inputJson', inputJson);

    /*post
 
"userName" Prem
 
file <file>
  */
  
    // Make the API request using axios
    axios(window.config.CG_CONFIG_UPLOAD_VARIABLES, {
      method: 'POST',
      data: formdata,
    })
      .then((resp) => {
        // Handle success
        message.success('Successfully uploaded File', 2);
        console.log('Response inside feeder file upload: ', resp);
      })
      .catch((error) => {
        // Handle error
         message.error( error.response.data.error, 2);
        console.log('Error while uploading  File', error);
      });
  };

  // Handle upload button click
  const onupload = () => {
    if (!file) {
      message.error('Please select a file before submitting.');
      return; // Return early if no file is selected
    }
    // Trigger the API upload with the selected file
    locationUploadAPI(file);
  };

  return (
    <div>
      <input
        type="file"
        id="UploadLocationFile"
        onChange={handleFileChange}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
      
      

      <div className="submituploadButton">
        <Button
          type="primary"
          onClick={onupload}
          htmlType="submit"
          disabled={!file} // Disable button if no file is selected
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UploadLocation;
