import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as C from "../styled-components/commonStyled"
import { Link } from 'react-router-dom'
import check from '../assets/imgs/check.svg'
import checkColor from '../assets/imgs/check_color.svg'
import { TermsData } from '../types/termsType'



const CheckItem = styled.li`
    margin-top: 100px;
`

const CheckInput = styled.input`
  display: none;
`

const CheckLabel = styled.label<{ $checkProps: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 8%;
  cursor: pointer;

  &::before{
    content: '';
    background-image: ${props => props.$checkProps ? `url(${checkColor})` : `url(${check})`};
    background-repeat: no-repeat;
    background-size: 30px;
    width: 32px;
    height: 32px;
    position: absolute;
    left: 0;
  }
`

const CheckSpan = styled.span`
  
`

const TermsItemCon = styled.div`
    margin-top: 20px;
    margin-left: 8%;
    max-height: 150px;
    background-color: #ffffff;
    border: 1px solid black;
    overflow: auto;
`

const TermsTextBox = styled.div`
    padding: 3%;
`

const TermsH3 = styled.h3`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
`

const TermsText = styled.p`
    line-height: 1.2;
    font-size: 0.8rem;
`

const TermsItem: React.FC<{  props: TermsData; allCheck: boolean; length:number }> = ({ props, allCheck, length  }) => {
    const [checked,setChecked] = useState<boolean>(false);
    
    

    const test = async() =>{
        setChecked(!checked);

    }

    return (
        <CheckItem>
            <CheckInput type='checkbox' id={props.id} name={props.id} checked={checked} onChange={()=>test()} ></CheckInput>
            <CheckLabel $checkProps={checked} htmlFor={props.id}>
                <CheckSpan>{props.termsTitle}</CheckSpan>
            </CheckLabel>
            <TermsItemCon>
                {
                    props.termsText.map((item, index) => (
                        <TermsTextBox key={index} >
                            <TermsH3>{item.termsH3}</TermsH3>
                            <TermsText>{item.termstext}</TermsText>
                        </TermsTextBox>
                    ))
                }
            </TermsItemCon>
        </CheckItem>
    )
}

export default TermsItem