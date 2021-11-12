import React, { useContext } from 'react'
import styled from 'styled-components'
import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import { MainBackground } from '../themeVars'
import Icons from '../components/Icons'
import { ViewURL } from '../routesURL'
// use Context 
import  {Store} from '../store'
// importamos las otras vistas
import Stats from './Stats'
import Focus from './Focus'
import Profile from './Profile'

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
const SwitcherVistas = (nombreVista)  => {
    let vistaSeleccionada; 
    switch(nombreVista) {
        case ViewURL.stats: 
            vistaSeleccionada = Stats;
            break;
        case ViewURL.focus: 
            vistaSeleccionada = Focus;
            break;
        case ViewURL.profile:
            vistaSeleccionada = Profile;
            break;
        default:
            vistaSeleccionada = Profile;
            break;
    }
    return vistaSeleccionada; 
}
const Leap = () =>{
    const store = useContext(Store);
    const Vista = SwitcherVistas(store.view);
    return(
        <Wrapper>
            <Header />
            <ContentStyle>
                <Vista />
                <Icons/>
            </ContentStyle>
        </Wrapper>
    )
}

export default Leap
