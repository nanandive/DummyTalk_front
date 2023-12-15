import { useModal } from "src/components/hooks/use-modal";
import SettingsModal from '../../components/modals/settings-modal';
import './css/Settings.css';
import {useState} from "react";
import axios from "axios";
import {useUrlQuery} from "src/components/hooks/use-url-query";

function Settings() {
  const { onOpen, onClose } = useModal()
    const query = useUrlQuery()
    const serverId = query.get('server')
    const {serverSettings, setServerSettings} = useState({});

    const updateServerSettings = async (settings) => {
        try {
            const response = await axios.post("http://localhost:9999/server/setting", settings);
            console.log(response.data);
        } catch (error) {
            console.log("서버 업데이트 오류", error);
        }
    };
  
  return (
    <>
      <div className="settings-container">
        <h2>서버 설정</h2>
        <p>서버 이름 : </p>

        <button className="open-settings-btn" onClick={()=> onOpen('settings', { serverId })}>
          
        </button>
      </div>
    </>
  );
}

export default Settings;
