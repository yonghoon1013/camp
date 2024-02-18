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
        const loadKakaoMap = () => {
            if (window.kakao && window.kakao.maps && props) {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(props.mapY, props.mapX),
                };
                const map = new window.kakao.maps.Map(container, options);

                if (props) {
                    const markerPosition = new window.kakao.maps.LatLng(props.mapY, props.mapX);
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                    });

                    marker.setMap(map);

                    const iwContent = `<div style="">${props.facltNm}<br><a href="https://map.kakao.com/link/to/${props.facltNm},${props.mapY},${props.mapX}" style="color:blue" target="_blank">길찾기</a></div>`;
                    const iwPosition = new window.kakao.maps.LatLng(props.mapY, props.mapX);

                    const infowindow = new window.kakao.maps.InfoWindow({
                        position: iwPosition,
                        content: iwContent,
                    });

                    infowindow.open(map, marker);
                }
            }
        };

        if (!window.kakao || !window.kakao.maps) {
            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
            script.async = true;

            script.onload = () => {
                window.kakao.maps.load(loadKakaoMap);
            };
            document.head.appendChild(script);
        } else {
            loadKakaoMap();
        }

    }, [props, props.mapX, props.mapX]);

    
    return (
        <KakaoMapBox>
            <Map id='map'></Map>
        </KakaoMapBox>
    )
}

export default KakaoMap