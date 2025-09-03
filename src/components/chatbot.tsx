import React from "react";

import chatbotIcon from "../../images/chatbot.png";
 
const ChatbotIcon = () => {
  return (
    <div className="chatbot"
    id="chatbotId"
      style={{
        position: "fixed",  // Fixed position on the screen
        bottom: "0vh",  // 15px from the bottom of the screen
        left: "63vw",  // 20px from the right of the screen
        width: "150px",  // Size of the circular container
        height: "150px",  // Size of the circular container
        borderRadius: "50%",  // Circle shape
        // backgroundImage: `url(${chatbotIcon})`,  // Set the PNG image as the background
        backgroundSize: "cover",  // Ensure the image covers the entire circle
        backgroundPosition: "center",  // Center the image inside the circle
        cursor: "pointer",  // Show pointer on hover
        zIndex:'9999',
        // animation: "float 3s ease-in-out infinite",  // Apply floating animation
      }}
    >
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0);  // Start at the normal position
            }
            50% {
              transform: translateY(-2px);  // Move up by 2px at the halfway point
            }
            100% {
              transform: translateY(0);  // Return to the normal position
            }
          }
        `}
      </style>
    </div>
  );
};



 
export default ChatbotIcon;
 