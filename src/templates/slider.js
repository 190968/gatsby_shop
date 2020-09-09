import React from "react";

import styled from "styled-components";

import "../styles/global.css";



const Main = styled.div`
    height: 10px;
    width: 95%;
  
    border-radius: 5px;
    background: blue;   
    position: relative;
    &:after {
        content: "${props=>props.pos_max}";  
        width: 30px;
        height: 25px;
        border-radius: 5px;
        position: absolute;
        color: #fff;
        font: 300 13px/25px 'Arial', sans-serif;
        top: -7px;
        left: ${props=>props.pos_max-15}px;
        opacity: 1;
        background: #823eb7;
        cursor: pointer;
    }    
    &:active {
        &:after {
            border: 1px solid yellow;
        }    
    }   
`;


const Min = styled.div.attrs(props => ({
    pos_min:props.pos_min   
}))`
    height: 10px;
    width: ${props=>props.pos_min}px;    
    float: left;
    border-radius: 5px;
    background-color: #ccc;
    position: relative;
    top: -10px;
    &:before {
        content: "${props=>props.pos_min}";  
        width: 30px;
        height: 25px;
        border-radius: 5px;
        position: absolute;
        font: 300 13px/25px 'Arial', sans-serif;
        color: #fff;
        top: -8px;
        left: ${props=>props.pos_min-15}px;
        opacity: 1;
        background: #823eb7;
        cursor: pointer;
    }
    &:active {
        &:before {
            border: 1px solid yellow;
        }    
    }
`; 
const Max = styled.div.attrs(props => ({
    pos_max:props.pos_max   
}))`
    height: 10px;
    width: ${props=>180-props.pos_max}px; 
    border-radius: 5px;
    float: right;
    background-color: #ccc;
    position: relative;    
`; 
const Slider = ({min, max, setMin, setMax}) => {
  const [slider_min,set_slider_min] = React.useState(false);
  const [slider_max,set_slider_max] = React.useState(false); 
    const Mouse_move_min = (e) => {
            if (slider_min) {
        
                setMin(min < 1 ? 1 : e.nativeEvent.offsetX)
            } else { }
    };
    const Mouse_move_max = (e) => {
        if (slider_max) {
        
            setMax(max > 199 ? 198 : e.nativeEvent.offsetX)
        } else {}
    };     
   

   
  return (
    <>
    
      <Main 
        pos_max={max} 
        onMouseUp={()=>set_slider_max(false)} 
        onMouseDown={()=>set_slider_max(true)}      
        onMouseMove={e=>Mouse_move_max(e)}
        >
      
       <Max  pos_max={max} ></Max>
      </Main>
      <Min  
        pos_min={min}
        onMouseUp={()=>set_slider_min(false)} 
        onMouseDown={()=>set_slider_min(true)} 
        onMouseMove={e=>Mouse_move_min(e)}
      ></Min>
    </>
  );
};
 export default Slider;