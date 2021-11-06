import React, {useContext} from "react";
import styled from 'styled-components'
import StyledPanel from "../components/Panels";
import { Store } from "../store";
import { RowFlexSpaceAround, ColumnFlexSpaceBetween} from "../asset";
import { FaHandSpock} from "react-icons/fa";
import {IoIosTimer} from "react-icons/io"


const Style = styled(StyledPanel)`
`

const Parado  = () => (
    <ColumnFlexSpaceBetween>
        <h2> Esperando selección de tiempo</h2>
        <h4> Enumere con la mano</h4>
        <FaHandSpock size="20em" />
    </ColumnFlexSpaceBetween>
)

const Tiempo = (tiempo, estado) => (
    <ColumnFlexSpaceBetween>
        <h2> Usted ha seleccionado {tiempo} </h2>
        < IoIosTimer size="20em" />
        <h4> Ahora mismo se encuentra {estado}</h4>
    </ColumnFlexSpaceBetween>
)
const Focus = () => {
    const store = useContext(Store)
    const tiempos  = ['15', '30', '60'] 
    let CReloj; 
    if( store.timeAction === 'SELECCIONADO')
        CReloj = Tiempo(tiempos[store.tiempo], store.timeAction)
    else
        CReloj = Parado
            
    return (
        <Style>
            <RowFlexSpaceAround>
                <h1> Modo focus</h1>
                <ColumnFlexSpaceBetween>
                    <h2> Activar tiempo</h2>
                    <ol>
                        {
                            tiempos.map ((time) =>  {
                                return (<li> Tiempo de {time} min. </li>)
                            })
                        }
                    </ol>
                </ColumnFlexSpaceBetween>
                {CReloj}
            </RowFlexSpaceAround>
        </Style>      
    )
} 

export default Focus