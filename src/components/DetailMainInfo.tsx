import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DataComponentProps } from '../types/campDataType'

import telIcon from '../assets/imgs/tel_icon.svg';
import homepageIcon from '../assets/imgs/homepage_icon.svg';

import like from '../assets/imgs/like_icon.svg'
import likeColor from '../assets/imgs/like_color_icon.svg'
import axios from 'axios';
import { MyContext } from '../Context';
import { useNavigate } from 'react-router-dom';

const DetailMainInfoBox = styled.div`

`

export const DetailH3 = styled.h3`

  font-size: 1.5rem;
  font-weight: bold;
`

const DetailMainInfoP = styled.p<{ $tel?: boolean, $homepage?: boolean }>`
  font-size: 1rem;
  display: flex;
  align-items: center;
  &::before{
    content: ${props => (props.$tel ? `url(${telIcon})` : props.$homepage ? `url(${homepageIcon})` : '')};
    margin-right: 10px;
  }
  margin: 10px 0;
`


const Box = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`

const FavBox = styled.div`
  display: flex;
  align-items:center;
  margin-left: 10px;
  cursor: pointer;
`
const FavImg = styled.img`
  width:18px;
  height: 18px;
`

const FavNum = styled.span`
  
`


const DetailMainInfo: React.FC<DataComponentProps> = ({ props }) => {
  const { key } = useContext<any>(MyContext);
  const { contentId } = props;
  const navigate = useNavigate();
  const [favLength, setFavLength] = useState<number>(0);
  const [fav, setFav] = useState();

  const test = async () => {

    if (key) {
      try {
        if (fav) {
          const favRes = await axios.delete(`https://port-0-campserver-jvpb2alnb8mvcd.sel5.cloudtype.app/fav?key=${key}&&contentId=${contentId}`);
          setFavLength(favRes.data.data.length);
          setFav(favRes.data.type);
        } else {
          const favRes = await axios.post(`https://port-0-campserver-jvpb2alnb8mvcd.sel5.cloudtype.app/fav`, { key, contentId });
          setFavLength(favRes.data.data.length)
          setFav(favRes.data.type);
        }
      } catch(err){
        alert("죄송합니다 서버 점검중입니다.")
      }
    }else {
      // eslint-disable-next-line no-restricted-globals
      const msg: boolean = confirm("로그인하시겠습니까?");
      if(msg){
        navigate('/login')
      }
    }
  }


  const favGet = async () => {
    try{
      const res = await axios.get(`https://port-0-campserver-jvpb2alnb8mvcd.sel5.cloudtype.app/fav?key=${key}&&contentId=${contentId}`);
      setFav(res.data.type);
      setFavLength(res.data.data.length);
    } catch(err){
      console.log("죄송합니다 서버 점검중입니다.");
      
    }
  }



  useEffect(() => {
    if (key) {
        favGet();
    }
  }, [contentId, favLength])

  return (
    <DetailMainInfoBox>
      <Box>
        <DetailH3>{props.facltNm}</DetailH3>
        <FavBox onClick={() => { test() }}>
          <FavImg src={fav ? likeColor : like}></FavImg>
          <FavNum>({favLength})</FavNum>
        </FavBox>
      </Box>
      <DetailMainInfoP>{props.addr1}</DetailMainInfoP>
      <DetailMainInfoP $tel >{props.tel}</DetailMainInfoP>
      <DetailMainInfoP $homepage><a href={props.homepage} target='_brank'>{props.homepage}</a></DetailMainInfoP>
    </DetailMainInfoBox>
  )
}

export default DetailMainInfo