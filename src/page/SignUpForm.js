// SignUpForm.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { callPostSignUp, callPostMail } from '../api/UserAPICalls';
import styles from './SignUp.module.css'; // Import your CSS module


const SignUpForm = () => {
    const [userName, setUserName] = useState('');
    const [nickname, setNickname] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userSubmit, setUserSubmit] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate for navigation
    const dispatch = useDispatch();


  const data = useSelector(state => state.mailReducer);

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleNicknameChange = (e) =>{
    setNickname(e.target.value);
  }

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
    const handleSubmitChange = (e) => {
        const regex =
            /^[0-9]+$/
        if (regex.test(e.target.value) || e.target.value === '')
        setUserSubmit(e.target.value);
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
    userPhone : userPhone,
    userSubmit:userSubmit
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


  const onClickMail = () =>{
      dispatch(callPostMail(userEmail))
  }

  const onClickCheck = () =>{
      if(data == userSubmit){
          alert("인증 되었습니다.")
      } else{
          alert("다시 입력해주시길 바랍니다.")
      }
  }

    const onClickTest = () =>{
        console.log(userSubmit)
        console.log(data)
    }


  return (
    <div className={styles.page}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2 onClick={() => onClickTest()}>회원가입 양식</h2>
      환영합니다
        <br />
        더미톡!!!
        <div>
            <div className={styles.input}>이름</div>
            <input type="text" value={userName} onChange={handleNameChange} />
        </div>
        <div>
            <div className={styles.input}>닉네임</div>
            <input type="text" value={nickname} onChange={handleNicknameChange} />
        </div>
        <div>
            <div className={styles.input}>전화번호</div>
            <input type="text" value={userPhone} onChange={handleUserPhone} />
        </div>
        <div>
            <div className={styles.input}>이메일</div>
            <input type="email" value={userEmail} onChange={handleEmailChange} />
            <button onClick={onClickMail} className={styles.input}>인증번호 전송</button>
        </div>
        <div>
            <div className={styles.input}>이메일 인증</div>
            <input type="text" value={userSubmit} onChange={handleSubmitChange} />
        </div>
        <div>
            <button onClick={onClickCheck} className={styles.input}>확인</button>
        </div>
        <div>
            <div className={styles.input}>비밀번호</div>
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyDown}
                />
        </div>
      <div>
        <button onClick={() => onClickSignUp()} disabled={!userName || !nickname || !userPhone || !userEmail || !password} className={styles.bottomButton}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;