import React from "react";
import styled from "styled-components";

const DivInfo = styled.div`
    margin: 20px 0;    
    font: 400 22px/50px "Taroma", sans-serif;    
    height: 50px;
    width: auto;
    background-color: #fff;
    span {
        color: #bbb;
        
    }
    b {
        
        color: maroon;
    }
    @media(max-width: 500px) {
        font: 400 18px/20px "Taroma", sans-serif;
        margin: 0; 
        height: content-fit;   
    }
   
`;

const Color = styled.span.attrs(props=>({
    props:props.color
}))`
    padding: 5px 8px;
    border: 1px solid #000;
    cursor: pointer;
  
    position: relative;
    font: italic 300 16px/16px "Taroma", sans-serif;
    margin: 0 10px;
    display: ${props=>(props.color === "all" || props.color === null || props.color === 0 || props.color === 1000) ? 'none': 'inline-block'};
    vertical-align: middle;
    border-radius: 10px;
    z-index: 0;
    b {
        font-size: 15px;
    };
    &:after {
        content: 'x';
        color: #000;
        padding: 0 6px;
        text-align: center;
        font-size: 13px;
        border: 1px solid #000;
        border-radius: 20px;
        position: absolute;
        top: -10px;
        z-index: 10;
        left: -10px;
        background-color: #ddd;
    };
    &:hover after {
        color: #fff;
        background-color: #000;
    }
`;
const But = styled.button`
    width: 25px;
    height: 25px; 
    margin: 0;
    border-radius: 10px;
    padding: 0;
    font: message-box;
    display: inline-block;
    vertical-align: middle;
    
`;
const Info = ({  model="one",...props}) => {
    const {brand ,gender,set_size, set_color,set_min,set_max,noFilterCost } = props;
    return (

        <DivInfo> 
           
            {brand.length > 1 ? model.replace("_"," ") : <b>{brand}</b>}          
            {gender.length === 1 ? gender : gender.length === 2 ? "BOYS and GIRLS" : ""}{" "}
             shoes and clothing <span>({props.order} products)</span>
            
           
               
                <Color color={props.color} onClick={()=>set_color("all")} title="remove filtr">
                    <b>color:</b>{props.color}
                </Color>
           
           
               
                <Color color={props.size} onClick={()=>set_size(null)}><b>size:</b>{props.size}</Color>
                <Color color={props.min} onClick={()=>set_min(0)}><b>cost {">"} </b>{props.min}</Color>
                <Color color={props.max} onClick={()=>set_max(1000)}><b>cost {"<"}</b>{props.max}</Color>
                <But onClick={noFilterCost}>x</But>
           
           
        </DivInfo>
    )
};
 export {Info};