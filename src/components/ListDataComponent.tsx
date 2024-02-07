import React, { useContext } from 'react'
import styled from 'styled-components'
import { MyContext } from '../Context'
import { CampDataInfo, DataComponentProps } from '../types/campDataType'
import { Link } from 'react-router-dom'





const ListDataLi = styled.li`
    width: 100%;
    margin: 10px 0;
`

const ListLink = styled(Link)`
    color: black;
    text-decoration: none;
`

const Top = styled.div`
    width: 100%;
    aspect-ratio: 2.5;
`

const Bottom = styled.div`
    >p{
        line-height: 1.3;
        margin: 5px 0;
    }
`

const ListDataImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
`
const ListDataTitle = styled.p`
    
`

const ListDataType = styled.p`

`

const ListDataLocation = styled.p`
    
`





const ListDataComponent: React.FC<DataComponentProps> = ({props}) => {



    const { state, campApiGet, mainBg01, mainBg02, mainBg03, mainBg04 } = useContext<any>(MyContext);


    return (
        <ListDataLi>
            <ListLink to={`/detail/${props.contentId}`}>
                <Top>
                    <ListDataImg src={props.firstImageUrl}></ListDataImg>
                </Top>

                <Bottom>
                    <ListDataTitle>{props.facltNm}</ListDataTitle>
                    <ListDataType>{props.induty}</ListDataType>
                    <ListDataLocation>{props.addr1}</ListDataLocation>
                </Bottom>
            </ListLink>
        </ListDataLi>
    )
}

export default ListDataComponent