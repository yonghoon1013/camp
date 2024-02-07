import React, { useContext } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MyContext } from '../Context';


const SwiperComponent = styled(Swiper)`
    width: 100%;
    height: 100%;
    margin: 20px 0;
`

const SwiperSlideComponent = styled(SwiperSlide)`
    width: 100%;
    height: 150px;
`

const SwiperImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
`

const MainEventSwiper: React.FC = () => {

    const { swiperImg } = useContext<any>(MyContext);

    return (
        <SwiperComponent>
                {
                    swiperImg.map((item: string, index: number)=>(
                        <SwiperSlideComponent key={index}><SwiperImg src={item}></SwiperImg></SwiperSlideComponent>
                    ))
                }
        </SwiperComponent>
    )
}

export default MainEventSwiper