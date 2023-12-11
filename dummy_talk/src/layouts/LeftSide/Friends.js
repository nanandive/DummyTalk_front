// Friends.js
import { useEffect, useState } from 'react';
import FriendsModal from '../../components/modals/FriendsModal'; // Correct the path based on your file structure
import './css/Friends.css'; // Ensure that you have your Friends.css file
import { useModal } from "src/components/hooks/use-modal";

function Friends() {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { onOpen, isOpen } = useModal()

  useEffect(() => {
    // Mock data
    const dummyData = [
      { id: 1, name: '친구1' },
      { id: 2, name: '친구2' },
      { id: 3, name: '친구3' },
      { id: 4, name: '친구4' },
      { id: 5, name: '친구5' },
    ];

    setFriends(dummyData);
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
        {friends.map((friend) => (
          <li
            key={friend.id}
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
