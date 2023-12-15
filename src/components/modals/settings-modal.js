import axios from 'axios';
import { useState, useEffect  } from 'react';
import { useModal } from "src/components/hooks/use-modal";
import "./css/SettingsModal.css";

const SettingsModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { serverId } = data
  const [newServerName, setNewServerName] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [invitedUser, setInvitedUser] = useState('');
  const [resignUser, setReSignUser] = useState('');

  const isModalOpen = isOpen && type === "settings";


  const handleServerNameChange = (e) => {
    setNewServerName(e.target.value);
  };

  const handleImgChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleInviteUserChange = (e) => {
    setInvitedUser(e.target.value);
  };

  const handleKickUserChange = (e) => {
    setReSignUser(e.target.value);
  };


  const handleSaveSettings = async () => {
    const formData = new FormData();
    if (newServerName) formData.append('serverName', newServerName);
    if (imgFile) formData.append('imgFile', imgFile);
    if (invitedUser) formData.append('invitedUser', invitedUser);
    if (resignUser) formData.append('resignUser', resignUser);
    if (serverId) formData.append("serverId", serverId)

    try {
      const response = await axios.post(`http://localhost:9999/server/setting?id=${serverId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData
      });
      console.log('서버 수정 완료:', response.data);
    } catch (error) {
      console.error('서버 수정 실패:', error);
    }
    resetForm();
    onClose();
  };

  const handleDelete = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/server/delete?id=${serverId}`);
      console.log('서버 삭제 완료:', response.data);
      onClose();
    } catch (error) {
      console.error('서버 삭제 실패:', error);
    }
  };

  const resetForm = () => {
    setNewServerName('');
    setImgFile('');
    setInvitedUser('');
    setReSignUser('');
  };

  const modalStyle = {
    display: isModalOpen ? 'block' : 'none',
  };


  return (
      <div className="modal" style={modalStyle}>
        <div className="modal-content">

          <label>
            새로운 서버 이름:
            <input type="text" value={newServerName} onChange={handleServerNameChange} />
          </label>

          <label>
            새로운 서버 이미지:
            <input type="file" onChange={handleImgChange} />
          </label>

          <label>
            초대할 사용자:
            <input type="text" value={invitedUser} onChange={handleInviteUserChange} />
          </label>

          <label>
            강퇴할 사용자:
            <input type="text" value={resignUser} onChange={handleKickUserChange} />
          </label>

          <div className="button-container">
            <button onClick={handleSaveSettings}>저장</button>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={onClose}>취소</button>
          </div>
        </div>
      </div>
  );
};

export default SettingsModal;
