import React from 'react'
import styled from 'styled-components'
import {AiFillHome} from 'react-icons/ai'

const StyledIcons = styled.div`
    margin-top: 25px;
    display: flex;
    justify-content: center;
`
const Icons = () => {
    // TODO add motion
    return (
        <StyledIcons>
            <AiFillHome color='grey' fontSize="3.0em"/>
        </StyledIcons>
    )

}

export default Icons
