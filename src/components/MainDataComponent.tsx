import React, { useContext } from 'react'
import styled from 'styled-components'
import { MyContext } from '../Context'
import { CampDataInfo, DataComponentProps } from '../types/campDataType'
import { Link } from 'react-router-dom'



const MainDataLi = styled.li`
    margin: 10px 0;
`

const ListLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    text-decoration: none;
`

const LeftBox = styled.div`
    width: 40%;
    aspect-ratio: 1.5;
`

const Right = styled.div`
    width: 50%;
`

const MainDataImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
`

const MainDataTitle = styled.p`
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const MainDataIntro = styled.p` 
    font-size: 0.8rem;
    line-height: 1.2;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`



const MainDataComponet: React.FC<DataComponentProps> = ({props}) => {

    const { mainBg01, mainBg02, mainBg03, mainBg04 } = useContext<any>(MyContext);


    return (
        <MainDataLi>
            <ListLink to={`/detail/${props.contentId}`}>
                <LeftBox>
                    <MainDataImg src={props.firstImageUrl} ></MainDataImg>
                </LeftBox>
                <Right>
                    <MainDataTitle>{props.facltNm}</MainDataTitle>
                    <MainDataIntro>{props.lineIntro ? props.lineIntro : props.intro}</MainDataIntro>
                </Right>
            </ListLink>

        </MainDataLi>
    )
}

export default MainDataComponet