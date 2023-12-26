// Friends.js
import { useEffect, useState } from 'react';
import FriendsModal from '../../components/modals/FriendsModal'; // Correct the path based on your file structure
import './css/Friends.css'; // Ensure that you have your Friends.css file
import { useModal } from "src/components/hooks/use-modal";
import {callGetFriend} from "src/api/MainAPICalls";
import {useDispatch, useSelector} from "react-redux";

function Friends() {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { onOpen, isOpen } = useModal()
  const dispatch =  useDispatch()
  const data = useSelector(state => state.friendReducer);


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
        className="invite-button"
        onClick={() => onOpen('friend')}
        disabled={isOpen}
      >
        초대하기
      </button>

      
    </div>
  );
}

export default Friends;
