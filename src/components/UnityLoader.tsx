import React, { useEffect } from 'react';
import { Unity } from 'react-unity-webgl';
import { useUnity } from '../contexts/UnityContext';
import { LoadingIndicator } from './unity/LoadingIndicator';
import { ErrorDisplay } from './unity/ErrorDisplay';

export function UnityLoader(props) {
  const { unityProvider, isLoaded, loadingProgression, isError, errorMessage, sendMessage, addEventListener, removeEventListener } =
    useUnity();
//    console.log("unity props:",props);

useEffect(() => {
  if(props && props.unityMessageObject && props.unityMessageObject.type && props.unityMessageObject.value){
    //
   // if(sessionStorage.getItem("setTargetFlag")!="false"){
    sendMessage('GameManager', 'SetTarget', props.unityMessageObject.value);
    //}
    console.log('jsonobject set value:',props.unityMessageObject.jsonObject);
    sendMessage('GameManager', 'SetValue', JSON.stringify(props.unityMessageObject.jsonObject));
    //sendMessage('GameManager', 'SetValue', '[{"city":"Noida", "co2":"1223","energyConsumed":"214"},{"city":"Bangalore", "co2":"1223","energyConsumed":"214"}]');
    // const canvas = document.getElementById('unityCanvasID');
    // const devicePixelRatio = window.devicePixelRatio || 1;
    // if(canvas){
    //   console.log('jsonobject set value:',canvas);
    //   const cssWidth = canvas.offsetWidth;
    // const cssHeight = canvas.offsetHeight;

    // const internalWidth = cssWidth * devicePixelRatio;
    // const internalHeight = cssHeight * devicePixelRatio;

    // canvas.width = internalWidth;
    // canvas.height = internalHeight;

    // canvas.style.width = cssWidth + 'px';
    // canvas.style.height = cssHeight + 'px';

    // Get the 2D rendering context
    //const ctx = canvas.getContext('2d');
    //}
    }
    return function () {
      removeEventListener('click');
    };
},[props])

// addEventListener("SetTarget", (message) => {
// console.log("SetTarget message from unity:",message);
// SetTarget(message);
// })

// document.addEventListener('SetTarget', (e) => {
//   console.log("event triggered on platform", e);
// })

// var SetTarget= function(msg) {
//   console.log("Calling from Unity: " + msg)
// }
// var SetTarget= function(msg) {
//   console.log("Calling from Unity: " + msg)
// }

  return (
    <div className="relative w-full rounded-lg overflow-hidden unity-section">
      {isError && errorMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <ErrorDisplay message={errorMessage} />
        </div>
      )}
      

      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <LoadingIndicator progress={loadingProgression} />
        </div>
      )}

      <Unity
        unityProvider={unityProvider}
        className="w-full h-full"
        style={{ visibility: isLoaded && !isError ? 'visible' : 'hidden' }}
        matchWebGLToCanvasSize={true}
        devicePixelRatio={2}
        tabIndex={5}
      />
    </div>
  );
}
