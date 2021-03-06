import React  from "react";
import axios from "axios";
import styled from "styled-components";
import "../styles/global.css";
import {  navigate } from "gatsby";

const P = styled.p`
    padding: 5px 10px;
    z-index: 100;
    cursor: pointer;   
    margin: 0;
    width: 100%;
    background-color: #fff;
    &:hover {
        background-color: #ddd;
    }
`;
const Input = styled.input`
    border: none;   
    vertical-align: middle;
    outline: none;   
    display: inline-block;
    padding: 0 10px;
    font-size: 20px;
    width: 100%;
    height: 100%;
    border: none ;
    outline: none;       
    }
    @media (max-width: 1000px) {
        font:100%/1.8 'Quattrocento Sans',sans-serif;
    }    
`;

const SearchModel = styled.div`  
    display: inline-block;
    height: 100%;
    z-index: 15;
    position: relative;
    width: 20vw;
    @media(max-width: 600px) {
        width: 40vw;
        float: left;
    }   
`;


const url = 'https://aplacadance.ru/.netlify/functions/find_model';

const Search = () => {
   
    const [model, set_model] = React.useState([]);

   

    const update_model = (a) => {
       
        if (a.length > 2) {
            const fetchData = async () => {
                const result = await axios(`${url}?model=${a}`,
                {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                });                
                let models = result.data;
                console.log(result.data);
               
                
                if(models.length > 1 ) {
                     set_model(models);  
                }  else {
                    set_model(["none model"]);
                }  
                              
                 
            }; 
            fetchData();
        } else {
            set_model([]);
        }          
    };
    return (
        <SearchModel  onMouseLeave={()=>set_model([])}>
            <Input type="text"  placeholder="search model" onChange={(e)=>update_model(e.target.value)}/>
            {model.map((i,index) => 
                <P key={index}
                    onClick={()=>{set_model([]);navigate('/all/',{state:{model:i}})}}
                   
                >
                   {i}
                </P>
               
            )}
        </SearchModel>       
    )            
};
 export default Search;