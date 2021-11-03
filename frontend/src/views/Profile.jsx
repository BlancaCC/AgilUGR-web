import React, {useContext} from "react";
import styled from 'styled-components'
import StyledPanel from "../components/Panels";
import { Store } from "../store";
import {ViewURL} from '../routesURL'

const ProfileStyle = styled(StyledPanel)`
`
const Profile = () => {
    const store = useContext(Store)
    return (
        <ProfileStyle>
            <h1> I am a profile</h1>
            El valor que recibe del backend es {store.view}
            <br/> 
            Los valores posibles:  <br/> 
            profile: {ViewURL.profile} <br/> 
            focus: {ViewURL.focus} <br/> 
            stats: {ViewURL.stats} <br/> 
            debug: {ViewURL.debug} <br/> 
        </ProfileStyle>      
    )
} 

export default Profile