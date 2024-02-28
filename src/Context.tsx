import React, { useReducer, useState } from 'react'
import axios from 'axios';
import { createContext } from 'react'

import mainBg01 from './assets/imgs/main_bg_01.png';
import mainBg02 from './assets/imgs/main_bg_02.jpg';
import mainBg03 from './assets/imgs/main_bg_03.jpg';
import mainBg04 from './assets/imgs/main_bg_04.jpg';

import vlot from './assets/imgs/ico_volt.png';
import wifi from './assets/imgs/ico_wifi.png';
import ground from './assets/imgs/ico_ground.png';
import hotwater from './assets/imgs/ico_hotwater.png';
import mart from './assets/imgs/ico_mart.png';
import playzone from './assets/imgs/ico_playzone.png';
import pool from './assets/imgs/ico_pool.png';
import sports from './assets/imgs/ico_sports.png';
import tramp from './assets/imgs/ico_tramp.png';
import walk from './assets/imgs/ico_walk.png';
import wood from './assets/imgs/ico_wood.png';


import footerHomeIcon from './assets/imgs/footer_home.svg';
import footerFavIcon from './assets/imgs/footer_favorite.svg';
import footerMyIcon from './assets/imgs/footer_mypage.svg';
import footerSetIcon from './assets/imgs/footer_setting.svg';



import { CampDataInfo } from './types/campDataType';

export const MyContext = createContext({});


export default function Context({ children }: { children: React.ReactNode }) {

    let key: string = "";
    let id: string = "";
    let nick: string = "";
    if (typeof window !== "undefined") {
        const userData = sessionStorage.getItem("user");
        if (userData) {
            key = JSON.parse(userData).key;
            id = JSON.parse(userData).id;
            nick = JSON.parse(userData).nick;
        }
    }



    const swiperImg: string[] = [mainBg01, mainBg02, mainBg03, mainBg04];

    const facImg = {
        vlot: vlot,
        wifi: wifi,
        ground: ground,
        hotwater: hotwater,
        mart: mart,
        playzone: playzone,
        pool: pool,
        sports: sports,
        tramp: tramp,
        walk: walk,
        wood: wood
    };

    const footerImg = {
        home: footerHomeIcon,
        fav: footerFavIcon,
        mypage: footerMyIcon,
        set: footerSetIcon
    };


    function reducer(state: any, action: any) {
        switch (action.type) {
            // 발생할 수 있는 상황 LOADING, SUCCESS, ERROR에 대한 case를 만들어 줍니다.
            // 로딩중 상태 업데이트
            case 'LOADING':
                return {
                    loading: true,
                    data: null,
                    error: null
                };
            // 불러오는데에 성공했을 때는 action.data를 저장해줍니다.
            case 'SUCCESS':
                return {
                    loading: false,
                    data: action.data,
                    error: null
                };
            // 에러가 발생하면 action.error를 전달해주겠습니다.
            case 'ERROR':
                return {
                    loading: false,
                    data: null,
                    error: action.error
                };
            default:
                throw new Error(`Unhandled action type: ${action.type}`);
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    function pageNoReducer(state: any, action: any) {
        switch (action.type) {
            case "PLUS":
                return state + 1;
            default:
                return state;
        }
    }

    const [pageNo, pageNoDispatch] = useReducer(pageNoReducer, 1);

    const campBase = axios.create({
        baseURL: "https://apis.data.go.kr/B551011/GoCamping",
        params: {
            serviceKey: process.env.REACT_APP_CAMP_API_KEY,
            MobileOS: "WIN",
            MobileApp: "test",
            _type: "json",
            pageNo: pageNo
        }
    })

    const campApiGet = async (type: any, instanceData?: any) => {
        dispatch({ type: 'LOADING' });

        try {
            let res;

            switch (type) {
                case "ALL":
                    res = await campBase.get(`/basedList?numOfRows=9999&_type=json`);

                    if (instanceData.doNm && (!instanceData.sigunguNm || instanceData.sigunguNm === "전체/시/군")) {
                        res = res.data.response.body.items.item.filter((item: CampDataInfo) => item.doNm === instanceData.doNm);
                    } else if (instanceData.doNm && instanceData.sigunguNm) {
                        res = res.data.response.body.items.item.filter((item: CampDataInfo) => item.doNm === instanceData.doNm && item.sigunguNm === instanceData.sigunguNm);
                    } else {
                        res = res.data.response.body.items.item;
                    }
                    break;

                case "LOCATION":
                    res = await campBase.get(`/locationBasedList?numOfRows=10&pageNo=${pageNo}&mapX=${instanceData.long}&mapY=${instanceData.lat}&radius=20000`);
                    res = res.data.response.body.items.item;
                    break;

                case "KEYWORD":
                    res = await campBase.get(`/searchList?numOfRows=9999&pageNo=${pageNo}&keyword=${instanceData}`);
                    res = res.data.response.body.items.item;

                    break;
                case "IMGGET":
                    res = await campBase.get(`/imageList?numOfRows=10&pageNo=1&contentId=${instanceData}`);
                    res = res.data.response.body.items.item;
                    break;
                case "FAV":
                    res = await campBase.get(`/basedList?numOfRows=9999&_type=json`);
                    res = res.data.response.body.items.item.filter((item: CampDataInfo)=> instanceData.includes(item.contentId))
                    break;
            }
            dispatch({ type: 'SUCCESS', data: res });
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }
    }




    // geolocation
    interface Geolocation {
        latitude: number | null;
        longitude: number | null;
    }

    const [geolocation, setGeolocation] = useState<Geolocation>({
        latitude: null,
        longitude: null,
    });



    const getGeolocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    // 위치 정보 가져오기 성공
                    const { latitude, longitude } = position.coords;
                    setGeolocation({ latitude, longitude });
                    await campApiGet("LOCATION", { lat: latitude, long: longitude });
                },
                (error) => {
                    // 위치 정보 가져오기 실패
                    console.error('Error getting geolocation:', error);
                }
            );
        }

    }

    const [displayMode, setDisplayMod] = useState<boolean>(false);



    if (state.data) {
        const a = state.data.filter((item: CampDataInfo) => item.firstImageUrl)
        sessionStorage.setItem("data", JSON.stringify(a));
    } else {
        sessionStorage.removeItem("data")

    }


    const sesstionCampData: string | null = sessionStorage.getItem("data")
    const sessionData: CampDataInfo[] = sesstionCampData ? JSON.parse(sesstionCampData) : [];



    return (
        <MyContext.Provider value={{ state, campApiGet, pageNo, pageNoDispatch, swiperImg, getGeolocation, geolocation, displayMode, setDisplayMod, sessionData, facImg, footerImg, key, id, nick }}>
            {children}
        </MyContext.Provider>
    )
}
