import React from "react";
import styled from 'styled-components'
import StyledPanel from "../components/Panels";

const ProfileStyle = styled(StyledPanel)`
    width: 80vw;
    height: 50vh;
`
const Profile = () => {
    return (
        <ProfileStyle>
            <h1> I am a profile</h1>
        </ProfileStyle>      
    )
} 

export default Profile