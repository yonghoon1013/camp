import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { DataComponentProps } from '../types/campDataType';

declare global {
    interface Window {
        kakao: any;
    }
}

const KakaoMapBox = styled.div`
    margin-top: 30px;
    width: 100%;
    aspect-ratio: 2;
`

const Map = styled.div`
    width:100%;
    height:100%;
`

const KakaoMap: React.FC<DataComponentProps> = ({ props }) => {



    useEffect(() => {


        let container = document.getElementById(`map`); // 지도를 담을 영역의 DOM 레퍼런스
        let options = {
            center: new window.kakao.maps.LatLng(props.mapY, props.mapX), // 지도 중심 좌표
            level: 3, // 지도의 레벨(확대, 축소 정도)
        };

        let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        const markerPosition = new window.kakao.maps.LatLng(props.mapY, props.mapX);
        const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map,
        });


        const iwContent = `<div style="padding:5%;">${props.facltNm} <br><a href="https://map.kakao.com/link/map/${props.facltNm},` + props.mapY + ',' + props.mapX + `" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${props.facltNm},` + props.mapY + ',' + props.mapX + '" style="color:blue" target="_blank">길찾기</a></div>';
        const iwPosition = new window.kakao.maps.LatLng(props.mapY, props.mapX);

        const infowindow = new window.kakao.maps.InfoWindow({
            position: iwPosition,
            content: iwContent,
        });

        infowindow.open(map, marker);

    }, [props, props.mapX, props.mapX]);


    return (
        <KakaoMapBox>
            <Map id='map'></Map>
        </KakaoMapBox>
    )
}

export default KakaoMap