import React from "react";
import styled from 'styled-components'
import {GiRocket} from 'react-icons/gi'
import {FaUserCircle} from 'react-icons/fa'
import { headerBackground } from "../themeVars";

// -- general padding 
const StyledPadding = styled.div`
    padding: 5px;
`
// ---- logo de Agil UGR -----
const StyledLogo  = styled.div`
    display: flex;
    flex-direction: row;
`
const Logo = () => {
    return (
        <StyledLogo>
            <StyledPadding>
                <GiRocket size="4.0em"/>
            </StyledPadding>
            <StyledPadding>
                <h2>Agil UGR</h2>
            </StyledPadding>
        </StyledLogo>
    )
}
// ---- Usuario ----  
const StyledUser  = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center; 
`
const User= () => (
    <StyledUser>
        <StyledPadding>
        <FaUserCircle size="2.0em"/>
        </StyledPadding>
        <StyledPadding>
            <h4> Euler Sanchez</h4>
        </StyledPadding>
    </StyledUser>
)
// --- Cabecera con todo --------
const StyledHeader = styled.div`
    display: flex;
    height: 80px ;
    padding: 0px;
    justify-content: space-between;
    align-items: center; 
    width: 100%;
    background: ${headerBackground};
    box-shadow: inset 0px -1px 0px #fbe9c3;
`
const Header = () => {
    return (
        <StyledHeader>           
            <StyledPadding>
                <Logo />
            </StyledPadding>
            <StyledPadding>
                <User />
            </StyledPadding>
        </StyledHeader>
    )
} 

export default Header