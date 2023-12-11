// ChannelModal.js
import React, { useState } from 'react';
import { useModal } from "src/components/hooks/use-modal";



const CreateChannelModal = () => {
  const { data, isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createChannel";
  const [newChannelName, setNewChannelName] = useState('');

  const handleInputChange = (e) => {
    setNewChannelName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    data(newChannelName);
    onClose();
  };

  return (
    <div style={{
      display: isModalOpen ? 'block' : 'none',
      position: 'fixed',
      zIndex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.4)',
    }}>
      <div style={{
        backgroundColor: '#fefefe',
        margin: '10% auto',
        padding: '20px',
        border: '1px solid #888',
        width: '50%',
      }}>
        <span style={{
          color: '#aaa',
          float: 'right',
          fontSize: '28px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }} onClick={onClose}>
          &times;
        </span>
        <h2 style={{textAlign: "center"}}>채널 생성</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ marginBottom: '10px', display: 'block' }}>
            채널 이름:
            <input
              type="text"
              value={newChannelName}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                margin: '8px 0',
                boxSizing: 'border-box',
                border: "1px solid black",
              }}
            />
          </label>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            생성
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;
