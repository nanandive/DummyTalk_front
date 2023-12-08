import React, { useState } from 'react';
import SettingsModal from './SettingsModal.js'; // Adjust the path based on your file structure
import './css/Settings.css'; // Ensure that you have your Settings.css file

function Settings() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="settings-container">
        <h2>서버 설정</h2>
        <p>서버 이름 : 최영욱</p>

        <button className="open-settings-btn" onClick={openModal}>
          
        </button>
      </div>

      <SettingsModal isOpen={isModalOpen} closeModal={closeModal}>
        {/* Content for your settings modal */}
        <h2>설정 변경</h2>
        {/* Add your settings form or content here */}
        <button onClick={closeModal}>저장</button>
      </SettingsModal>
    </>
  );
}

export default Settings;
