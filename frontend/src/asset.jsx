/**
 * Fichero con funciones auxiliasres 
 */
import React from "react";
import styled from "styled-components";
/**
 * Alinea componenentes de manera horizontal y centra :)
 */
export const RowFlexSpaceBetween = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center; 
    align-content: space-between;
    justify-content: space-between
`
export const RowFlexSpaceAround = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center; 
    align-content: space-between;
    justify-content: space-around;
    
  
`
export const ColumnFlexSpaceBetween= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    align-content: space-between;
    justify-content: space-between
`