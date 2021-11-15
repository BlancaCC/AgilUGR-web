import React, { useContext } from 'react'
import styled from 'styled-components'
import {Store} from '../store'
import {AiFillHome} from 'react-icons/ai'
import { GiDeskLamp} from 'react-icons/gi'
import {IoIosStats} from 'react-icons/io'
import { ViewURL } from '../routesURL'
import { iconBigSize, iconSmallSize, iconColor } from '../themeVars'

const StyledIcons = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`
const StyledIconsOne = styled.div`
    margin: 13px;
`
// necesisario sincronizar con el orden del lead 
const IconView = [
    {icon: GiDeskLamp, view: ViewURL.focus, key: 1 },
    {icon: AiFillHome, view: ViewURL.profile, key: 2 },
    {icon: IoIosStats, view: ViewURL.stats, key: 3},
]
const Icons = () => {
    // TODO add motion
    const store = useContext(Store)
    let iconSize;
    return (
        <StyledIcons>
            { 
                IconView.map( e => {
                    if (e.view === store.view){
                        iconSize = iconBigSize   
                    } else{
                        iconSize  = iconSmallSize
                    }
                    return (
                        <StyledIconsOne key={e.key}>
                            < e.icon  size={iconSize} color={iconColor}/>
                        </StyledIconsOne>
                    )
                }) 
            }
        </StyledIcons>
    )
}

export default Icons
