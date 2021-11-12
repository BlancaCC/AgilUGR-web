import React, {useContext} from "react";
import styled from 'styled-components'
import StyledPanel from "../components/Panels";
import { Store } from "../store";
import {timeActionStates } from '../gestor'
import { RowFlexSpaceAround, ColumnFlexSpaceBetween} from "../asset";
import { FaHandSpock} from "react-icons/fa";
import {IoIosTimer} from "react-icons/io"
import {rojo, relojColor, Titulos} from "../themeVars"

const Style = styled(StyledPanel)`
    display: flex; 
    align-items: center; 
    justify-content: space-around; 
`
const AnimatedClock = styled( IoIosTimer)`
    animation: mymove 60s infinite;
    @keyframes mymove {
    100% {transform: rotate(360deg);}
    }
`
const auxiliarMessageColor = '#505050'
const H4 = styled.h4`
    color: ${auxiliarMessageColor};

`
const NormalLi = styled.li``
const StyledLi = styled.li`
    color: ${rojo}; 
    font-weight: bold;
`
const Parado  = () => (
    <ColumnFlexSpaceBetween>
        <h2> Esperando selección de tiempo</h2>
        <h4> Enumere con la mano</h4>
        <FaHandSpock size="20em" />
    </ColumnFlexSpaceBetween>
)

// ______ Gestionamos el tiempo ___________  

// Mensaje cuando está parado 

// Icono general del tiempo
const Tiempo = (tiempo, estado) => {
    const Reloj = estado === timeActionStates.en_movimiento ? AnimatedClock : IoIosTimer;
    const mensaje = estado === timeActionStates.parado ? 'Pendiente de activación': 
     `Quedan ${tiempo} min.`;
    const extra = estado === timeActionStates.seleccionado ? 
        'Dibuje un circulo para activa el reloj' 
        : 'Cierre la mano para parar'; 
    return (
    <ColumnFlexSpaceBetween>
        <h2> {mensaje} </h2>
        <  Reloj size="20em" color={relojColor} />
        <H4>{extra} </H4>
    </ColumnFlexSpaceBetween>
    )
}
const Focus = () => {
    const store = useContext(Store)
    const tiempos  = ['15', '30', '45', '60'] 
    let CReloj; 
    if(store.timeAction ===  timeActionStates.en_movimiento)
        CReloj = Tiempo(tiempos[store.tiempo -1], store.timeAction)
    else
        CReloj = Parado
            
    return (
        <Style>
            <RowFlexSpaceAround>
                <ColumnFlexSpaceBetween>
                    <h2> Activar tiempo</h2>
                    <ol>
                        {
                            [...tiempos.keys()].map ((indice) =>  {
                                const Li = indice +1 === store.tiempo ? StyledLi : NormalLi;
                                return (<Li> Tiempo de {tiempos[indice]} min. </Li>)
                            })
                        }
                    </ol>
                    <H4> Indique con el número de dedos la opción </H4>
                </ColumnFlexSpaceBetween>
                <Titulos> Modo focus</Titulos>
                {CReloj}
            </RowFlexSpaceAround>
        </Style>      
    )
} 

export default Focus