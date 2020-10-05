import React from "react";
import styled from "styled-components";

const H1 = styled.h1`
   
        background-color: #fff;
       
    
   
        font: 400 25px/40px "Taroma", sans-serif;
        
        margin: 0;
        @media(max-width: 600px) {
            font: 400 16px/30px "Taroma", sans-serif;
             
        }
        span {
        color: #bbb;
        font: italic 400 18px/30px "Taroma", sans-serif;
    }
    }
    @media(max-width: 600px) {
       height: auto;
        margin: 0; 
         
    }
   
`;


export const Info = ({  model="one",...props}) => {
    const {brand ,gender,set_size, set_color,set_min,set_max } = props;
    return (
       
            <H1>
                {brand.length > 1 ? model.replace("_"," ") : brand + " "}         
                {gender.length === 1 ? gender : gender.length === 2 ? `BOYS and GIRLS` : ""}{" "}
                {props.item} <span>({props.order} items)</span>
                
            </H1>
               
               
               
           
           
        
    )
};