import React , {useContext, useEffect} from "react";
import { Navigate } from "react-router-dom";
import styled from 'styled-components'
import {Store} from '../store'
import StyledPanel from "../components/Panels";
// import { Store } from "../store";
import { RowFlexSpaceAround, ColumnFlexSpaceBetween} from "../asset";
import { FaUserGraduate} from "react-icons/fa";
import {AiOutlineIdcard} from "react-icons/ai"

const ProfileStyle = styled(StyledPanel)`
`
const Profile = () => {
    const store = useContext(Store)
    const {view} = store
    /*
    useEffect (() => {
        <Navigate to={'/stats'}/>
        console.log(`Entra en useEffect de profile ${store.view}`)
    }
    ,[view])
    */
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