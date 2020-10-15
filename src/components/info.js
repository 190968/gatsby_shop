import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const InfoString = styled.h1`  
        background-color: #fff;      
        text-align: left;
        padding: 10px;
          
        font: 400 20px/20px "Taroma", sans-serif;        
        margin: 10px 0 0;
        @media(max-width: 600px) {
            font: 400 16px/30px "Taroma", sans-serif;             
        }
        span {
        color: #ccc000;
        font: italic 400 18px/20px "Taroma", sans-serif;
        }
        a {
            font: 400 20px/20px "Arial", sans-serif; 
            color: #000;
            &:hover {
                color: blue;    
                text-decoration: underline;
            }
        }    
    
   
   
`;


export const Info = ({  model="one",...props }) => {
    const { brand ,gender } = props;
    return (       
        <InfoString>
            <Link to="/" >Home </Link> / {" "}
            {brand.length > 1 ? model.replace(/[_]/g, match => " " + match.toUpperCase()) : brand + " "}         
            {gender.length === 1 ? gender : gender.length === 2 ? `boys and girls` : ""}{" "}
            {props.item} <span>({props.order} items)</span>                
        </InfoString> 
    )
};