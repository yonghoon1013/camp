import React from 'react'
import styled from 'styled-components'

export const Section = styled.section`
    background-color: white;
    min-height: 100vh;
    min-width: 340px;
    max-width: 640px;
	margin: 0 auto;
    padding-bottom: 200px;
`

export const Wrap = styled.div`
		padding: 0 5%;
`


export const LoginSection = styled.div`
    background-color: white;
    min-width: 340px;
    max-width: 640px;
	margin: 0 auto;
    padding-top: 150px;
    min-height: 100vh;
`
export const LoginWrap = styled.div`
		padding: 5%;
`

const commonStyled: React.FC = () => {
    return (
        <div>commonStyled</div>
    )
}

export default commonStyled