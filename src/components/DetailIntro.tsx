import React, { useState } from 'react'
import { DataComponentProps } from '../types/campDataType'
import styled from 'styled-components';
import { DetailH3 } from './DetailMainInfo';

const DetailMainItroBox = styled.div`
  position: relative;

`

const DetailIntroP = styled.p<{ $closeProps?: boolean }>`
  margin-top: 20px;
  line-height: 1.3;
  white-space: normal;
  display: ${props => props.$closeProps ? "block" : "-webkit-box"};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const IntroMoreBtn = styled.button`
margin-top: 10px;
  border: none;
  width: 100%;
  cursor: pointer;
  aspect-ratio: 12;
`

const IntroBox = styled.div<{ $closeProps: boolean }>`
  display: ${props => props.$closeProps ? "block" : "none"};
  width: 100%;
  height: ${props => props.$closeProps ? "" : "100%"};
  padding: 5%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,.25);
`

const CloseBtn = styled.div`
  text-align: end;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
`


const DetailIntro: React.FC<DataComponentProps> = ({ props }) => {

  const [close, setClose] = useState<boolean>(false);


  return (
    <DetailMainItroBox>
      <DetailH3>캠핑장 소개</DetailH3>
      <DetailIntroP>{props.intro ? props.intro : "소개가 등록되어있지 않습니다."}</DetailIntroP>
      <IntroMoreBtn onClick={() => { setClose(!close) }}>더보기</IntroMoreBtn>
      <IntroBox $closeProps={close}>
        <CloseBtn onClick={() => { setClose(!close) }}>X</CloseBtn>
        <DetailIntroP $closeProps={close}>{props.intro ? props.intro : "소개가 등록되어있지 않습니다."}</DetailIntroP>
      </IntroBox>
    </DetailMainItroBox>
  )
}

export default DetailIntro