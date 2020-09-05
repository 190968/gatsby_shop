import React from "react";

import axios from "axios";
import styled from "styled-components";

import "../styles/global.css";
import {  navigate } from "gatsby";

const P = styled.p`
    padding: 5px 10px;
   
    cursor: pointer;   
    margin: 0;
    width: 100%;
    background-color: #fff;
    &:hover {
        background-color: #ddd;
    }

`;
const ImageBag = styled.img`
    float: right;
    width: 42x;
    height: 42px;   
    margin: 0 10px;
    
   
`;
const Input = styled.input`
    border: none;
    outline: none;
    padding: 5px 10px;
    border-radius: 5px;
    &:focus {
        border: none ;
        outline: none;
       
    }    
`;
const ImageSearch = styled(ImageBag)`
    float: none;
    vertical-align: top;
    margin: 5px 0 ;
    
`;
const SearchModel = styled.div`
    display: inline-block;
    position: relative;
    top: 10px;
   
    height: auto;
    background-color: #fff;
`;

 // const url = 'http://localhost:5001';
 const url = 'http://gatsbyshop.herokuapp.com';
const Search = () => {

    const [input, input_view] = React.useState(false);
    const [model, set_model] = React.useState([]);

    const update_model = (a) => {
       
        if (a.length > 2) {
            const fetchData = async () => {
                const result = await axios(`${url}/find?model=${a}`); 
                
                let new_result = [];
                //add model to array
                for (const a of result.data) {
                    new_result.push(a.model);
                };    
            
                // Remove duplicate model    
                set_model(new_result.length>0 ? [...new Set(new_result)]: ["none model"]);                 
                    
            }; 
            fetchData();
        } else {
            set_model([]);
        }          
    };
    return <>
        <ImageSearch  
        src="https://myrunshop.000webhostapp.com/wp-content/image/icon/search.png" 
        alt="search" 
        onClick={()=>input_view(!input)}

        />
        {input && <SearchModel>
            <Input type="text"  placeholder="input model" onChange={(e)=>update_model(e.target.value)}/>
            {model.map(i=><div><P onClick={()=>{set_model([]);navigate('/all/',{state:{model:i}})}}>{i}</P></div>)}

            </SearchModel>
        }
        </>
};
 export default Search;