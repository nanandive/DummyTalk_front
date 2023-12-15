// SignUpForm.js
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callPostSignUp } from '../../api/UserAPICalls'
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [userName, setUserName] = useState('');
  const [nickname, setNickname] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate for navigation
  const dispatch = useDispatch();



  const data = useSelector(state => state.signUpReducer);

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleNicknameChange = (e) =>{
    setNickname(e.target.value);
  }

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserPhone = (e) => {
    setUserPhone(e.target.value);
  };

  
  const user = {
    name : userName,
    nickname : nickname,
    userEmail: userEmail,
    password: password,
    userPhone : userPhone
  };


  const onClickSignUp = () =>{
    dispatch(callPostSignUp(user))
    navigate('/');
  }
  const handleKeyDown = (event) => {
    const key = event.code;
    switch(key){
      case 'Enter':
        onClickSignUp()
        break;
      default:
    }
  }


  const onClickTest = () =>{
    console.log(user)
  }



  return (
    <div>
      <h2 onClick={() => onClickTest() }>회원가입 양식</h2>
        <div>
          <div>이름</div>
          <input
            type="text"
            value={userName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="name">닉네임:</label>
          <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
          />
        </div>
      <div>
        <label htmlFor="name">전화번호:</label>
        <input
            type="text"
            value={userPhone}
            onChange={handleUserPhone}
        />
      </div>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            value={userEmail}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <button onClick={() => onClickSignUp()}>가입하기</button>
        </div>
      </div>
  )
}

export default SignUpForm;