
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { useNavigate } from "react-router-dom";


function LoginPage(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 단순한 걸로 reload 되는 것을 미리 막아준다.

        console.log('Email:', Email)
        console.log('Password:', Password)
        // 로그인 처리를 여기에 추가하면 됩니다.
        let body = {
            email: Email,
            password: Password
        }
        // redux dispatch를 이용해 action을 취함
        // 아래 request 처리 부분을 redux에서 실행함 -> user_action.js
        // axios.post('/api/users/login', body).then(response => {response.data});
        // loginUser === action name

        dispatch(loginUser(body)) //dispatch를 이용해서 action을 취할 것.
            .then(response => {
                if(response.payload.loginSuccess) {
                    navigate('/')
                } else {
                    alert('아이디와 패스워드를 입력하세요.')
                    console.log(response)
                }
            })
 
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                backgroundColor: '#f0f0f0',
            }}
        >
    <div
        style={{
          width: '300px',
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          borderRadius: '5px',
        }}
      >
            <form style={{ display: 'flex', flexDirection: 'column' }} 
            onSubmit={onSubmitHandler}>
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                <input type="email" style={{
              padding: '8px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              fontSize: '14px',
            }} value={Email} onChange={onEmailHandler} />

                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
                <input type="password" style={{
              padding: '8px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              fontSize: '14px',
            }} value={Password} onChange={onPasswordHandler} />
                <br />

                <button style={{
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '16px',
            }} type="submit">Login</button>
            </form>
            </div>
        </div>
    );
}

export default LoginPage;

