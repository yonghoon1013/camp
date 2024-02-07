import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { MyContext } from '../Context';
import { useLocation } from 'react-router-dom';
import ListDataComponent from '../components/ListDataComponent';
import { CampDataInfo } from '../types/campDataType';
import Header from '../components/Header';
import * as C from "../styled-components/commonStyled"
import Footer from '../components/Footer';


const ListDataUl = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const ListLength = styled.p`
    margin: 5% 0;
    font-size: 1.3rem;
    font-weight: bold;
`

const MoreBtn = styled.button<{$displayProps : boolean}>`
    display: ${props => (props.$displayProps ? 'none' : 'flex')};
    justify-content:center;
    align-items: center;
    width: 50%;
    margin: 20px auto 30px auto;
    /* margin-bottom: 30px; */
    border: none;
    border-radius: 30px;
    aspect-ratio: 7;
    cursor: pointer;
`

const List: React.FC = () => {
    const { campApiGet, state, displayMode, setDisplayMod, sessionData } = useContext<any>(MyContext);
    const [num, setNum] = useState<number>(10);

    const more = async() =>{
        if(sessionData.slice(0, num).length === sessionData.length){
            setDisplayMod(true);
        } else{
            setNum(num + 10);
            setDisplayMod(true);
        }
    }



    if (state.loading) return (<div>로딩중....</div>)
    return (
        <C.Section>
            <Header></Header>
            <C.Wrap>
                <ListLength>{sessionData.length}개의 검색 결과</ListLength>
                <ListDataUl>
                    {
                        sessionData.slice(0, num).map((item: CampDataInfo, index: number) => (
                            <ListDataComponent key={index} props={item}></ListDataComponent>
                        ))
                    }
                </ListDataUl>
            <MoreBtn onClick={()=>{more()}} $displayProps={displayMode} >더보기</MoreBtn>
            </C.Wrap>
            <Footer />
        </C.Section>
    )
}

export default List