import React from 'react'
import styled from 'styled-components'
import { DataComponentProps } from '../types/campDataType'

import telIcon from '../assets/imgs/tel_icon.svg';
import homepageIcon from '../assets/imgs/homepage_icon.svg';


const DetailMainInfoBox = styled.div`

`

export const DetailH3 = styled.h3`
  margin-top: 30px;
  font-size: 1.5rem;
  font-weight: bold;
`

const DetailMainInfoP = styled.p<{ $tel?: boolean, $homepage?: boolean}>`
  font-size: 1rem;
  display: flex;
  align-items: center;
  &::before{
    content: ${props => (props.$tel ? `url(${telIcon})` : props.$homepage ? `url(${homepageIcon})` : '')};
    margin-right: 10px;
  }
  margin: 10px 0;
`







const DetailMainInfo: React.FC<DataComponentProps> = ({props}) => {


  return (
    <DetailMainInfoBox>
      <DetailH3>{props.facltNm}</DetailH3>
      <DetailMainInfoP>{props.addr1}</DetailMainInfoP>
      <DetailMainInfoP $tel >{props.tel}</DetailMainInfoP>
      <DetailMainInfoP $homepage><a href={props.homepage} target='_brank'>{props.homepage}</a></DetailMainInfoP>
    </DetailMainInfoBox>
  )
}

export default DetailMainInfo