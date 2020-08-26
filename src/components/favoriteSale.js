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
    height: 250px;
    width: 18%;
    display: inline-block;  
    margin: 15px 0;
    background-color: #fff;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 5px 5px #ddd;
    }
    @media (max-width: 580px) {
        padding: 10px;
        font-size: 1em;
        width: 33%;
    }
`;
const FavoriteItems = styled.h3`
    background-image: linear-gradient(rgba(255,0,0,0), rgba(255,0,0,1));
    padding: 15px;
    margin: 0;
    color: silver;
    @media (max-width: 580px) {
      padding: 10px;
      font-size: 1em;
    }
`;
const DivItems = styled.div`
    display: flex;
    justify-content: space-between;
    h4 b {
        color: red;
    }
`;

const  FavoriteSale = () => {
    const [number, set_number] = React.useState(false);
    const data = useStaticQuery(
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
                    `
       
    )
    return (
        <>
            <FavoriteItems>FAVORITE SALE</FavoriteItems>
            
            
            <DivItems>
                {data.allDatoCmsSale.nodes.map((i,index) => <DivItem onClick={()=>set_number(index+1)} key={index}> 
                    <span                    
                        role="button"                   
                        style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand}/${i.modelitem}_${i.color}.jpg),url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand}/${i.modelitem}_${i.color}.webp)`,
                            backgroundSize:"80%",
                            backgroundPosition:"center",
                            backgroundRepeat: "no-repeat",
                            height:"50%",
                            width: "100%"
                        }}                   
                    >
                        <Sale>{i.sale}%</Sale>
                    </span>    
                    <h4>{i.brand}</h4>
                    {i.modelitem} <br/>
                    {i.color}
                    <h4><del>{i.cost}$</del> <b>{(i.cost*(100-i.sale)/100).toFixed(0)}$</b></h4>
                </DivItem>)}
            </DivItems>
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
        </>

    )
};

export default FavoriteSale;