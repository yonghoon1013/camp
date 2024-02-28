import React, { useContext } from 'react'
import styled from 'styled-components'
import vlot from '../assets/imgs/ico_volt.png';
import { MyContext } from '../Context';
import { Link } from 'react-router-dom';

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
    aspect-ratio: 1;
`

const FooterLink = styled(Link)`
    display: block;
    width: 10%;
    margin: 5%;
    padding: 3%;
    background-color: white;
    border-radius: 20px;
    box-shadow: rgba(207, 207, 207, 0.25) 0px 2px 6px 0px;
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
                <FooterLink to={'/'}><FooterLi><FooterIcon src={footerImg.home}></FooterIcon></FooterLi></FooterLink>
                <FooterLink to={'/favorite'}><FooterLi><FooterIcon src={footerImg.fav}></FooterIcon></FooterLi></FooterLink>
                <FooterLink to={'/mypage'}><FooterLi><FooterIcon src={footerImg.mypage}></FooterIcon></FooterLi></FooterLink>
                <FooterLink to={'/'}><FooterLi><FooterIcon src={footerImg.set}></FooterIcon></FooterLi></FooterLink>
            </FooterUl>
        </FooterBox>
    )
}

export default Footer