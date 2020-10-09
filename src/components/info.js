import React from "react";
import styled from "styled-components";

const H1 = styled.h1`  
        background-color: #fff;
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 0;
        z-index: 10;   
        font: 400 25px/40px "Taroma", sans-serif;        
        margin: 0;
        @media(max-width: 600px) {
            font: 400 16px/30px "Taroma", sans-serif;             
        }
        span {
        color: #bbb;
        font: italic 400 15px/30px "Taroma", sans-serif;
        }
    
   
   
`;


export const Info = ({  model="one",...props}) => {
    const {brand ,gender } = props;
    return (       
        <H1>
            {brand.length > 1 ? model.replace(/[_]/g, match => " " + match.toUpperCase()) : brand + " "}         
            {gender.length === 1 ? gender : gender.length === 2 ? `boys and girls` : ""}{" "}
            {props.item} <span>({props.order} items)</span>                
        </H1>         
               
           
           
        
    )
};