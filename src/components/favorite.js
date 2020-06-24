import React from "react";
import styled from "styled-components";
import {useStaticQuery,  graphql } from "gatsby";
import Item from "./item";




const DivItem = styled.div.attrs(props => ({
    size: props.size ,
}))`
   
    display: inline-block;  
    margin: 15px 0;
    background-color: #fff;
    font-size: 18px;    
    height: 260px;
    width: 18%;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 5px 5px #ddd;
    };
    @media (max-width: 580px) {
       height: 290px;
       display: ${props=>props.visible > 2 ? "none": "inline-block"};
       width: 33%;
      
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
                    }
                }
            }
        `
    )
    return (
        <>
            <FavoriteItems>FAVORITE ITEMS</FavoriteItems>
            <DivItems>
                {data.allDatoCmsItem.nodes.map((i,index) => <DivItem visible={index} onClick={()=>set_number(index+1)} key={index} >
                
                    <span                    
                        as="button"                   
                        style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand}/${i.modelItem}_${i.color}.jpg),url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand}/${i.modelItem}_${i.color}.webp)`,
                            backgroundSize:"80%",
                            backgroundPosition:"center",
                            backgroundRepeat: "no-repeat",
                            height:"60%",
                            width: "100%"
                        }}                   
                    ></span>    
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
                image_model={data.allDatoCmsItem.nodes[number-1].modelItem } 
                num={number-1}
                />
            }
        </>

    )
};
export default Favorite;