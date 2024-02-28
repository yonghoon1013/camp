import React, { useState } from 'react'
import styled from 'styled-components'
import * as C from "../styled-components/commonStyled"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'



const LoginBox = styled.div`
  text-align: center;
`
export const LoginLogo = styled(Link)`
  text-decoration: none;
  color: black;
  display: inline-block;
  font-size: 3rem;
  font-weight: bold;
  margin: 5% 0;
  cursor: pointer;
`

const LoginForm = styled.form`
    border: 1px solid black;
    padding: 5%;
    border-radius: 10px;
`

const LoginInputBox = styled.div`
  display: flex;
  flex-direction: column;
`

const LoginInput = styled.input`
  padding: 3%;
  border: none;
  outline-color: #2B5740;
  &:nth-of-type(1){
    border: 1px solid black;
    border-radius: 10px 10px 0px 0px;
  }
  &:nth-of-type(2){
    border: 1px solid black;
    border-top: none;
    border-radius: 0px 0px 10px 10px;
  }
`

const LoginBtn = styled.button`
  width: 100%;
  padding: 3%;
  margin: 3% 0;
  border-radius: 10px;
  border : none;
  cursor: pointer;
`

const LoginSign = styled(Link)`
  display:flex;
  justify-content: flex-end;
  text-decoration: none;
  color: black;
  cursor: pointer;
`



const Login: React.FC = () => {
  const [resetId,setResetId] = useState<string>('');
  const [resetPw,setResetPw] = useState<string>('');

  const navigate = useNavigate();

  const test = async(e: any) =>{
    e.preventDefault();
    const formData = new FormData(e.target);  
    const objData = Object.fromEntries(formData);
    
    setResetId('');
    setResetPw('');
    try{
      const res = await axios.get(`https://port-0-campserver-jvpb2alnb8mvcd.sel5.cloudtype.app/login?id=${objData.id}&&pw=${objData.pw}`);
      if(!res.data){
        alert("아이디 및 비밀번호가 틀렸습니다.");
      }else{
        sessionStorage.setItem("user", JSON.stringify( {key: `${res.data.key}`, id: `${res.data.id}`, nick:`${res.data.nick}` }));
        navigate('/');
      }
    }catch(err){
      alert("죄송합니다 서버 점검중입니다.")
    }

  }

  
  return (
    <C.LoginSection>
      <C.LoginWrap>
        <LoginBox>
          <LoginLogo to={'/'}>CAMP</LoginLogo>

          <LoginForm onSubmit={(e)=>{test(e)}}>
            <LoginInputBox>
              <LoginInput required type='text' name='id' placeholder='아이디' value={resetId} onChange={(e)=>{setResetId(e.target.value)}}></LoginInput>
              <LoginInput required type='password' name='pw' placeholder='패스워드' value={resetPw} onChange={(e)=>{setResetPw(e.target.value)}}></LoginInput>
            </LoginInputBox>

            <LoginBtn>로그인</LoginBtn>

            <LoginSign to={"/signupterms"}>회원가입</LoginSign>

          </LoginForm>
        </LoginBox>
      </C.LoginWrap>
    </C.LoginSection>
  )
}

export default Login