import React from "react";

import styled from "styled-components";

import "../styles/global.css";



const Main = styled.div`
    height: 10px;
    width: 95%;
   
    border-radius: 5px;
    background: cornflowerblue;   
    position: relative;
    &:after {
        content: "${props=>props.pos_max}";  
        width: 30px;
        height: 25px;
        border-radius: 7px;
        position: absolute;
        color: blue;
        font: 300 14px/25px 'Arial', sans-serif;
        top: -7px;
        left: ${props=>props.pos_max}px;
        opacity: 1;
        background: yellow;
        cursor: pointer;
    }    
    &:active {
        &:after {
            border: 1px solid blue;
            font-weight: 600;
        }    
    }   
`;


const Min = styled(Main)`
   
    width: ${props=>props.min}px;    
    float: left;
    background: #ccc;
    border-right:10px solid red;   
    top: -10px;
    &:after {
        content: "${props=>props.min}";  
        
        top: -8px;
        left: ${props=>props.min-15}px;
       
    }
    
`; 
const Max = styled.div.attrs(props => ({
    pos_max:props.max   
}))`
    height: 10px;
    width: ${props=> (190 - props.max)}px; 
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
        
                setMin(min < 1 ? 2 : e.nativeEvent.offsetX)
            } else { }
    };
    const Mouse_move_max = (e) => {
        if (slider_max) {
        
            setMax(max > 190 ? 188 : e.nativeEvent.offsetX-15)
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
      
       <Max  max={max} ></Max>
      </Main>
      <Min  
        min={min}
        onMouseUp={()=>set_slider_min(false)} 
        onMouseDown={()=>set_slider_min(true)} 
        onMouseMove={e=>Mouse_move_min(e)}
      ></Min>
    </>
  );
};
 export default Slider;