import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MyContext } from '../Context';
import { CampDataInfo } from '../types/campDataType';
import * as C from "../styled-components/commonStyled"

import styled from 'styled-components';

import DetailSwiper from '../components/DetailSwiper';
import DetailMainInfo from '../components/DetailMainInfo';
import DetailIntro from '../components/DetailIntro';
import DetailSubInfo from '../components/DetailSubInfo';
import DetailFacilityInfo from '../components/DetailFacilityInfo';
import KakaoMap from '../components/KakaoMap';




const Detail: React.FC = () => {
  const { state, campApiGet, sessionData } = useContext<any>(MyContext);
  const { contentId } = useParams();

  const [imgIconUrl, setImgIconUrl] = useState<string>("")



const test = async() =>{
  const contentItem = sessionData.find((item: CampDataInfo) => item.contentId === contentId);
  if (contentItem) {
    sessionStorage.setItem("detailData", JSON.stringify(contentItem));
    await campApiGet("IMGGET",contentId);
  } 
}


  

  const detailItem: string | null = sessionStorage.getItem("detailData");
  const detailData: CampDataInfo = detailItem ? JSON.parse(detailItem) : '';


  useEffect(()=>{
    test();
  },[contentId, campApiGet, sessionData])


  return (
    <C.Section>
        <DetailSwiper props={state.data} />
      <C.Wrap>
        <DetailMainInfo props={detailData} ></DetailMainInfo>
        <DetailIntro props={detailData} ></DetailIntro>
        <DetailSubInfo props={detailData}></DetailSubInfo>
        <DetailFacilityInfo props={detailData}></DetailFacilityInfo>
        <KakaoMap props={detailData}></KakaoMap>
      </C.Wrap>
    </C.Section>
  )
}

export default Detail 