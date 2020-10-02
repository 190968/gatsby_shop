import React from "react";
import styled from "styled-components";

const DivInfo = styled.div`
   
    font: 400 22px/50px "Taroma", sans-serif;    
    height: fit-content;
    width: auto;
    background-color: #fff;
   
    position: sticky;
    top: 0;
    z-index: 10;
    span {
        color: #bbb;
        
    }
    // b {
    //     font-size: 25px;
    // }
    @media(max-width: 600px) {
        font: 400 16px/24px "Taroma", sans-serif;
        margin: 0; 
        height: 50px;   
    }
   
`;

const Color = styled.b.attrs(props=>({
    props:props.color
}))`
    padding: 5px 8px;
    
    border: 1px solid yellow;
    cursor: pointer;
    background-color: cornflowerblue;    
    position: relative;
    font: italic 300 16px/16px "Taroma", sans-serif;
    margin: 0 10px;
    display: ${props=>(props.color === "all" || props.color === null || props.color === 0 || props.color === 180) ? 'none': 'inline-block'};
    vertical-align: middle;
    // border-radius: 10px;
    z-index: 0;      
    color: yellow;   
    &:after {
        content: 'x';
        color: cornflowerblue;
        padding: 0 5px;
        text-align: center;
        font-size: 13px;
        border: 1px solid cornflowerblue;;
        // border-radius: 20px;
        position: absolute;
        top: -10px;
        z-index: 10;
        left: -10px;
        background-color: yellow;
    }
`;

export const Info = ({  model="one",...props}) => {
    const {brand ,gender,set_size, set_color,set_min,set_max,set_sort } = props;
    return (
        <DivInfo> 
           
            {brand.length > 1 ? model.replace("_"," ") : <b>{brand}</b>}          
            {gender.length === 1 ? gender : gender.length === 2 ? <span>{`BOYS and GIRLS`}</span>: ""}{" "}
             <b>{props.item}</b> <span>({props.order} items)</span>
            
           
               
                <Color color={props.color} onClick={()=>set_color("all")}>color: {props.color}</Color>
                <Color color={props.size} onClick={()=>set_size(null)}>size: {props.size}</Color>
                <Color color={props.min} onClick={()=>set_min(0)}>cost {">"} {props.min}</Color>
                <Color color={props.max} onClick={()=>set_max(180)}>cost {"<"} {props.max}</Color>
                <span className="sort">
                    sort by:
                    <select onChange={(e)=>set_sort(e.target.value)}>
                        <option value="true" >cheap first</option>
                        <option value="false" >expensive first</option>
                    </select>
                </span>     
           
           
        </DivInfo>
    )
};