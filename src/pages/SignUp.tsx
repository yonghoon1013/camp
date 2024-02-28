import React, { useState } from 'react'
import styled, { css } from 'styled-components';
import * as C from "../styled-components/commonStyled"
import { Link, useNavigate } from 'react-router-dom'
import { LoginLogo } from './Login'
import axios from 'axios'



const SignUpBox = styled.form`
  
`

const SignItem = styled.div`

`

const SignUpTitle = styled.p`
  margin: 3% 0;
`

const SignUpInput = styled.input<{ $pwCheck?: boolean; $effCheck?: boolean; $idCheck?: boolean; }>`
  width: 100%;
  padding: 3%;
  border-radius: 10px;
  border: 1px solid #858585;
  ${props =>
    (props.$pwCheck !== undefined && !props.$pwCheck) ?
    css`
    border: 2px solid red;
  ` : ""}

    ${props =>
    (props.$effCheck !== undefined && !props.$effCheck) ||
      (props.$idCheck !== undefined && !props.$idCheck) ?
      css`
    border: 2px solid red;
  ` : ""}
`

const RedCheckP = styled.p`
  margin: 10px 0;
  color: red;
  font-size: 0.8rem;
  line-height: 1.2;
`

const SignUpBtn = styled.button`
  width: 100%;
  padding: 3%;
  border-radius: 10px;
  border: none;
  margin: 3% 0;
  cursor: pointer;
`




const SignUp: React.FC = () => {
  const [pw, setPw] = useState();
  const [pw2, setPw2] = useState();
  const [pwCheck, setPwCheck] = useState<boolean>(true);
  const [idCheckValue, setIdCheckValue] = useState<boolean>(true);
  const [effValue, setEffValue] = useState<boolean>(true);

  const navigate = useNavigate();

  const SignUpPost = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("key", Date.now().toString());
    formData.delete('pwCheck');
    const objData = Object.fromEntries(formData);


    try{
      const res = await axios.post(`${process.env.REACT_APP_CLOUDTYPE}sign`,objData);
      sessionStorage.setItem("user", JSON.stringify( {key: `${res.data.key}`, id: `${res.data.id}`, nick:`${res.data.nick}` }));
      navigate('/')
    } catch(err){
      alert("죄송합니다 서버 점검중입니다.")
    }
  }



  const qw = async (e: any) => {
    setPw(e.target.value);
    if (pw2 === e.target.value) {
      setPwCheck(true);

    } else {

      setPwCheck(false);
    }
  }

  const test = async (e: any) => {
    setPw2(e.target.value)
    if (pw === e.target.value) {
      setPwCheck(true);
    } else {
      setPwCheck(false);
    }
  }


  const ko = async (e: any) => {
    idCheck(e.target.value);
    const eff = /^[a-z][a-z0-9]{3,20}$/;

    if (eff.test(e.target.value)) {
      setEffValue(true);
    } else {
      setEffValue(false);

    }

  }

  const idCheck = async (id: any) => {
    const res = await axios.get(`https://port-0-campserver-jvpb2alnb8mvcd.sel5.cloudtype.app/idCheck?id=${id}`);
    setIdCheckValue(res.data);

  }

  return (

    <C.LoginSection>
      <C.LoginWrap>
        <LoginLogo to={'/'}>CAMP</LoginLogo>

        <SignUpBox onSubmit={(e) => { SignUpPost(e) }}>

          <SignItem>
            <SignUpTitle>아이디</SignUpTitle>
            <SignUpInput $effCheck={effValue} $idCheck={idCheckValue} type='text' name='id' required onChange={(e) => ko(e)}></SignUpInput>
            <RedCheckP>{effValue ? "" : "아이디는 소문자와 영문자를 포함한 3~20자 사이만 가능합니다."}</RedCheckP>
            <RedCheckP>{idCheckValue ? "" : "이미 존재하는 아이디입니다."}</RedCheckP>
          </SignItem>

          <SignItem>
            <SignUpTitle>비밀번호</SignUpTitle>
            <SignUpInput type='password' name='pw' required onChange={(e) => { qw(e) }}></SignUpInput>
          </SignItem>

          <SignItem>
            <SignUpTitle>비밀번호 확인</SignUpTitle>
            <SignUpInput $pwCheck={pwCheck} type='password' name='pwCheck' required onChange={(e) => { test(e) }}></SignUpInput>
            <RedCheckP>{pwCheck ? "" : "비밀번호가 일치하지 않습니다."}</RedCheckP>
          </SignItem>

          <SignItem>
            <SignUpTitle>닉네임</SignUpTitle>
            <SignUpInput type='text' name='nick' required></SignUpInput>
          </SignItem>

          <SignUpBtn disabled={!pwCheck || !idCheckValue}>회원가입</SignUpBtn>
        </SignUpBox>
      </C.LoginWrap>
    </C.LoginSection>
  )
}

export default SignUp