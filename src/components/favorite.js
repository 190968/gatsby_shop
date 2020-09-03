import React from "react";
import styled from "styled-components";
import {useStaticQuery,  graphql } from "gatsby";
import Item from "./item";




const DivItem = styled.div.attrs(props => ({
    brand: props.brand ,
    model: props.model,
    color: props.color
}))`
   
    display: inline-block;  
    margin: 15px 0;
    padding-top: 13vw;
    background-color: #fff;
    background-size: 80%;
    background-position: center top;
    background-repeat: no-repeat;
    background-image: ${props => `url(https://myrunshop.000webhostapp.com/wp-content/image/${props.brand}/${(props.model).replace(" ","_")}_${props.color}.jpg),
                    url(https://myrunshop.000webhostapp.com/wp-content/image/${props.brand}/${(props.model).replace(" ","_")}_${props.color}.webp)`};
    font-size: 18px;    
    height: fit-content;
    width: 15vw;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 5px 5px #ddd;
    };
    @media (max-width: 580px) {
      
       display: ${props=>props.visible > 2 ? "none": "inline-block"};
       width: 33%;
       padding: 30vw 0 5px;
       font-size: 1em;
       margin: 5px auto;
    }
`;
const Gender = styled.p`
    font-size: 16px;
    margin: 0;
`; 

const FavoriteItems = styled.h3`
    background-color: yellow;
    padding: 15px;
    margin: 0;
    @media (max-width: 580px) {
        padding: 10px;
        font-size: 1em;
    }
`;
const DivItems = styled.div`
    display: flex;
    justify-content: space-between;    
    flex-direction: row;
`;

const Favorite = () =>{
   
    const [number, set_number] = React.useState(false);
    const data = useStaticQuery(
        graphql`
            query {
                allDatoCmsItem {
                    nodes {
                        brand
                        modelItem
                        color
                        size
                        cost
                        gender
                        item
                    }
                }
            }
        `
    )
    return (
        <>
            <FavoriteItems>The Best For Run 2020</FavoriteItems>
            <DivItems>
                {data.allDatoCmsItem.nodes.map((i,index) => <DivItem 
                    visible={index}
                    onClick={()=>set_number(index+1)}
                    key={index} 
                    brand={i.brand}
                    color={i.color}
                    model={i.modelItem}
                >  
                    
                    <h2 className="brand_favorite">{i.brand.toUpperCase()}</h2>
                    {i.modelItem} 
                    <Gender>{i.gender}</Gender> 
                    <Gender>{i.color}</Gender>
                </DivItem>
            
                )}
            </DivItems>
            {number && <Item
                page={data.allDatoCmsItem.nodes[number-1]}
                closeImage={set_number}
                gender = {data.allDatoCmsItem.nodes[number-1].gender}
                size={data.allDatoCmsItem.nodes[number-1].size}
                cost={data.allDatoCmsItem.nodes[number-1].cost}
                image_color={data.allDatoCmsItem.nodes[number-1].color}
                item={data.allDatoCmsItem.nodes[number-1].item}  
                image_model={data.allDatoCmsItem.nodes[number-1].modelItem } 
                num={number-1}
                />
            }
        </>

    )
};
export default Favorite;