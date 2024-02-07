import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate   } from 'react-router-dom';
import { MyContext } from '../Context';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from 'styled-components';
import imgLoading from '../assets/imgs/default_img.jpg';
import backIcon from '../assets/imgs/arrow-gray-icon.svg';
import { CampImgInfo, CampImgProps } from '../types/campDataType';


const SwiperComponent = styled(Swiper)`
    /* width: 100%; */
    position: relative;
`

const BackBtn = styled.button`
    cursor: pointer;
    z-index: 5;
    background: none;
    border: none;
    position: absolute;
    top: 10px;
    left: 10px;
`

const SwiperSlideComponent = styled(SwiperSlide)`
    width: 100%;
    aspect-ratio: 2;
`

const SwiperImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const ImgLoadingBox = styled.img`
    width: 100%;
    aspect-ratio: 2;
    object-fit: cover;
`


const DetailSwiper: React.FC<CampImgProps> = ({props}) => {
    const { state, campApiGet, sessionData } = useContext<any>(MyContext);

    const { contentId } = useParams();
    const navigate  = useNavigate();

    const back = async() =>{
        navigate(-1);
    }
    

    if(state.data){
        sessionStorage.setItem("detailImg", JSON.stringify(props));
    }
    

    const detailImgItem: string | null = sessionStorage.getItem("detailImg");
    const detailImgData: CampImgInfo[] = detailImgItem ? JSON.parse(detailImgItem) : '';
    

    if (state.loading) return <ImgLoadingBox src={imgLoading}></ImgLoadingBox>
    return (
        <SwiperComponent>
            <BackBtn onClick={()=>{back()}}><img src={backIcon}></img></BackBtn>
            {
                detailImgData.map((item: any, index: number)=>(
                    <SwiperSlideComponent key={index}><SwiperImg onError={(e)=>{e.currentTarget.src = imgLoading;
                    }} src={item.imageUrl ? item.imageUrl : imgLoading }></SwiperImg></SwiperSlideComponent>

                    ))
            }
        </SwiperComponent>
    )
}

export default DetailSwiper