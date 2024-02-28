import React, { useState } from 'react'
import styled from 'styled-components'

const HamBox = styled.div`
    position: relative;
    width: 30px;
    aspect-ratio: 1.5;
    /* background-color: #a3a3db; */
    cursor: pointer;
    
`

const HamSpan = styled.span<{$onProps: boolean}>`
    position: absolute;
    display: inline-block;
    width: 100%;
    border: 1px solid black;
    transition: all 0.2s linear;
    &:nth-of-type(1){
        top: ${props =>(props.$onProps ? "50%" : "0")};
        transform : ${props =>(props.$onProps ? "translateY(-50%) rotate(45deg)" : "rotate(0deg)")};
    }
    &:nth-of-type(2){
        top:50%;
        opacity: ${props =>(props.$onProps ? "0" : "1")};
    }
    &:nth-last-of-type(1){
        top: ${props =>(props.$onProps ? "50%" : "100%")};
        transform : ${props =>(props.$onProps ? "translateY(-50%) rotate(-45deg)" : "rotate(0deg)")};
    }
`



interface HamMenuProps {
    children?: React.ReactNode;
  } 

const HamMenu: React.FC<HamMenuProps> = ({ children }) => {
    const [on,setOn] = useState<boolean>(false);
    const spanNum: number[] = [1, 2, 3];

    const test = () =>{
        setOn(!on)
    }

  return (
        <HamBox onClick={()=>{test()}}>
            {
                spanNum.map((index)=>(
                    <HamSpan $onProps={on} key={index}></HamSpan>
                ))
            }
        </HamBox>
  )
}

export default HamMenu