import React from "react";
import "../styles/global.css";
import {useStaticQuery,  graphql } from "gatsby";
import styled from "styled-components";
import Item from "./item";

const Sale = styled.b`
    color: yellow;
    background-color: red;
    float: right;
    padding: 5px;
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
        height: 15vw;
        width: 100%;
    }
    h3 {
        font:italic 600 20px/20px 'Verdana', sans-serif;
        color: cornflowerblue;
        margin:  0 0 10px;
    }
    h4 {    
        height: 50px;
    }
    @media (max-width: 660px) {
        padding: 5px;
        margin: 0;
        width: 30vw;       
        &:last-child {
            display: none;
        }       
    }
`;

const AllSale = styled.div`
    margin: 50px 0 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;  
    position: relative;
    p b {
        color: red;
        font-size: 25px;
    }   
    :before {
        content: "Favorite Sale Last Weak";
        font: italic 600 1.5em/25px 'Arial', sans-serif;      
        width: 100%;
        color: cornflowerblue;
        position: absolute;
        background-image: linear-gradient(rgba(255,0,0,0), rgba(255,0,0,0.5));
        padding: 12px;
        top:-55px;
        left: 0;       
        @media (max-width: 660px) {
          padding: 10px;
          font-size: 1em;         
        }
    }
`;

export default function () {
    const [number, set_number] = React.useState(false);
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
                        size
                        gender
                    }
                }
            }
    `);
    
    return (            
        <AllSale>
            {data.allDatoCmsSale.nodes.map((i,index) => <DivItem onClick={()=>set_number(index+1)} key={index}> 
                    <span  
                                          
                        style={{ backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand}/${i.modelitem}_${i.color}.jpg),
                            url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand}/${i.modelitem}_${i.color}.webp)`,
                           
                        }}                   
                    >
                        <Sale>{i.sale}%</Sale>
                    </span>    
                    <h3>{i.brand.toUpperCase()}</h3>
                    <h4>{i.modelitem.replace(/_/g," ")}</h4> 
                    <b>{i.gender}s</b>
                    <p>{i.color}</p>
                    <p>
                        <del>{i.cost}$</del> 
                        <b>{(i.cost*(100-i.sale)/100).toFixed(0)}$</b>
                    </p>
                </DivItem>)}
                {number && <Item
                    page={data.allDatoCmsSale.nodes[number-1]}
                    closeImage={set_number}
                    image_color={data.allDatoCmsSale.nodes[number-1].color} 
                    image_model={data.allDatoCmsSale.nodes[number-1].modelitem } 
                    num={number-1}
                    gender={data.allDatoCmsSale.nodes[number-1].gender}
                    sale={data.allDatoCmsSale.nodes[number-1].sale}
                    cost={data.allDatoCmsSale.nodes[number-1].cost}
                    size={data.allDatoCmsSale.nodes[number-1].size}
                />
            }
        </AllSale>       

    )
}; 