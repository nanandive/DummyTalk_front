// Friends.js
import React, { useState, useEffect } from 'react';
import FriendsModal from './FriendsModal'; // Correct the path based on your file structure
import './css/Friends.css'; // Ensure that you have your Friends.css file

function Friends() {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        onClick={handleInviteClick}
        disabled={!selectedFriend}
      >
        초대하기
      </button>

      <FriendsModal isOpen={isModalOpen} closeModal={closeModal}>
        <h2>친구 초대</h2>
        <p>초대 메시지를 작성하세요.</p>
        <button onClick={closeModal}>닫기</button>
      </FriendsModal>
    </div>
  );
}

export default Friends;
