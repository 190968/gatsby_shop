import React, {useEffect} from "react";
import "../styles/global.css";
import {  graphql } from "gatsby";
import Item from "../components/item";
import { connect } from "react-redux";
import styled from "styled-components";
import  Layout  from "../components/layout";

import { addBag } from "../state/app";
import { Info } from "../components/info";
import Slider from "./slider";

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
    vertical-align: middle;
    padding: 5px 0;
    b {
        cursor: pointer;
        &:hover {
            background-color: #ccc;
        }
    }
    p {
        margin: 0;
        font-size: 16px;
    }
`;
const Size = styled(Currency)`     
    font: 300 15px/30px 'Arial', sans-serif;    
    display: inline-block;
    text-align: center;
    height: 30px;
    width: auto;
    margin: 0;       
   
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
    height: 25px;
    padding: 0 12px;
    display: inline-block;
    background-color: ${props=>props.color};   
    cursor: pointer;
    position: relative;   
    vertical-align: middle;
    border-radius: 20px;
    &:hover:before {
        display: inline-block;
        font-weight: 600;
    }
    &:before {
        content: 'select ${props=>props.color}';
        position: absolute;
        top: -20px;
        left: -25px;
        display: none;
        color: #000;
        font-size: 16px;
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
const Page = styled.p`
    text-align: right;
    padding: 0 10px;
    margin: 5px 0;
   
    span {
       padding: 0 10px;
       color: blue;
       cursor: pointer;
       :hover :not(:nth-of-type(1)) {
          text-decoration: underline;
       }
    }
`;
const Checkbox = styled.input`
    margin: 0 10px;
    height: 20px;
    width: 20px;
    display: none;
`;
const Label = styled.label.attrs(props=>({
    props:props.for,
   
}))`
    color: blue;
    margin: 0 5px;
    background-color: ${props=>props.for === props.item ? "yellow" :" inherrit "}

`;
const Items =  ({ currency, pageContext, data,  location, countr }) => {   
   
    const {state = {}} = location;
    const { model } = state || "run";
    const s = (currency === 0.8) ? "€" : (currency === 1) ? "$"  : "£" ;
    const [gender, set_gender] = React.useState("GENDER");
    const [sort, set_sort] = React.useState(true);
    const [color, set_color] = React.useState("all");
    const [size, set_size] = React.useState(null); 
    const [number, set_number] = React.useState(0);        
    const [min_cost, set_min] = React.useState(0);
    const [max_cost, set_max] = React.useState(180);
    const [page, set_page] = React.useState(1);
    const [item, set_item] = React.useState("shoes");
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
        .filter(i=>i.item === item)
        .filter(i=> size ? i.size.split(',').some(a=>a===size) : i.size)
        .filter(i=> model ? i.model === model : i.model)
        .filter(i=> gender==='GENDER' ? i : i.gender === gender)
        .sort((a,b)=> sort ? a.cost-b.cost:b.cost-a.cost)
        .filter(i=> i.cost >= min_cost)
        .filter(i=> i.cost <= max_cost)    
        .filter(i=> color === "all" ? i : i.color === color);

    // var max = [].sort((a,b)=>a.cost-b.cost);       
    //     for(const i of data.allMongodbMyBase.nodes){
    //     max.push(i.cost);
    // }   
   
    // useEffect(()=>{  
    // set_max(max[max.length-1]);
    // set_min(max[0]);
    // },[]);   


    return <Layout 
            countr={countr} 
            model={model} 
            set_number={set_number} 
            orders={orders.length} 
            context_brand = {pageContext.brand} 
            context_gender={pageContext.gender} 
        > 
        <Info 
            brand ={pageContext.brand} 
            gender={pageContext.gender} 
            order={orders.length} 
            model={model}
            color={color}
            set_sort={SortOnCost}
            size={size}
            set_color={set_color}
            set_size={set_size}
            min ={min_cost}
            max ={max_cost}
            item= { item }
            set_min={set_min}
            set_max={set_max}
            noFilterCost={noFilterCost}
        />
        <Page>
            <span>Page:</span>
            {orders.filter((i,index)=>!("" + (index/10)).includes(".")).map((i,index) => 
            <span style={{backgroundColor: index+1 === page  ? 'yellow' : 'inherit'}} onClick={()=>set_page(index+1)}>{index+1}</span>)}
        </Page>
        <div className="menu_items">
            <MenuItem >
                ITEM
                <p>
                    <Label for="shoes" item={item}>Shoes</Label>
                    <Checkbox id="shoes" type="checkbox" name="shoes" onChange={()=>set_item("shoes")}/>
                    <Label for="clothing" item={item}>Clothing</Label>
                    <Checkbox  id="clothing" type="checkbox" name="clothing"  onChange={()=>set_item("clothing")}/>
                </p>
            </MenuItem>          
            <MenuItem >BRAND</MenuItem>
            <MenuItem >MODEL</MenuItem>
            <MenuItem >
               <Select  onChange={(e)=>set_gender(e.target.value)}>
                   <option value="GENDER" >all</option>
                   {pageContext.gender.map(i=><option key={i} value={i}>{i}</option>)}
                  
               </Select>
            </MenuItem>
            <MenuItem width="10">COLOR</MenuItem>
            <MenuItem >SIZE</MenuItem>
            <MenuItem style={{padding:"3px"}}>
               
                {/* {sort ? <Size  onClick={SortOnCost}>cost A to Z</Size> : <Size  onClick={SortOnCost}>cost Z to A</Size>} */}
                <Slider min={min_cost} max={max_cost} setMin={set_min} setMax={set_max} />
            
            </MenuItem>
            
            
        </div>   
        {orders.filter((i,index)=> (page-1)*10 <= index && index < page*10).map((i,index) => 
            <div className="items" key={index} >              
                <ButImage                  
                    style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand}/${i.model}_${i.color}.jpg),
                        url(https://myrunshop.000webhostapp.com/wp-content/image/${pageContext.brand}/${i.model}_${i.color}.webp),
                        url('https://www.datocms-assets.com/28552/1590394654-image.jpg')`
                        }} 
                        alt="no image"
                    onClick={()=>setItem(true,index)}
                        
                />    
                <span className="brand">{i.brand}</span>
                <span>{i.model.replace("T_S","T-S").replace(/_/g," ")}</span>
                <span>{i.gender}</span>
                <MenuItem width="10" style={{color: i.color}}>
                  
                  
                    <Color color={i.color} onClick={()=>setColor(i)} />
                    
                </MenuItem>
                <span>
                    {i.size.split(',').map(m=>
                        <Size 
                            key={m}
                            style={{ backgroundColor: size === m  ? '#ddd' : 'inherit'}}                           
                            onClick={()=>set_size(m)}                          
                        >{m}</Size>
                    )}
                </span>
                <div className="cost">                  
                    <Sale sale={i.sale} currency={s} >     
                           
                        {(i.cost*currency).toFixed(0)} 
                               
                           
                    </Sale>              
                   
                   
                </div>
                {(image_item & index === new_index) ? <Item 
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
                    :
                    <>
                    </>    
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