
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
                    alert('Error!!')
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
            }}
        >
            <form style={{ display: 'flex', flexDirection: 'column' }} 
            onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;

