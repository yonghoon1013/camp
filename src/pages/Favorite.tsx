import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components';
import * as C from "../styled-components/commonStyled"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import likeWhite from '../assets/imgs/like_white_icon.svg'
import likeColor from '../assets/imgs/like_color_icon.svg'
import arr from '../assets/imgs/arrow-gray-icon.svg'

import { MyContext } from '../Context';
import { CampDataInfo } from '../types/campDataType';


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

const FavBox = styled.div`

`

const FavUl = styled.ul`

`

const FavLi = styled.li`
border-top: 1px solid black;
border-bottom: 1px solid black;
`

const LiLink = styled(Link)`
    display: flex;
align-items: center;
padding: 5%;
text-decoration: none;
color: black;
`

const Left = styled.div`
position: relative;
width: 30%;
aspect-ratio: 1.5;
`

const FavImg = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 10px;
`

const LikeImg = styled.img`
position: absolute;
right: 5%;
top: 5%;
width: 20px;
height: 20px;
cursor: pointer;
z-index: 80;
`

const Right = styled.div`
margin-left: 10%;
`

const P = styled.p`
    font-size: 0.8rem;
    line-height: 1.5;
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

const Favorite: React.FC = () => {
    const { campApiGet, key, state } = useContext<any>(MyContext);
    const navigate = useNavigate();
    const [favLeng, setFavLeng] = useState<boolean>(false);


    const back = async () => {
        navigate(-1);
    }

    const favGet = async () => {
        const res = await axios.get(`https://port-0-campserver-jvpb2alnb8mvcd.sel5.cloudtype.app/favPage?key=${key}`);
        const a = res.data.map((item: any) => item.contentId)
        await leng(a);
        if (res.data) {
            await campApiGet("FAV", a)
        }
    }

    const favDel = async (e: any, contentId: any) => {
        e.preventDefault();
        e.stopPropagation();
        const res = await axios.delete(`https://port-0-campserver-jvpb2alnb8mvcd.sel5.cloudtype.app/favPage?key=${key}&&contentId=${contentId}`);
        await leng(res.data);

        await favGet();
    }

    const leng = async (item: any) => {
        if (item.length > 0) {
            setFavLeng(true);
        } else {
            setFavLeng(false);
        }
    }

    useEffect(() => {
        if (key) {
            favGet();
        }
    }, [])



    if (state.loading) return (<div>로딩중....</div>)
    if (!key) {
        return <C.Section><C.Wrap><LoginLink to={'/login'}>로그인 하기</LoginLink></C.Wrap></C.Section>
    }


    return (
        <C.Section>
            <C.Wrap>
                <H2Box>
                    <BackImg onClick={() => { back() }} src={arr}></BackImg>
                    <H2 to={'/'}>MY FAVORITE</H2>
                </H2Box>
            </C.Wrap>
            <FavBox>
                {
                    favLeng ? <FavUl>
                        {
                            state.data ? state.data.map((item: CampDataInfo, index: number) =>
                                <FavLi key={index}>
                                    <LiLink to={`/detail/${item.contentId}`}>
                                        <Left>
                                            <FavImg src={item.firstImageUrl}></FavImg>
                                            <LikeImg onClick={(e) => { favDel(e, item.contentId) }} src={likeColor}></LikeImg>
                                        </Left>

                                        <Right>
                                            <P>{item.facltNm}</P>
                                            <P>{item.doNm} {item.sigunguNm}</P>
                                            <P>{item.induty}</P>
                                        </Right>
                                    </LiLink>
                                </FavLi>
                            )
                                : ""
                        }
                    </FavUl> : <div>즐겨찾기 된 캠핑장이 없습니다.</div>
                }
            </FavBox>

        </C.Section>
    )
}

export default Favorite