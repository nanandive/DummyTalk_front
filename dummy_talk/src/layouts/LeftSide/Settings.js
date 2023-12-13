import { useModal } from "src/components/hooks/use-modal";
import SettingsModal from '../../components/modals/settings-modal'; // Adjust the path based on your file structure
import './css/Settings.css'; // Ensure that you have your Settings.css file

function Settings() {
  const { onOpen, onClose } = useModal()
  
  return (
    <>
      <div className="settings-container">
        <h2>서버 설정</h2>
        <p>서버 이름 : 최영욱</p>

        <button className="open-settings-btn" onClick={()=> onOpen('settings')}>
          
        </button>
      </div>

      <SettingsModal isOpen={()=> onOpen('settings')} closeModal={onClose}>
        {/* Content for your settings modal */}
        <h2>설정 변경</h2>
        {/* Add your settings form or content here */}
        <button onClick={onClose}>저장</button>
      </SettingsModal>
    </>
  );
}

export default Settings;
