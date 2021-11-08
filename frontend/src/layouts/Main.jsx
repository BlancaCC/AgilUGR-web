import React from 'react'
import styled from 'styled-components'
import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import { MainBackground } from '../themeVars'
import Icons from '../components/Icons'

const Wrapper = styled.div`
    background: ${MainBackground};
    width: 100%;
    height: 100vh;
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
`
const ContentStyle = styled.div`
    margin: auto;
`
const Main = () =>(
    <Wrapper>
        <Header />
        <ContentStyle>
            <Outlet />
            <Icons/>
        </ContentStyle>
    </Wrapper>
)

export default Main