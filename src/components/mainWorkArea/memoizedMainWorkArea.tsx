import React, { memo } from 'react';
import MainWorkAreaComponent from './index.tsx';
const MemoizedMainWorkAreaComponent = memo(({ path, data, sendDatatoLandingPage, headerData }) => {
  return (
    <MainWorkAreaComponent 
      path={path} 
      data={data} 
      sendDatatoLandingPage={sendDatatoLandingPage}  
      headerData={headerData} 
    />
  );
});

export default MemoizedMainWorkAreaComponent;