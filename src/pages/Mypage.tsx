import React, { useContext, useState } from 'react'
import styled, { css } from 'styled-components';
import * as C from "../styled-components/commonStyled"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import arr from '../assets/imgs/arrow-gray-icon.svg'
import arrNext from '../assets/imgs/arrow-next.svg'
import { MyContext } from '../Context';


const H2Box = styled.div`
    text-align: center;
    position: relative;
`

const H2 = styled(Link)`
    text-align: center;
    font-size: 1.5rem;
    text-decoration: none;
    font-weight: bold;
    padding: 5% 0;
    color: black;
    display: inline-block;
`

const BackImg = styled.img`
    position:absolute;
    top: 50%;
    left: 5%;
    transform: translate(-5%, -50%);
    cursor: pointer;
`

const ProfileBox = styled(Link)`
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: space-between;
    padding: 3% 0;
`

const MyInfo = styled.div`

`

const Nick = styled.span`
    font-weight: bold;
`

const FavBox = styled.div`
    
`



const MypageSec = styled.div`
    display: flex;
    flex-direction:column;
    margin: 5% 0;
`

const H3 = styled.p`
    font-size: 1.2rem;
    font-weight:bold;
    padding-bottom: 10px;
`

const TextLink = styled(Link)`
    text-decoration: none;
    color: black;
    line-height:1.5;
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    &::after{
        content:'';
        display: inline-block;
        background-image: url(${arrNext});
        background-repeat: no-repeat;
        width: 10px;
        height: 18px;

    }
`

const LoginLink = styled(Link)`
    text-decoration: none;
    color: #000000;
    font-size: 2rem;
    font-weight: bold;
    position: absolute;
    top: 10%;
    left: 50%;
    transform:translate(-50%, -10%);
`

const LogOutBtn = styled.button`
    border: none;
    background-color: #a8a8a8;
    color: red;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1.5%;
    cursor: pointer;
`


const Mypage: React.FC = () => {
    const { nick, id, key } = useContext<any>(MyContext);
    const navigate  = useNavigate();

    const back = async() =>{
        navigate(-1);
    }

    const logout = async() =>{
        sessionStorage.removeItem("user");
        navigate('/')
    }


    if (!key) {
        return <C.Section><C.Wrap><LoginLink to={'/login'}>로그인 하기</LoginLink></C.Wrap></C.Section>
    }
    return (
        <C.Section>
            <C.Wrap>
                <H2Box>
                <BackImg onClick={()=>{back()}} src={arr}></BackImg>
                    <H2 to={'/'}>MY CAMP</H2>
                </H2Box>
                <ProfileBox to={'/'}>
                    <MyInfo><Nick>{nick}</Nick>의 CAMPZONE</MyInfo>
                    <img src={arrNext}></img>
                </ProfileBox>

                <MypageSec>
                    <TextLink to={'/'}>나의 찜 목록</TextLink>
                </MypageSec>

                <MypageSec>
                    <H3>고객센터</H3>
                    <TextLink to={'/'}>공지사항</TextLink>
                    <TextLink to={'/'}>자주 묻는 질문</TextLink>
                    <TextLink to={'/'}>1:1 문의</TextLink>
                    <TextLink to={'/'}>서비스 약관</TextLink>
                </MypageSec>

                <MypageSec>
                    <LogOutBtn onClick={()=>{logout()}}>로그아웃</LogOutBtn>
                </MypageSec>
            </C.Wrap>
        </C.Section>
    )
}

export default Mypage