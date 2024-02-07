import React, { useContext } from 'react'
import { DataComponentProps } from '../types/campDataType'
import styled from 'styled-components'
import vlot from '../assets/imgs/ico_volt.png';
import wifi from '../assets/imgs/ico_wifi.png';
import { DetailH3 } from './DetailMainInfo';
import { MyContext } from '../Context';

const DetailFacBox = styled.div`

`

const FacUl = styled.ul`
    margin-top : 20px;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(5,1fr);
    gap: 2%;
    row-gap: 20px;
`

const FacLi = styled.li`
    text-align: center;
`

const FacIcon = styled.img`
    
`

const FacIconName = styled.p`
    width: 100%;
    line-height:2;
`

const DetailFacilityInfo: React.FC<DataComponentProps> = ({ props }) => {

    const { facImg } = useContext<any>(MyContext);

    const sbrsSplit = props.sbrsCl ? props.sbrsCl.split(','): [];

    


    const getImageUrl = (item: string) => {
        switch (item.trim()) {
            case '전기':
                return facImg.vlot;
            case '무선인터넷':
                return facImg.wifi;
            case '장작판매':
                return facImg.wood;
            case '온수':
                return facImg.hotwater;
            case '트렘폴린':
                return facImg.tramp;
            case '놀이터':
                return facImg.playzone;
            case '운동시설':
                return facImg.sports;
            case '물놀이장':
                return facImg.pool;
            case '마트.편의점':
                return facImg.mart;
            case '운동장':
                return facImg.ground;
            case '산책로':
                return facImg.walk;
            default:
                return wifi;
        }
    };

    return (
        <DetailFacBox>
            <DetailH3>시설정보</DetailH3>
            <FacUl>
                {
                    sbrsSplit.map((item: any, index: number) => (
                        <FacLi key={index}>
                            <FacIcon src={getImageUrl(item)}></FacIcon>
                            <FacIconName>{item}</FacIconName>
                        </FacLi>
                    ))
                }

            </FacUl>
        </DetailFacBox>
    )
}

export default DetailFacilityInfo