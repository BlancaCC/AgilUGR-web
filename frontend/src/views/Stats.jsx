import React , {useContext, useEffect} from "react";
import { Navigate } from "react-router-dom";
import styled from 'styled-components'
import {Store} from '../store'
import StyledPanel from "../components/Panels";
import { RowFlexSpaceAround, ColumnFlexSpaceBetween} from "../asset";
import { ImStatsDots} from "react-icons/im";
import {IoMdStats} from "react-icons/io"


const Style = styled(StyledPanel)`
`
const Stats = () => {
    const store = useContext(Store)
    const {view} = store
    useEffect (() => {
        <Navigate to={view}/>
    }
    ,[view])
    return (
        <Style>
            <RowFlexSpaceAround>
                <h1> Mis estadísticas</h1>
                <ColumnFlexSpaceBetween>
                    <h2> Tiempo de estudio mensual</h2>
                    <ImStatsDots size="20em" />
                </ColumnFlexSpaceBetween>
                <ColumnFlexSpaceBetween>
                    <h3> Tiempo dedicado esta semana</h3>
                    <IoMdStats size="20em" />
                </ColumnFlexSpaceBetween>            
            </RowFlexSpaceAround>
        </Style>      
    )
} 

export default Stats