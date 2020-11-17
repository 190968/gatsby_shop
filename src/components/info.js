import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const InfoString = styled.h1`  
        background-color: #fff;      
        text-align: left;
        padding:0 10px;
          
        font: 300 20px/20px "Taroma", sans-serif;        
        margin: 10px 0 0;
        @media(max-width: 600px) {
            font: 300 16px/30px "Taroma", sans-serif;
                         
        }
        span {
        color: #ccc000;
        font: italic 300 18px/30px "Taroma", sans-serif;
        }
        a {
            font: 300 20px/20px "Arial", sans-serif; 
            color: #000;
            &:hover {
                color: blue;    
                text-decoration: underline;
            }
        }    
        i {
            font: 300 16px/30px "Arial", sans-serif; 
            color: gray;
        }
   
   
`;


export const Info = ({  model="one",...props }) => {
    const { brand ,gender } = props;
    return (       
        <InfoString>
            <Link to="/" >Home </Link> / 
            <i>{" "} {gender} {" "}{brand.length > 1 ? model.replace(/[_]/g, match => " " + match.toUpperCase()) : brand + " "} {props.item}</i>         
           
            <span>({props.order} items)</span>                
        </InfoString> 
    )
};