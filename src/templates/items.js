import React from "react";
import "../styles/global.css";
import {  graphql } from "gatsby";
import Item from "../components/item";
import { connect } from "react-redux";
import styled from "styled-components";
import  Layout  from "../components/layout";
import { Curr } from "../components/currency";
import { addBag } from "../state/app";

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
const SizeOne = styled.b`
   
    position: absolute;
    padding: 0 10px;
    &:after {
        content: 'x';
        font-size: 15px;
        position: absolute;
        top: -15px;
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

const Sale = styled.b.attrs(props => ({
    props:props.sale
}))`    
    display: inline-block;
    margin: 0;
    font-size: 25px;
    width: 40%;
    position: relative;
    text-align: center;
    padding: 0;
    &:after {
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
`;

const Items =  ({ currency, pageContext, data,  location}) => {   
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
    const [new_index, set_new_index] = React.useState();
    
    const noFilterCost = () => {
      
        set_min(0);
        set_max(100)
      
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
        .filter(i=>i.cost >= min_cost)
        .filter(i=>i.cost <= max_cost)    
        .filter(i=>color === "all" ? i : i.color === color);      

    return <Layout model={model} set_number={set_number} orders={orders.length} context_brand = {pageContext.brand} context_gender={pageContext.gender} > 
        
        <div className="menu_items">
            <MenuItem width="15" >ITEM{pageContext.house}</MenuItem>
            <MenuItem width="15" >BRAND</MenuItem>
            <MenuItem width="15">MODEL</MenuItem>
            <MenuItem width="15">
               <select style={{border: "none",outline: "none",background: "inherit"}} onChange={(e)=>set_gender(e.target.value)}>
                   <option value="GENDER" style={{border: "none",outline: "none"}}>all</option>
                   {pageContext.gender.map(i=><option value={i}>{i}</option>)}
                  
               </select>
            </MenuItem>
            <MenuItem width="10">COLOR</MenuItem>
            <MenuItem width="15">
                SIZE {" "}
                {size && <SizeOne onClick={()=>set_size("")}>{size}</SizeOne>}
            
            </MenuItem>
            <MenuItem width="15">
                COST {" "}
                {sort ? <Size  onClick={SortOnCost}>&#9650;</Size> : <Size  onClick={SortOnCost}>&#9660;</Size>}
                
                {(min_cost !== 0 || max_cost !==100) && <But onClick={noFilterCost}>x</But>}
            </MenuItem>
            
            
        </div>   
        {orders.map((i,index) => 
            <div className="items">              
                <ButImage                  
                    style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand}/${i.model}_${i.color}.jpg),
                        url(https://myrunshop.000webhostapp.com/wp-content/image/${pageContext.brand}/${i.model}_${i.color}.webp)`,
                        }}
                    onClick={()=>setItem(true,index)}
                        
                />    
                <span>{i.brand}</span>
                <span>{i.model}</span>
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
                   
                        <Sale sale={i.sale}>                  
                            {currency === 1.2 ?(i.cost *currency).toFixed(0):(i.cost *currency).toFixed(0)}<Curr count={currency}/>
                        </Sale>
                        {/* {i.sale > 0 ? <SalePersent>-{i.sale}%</SalePersent>: "" } */}
                   
                    <Size onClick={()=>set_max(i.cost*currency)}>{"<"}</Size>
                </div>
                {image_item & index === new_index && <Item 
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