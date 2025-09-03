import React, { useState } from 'react';
import { Modal } from 'antd';
import { UnityProvider } from '../../contexts/UnityContext';
import { UnityLoader } from '../UnityLoader';
const  UnityMainWrapper = (props) => {
const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = () => {
  setIsModalOpen(false);
  window.location.reload();
};
const handleCancel = () => {
  setIsModalOpen(false);
  window.location.reload();
};
const [isModalOpen, setIsModalOpen] = useState(false);

return(
<div className='unity-wrapper expand-icon'>
                    <UnityProvider>
                    <UnityLoader unityMessageObject={props.unityMessageObject} />
                    <span className="expand-icon" onClick={showModal} />

                  </UnityProvider>
                    <span className='unity-digitaltwin' id='digitalTwinId'></span>
                    <span className='unity-chatbot' id='chatbotId'></span>

                  <Modal wrapClassName="custom-modal-wrapper unity-modal-wrapper" title=" " open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width='100vw' footer={null}>
                    <UnityProvider>
                    
                                <UnityLoader unityMessageObject={props.unityMessageObject} />
                    
                    
                              </UnityProvider>
                    </Modal>
                  </div>
)
}
export default UnityMainWrapper;