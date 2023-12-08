// Channels.js

import React, { useState, useEffect } from "react";
import ChannelModal from "./Channl_Modal";  // 올바른 파일명으로 수정
import "./css/Channels.css";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    if (selectedChannel) {
      setConnectedUsers(selectedChannel.connectedUsers || []);
    }
  }, [selectedChannel]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addChannel = (newChannelName) => {
    if (channels.length < 4) {
      setChannels([...channels, { name: newChannelName, connectedUsers: [] }]);
    } else {
      alert("더 이상 채널을 추가할 수 없습니다. (최대 3개)");
    }
  };

  const handleChannelClick = (index) => {
    const selectedChannel = channels[index];
    setSelectedChannel(selectedChannel);
  };

  const handleJoinChannel = () => {
    setChannels((prevChannels) => {
      const updatedChannels = prevChannels.map((channel) => ({
        ...channel,
        connectedUsers: channel === selectedChannel ? connectedUsers : channel.connectedUsers,
      }));
      console.log(`Joining Channel: ${selectedChannel.name}`);
      console.log(`Connected Users: ${connectedUsers.length}`);
      return updatedChannels;
    });
  };
  

  return (
    <>
      <div className="channels-container">
        <div className="channels-list">
          <div className="channels-title">채널 목록</div>
          <ul>
            {channels.map((channel, index) => (
              <li
                key={index}
                className={JSON.stringify(channel) === JSON.stringify(selectedChannel) ? "selected-channel" : ""}
                onClick={() => handleChannelClick(index)}
              >
                {channel.name}
              </li>
            ))}
          </ul>
          <button
            className="create-channel-btn"
            onClick={openModal}
            disabled={channels.length >= 3}
          >
            채널 생성
          </button>
        </div>

        {selectedChannel && (
          <button
            className="join-channel-btn"
            onClick={handleJoinChannel}
          >
            채널명: {selectedChannel.name}<br />
            접속중인 사람: {connectedUsers.length}
          </button>
        )}
      </div>

      {isModalOpen && (
        <ChannelModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          addChannel={addChannel}
        />
      )}
    </>
  );
};

export default Channels;
