import React from "react";
import styled from 'styled-components'

import { headerBackground } from "../themeVars";
const StyledHeader = styled.div`
    display: flex;
    height: 80px ;
    padding: 0px;
    justify-content: space-between;
    width: 100%;
    background: ${headerBackground};
    box-shadow: inset 0px -1px 0px #fbe9c3;
    display: flex;
`
const Header = () => {
    return (
        <StyledHeader>
            <h1> TODO HEADER  </h1>
        </StyledHeader>
    )
} 

export default Header