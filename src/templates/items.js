import React from "react";
import "../styles/global.css";
import {  graphql } from "gatsby";
import Item from "../components/item";
import { connect } from "react-redux";
import styled from "styled-components";
import  Layout  from "../components/layout";

import { addBag } from "../state/app";
import { Info } from "../components/info";

const Currency = styled.button`
    font: 400 22px/30px 'Arial', sans-serif;
    outline: none;
    display: inline-block;
    width: 25px;
    vertical-align: middle;
    text-align: center;
    height: 30px;
    border: none;
    margin: 0;
    background-color: inherit;   
    &:hover{
        background-color: #ddd;  
    }
`;

const MenuItem = styled.div`
    width: ${props=>props.width === '10' ? '10':'15'}%;
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
    font: 300 16px/30px 'Arial', sans-serif;    
    display: inline-block;
    text-align: center;
    height: 30px;
    width: auto;
    margin: 0;       
    border-radius: 30px;
    cursor: pointer;  
    &:hover {
        box-shadow: 0 0 1px 1px  #bbb;
    }
    
`;

const ButImage = styled.button`
    border: 1px solid transparent;
    background-color: #fff;
    margin: 0;
    outline: none;
    width: 15%;
    height: 110px;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    cursor: pointer;
    &:hover {
        border: 1px solid #ccc;
    }
    @media (max-width: 600px) {
        width: 100%;
        height: 130px;
    }

`;


const Color = styled.span.attrs(props=>({
    color:props.color
}))`
    padding: 12px;
    background-color: ${props=>props.color};   
    cursor: pointer;
   
    vertical-align: middle;
    border-radius: 20px;
    &:hover {
        border: 1px solid yellow;
    }
`;
const Sale = styled.b.attrs(props => ({
    sale:props.sale,
    props:props.currency
}))`    
    display: inline-block;
    margin: 0;
    font-size: 25px;
    width: auto;
    position: relative;
    text-align: center;
    padding: 0 10px;
    &:before {
        content: '-${props=>props.sale}%';
        top: -25px;
        left: 32px;
        color: yellow;
        visibility: ${props=>props.sale === 0 ? 'hidden': 'visible'};
        background-color: red;
        padding: 5px 2px;
        border-radius: 50%;
        position: absolute;
        font: 600 16px/18px 'Arial', sans-serif;
    }
    &:after {
        content: '${props=>props.currency}';      
        padding: 5px 2px 0 5px;       
        font: 400 20px/18px 'Arial', sans-serif;
    }
`;
const Select = styled.select`
    border: none;
    outline: none;
    background: inherit;
    option {
        border: none;
        outline: none;
    }
`;
const Items =  ({ currency, pageContext, data,  location}) => {   
    // let brand = pageContext.brand;
    const {state = {}} = location;
    const { model } = state || "run";
    const s = (currency === 0.8) ? "€" : (currency === 1) ? "$"  : "£" ;
    const [gender, set_gender] = React.useState("GENDER");
    const [sort, set_sort] = React.useState(true);
    const [color, set_color] = React.useState("all");
    const [size, set_size] = React.useState(null); 
    const [number, set_number] = React.useState(0);        
    const [min_cost, set_min] = React.useState(0);
    const [max_cost, set_max] = React.useState(100000);
   
    const [image_item, set_image_item] = React.useState(false);
    const [new_index, set_new_index] = React.useState();
    
    const noFilterCost = () => {
      
        set_min(0);
        set_max(10000);
        set_size(null);
        set_color("all")
      
    };
    const SortOnCost = () => {
        set_sort(!sort)
    };
    
    const setItem = (a,b) => {
        set_image_item(a);
        set_new_index(b);
       
    };
    const setColor = (i) => {
        set_color(color === i.color ? "all" : i.color)
    };    
    const orders = data.allMongodbMyBase.nodes
        .filter(i=> size ? i.size.split(',').some(a=>a===size) : i.size)
        .filter(i=> model ? i.model === model : i.model)
        .filter(i=> gender==='GENDER' ? i : i.gender === gender)
        .sort((a,b)=> sort ? a.cost-b.cost:b.cost-a.cost)
        .filter(i=>i.cost*currency >= min_cost)
        .filter(i=>i.cost*currency <= max_cost)    
        .filter(i=>color === "all" ? i : i.color === color); 
   
    
    return <Layout model={model} set_number={set_number} orders={orders.length} context_brand = {pageContext.brand} context_gender={pageContext.gender} > 
        <Info 
            brand ={pageContext.brand} 
            gender={pageContext.gender} 
            order={orders.length} 
            model={model}
            color={color}
            size={size}
            set_color={set_color}
            set_size={set_size}
            min ={min_cost}
            max ={max_cost}
            set_min={set_min}
            set_max={set_max}
            noFilterCost={noFilterCost}
        />
       
        <div className="menu_items">
            <MenuItem >ITEM</MenuItem>
            <MenuItem >BRAND</MenuItem>
            <MenuItem >MODEL</MenuItem>
            <MenuItem >
               <Select  onChange={(e)=>set_gender(e.target.value)}>
                   <option value="GENDER" >all</option>
                   {pageContext.gender.map(i=><option value={i}>{i}</option>)}
                  
               </Select>
            </MenuItem>
            <MenuItem width="10">COLOR</MenuItem>
            <MenuItem >SIZE</MenuItem>
            <MenuItem >
                COST {" "}{s}
                {sort ? <Size  onClick={SortOnCost}>&#9650;</Size> : <Size  onClick={SortOnCost}>&#9660;</Size>}
                
              
            </MenuItem>
            
            
        </div>   
        {orders.map((i,index) => 
            <div className="items">              
                <ButImage                  
                    style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand}/${i.model}_${i.color}.jpg),
                        url(https://myrunshop.000webhostapp.com/wp-content/image/${pageContext.brand}/${i.model}_${i.color}.webp)`,
                        }} 
                        alt="no image"
                    onClick={()=>setItem(true,index)}
                        
                />    
                <span>{i.brand}</span>
                <span>{i.model}</span>
                <span>{i.gender}</span>
                <MenuItem width="10" style={{color: i.color}}>
                  
                  
                    <Color color={i.color} onClick={()=>setColor(i)} title={i.color}/>
                    
                </MenuItem>
                <span>
                    {i.size.split(',').map(m=>
                        <Size 
                            style={{ backgroundColor: size === m  ? '#ddd' : 'inherit'}}                           
                            onClick={()=>set_size(m)}                          
                        >{m}</Size>
                    )}
                </span>
                <div className="cost">
                    <Size onClick={()=>set_min(i.cost*currency)}>{"<"}</Size> 
                   
                        <Sale sale={i.sale} currency={s} >                  
                           
                                {(i.cost*currency).toFixed(0)} 
                               
                           
                        </Sale>
                       
                   
                    <Size onClick={()=>set_max(i.cost*currency)}>{"<"}</Size>
                </div>
                {(image_item & index === new_index) && <Item 
                        page={i} 
                        closeImage={set_image_item} 
                        image_color={i.color} 
                        image_model={i.model} 
                        set_image={set_image_item}              
                        gender={i.gender}
                        item ={i.item}
                        sale={i.sale}
                        cost={i.cost}
                        size={i.size}
                    />
                  
                }
                  
               
                       
            </div>
           
           
       
        )}
        
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
                item                  
            }
        }
   
        site {
          siteMetadata {
            title
          }   
        }
      
    }     
            
`