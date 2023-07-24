import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import {useNavigate} from 'react-router-dom';
function Register(props) {

    const navigate = useNavigate();  
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState('');

    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
      setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
};

const onSubmitHandler = (event) => {
        event.preventDefault(); // 단순한 걸로 reload 되는 것을 미리 막아준다.
        // 로그인 처리를 여기에 추가하면 됩니다.

        if(Password !== ConfirmPassword) {
          return alert('비밀번호와 비밀번호 확인은 같아야 합니다')
        }
        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    navigate('/login')
                } else {
                    alert("Failed to sign up")
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
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                <input type="email"  style={{
              padding: '8px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              fontSize: '14px',
            }} value={Email} onChange={onEmailHandler} />
                
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
                <input type="text"  style={{
              padding: '8px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              fontSize: '14px',
            }} value={Name} onChange={onNameHandler} />

                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
                <input type="password"  style={{
              padding: '8px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              fontSize: '14px',
            }} value={Password} onChange={onPasswordHandler} />

                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Confirm Password</label>
                <input type="password"  style={{
              padding: '8px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              fontSize: '14px',
            }} value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />

                <button type="submit" style={{
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '16px',
            }}>회원 가입</button>
            </form>
            </div>
        </div>
  )
}

export default Register
