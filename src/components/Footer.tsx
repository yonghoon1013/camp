import React, { useContext } from 'react'
import styled from 'styled-components'
import vlot from '../assets/imgs/ico_volt.png';
import { MyContext } from '../Context';

const FooterBox = styled.div`
    min-width: 340px;
    max-width: 640px;
    width: 100%;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
`

const FooterUl = styled.ul`
    width : 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #F5F6FC;
`

const FooterLi = styled.li`
    background-color: white;
    width: 5%;
    aspect-ratio: 1;
    margin: 5%;
    padding: 3%;
    border-radius: 20px;
    box-shadow: 0 2px 6px 0 rgb(207 207 207 / 25%);
`

const FooterIcon = styled.img`
    width: 100%;
    height: 100%;
`

const Footer: React.FC = () => {

    const { footerImg } = useContext<any>(MyContext);


    return (
        <FooterBox>
            <FooterUl>
                <FooterLi><FooterIcon src={footerImg.home}></FooterIcon></FooterLi>
                <FooterLi><FooterIcon src={footerImg.fav}></FooterIcon></FooterLi>
                <FooterLi><FooterIcon src={footerImg.mypage}></FooterIcon></FooterLi>
                <FooterLi><FooterIcon src={footerImg.set}></FooterIcon></FooterLi>
            </FooterUl>
        </FooterBox>
    )
}

export default Footer