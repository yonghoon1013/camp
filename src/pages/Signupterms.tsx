import React, { useState } from 'react'
import styled from 'styled-components'
import * as C from "../styled-components/commonStyled"
import { Link, useNavigate } from 'react-router-dom'
import { LoginLogo } from './Login'
import check from '../assets/imgs/check.svg'
import checkColor from '../assets/imgs/check_color.svg'
import TermsItem from '../components/TermsItem'

import termsData from '../json/terms.json'
import { TermsData } from '../types/termsType'


const TermsBox = styled.form`

`

const TermsAllBox = styled.div`
  
`

const TermsAllCon = styled.div`
  margin-top: 4%;
  margin-left: 8%;
`

const CheckWrap = styled.div`
  
`

const CheckInput = styled.input`
  display: none;
`

const CheckLabel = styled.label<{ $checkProps: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 8%;
  cursor: pointer;

  &::before{
    content: '';
    background-image: ${props => props.$checkProps ? `url(${checkColor})` : `url(${check})`};
    background-repeat: no-repeat;
    background-size: 30px;
    width: 32px;
    height: 32px;
    position: absolute;
    left: 0;
  }
`

const CheckSpan = styled.span`
  
`

const OpSpan = styled.span`
  margin-left: 5px;
`

const CheckUl = styled.ul`
  
`
const CheckLi = styled.li`
  margin-top: 50px;
`

const TermsItemCon = styled.div`
    margin-top: 20px;
    margin-left: 8%;
    max-height: 150px;
    background-color: #ffffff;
    border: 1px solid black;
    overflow: auto;
`

const TermsTextBox = styled.div`
    padding: 3%;

`

const TermsH3 = styled.h3`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
`

const TermsText = styled.p`
    line-height: 1.2;
    font-size: 0.8rem;
`

const BtnBox = styled.div`
  width: 100%;
  margin: 20px 0;
`

const TermsBtn = styled.button<{$allCheck : boolean; $req : boolean}>`
  width: 100%;
  padding: 10px;
  background-color: ${props=> props.$allCheck || props.$req ? "green" : "#8990a0"};
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
`


const Signupterms: React.FC = () => {
  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [checkLi, setCheckLi] = useState<boolean[]>(Array(termsData.length).fill(false));
  const [req ,setReq] = useState<boolean>(false);
  const navigate = useNavigate();

  const all = async () => {
    setAllCheck(!allCheck);
    setCheckLi(Array(termsData.length).fill(!allCheck));
  }

  const test = async (index: number) => {
    const up = [...checkLi];
    up[index] = !up[index];
    setCheckLi(up);

    setAllCheck(up.every((item) => item))
    setReq(up.filter((item, i) => termsData[i].op).every((item) => item));
  }





  return (
    <C.LoginSection>
      <C.LoginWrap>
        <LoginLogo to={'/'}>CAMP</LoginLogo>

        <TermsBox onSubmit={()=>{navigate('/signup')}}>
          <TermsAllBox>
            <CheckWrap>
              <CheckInput onChange={() => { all() }} type='checkbox' id='termsAll' name='termsAll' checked={allCheck} ></CheckInput>
              <CheckLabel $checkProps={allCheck} htmlFor='termsAll'>
                <CheckSpan>전체 동의하기</CheckSpan>
              </CheckLabel>
              <TermsAllCon>
                실명 인증된 아이디로 가입, 위치기반서비스 이용약관(선택), 이벤트・혜택 정보 수신(선택) 동의를 포함합니다.
              </TermsAllCon>
            </CheckWrap>
          </TermsAllBox>

          <CheckUl>
            {
              termsData.map((item, index) => (
                <CheckLi key={index}>
                  <CheckInput required={item.op} onChange={() => { test(index) }} type='checkbox' id={item.id} name={item.id} checked={checkLi[index]}></CheckInput>
                  <CheckLabel $checkProps={checkLi[index]} htmlFor={item.id}>
                    <CheckSpan>{item.termsTitle}</CheckSpan>
                    <OpSpan>[{item.op ? "필수" : "선택"}]</OpSpan>
                  </CheckLabel>
                  <TermsItemCon>

                    {
                      item.termsText.map((item, index) => (
                        <TermsTextBox key={index}>
                          <TermsH3>{item.termsH3}</TermsH3>
                          <TermsText>{item.termstext}</TermsText>
                        </TermsTextBox>
                      ))
                    }

                  </TermsItemCon>
                </CheckLi>
              ))
            }
          </CheckUl>
          <BtnBox>
            <TermsBtn $allCheck={allCheck} $req={req} disabled={!allCheck && !req}>다음으로</TermsBtn>
            </BtnBox>
        </TermsBox>
      </C.LoginWrap>
    </C.LoginSection>
  )
}

export default Signupterms