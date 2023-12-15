import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'
import { callPotLogin } from '../../api/UserAPICalls'
import '../SignUp.module.css';
import { jwtDecode, InvalidTokenError } from 'jwt-decode';

export default function SignUp() {

  const accessToken = window.localStorage.getItem('accessToken');
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;

  const navigate = useNavigate(); // Initialize navigate for navigation

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const dispatch = useDispatch();

  const user = {
    userEmail: email,
    password: pw,
  };

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const onClickConfirmButton = () => {

    dispatch( callPotLogin(user) )
    navigate('/');
  };
  

  const onClickSignUpButton = () => {
    // Add your logic for handling sign-up button click
    // For example, navigate to the sign-up form
    navigate('/sign-up-form');
  };

  const onClickTest = () =>{
    console.log(decodedToken.nickname)
  }

  if(accessToken){
    return <Navigate to="/" replace />
  }

  const handleKeyDown = (event) => {
    const key = event.code;
    switch(key){
      case 'Enter':
        onClickConfirmButton()
          console.log("Test")
        break;
      default:
    }
  }

  return (
    <div className="page">
      <div onClick={() => onClickTest()} className="titleWrap">
        이메일과 비밀번호를
        <br />
        입력해주세요          
      </div>

      <div className="contentWrap">
        <div className="inputTitle">이메일 주소</div>
        <div className={`inputWrap ${!emailValid && email.length > 0 ? 'error' : ''}`}>
          <input
            className="input"
            type="text"
            placeholder="test@gmail.com"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요.</div>}
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          비밀번호
        </div>
        <div className={`inputWrap ${!pwValid && pw.length > 0 ? 'error' : ''}`}>
          <input
            className="input"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePw}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>}
        </div>
      </div>

      <div>
        <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
          확인
        </button>
        <button onClick={onClickSignUpButton} className="bottomButton">
          회원가입
        </button>
      </div>
    </div>
  )
}