import React, {useContext} from "react";
import styled from 'styled-components'
import StyledPanel from "../components/Panels";
import { Store } from "../store";
import {ViewURL} from '../routesURL'
import { RowFlexSpaceAround, ColumnFlexSpaceBetween} from "../asset";
import { FaUserGraduate} from "react-icons/fa";
import {AiOutlineIdcard} from "react-icons/ai"

const ProfileStyle = styled(StyledPanel)`
`
const Profile = () => {
    const store = useContext(Store)
    return (
        <ProfileStyle>
            <RowFlexSpaceAround>
                <ColumnFlexSpaceBetween>
                    <h2> Euler Sanchez</h2>
                    <FaUserGraduate size="20em" />
                </ColumnFlexSpaceBetween>
                <ColumnFlexSpaceBetween>
                    <h3> Mi TUi</h3>
                    <AiOutlineIdcard size="20em" />
                </ColumnFlexSpaceBetween>            
            </RowFlexSpaceAround>
        </ProfileStyle>      
    )
} 

export default Profile