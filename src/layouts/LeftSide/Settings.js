// src/layouts/LeftSide/Settings.js
import React, { useState } from "react";
import AudioRecorder from "../../components/AudioRecorder/AudioRecorder";
import axios from "axios";
import { useModal } from "../../components/hooks/use-modal"; // Update the path
import { useUrlQuery } from "../../components/hooks/use-url-query"; // Update the path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../components/modals/VideoModal.css"
import {
  faVideo,
  faDesktop,
  faMicrophone,
  faVolumeMute,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import "./css/Settings.css";
import "../../components/AudioRecorder/AudioRecorder.css"; // Update the path
import VideoModal from "../../components/modals/VideoModal.js"; // Import the VideoModal component

function Settings() {
  const { onOpen, onClose } = useModal();
  const query = useUrlQuery();
  const serverId = query.get("server");
  const [serverSettings, setServerSettings] = useState({});
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharingOn, setIsScreenSharingOn] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false); // New state for VideoModal

  const handleVideoToggle = () => {
    setIsVideoOn(!isVideoOn);
  };

  const handleScreenShare = () => {
    setIsScreenSharingOn(!isScreenSharingOn);
  };

  const handleMuteAudio = () => {
    setIsAudioMuted(!isAudioMuted);
  };

  const handleMuteMicrophone = () => {
    setIsMicrophoneMuted(!isMicrophoneMuted);
  };

  const updateServerSettings = async (settings) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/server/setting`,
        settings
      );
      console.log(response.data);
    } catch (error) {
      console.log("서버 업데이트 오류", error);
    }
  };

  const handleOpenVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <div className="settings-container">
      <br />
      <div className="settings-container1">
        <button
          className={`icon-btn ${isVideoOn ? "active" : ""} w-1/4`}
          onClick={handleVideoToggle}
        >
          <FontAwesomeIcon icon={faVideo} />
          <p>Video</p>
        </button>
        <button
          className={`icon-btn ${isScreenSharingOn ? "active" : ""} w-1/4`}
          onClick={handleScreenShare}
        >
          <FontAwesomeIcon icon={faDesktop} />
          <p>Screen Share</p>
        </button>
        <button
          className={`icon-btn ${isAudioMuted ? "active" : ""} w-1/4`}
          onClick={handleMuteAudio}
        >
          <FontAwesomeIcon icon={faVolumeMute} />
          <p>Mute Audio</p>
        </button>
        <button
          className={`icon-btn ${isMicrophoneMuted ? "active" : ""} w-1/4`}
          onClick={handleMuteMicrophone}
        >
          <FontAwesomeIcon icon={faMicrophone} />
          <p>Mute Microphone</p>
        </button>
      </div>
      <AudioRecorder /><br/>
      <button
        className="open-settings-btn"
        onClick={() => onOpen("settings", { serverId })}
      >
        <FontAwesomeIcon icon={faCog} />
      </button>
      <p>서버이름: {serverId} 채널이름: {serverId}</p>
      <button
        className={`icon-btn ${isVideoOn ? "active" : ""}`}
        onClick={handleOpenVideoModal}
      >
        <FontAwesomeIcon icon={faVideo} />
        <p>Video</p>
      </button>
      {isVideoModalOpen && (
        <VideoModal onClose={handleCloseVideoModal} />
      )}
    </div>
  );
}

export default Settings;