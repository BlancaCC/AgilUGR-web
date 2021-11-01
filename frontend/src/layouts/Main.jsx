import React from 'react'
import styled from 'styled-components'
import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
// TODO //create Header

const Wrapper = styled.div`
`
const Main = () =>(
    <Wrapper>
        <Header />
        <Outlet />
    </Wrapper>
)

export default Main