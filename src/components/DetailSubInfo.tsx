import React from 'react'
import { DataComponentProps } from '../types/campDataType'
import styled from 'styled-components';
import { DetailH3 } from './DetailMainInfo';

const DetailSubInfoBox = styled.div`

`
const SubInfoTextBox = styled.div`
  margin-top: 20px;
`

const SubInfoP = styled.p`
  line-height: 1.3;
`

const DetailSubInfo: React.FC<DataComponentProps> = ({ props }) => {


  return (
    <DetailSubInfoBox>
      <DetailH3>기본정보</DetailH3>
      <SubInfoTextBox>
        <SubInfoP>캠핑장 유형 : {props.induty}</SubInfoP>
        <SubInfoP>테마 환경 : {props.themaEnvrnCl}</SubInfoP>
        <SubInfoP>애완동물 여부 : {props.animalCmgCl}</SubInfoP>
      </SubInfoTextBox>
    </DetailSubInfoBox>
  )
}

export default DetailSubInfo