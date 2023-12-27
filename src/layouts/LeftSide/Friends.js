// Friends.js
import { useEffect, useState } from 'react';
import FriendsModal from '../../components/modals/FriendsModal';
import './css/Friends.css';
import { useModal } from "src/components/hooks/use-modal";
import axios from "axios";
import {useUrlQuery} from "src/components/hooks/use-url-query";
import {callGetFriend} from "src/api/MainAPICalls";
import {useDispatch, useSelector} from "react-redux";

function Friends() {
  const [accessUser, setAccessUser] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onOpen, isOpen } = useModal()
  const query = useUrlQuery()
  const serverId = query.get("server")
  const dispatch =  useDispatch()
  const data = useSelector(state => state.friendReducer);


  // 서버 초대된 유저 리스트
  useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}/server/access/${serverId}`)
          .then(response => {
              setAccessUser(Array.isArray(response.data) ? response.data : []);
              console.log("(서버에 초대된 유저 리스트 불러오기 성공 >>>>>>>>>>>>>> ", response)
          })
  }, [serverId]);


    useEffect(() => {
        // Mock data
        dispatch(callGetFriend());
    }, []);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const handleInviteClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="friends-container">
      <h2 style={{color:"teal"}}>서버 접속자</h2>
        <ul className="access-list">
            {accessUser.map((user) => (
                <li
                    key={user.id}
                    className={user === selectedFriend ? 'selected-friend' : ''}
                    onClick={() => handleFriendClick(user)}
                >
                    {user.nickname} ({user.userEmail})
                </li>
            ))}
        </ul>
      <h2>친구 목록</h2>
      <ul className="friends-list">
        {data && data.length > 0 && data.map((friend) => (
          <li
            key={friend.userId}
            className={friend === selectedFriend ? 'selected-friend' : ''}
            onClick={() => handleFriendClick(friend)}
          >
            {friend.name}
          </li>
        ))}
      </ul>


        <button
          className="open-settings-btn"
          onClick={() => onOpen("invitedUser", { serverId })}
      >초대/강퇴
      </button>

      
    </div>
  );
}

export default Friends;
