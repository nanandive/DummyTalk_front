// SettingsModal.js
import { useState } from 'react';
import { useModal } from "src/components/hooks/use-modal";
import "./css/SettingsModal.css";

const SettingsModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [newServerName, setNewServerName] = useState('');
  const [kickUser, setKickUser] = useState('');

  const isModalOpen = isOpen && type === "settings";
  
  const handleServerNameChange = (e) => {
    setNewServerName(e.target.value);
  };

  const handleKickUserChange = (e) => {
    setKickUser(e.target.value);
  };

  const handleSaveSettings = () => {
    // Perform actions with newServerName and kickUser, e.g., send them to the server
    // Add your logic here...

    // Close the modal after saving settings
    onClose();
  };

  const modalStyle = {
    display: isModalOpen ? 'block' : 'none',
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>서버 설정 변경</h2>

        <label>
          새로운 서버 이름:
          <input type="text" value={newServerName} onChange={handleServerNameChange} />
        </label>

        <label>
            강퇴할 사용자:
          <input type="text" value={kickUser} onChange={handleKickUserChange} />
        </label>

        <div className="button-container">
          <button onClick={handleSaveSettings}>저장</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
