// SignUpForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callPostLogin } from '../../apis/UserAPICalls'

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add your form submission logic here
    // For simplicity, this example logs the form data to the console
    console.log('Submitted Form Data:', { name, email, password });

    // Clear the form fields after submission
    setName('');
    setEmail('');
    setPassword('');
  };

  const user = {
    name : name,
    email: email,
    password: password
  };

  const onClickTest = () =>{
    console.log(user)
  }

  const onClickSignUp = () =>{
    dispatch(callPostLogin(user))
  }

  return (
    <div>
      <h2 onClick={() => onClickTest() }>회원가입 양식</h2>
      <div onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button onClick={() => onClickSignUp()}>가입하기</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;