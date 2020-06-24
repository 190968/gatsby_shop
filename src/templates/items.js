import React from "react";
import "../styles/global.css";
import {  graphql } from "gatsby";
import Item from "../components/item";
import { connect } from "react-redux";
import styled from "styled-components";
import  Layout  from "../components/layout";
import { Curr} from "../components/currency";
import { addBag } from "../state/app";

const Currency = styled.button`
    font: 400 22px/30px 'Arial', sans-serif;
    outline: none;
    display: inline-block;
    width: 30px;
    text-align: center;
    height: 30px;
    border: none;
    margin: 0;
    background-color: inherit;   
    &:hover{
        background-color: #ddd;
        
    }
`
const Model = styled.span.attrs(props=>({
    text: props.text,
}))`
    position: relative;
    cursor: pointer;
    &:hover {
        &:after {
            display: inline-block;
        }
    }
    &:after {
        position: absolute;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0 0 5px 5px #ccc;
        border-radius: 5px;
        left: 100%;
        text-align: left;
        top: -30px;
        content: '${props=>props.text}';
        font-size: 16px;
        display: none;
        width: 150px;
    }
    &:before {
        position: absolute;
        content: "*";
        font-size: 25px;
        left: 80%;
        top: -10px;
    }


`;
const MenuItem = styled.span`
    width: ${props=>props.width}%;
`;
const Size = styled(Currency)`
    width: auto;
   
    font: 300 16px/30px 'Arial', sans-serif;
`;
const ButImage = styled.button`
    border: none;
    background-color: #fff;
    margin: 0;
    vertical-align: middle;

`;
const But = styled.button`
    width: 20px;
    height: 20px; 
    margin: 0;
    padding: 0;
    font: message-box;
    display: inline-block;
    vertical-align: middle;
    
`;
const Items =  ({ currency, pageContext, data, addBag}) => {   
    // let brand = pageContext.brand;
    const [sort, set_sort] = React.useState(true);
    const [color, set_color] = React.useState("all");
    const [size, set_size] = React.useState(); 
    const [number, set_number] = React.useState(0);        
    const [min_cost, set_min] = React.useState(0);
    const [max_cost, set_max] = React.useState(100);
    const [index_size, set_index] = React.useState();
    const [image_item, set_image_item] = React.useState(false);
    const [image_color,set_image_color] = React.useState();
    const [image_model,set_image_model] = React.useState();
    
    const noFilterCost = () => {
       return (
        set_min(0),
        set_max(100)
       );
    };
    const SortOnCost = () => {
        set_sort(!sort)
    };
    
    
    const setColor = (i) => {
        set_color(color === i.color ? "all" : i.color)
    };    
    const orders =   data.allMongodbMyBase.nodes
        .sort((a,b)=> sort ? a.cost-b.cost:b.cost-a.cost)
        .filter(i=>i.cost >= min_cost)
        .filter(i=>i.cost <= max_cost)    
        .filter(i=> color === "all" ? i : i.color === color);      

    return <Layout  set_number={set_number} context_brand = {pageContext.brand} context_gender={pageContext.gender} > 
        
        <p className="menu_items">
            <MenuItem width="15" >ITEM</MenuItem>
            <MenuItem width="15" >BRAND</MenuItem>
            <span>MODEL</span>
            <span>GENDER</span>
            <MenuItem width="10" >COLOR</MenuItem>
            <span>SIZE</span>
            <span  className="cost" >
                COST
                <Currency  onClick={SortOnCost}>
                    {sort ? <b>&#9650;</b> : <b>&#9660;</b>}
                </Currency>
                
                {(min_cost !== 0 || max_cost !==100) && <But onClick={noFilterCost}>x</But>}
            </span>
            
            
        </p>   
        {orders.map((i,index) => 
            <div className="items">              
                <ButImage 
                    className="span_image"        
                   
                    style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${pageContext.brand}/${i.model}_${i.color}.jpg),url(https://myrunshop.000webhostapp.com/wp-content/image/${pageContext.brand}/${i.model}_${i.color}.webp)`,width:"15%",height:"120px"}}
                    onClick={()=>{set_image_item(true);set_image_color(i.color);set_image_model(i.model)}}
                ></ButImage>    
                <span style={{width: "15%"}}>{i.brand}</span>
                <Model text="Description:
                        Upper: Textile
                        Lining: Leater
                        Outsole: Sintehic
                    ">
                    {i.model}
                </Model>
                <span>{i.gender}</span>
                <MenuItem width="10" style={{color: i.color}}>
                    {i.color}
                    {" "}
                    <input 
                        type="checkbox"                    
                        onChange={()=>setColor(i)}
                        checked={color === i.color } 
                    />
                </MenuItem>
                <span >
                    {i.size.split(',').map(m=>
                        <Size style={{ backgroundColor: (size === m & index === index_size) ? '#ddd' : 'inherit'}} 
                            className="size" 
                            onClick={()=>{set_size(m);set_index(index)}}
                           
                           
                        >
                        {m}
                        </Size>
                    )}
                </span>
                <span className="cost">
                    <Currency onClick={()=>set_min(i.cost)} >{"<"}</Currency>
                    <b>
                        {currency === 1.2 ?(i.cost *currency).toFixed(0):(i.cost *currency).toFixed(0)}<Curr count={currency}/>
                    </b>
                    <Currency onClick={()=>set_max(i.cost)} >{"<"}</Currency>
                </span>
               
                    <button 
                        style={{
                            background: "url(https://i.ibb.co/KhBFscx/bag.png) center/100% no-repeat",
                            width: "48px",
                            height: "48px",
                            border: "none",
                            margin: "0",
                            verticalAlign: "middle",
                            opacity:(size !== 0 & index === index_size) ? 1 :  0.5
                        }}
                       
                        onClick={()=>addBag({
                            "brand": i.brand.toUpperCase(),
                            "model": i.model,
                            "gender": i.gender,
                            "cost": i.cost,
                            "color": i.color,
                            "size": size,
                            "count": 1
                        })} 
                        title={(size !== 0 & index === index_size) ? "TO BAG" : "SELECT SIZE"}
                    />
               
                       
             </div>
       
        )}
        {image_item && <Item 
                page={pageContext} 
                closeImage={set_image_item} 
                image_color={image_color} 
                image_model={image_model} 
                set_image={set_image_item}
            /> 
        }
    </Layout>
};

const mapStateToProps = state => ({
    bag: state.app.bag,
   
    currency: state.app.currency
   });
   
   const mapDispatchToProps = dispatch => ({
     addBag: (a) => dispatch(addBag(a))
  });


 
export default connect(mapStateToProps,mapDispatchToProps)(Items);

export const query = graphql`
    query Mongo($brand: String, $gender: [String!]){
        allMongodbMyBase(filter:{brand: {glob: $brand},gender: {in: $gender}}) {     
            nodes {                      
                gender
                color
                brand 
                cost 
                model
                size                   
            }
        }
   
        site {
          siteMetadata {
            title
          }   
        }
      
    }     
            
`