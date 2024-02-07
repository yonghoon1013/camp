import React from 'react'
import styled from 'styled-components'

export const Section = styled.section`
    background-color: white;
    min-width: 340px;
    max-width: 640px;
	margin: 0 auto;
    padding-bottom: 10%;
`

export const Wrap = styled.div`
		padding: 0 5%;
`

const commonStyled: React.FC = () => {
    return (
        <div>commonStyled</div>
    )
}

export default commonStyled