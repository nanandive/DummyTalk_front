// Channels.js

import { useEffect, useState } from "react";
import { useModal } from "src/components/hooks/use-modal";
import "./css/Channels.css";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const { onOpen, onClose } = useModal()

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
            onClick={() => onOpen('createChannel', addChannel)}
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
    </>
  );
};

export default Channels;
