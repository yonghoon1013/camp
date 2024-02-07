import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Context';
import Header from '../components/Header';
import MainEventSwiper from '../components/MainEventSwiper';
import * as C from "../styled-components/commonStyled"
import MainDataComponet from '../components/MainDataComponent';
import styled from 'styled-components';
import { CampDataInfo } from '../types/campDataType';
import Footer from '../components/Footer';

const MainDataUl = styled.ul`
    display: flex;
    flex-direction: column;
`

const Home: React.FC = () => {

    const { campApiGet, state, pageNo, pageNoDispatch, getGeolocation, geolocation, sessionData } = useContext<any>(MyContext);
    
    useEffect(()=>{
        getGeolocation();   
    },[])

    if (state.loading) return (<div>로딩중....</div>)
    return (
        <C.Section>
            <Header />
            <C.Wrap>
                <MainEventSwiper />
                <MainDataUl>
                    {
                        sessionData.map((item: CampDataInfo, index: number)=>(
                            <MainDataComponet key={index} props={item}></MainDataComponet>
                        ))
                    }
                </MainDataUl>
            <Footer />
            </C.Wrap>
        </C.Section>
    )
}

export default Home