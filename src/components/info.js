import React from "react";
import styled from "styled-components";

const H4 = styled.p`
    margin: 20px;    
    font: 600 22px/16px "Taroma", sans-serif;    
   
    width: auto;
    span {
        color: #bbb;
        
    }
    b {
        font-size: 24px;
        color: red;
    }
   
`;

const Info = ({ brand, order, model="one", gender }) => {
    
    return (
        <H4>           
            {gender.length == 1 ? gender : gender.length == 2 ? "BOYS and GIRLS" : "ALL"}{" "}
            {brand.length > 1 ? model.replace("_"," ") : <b>{brand}</b>} shoes and clothing <span>({order} products)</span>
        </H4>
    )
};
 export {Info};