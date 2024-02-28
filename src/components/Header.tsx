import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import locationImageColor from '../assets/imgs/location-color.png'
import locationImageWhite from '../assets/imgs/location-white.png'
import searchIcon from '../assets/imgs/search-icon.png'
import cityJson from "../json/city.json";
import { MyContext } from '../Context'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const HeaderBox = styled.div`
background-color: #2B5740;
padding: 5%;
position: relative;
`

const LogoText = styled(Link)`
color: white;
font-size: 2rem;
text-decoration: none;
`

const SearchBox = styled.div`
    position: relative;
height: 40px;
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 30px;
`

const KeywordSearchForm = styled.form`
width: 70%;
height: 100%;
position: relative;
`

const KeywordInput = styled.input`
width: 100%;
height: 100%;
border: none;
border-radius: 30px;
font-size: 14px;
padding-left: 3%;
background-color: white;

&:focus{
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25);
    outline: #707070 1px solid;
}
`

const LocationBtn = styled.div`
width: 40px;
aspect-ratio: 1;
border-radius: 50%;
cursor: pointer;
background: #FE7762 url(${locationImageWhite}) center no-repeat;
`

const SearchBtn = styled.button`
cursor: pointer;
width: 30px;
aspect-ratio: 1;
border: none;
background: white url(${searchIcon}) center no-repeat;
position: absolute;
top: 50%;
right: 2%;
transform:translate(-2%,-50%);
`

const LocationSearchBox = styled.div<{ $closeProps: boolean }>`
z-index: 99;
display: ${props => (props.$closeProps ? 'block' : 'none')};
padding: 10%;
position: absolute;
top: -1px;
left: 50%;
transform:translateX(-50%);
border-radius: 20px;
background-color: white;
box-shadow: 0 2px 6px 0 rgba(0,0,0,.25);
width: 85%;
`

const LocationSearchForm = styled.form`

`

const LocationSearchTilte = styled.p`
    display:flex;
    align-items: center;
    &::before{
        content: url(${locationImageColor})
    }
    margin-bottom: 20px;
`

const LocationSelect = styled.select`
    -webkit-appearance: none;  /* 크롬 화살표 없애기 */
    -moz-appearance: none; /* 파이어폭스 화살표 없애기 */
    appearance: none;  /* 화살표 없애기 */
width: 100%;
height: 40px;   
border: 1px solid #999999;
border-radius: 10px;
margin: 10px 0;
padding-left: 10px;
&:focus{
    border: 1px solid #47d170;
    outline: 1px solid #95bea1;
}
`

const LocationOption = styled.option`

`

const LocationSearchBtn = styled.button`
    margin-top: 10px;
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border:none;
    background-color: #FE7762;
    color: white;
    font-size: 16px;
    cursor: pointer;
`

const CloseBtn = styled.div`
    position:absolute;
    top:10%;
    right:5%;
    transform:translate(-5%, -10%);
    cursor: pointer;
    font-size:1.5rem;
`

const Test = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`


const HamBox = styled.div`
    position: relative;
    width: 30px;
    aspect-ratio: 1.5;
    /* background-color: #a3a3db; */
    cursor: pointer;
    
`

const Ham = styled.div`
    
`

const HamSpan = styled.span<{ $onProps: boolean }>`
    position: absolute;
    display: inline-block;
    width: 100%;
    border: 1px solid black;
    transition: all 0.2s linear;
    &:nth-of-type(1){
        top: ${props => (props.$onProps ? "50%" : "0")};
        transform : ${props => (props.$onProps ? "translateY(-50%) rotate(45deg)" : "rotate(0deg)")};
    }
    &:nth-of-type(2){
        top:50%;
        opacity: ${props => (props.$onProps ? "0" : "1")};
    }
    &:nth-last-of-type(1){
        top: ${props => (props.$onProps ? "50%" : "100%")};
        transform : ${props => (props.$onProps ? "translateY(-50%) rotate(-45deg)" : "rotate(0deg)")};
    }
`


const InfoLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-weight: bold;
`


const Header: React.FC = () => {

    const { campApiGet, state, displayMode, setDisplayMod, nick, id, key } = useContext<any>(MyContext);
    const [cityValue, setCityValue] = useState<string | boolean>(false);
    const [citySubValue, setCitySubValue] = useState<string | boolean>(false);
    const [close, setClose] = useState<boolean>(false);
    const [keywordValue, setKeywordValue] = useState<string>('');

    const navigate = useNavigate();



    const locationSubmit = async (e: any) => {
        e.preventDefault();
        await campApiGet("ALL", { doNm: cityValue, sigunguNm: citySubValue });
        navigate("/list");
        setDisplayMod(false);
    }

    const keywordSubmit = async (e: any) => {
        e.preventDefault();
        await campApiGet("KEYWORD", keywordValue);
        navigate("/list");
        setDisplayMod(false);
    }


    const [on, setOn] = useState<boolean>(false);
    const spanNum: number[] = [1, 2, 3];

    const test = () => {
        setOn(!on)
    }


    return (
        <HeaderBox>
            <Test>
                <LogoText to="/">캠핑장 여기 어떄?</LogoText>
                {
                    key ? <InfoLink to={"/mypage"}>{nick}님 환영합니다.</InfoLink> : <InfoLink to={"/login"}>로그인</InfoLink>
                }

                {/* <HamBox onClick={() => { test() }}>
                    <Ham>
                        {
                            spanNum.map((index) => (
                                <HamSpan $onProps={on} key={index}></HamSpan>
                            ))
                        }
                    </Ham>
                </HamBox> */}
            </Test>
            <SearchBox>
                <KeywordSearchForm onSubmit={(e) => { keywordSubmit(e) }}>
                    <KeywordInput type='text' placeholder='장소를 입력하세요.' onChange={(e) => { setKeywordValue(e.target.value) }} ></KeywordInput>
                    <SearchBtn></SearchBtn>
                </KeywordSearchForm>
                <LocationBtn onClick={() => { setClose(true) }}></LocationBtn>
                <LocationSearchBox $closeProps={close}>
                    <CloseBtn onClick={() => { setClose(false) }}>X</CloseBtn>
                    <LocationSearchTilte>지역별 검색</LocationSearchTilte>
                    <LocationSearchForm onSubmit={(e) => { locationSubmit(e) }}>
                        <LocationSelect onChange={(e) => {
                            if (e.target.value === "전체/도") {
                                setCityValue(false);
                            } else {
                                setCityValue(e.target.value);
                            }
                            setCitySubValue(false);
                        }}>
                            <option>전체/도</option>
                            {
                                cityJson.map((item, index) => (
                                    <option key={index}>{item.firstName}</option>
                                ))
                            }
                        </LocationSelect>

                        <LocationSelect onChange={(e) => { setCitySubValue(e.target.value) }}>
                            <option>전체/시/군</option>
                            {
                                cityJson.find((item) => item.firstName === cityValue)?.secondName.map(subItem => (
                                    <option key={subItem.id}>{subItem.area}</option>
                                ))
                            }
                        </LocationSelect>
                        <LocationSearchBtn>검색</LocationSearchBtn>
                    </LocationSearchForm>
                </LocationSearchBox>
            </SearchBox>
        </HeaderBox>
    )
}

export default Header