// Channels.js

import { useEffect, useState } from "react";
import { useModal } from "src/components/hooks/use-modal";
import "./css/Channels.css";
import {useUrlQuery} from "src/components/hooks/use-url-query";
import axios from "axios";
import {Link} from "react-router-dom";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [channelId, setChannelId] = useState(null);
  const { onOpen, onClose, data } = useModal()
  const query = useUrlQuery()
  const serverId = query.get('server')

  /* 채널 리스트 함수 */
  useEffect(() => {
    const channelList = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/server/${serverId}/channel/list`);
        setChannels(response.data);
      console.log("채널 리스트 성공 >>>>>>>> : ", response.data);
    }catch (error){
      console.log("채널 리스트 실패 >>>>>>>> : ", error);

    }
    };
    channelList();
  }, [serverId]);

  
  /* 접속중인 유저 정보 */
  useEffect(() => {
    if (channelId) {
      setConnectedUsers(channelId.connectedUsers || []);
    }
  }, [channelId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addChannel = (newChannelName) => {
    if (channels.length <= 10) {
      setChannels([...channels, { name: newChannelName, connectedUsers: [] }]);
    } else {
      alert("더 이상 채널을 추가할 수 없습니다. (최대 10개)");
    }
  };

  const handleChannelClick = (index) => {
    const selectedChannel = channels[index];
    setChannelId(selectedChannel);
  };

  const handleJoinChannel = () => {
    setChannels((prevChannels) => {
      const updatedChannels = prevChannels.map((channel) => ({
        ...channel,
        connectedUsers: channel === channelId ? connectedUsers : channel.connectedUsers,
      }));
      console.log(`Joining Channel: ${channelId.name}`);
      console.log(`Connected Users: ${connectedUsers.length}`);
      return updatedChannels;
    });
  };

  /* 채널 삭제 */
    const channelDelete = async () => {
      if (channelId && channelId.id) {
        try {
          const response = await axios.delete(`http://localhost:9999/server/${serverId}/channel/${channelId.id}/delete`);
          console.log(`채널 삭제 성공:`, response.data);
          setChannels(channels.filter(channel => channel.id !== channelId.id));
          setChannelId(null); // 선택된 채널 초기화
        } catch (error) {
          console.error(`채널 삭제 실패: ${error}`);
        }
      } else {
        console.log("삭제할 채널이 선택되지 않았습니다.");
      }
    };



    return (
    <>
      {/* 채널 리스트 */}
      {/* 채널 리스트 렌더링 */}
      <div className="channels-container">
        <div className="channels-list">
          <div className="channels-title">채널 목록</div>
          <div className="flex flex-col">
            {channels.map((channel, index) => (
                <Link to={`/main?server=${serverId}&channel=${index + 1}`} key={channel.id} onClick={() => handleChannelClick(index)}>
                  {channel.channelName} {/* 채널의 이름을 렌더링 */}
                </Link>
            ))}
          </div>

          {/* 채널 생성 */}
          <button
              className="create-channel-btn"
              onClick={() => onOpen('createChannel', { serverId })}
              disabled={channels.length >= 3}
          >
            채널 생성
          </button>
        </div>

        {channelId && (
            <div>
              <button className="join-channel-btn" onClick={handleJoinChannel}>
                채널명: {channelId.channelName}<br />
                접속중인 사람: {connectedUsers.channelCount}
              </button>
              <button className="delete-channel-btn" onClick={channelDelete}>
                채널삭제
              </button>
            </div>
        )}
      </div>
    </>
  );
};

export default Channels;
