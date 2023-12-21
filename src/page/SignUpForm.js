// SignUpForm.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { callPostSignUp, callPostMail, callPostCheck } from '../api/UserAPICalls';
import { useGoogleLogin } from "@react-oauth/google";

import styles from './SignUpForm.module.css'


const SignUpForm = () => {
    const [userName, setUserName] = useState('');
    const [nickname, setNickname] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userSubmit, setUserSubmit] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [check, setCheck] = useState(false);
    const [language, setLanguage] = useState('');
    const [click, setClick] = useState(false);

    const navigate = useNavigate(); // Initialize navigate for navigation
    const dispatch = useDispatch();

    const data = useSelector(state => state.checkReducer);
    const [stateData, setStateData] = useState(data);


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
      if(e.target.value == checkPassword){
          setCheck(true);
      } else{
          setCheck(false);
      }
  };

    const handleCheckPasswordChange =  (e) => {
        setCheckPassword(e.target.value);
        if(e.target.value == password){
            setCheck(true);
        } else{
            setCheck(false);
        }
    };

    const handleLanguageChange = (e) =>{
        setLanguage(e.target.value)
    }

  const handleUserPhone = (e) => {
    setUserPhone(e.target.value);
  };

  
  const user = {
    name : userName,
    nickname : nickname,
    userEmail: userEmail,
    password: password,
    userPhone : userPhone,
    userSubmit:userSubmit,
    nationalLanguage : language
  };


    const onClickSignUp = () =>{
        navigate("/")
        dispatch(callPostSignUp(user))
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
      dispatch(callPostCheck(userSubmit))
  }

    const onClickTest = () =>{
        console.log(userEmail)
    }


  return (
    <div className={styles.page}>
        <br></br>
        <div onClick={onClickTest} className={styles.titleWrap}>
            <h1>회원가입 양식</h1>
        </div>
        <br></br>
        <div className={styles.contentWrap}>

            <div className={styles.inputTitle}>이름</div>
            <div className={`${styles.inputWrap}`}>
                <input className={styles.input}
                       type="text" value={userName}
                       onChange={handleNameChange} />
            </div>

            <div className={styles.inputTitle}>닉네임</div>
            <div className={`${styles.inputWrap}`}>
                <input className={styles.input}
                       type="text" value={nickname}
                       onChange={handleNicknameChange} />
            </div>

            <div className={styles.inputTitle}>전화번호</div>
                <div className={`${styles.inputWrap}`}>
                <input className={styles.input}
                       type="text" value={userPhone}
                       onChange={handleUserPhone} />
            </div>

            <div className={styles.inputTitle}>이메일</div>
            <div className={`${styles.inputWrap}`}>
                <input className={styles.input}
                   type="email" value={userEmail}
                   onChange={handleEmailChange} />
                <button onClick={onClickMail} className={styles.submit}>전송</button>
            </div>


            <div className={styles.inputTitle}>이메일 인증</div>
            <div className={`${styles.inputWrap}`}>
                <input className={styles.input}
                   type="text" value={userSubmit}
                   onChange={handleSubmitChange} />
                <button onClick={onClickCheck} className={styles.submit}>확인</button>
            </div>
            {data &&
                <div style={ data.status == 200 ? {color:"green"}: {color:"red"} }>
                    {data.data}
                </div>
            }
            <div className={styles.inputTitle}>비밀번호</div>
            <div className={`${styles.inputWrap}`}>
                <input
                className={styles.input}
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyDown}
                />
            </div>
            <div className={styles.inputTitle}>비밀번호 확인</div>
            <div className={`${styles.inputWrap}`}>
                <input
                    className={styles.input}
                    type="password"
                    value={checkPassword}
                    onChange={handleCheckPasswordChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div style={ checkPassword == '' ? {display:"none"}  : {display:"block"}}>
                {checkPassword && checkPassword== password ?
                    <div style={ {color:"green"} }>
                        일치합니다
                    </div>:
                    <div style={ {color:"red"} }>
                        불일치합니다.
                    </div>
                }
            </div>
            <div className={styles.inputTitle}>국가선택</div>
            <select className={styles.input} onChange={handleLanguageChange}>
                <option value="국가선택" disabled selected hidden>
                    언어 선택
                </option>
                <option value="한국어">한국어</option>
                <option value="English">English</option>
            </select>
        </div>
      <div>
        <button onClick={() => onClickSignUp()} disabled={!userName || !userPhone || !userEmail || !check || data.status== 500} className={styles.bottomButton}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;