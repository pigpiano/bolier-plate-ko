import React, { useEffect } from 'react'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  
  //useEffect는 컴포넌트가 랜더링 될 때마다 원하는 작업을 실행되도록 설정할 수 있는 기능.
  //useEffect(()=> {}, [])
  useEffect(() => {
    axios.get('/api/hello') 
      .then(response => console.log(response.data))
  }, [])

  const navigate = useNavigate();

  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if(response.data.success) {
          alert('로그아웃 됐습니다.')
          navigate('/login')
        } else {
          alert('로그아웃 하는데 실패 했습니다.')
        }
      })
  }


  return (
    <div style={ {display: 'flex', justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', height: '100vh',  backgroundColor: '#f0f0f0',}}
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

      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
        시작 페이지
      </h2>
      <br />

      <button onClick={onClickHandler} style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '16px',
          }}>
        로그아웃
      </button>
      </div>
    </div>
  )
}

export default LandingPage

