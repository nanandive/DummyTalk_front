import React, { useState } from "react";
import ChannelModal from "./Channl_Modal";

function Channels() {
  const [channels, setChannels] = useState([""]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addChannel = (newChannelName) => {
    if (channels.length <= 3) {
      setChannels([...channels, newChannelName]);
    } else {
      alert("더 이상 채널을 추가할 수 없습니다. (최대 3개)");
    }
  };

  return (
    <>
      <div className="border">
        <div className="channel_title">채널</div>
        <ul>
          {channels.map((channel, index) => (
            <li key={index}>{channel}</li>
          ))}
        </ul>
        <button className="addChannel" onClick={openModal} disabled={channels.length >4 }>
          채널 생성
        </button>

        {isModalOpen && (
          <ChannelModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            addChannel={addChannel}
          />
        )}
      </div>
    </>
  );
}

export default Channels;
