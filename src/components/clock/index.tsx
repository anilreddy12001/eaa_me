// import React, { useEffect, useState } from 'react';
// export default function ClockComponent( props) {
//     const [time, setTime] = useState(() => new Date().toLocaleTimeString());
//     useEffect(() => {
//     const interval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (<>{time}</>)
// }
import React, { useEffect, useState } from 'react';
 
export default function ClockComponent(props) {
  const [time, setTime] = useState(() => new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 5000); // Update every minute
    return () => clearInterval(interval);
  }, []);
 
 
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:false,  });
  // const formattedDate = time.toLocaleDateString();
  const formattedDate = time.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  
 
  return (
    <span>{formattedDate} | {formattedTime}</span>
  );
}