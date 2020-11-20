import React from "react";
import "../styles/global.css";
import {useStaticQuery,  graphql, Link } from "gatsby";
import styled from "styled-components";
import Item from "./item";



const Sale = styled.b`
    color: yellow;
    background-color: red;
    float: right;
    padding: 5px;
    font:italic 600 90%/100% 'Verdana', sans-serif;
    @media (max-width: 1000px) {
        font:italic 400 50%/100% 'Verdana', sans-serif;
    }    
`;
const DivItem = styled.div`
    height: fit-content;
    padding-bottom: 5px;   
    width: 20vw;
    display: inline-block;    
    background-color: #fff;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 2px 2px #ddd;
    }
    span {
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        height: 15vw;
        width: 100%;
    }
  
    h3 {
        font:italic 400 20px/20px 'Verdana', sans-serif;
        color: cornflowerblue;
        margin:  0 0 10px;
    }
    h4 {
        font: 300 18px/25px 'Verdana', sans-serif;
        
    }
    p {
        margin: 5px;
    }
   
    @media (max-width: 1000px) {
        h4 {
            height: 50px;
            font: 300 15px/20px 'Verdana', sans-serif;
        }
        span {
            margin: 0;
        }
        
        margin: 0;
        width: 30vw;       
        &:last-child {
            display: none;
        }       
    }
`;

const AllSale = styled.div`
    
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;  
    margin: 5px 0;  
    h3 {
        text-transform: uppercase;
    }   
    
   
`;
const H2 = styled.h2`       
    font:  400 2em/35px 'Arial', sans-serif;      
    padding: 10px 0;
    color: blue;   
    background-image: linear-gradient(rgba(255,0,0,0), rgba(255,0,0,0.5));         
    @media (max-width: 660px) {
     
      font: italic 400 1em/20px 'Arial', sans-serif;     
    }
    a {
        color: yellow;
        margin: 5px;
        display: inline-block;
        font:  300 22px/1em 'Verdana', sans-serif; 
    }
`; 
const I = styled.i`
    cursor: pointer;    
        position: absolute;
        top: 45%;
        left: ${props => props.left ? "0%": "97.8%" };
        font-size: 2em;   
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: ${props => props.left ? "0 50% 50% 0" : "50% 0 0 50%" };
        z-index: 10;
        background-color: #fff;
        :hover {
            background-color: #ddd;
            transition: all 1s; 
        }    
    
 
`;
export default function () {
    const [number, set_number] = React.useState(false); 
    const [view, set_view] = React.useState(0);

    const setView = (a) => {
        view - a > 0 ?  set_view(0) : set_view(a) 
    };

    let data = useStaticQuery(
        graphql`
            query {
                allDatoCmsSale {
                    nodes {
                        brand
                        modelitem
                        color
                        cost
                        sale
                        item
                        size
                        gender
                    }
                }
               
            }
    `);
    const newDate = data.allDatoCmsSale.nodes.slice(4-`${view}`,8-`${view}`); 
             
    return <>     
    <H2>Favorite Sale <Link to="/all" state={{sale: 100}}> (All Sale)</Link></H2>       
        <AllSale >
           
            <I onClick={()=>setView(0)} left>{'<'}</I> 
            {newDate.map((i,index) => <DivItem onClick={()=>set_number(index+1)} key={index}>
                    
                    <span  
                                          
                        style={{ backgroundImage: `url(https://myrunshop.000webhostapp.com/image/${i.brand}/${i.modelitem}_${i.color}.webp)`}}                      
                            
                           
                                        
                    >
                        <Sale>{i.sale}%</Sale>
                    </span>    
                    <h3>{i.brand}</h3>
                    <h4>{i.modelitem.replace(/_/g," ")}</h4> 
                    <b>{i.gender}s</b>
                    <p>{i.color}</p>
                    <p>
                        <del>{i.cost}$</del> 
                        <b>{(i.cost*(100-i.sale)/100).toFixed(0)}$</b>
                    </p>
                </DivItem>)}               
                {number && <Item
                    page={data.allDatoCmsSale.nodes.slice(4-`${view}`,8-`${view}`)[number-1]}
                    closeImage={set_number}
                    color={data.allDatoCmsSale.nodes.slice(4-`${view}`,8-`${view}`)[number-1].color} 
                    image_model={data.allDatoCmsSale.nodes.slice(4-`${view}`,8-`${view}`)[number-1].modelitem } 
                    num={number-1}
                    item={data.allDatoCmsSale.nodes.slice(4-`${view}`,8-`${view}`)[number-1].item}
                    gender={data.allDatoCmsSale.nodes.slice(4-`${view}`,8-`${view}`)[number-1].gender}
                    sale={data.allDatoCmsSale.nodes.slice(4-`${view}`,8-`${view}`)[number-1].sale}
                    cost={data.allDatoCmsSale.nodes.slice(4-`${view}`,8-`${view}`)[number-1].cost}
                    size={data.allDatoCmsSale.nodes.slice(4-`${view}`,8-`${view}`)[number-1].size}
                />
            }
            <I onClick={()=>setView(4)}>{'>'}</I> 
        </AllSale>       
           
    </>
}; 