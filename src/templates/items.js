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
    vertical-align: middle;
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
const MenuItem = styled.div`
    width: ${props=>props.width}%;
    display: inline-block;
    text-align: center;
    padding: 10px 0;
    b {
        cursor: pointer;
        &:hover {
            background-color: #ccc;
        }
    }
`;
const Size = styled(Currency)`     
    font: 300 18px/16px 'Arial', sans-serif;    
    display: inline-block;
    text-align: center;
    padding:0 3px;
    width: auto;
    margin: 0  2px;       
    border-radius: 5px;
    cursor: pointer;  
    &:hover {
        box-shadow: 1px 1px 2px 2px  #ddd;
    }
`;
const ButImage = styled.button`
    border: none;
    background-color: #fff;
    margin: 0;
    outline: none;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    cursor: pointer;
    &:hover {
        border: 1px solid #ccc;
    }

`;
const But = styled.button`
    width: 25px;
    height: 25px; 
    margin: 0;
    padding: 0;
    font: message-box;
    display: inline-block;
    vertical-align: middle;
    
`;
const Cost = styled.div`
    display: inline-block;
    font: 400 20px/18px 'Arial', sans-serif;
    width: 38%;   
    padding: 0;
    margin: 0;
    vertical-align: middle;
`;
const Sale = styled.span.attrs(props => ({
    props:props.sale
}))`   
    
    dislpay: inline-block;
    margin: 0;
    width: 100%;
    position: relative;
    padding: 0;
    &:after {
        content: '-${props=>props.sale}%';
        top: -30px;
        left: 12px;
        color: yellow;
        visibility: ${props=>props.sale === 0 ? 'hidden': 'visible'};
        background-color: red;
        padding: 5px 2px;
        border-radius: 50%;
        position: absolute;
        font: 600 16px/18px 'Arial', sans-serif;
    }
`;

const Items =  ({ currency, pageContext, data, addBag, location}) => {   
    // let brand = pageContext.brand;
    const {state = {}} = location;
    const { model } = state || "run";

    const [gender, set_gender] = React.useState("GENDER");
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
    const orders = data.allMongodbMyBase.nodes
        .filter(i=> model ? i.model === model : i.model)
        .filter(i=> gender==='GENDER' ? i : i.gender === gender)
        .sort((a,b)=> sort ? a.cost-b.cost:b.cost-a.cost)
        .filter(i=>i.cost >= min_cost)
        .filter(i=>i.cost <= max_cost)    
        .filter(i=>color === "all" ? i : i.color === color);      

    return <Layout  set_number={set_number} context_brand = {pageContext.brand} context_gender={pageContext.gender} > 
        <h4>
           
            {pageContext.gender.length>3 ? "all" : pageContext.gender}{" "}
            {pageContext.brand} shoes and clothing ({orders.length} products)
        </h4>
        <div className="menu_items">
            <MenuItem width="15" >ITEM</MenuItem>
            <MenuItem width="15" >BRAND</MenuItem>
            <MenuItem width="15">MODEL</MenuItem>
            <MenuItem width="15">
               <select style={{border: "none",outline: "none",background: "inherit"}} onChange={(e)=>set_gender(e.target.value)}>
                   <option value="GENDER">GENDER</option>
                   {pageContext.gender.map(i=><option value={i}>{i}</option>)}
                   {/* <option value="women">women</option>
                   <option value="boy">boy</option>
                   <option value="girl">girl</option> */}
               </select>
            </MenuItem>
            <MenuItem width="10" >COLOR</MenuItem>
            <MenuItem width="15">SIZE</MenuItem>
            <MenuItem width="10">
                COST
                {sort ? <b  onClick={SortOnCost}>&#9650;</b> : <b  onClick={SortOnCost}>&#9660;</b>}
                
                {(min_cost !== 0 || max_cost !==100) && <But onClick={noFilterCost}>x</But>}
            </MenuItem>
            
            
        </div>   
        {orders.map((i,index) => 
            <div className="items">              
                <ButImage                  
                    style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand}/${i.model}_${i.color}.jpg),
                        url(https://myrunshop.000webhostapp.com/wp-content/image/${pageContext.brand}/${i.model}_${i.color}.webp)`,
                        width:"15%",height:"120px"}}
                    onClick={()=>{set_image_item(true);set_image_color(i.color);set_image_model(i.model)}}
                />    
                <span style={{width: "15%"}}>{i.brand}</span>
                <Model 
                    text="Description:
                        Upper: Textile
                        Lining: Leater
                        Outsole: Sintehic"
                >{i.model}
                </Model>
                <span>{i.gender}</span>
                <MenuItem width="10" style={{color: i.color}}>
                    {i.color}
                    {" "}
                    <input 
                        type="checkbox"                    
                        onChange={()=>setColor(i)}
                        checked={color === i.color} 
                    />
                </MenuItem>
                <span >
                    {i.size.split(',').map(m=>
                        <Size style={{ backgroundColor: (size === m & index === index_size) ? '#ddd' : 'inherit'}} 
                           
                            onClick={()=>{set_size(m);set_index(index)}}                  
                           
                        >{m}</Size>
                    )}
                </span>
                <span className="cost">
                    {/* <Currency onClick={()=>set_min(i.cost)}>{"<"}</Currency>  */}
                    <Cost>
                        <Sale sale={i.sale}>                  
                            {currency === 1.2 ?(i.cost *currency).toFixed(0):(i.cost *currency).toFixed(0)}<Curr count={currency}/>
                        </Sale>
                        {/* {i.sale > 0 ? <SalePersent>-{i.sale}%</SalePersent>: "" } */}
                    </Cost>    
                    {/* <Currency onClick={()=>set_max(i.cost)}>{"<"}</Currency> */}
                </span>
               
                    <button 
                        style={{
                            background: "cornflowerblue url(https://myrunshop.000webhostapp.com/wp-content/image/icon/bag.png) center/80% no-repeat",
                            width: "3vw",
                            height: "3vw",
                            border: "none",
                            margin: "0",
                            outline: "none",
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
                        title={(size !== 0 & index === index_size) ? "ADD TO BAG" : "SELECT SIZE"}
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
    query Mongo($brand: [String!], $gender: [String!]){
        allMongodbMyBase(filter:{brand: {in: $brand},gender: {in: $gender}}) {     
            nodes {                      
                gender
                color
                brand 
                cost 
                model
                size
                sale                   
            }
        }
   
        site {
          siteMetadata {
            title
          }   
        }
      
    }     
            
`