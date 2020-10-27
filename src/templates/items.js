import React from "react";
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
    width: ${props => props.ten ? '9vw' : '13.5vw'};
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
        width: 20%;
       margin: 0 auto;
       display: inline-block;
       vertical-align: middle;
       color: gray;
        font: 300 20px/5px 'Arial', sans-serif;
        span {
            margin: 0;
            padding: 0;
            font: 300 40px/15px 'Arial', sans-serif;
            display: inline-block;
        }
    }
       
        font-size: 16px;
   
`;
const MenuItemPage = styled(MenuItem)`
    display: none;
    @media(max-width: 1000px) {
        display: inline-block;
        width: auto;
    }
`;

const Size = styled(Currency)`     
    font: 300 15px/20px 'Arial', sans-serif;    
    display: inline-block;
    text-align: center;
    height: 20px;
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


const Color = styled(MenuItem).attrs(props=>({
    color:props.color
}))`   
    font: 100px/16px 'Arial', sans-serif;
    cursor: pointer;
    position: relative;   
    &:hover:before {
        display: inline-block;
        font-weight: 600;
        width: 100px;
    }
    &:before {
        content: 'select ${props=>props.color}';
        position: absolute;
        top: -20px;
        left: 1vw;
        display: none;
        color: #000;      
        width: 100px; 
        font-size: 16px;
    }
`;
const Gender = styled(MenuItem).attrs(props=>({
    color:props.gender
}))`   
    font: 20px/16px 'Arial', sans-serif;
    cursor: pointer;
    position: relative;   
    &:hover:before {
        display: inline-block;
        font-weight: 600;
       
    }
    &:before {
        content: 'select ${props=>props.gender}';
        position: absolute;
        top: -20px;
        left: 4vw;
        display: none;
        color: #000;      
        
        font-size: 16px;
    }
`;
const Sale = styled.div.attrs(props => ({
    sale:props.sale,
    props:props.currency
}))`    
    display: inline-block;    
    font-size: 25px;   
    position: relative;    
    &:before {
        content: '-${props=>props.sale}%';
        top: -25px;
        left: 55%;
        color: yellow;
        visibility: ${props=>props.sale === 0 ? 'hidden': 'visible'};
        background-color: red;
        padding: 5px 2px;
        border-radius: 20%;
        position: absolute;
        font: 600 16px/18px 'Arial', sans-serif;
    }
    &:after {
        content: '${props=>props.currency}';      
        padding: 5px 2px 0 5px;       
        font: 400 20px/18px 'Arial', sans-serif;
    }
`;

const Page = styled.p`
    text-align: right;
    padding: 0 10px 0 0;
    margin: 5px 0;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    background-color: lightgoldenrodyellow;
    z-index: 10;   
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
    htmlFor: props.htmlFor,
    item: props.item
}))`
    color: blue;
    margin: 0 5px;
    background-color: ${props=>props.htmlFor === props.item ? "yellow" :" inherrit "}

`;
const Filtr = styled.b.attrs(props=>({
    props:props.color
}))`
    padding: 5px 8px;    
    border: 1px solid cornflowerblue;
    cursor: pointer;
    background-color: yellow;    
    position: relative;
    font: italic 600 16px/16px "Taroma", sans-serif;
    margin: 0 10px;
    display: ${props=>(props.color === "GENDER" || props.color === "all" || props.color === null || props.color === 0 || props.color === 180) ? 'none': 'inline-block'};
    vertical-align: middle;
    // border-radius: 10px;
    z-index: 0;      
    color: cornflowerblue;   
    &:after {
        content: 'x';
        color: cornflowerblue;
        padding: 0 5px;
        text-align: center;
        font-size: 13px;
        border: 1px solid cornflowerblue;;
        // border-radius: 20px;
        position: absolute;
        top: -5px;
        z-index: 10;
        left: -15px;
        background-color: yellow;
    }
`;

const ItemSelect = ({ props, item_new, setItem }) => {
    return (
        <Label item= {item_new} htmlFor={props} >
            {props}
            <Checkbox 
                id={props} 
                type="checkbox" 
                name={props} 
                onChange={()=>setItem(props)} 
            />
        </Label>
    )
};

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
    
    const setItem = a => { 
        set_item(a);     
        set_min(0);
        set_max(180);
        set_size(null);
        set_color("all")      
    };
    const SortOnCost = () => set_sort(!sort) ;
    
    const setItemView = (a,b) => {
        set_image_item(a);
        set_new_index(b);       
    };
    const setColor = i => set_color(color === i.color ? "all" : i.color) ;   

    const orders = data.allMongodbMyBase.nodes
        .filter(i => i.item === item)
        .filter(i => size ? i.size.split(',').some(a=>a===size) : i.size)
        .filter(i => model ? i.model === model : i.model)
        .filter(i => gender==='GENDER' ? i : i.gender === gender)
        .sort((a,b) => sort ? a.cost-b.cost:b.cost-a.cost)
        .filter(i => i.cost >= min_cost)
        .filter(i => i.cost <= max_cost)    
        .filter(i => color === "all" ? i : i.color === color);

    


    return <Layout 
            countr = {countr} 
            model = {model} 
            set_number = {set_number} 
            orders = {orders.length} 
            context_brand = {pageContext.brand} 
            context_gender = {pageContext.gender} 
        > 
        <Info 
            brand ={pageContext.brand} 
            gender={pageContext.gender} 
            order={orders.length} 
            model={model}      
            item= { item }          
        />
       
        <Page>
            <MenuItemPage>              
                < ItemSelect props="shoes" item_new={item} setItem={setItem} />
                < ItemSelect props="clothing" item_new={item} setItem={setItem} />
            </MenuItemPage> 
            <Filtr color={gender} onClick={()=>set_gender("GENDER")}>gender: {gender}</Filtr>         
            <Filtr color={color} onClick={()=>set_color("all")}>color: {color}</Filtr>
            <Filtr color={size} onClick={()=>set_size(null)}>size: {size}</Filtr>
            <Filtr color={min_cost} onClick={()=>set_min(0)}>cost {">"} {min_cost}</Filtr>
            <Filtr color={max_cost} onClick={()=>set_max(180)}>cost {"<"} {max_cost}</Filtr> 
            <span className="sort">
                    Sort by:{" "}
                    <select onChange={(e)=>SortOnCost(e.target.value)}>
                        <option value="true" >cheap first</option>
                        <option value="false" >expensive first</option>
                    </select>
            </span>     
            <span>Page:</span>
            {orders.filter( (i,index) => !("" + (index/10)).includes(".")).map( (i,index) => 
            <span style={{backgroundColor: index+1 === page  ? 'yellow' : 'inherit'}} onClick={()=>set_page(index+1)}>{index+1}</span>)}
        </Page>
        <div className="menu_items">
            <MenuItem>              
                < ItemSelect props="shoes" item_new={item} setItem={setItem} />
                < ItemSelect props="clothing" item_new={item} setItem={setItem} />
            </MenuItem>          
            <MenuItem >BRAND</MenuItem>
            <MenuItem >MODEL</MenuItem>
            <MenuItem >GENDER</MenuItem>
            <MenuItem ten >COLOR</MenuItem>
            <MenuItem >SIZE</MenuItem>
            <MenuItem style={{paddingRight: "3px"}}>              
                <Slider min={min_cost} max={max_cost} setMin={set_min} setMax={set_max} />            
            </MenuItem>            
            
        </div>   
        {orders.filter((i,index) => (page-1)*10 <= index && index < page*10).map((i,index) => 
            <div className="items" key={index} >              
                <ButImage                  
                    style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand}/${i.model}_${i.color}.jpg),
                        url(https://myrunshop.000webhostapp.com/wp-content/image/${pageContext.brand}/${i.model}_${i.color}.webp),
                        url(https://github.com/superHotBob/image/blob/main/${pageContext.brand}/${i.model}_${i.color}.webp?raw=true),
                        url(https://github.com/superHotBob/image/blob/main/${pageContext.brand}/${i.model}_${i.color}.jpg?raw=true),
                        url('https://www.datocms-assets.com/28552/1590394654-image.jpg')`
                    }} 
                    alt="no image"
                    onClick={()=>setItemView(true,index)}
                        
                />    
                <span className="brand">{i.brand}</span>
                <span>{i.model.replace("T_S","T-S").replace(/_/g," ")}</span>
                <Gender onClick={()=>set_gender(i.gender)} gender={i.gender} >{i.gender}s</Gender>
                <Color ten style={{color: i.color}} color={i.color}  onClick={()=>setColor(i)}>                  
                    &#8226;                    
                </Color>
                <span>
                    {i.size.split(',').map( m =>
                        <Size 
                            key={m}
                            style={{ backgroundColor: size === m  ? '#ddd' : 'inherit'}}                           
                            onClick={()=>set_size(m)}                          
                        > 
                            {item === 'shoes' ? `${m - 32} (${m})` : m}
                        </Size>
                    )}
                </span>                                
                <Sale className="cost"  sale={i.sale} currency={s}>{(i.cost*currency).toFixed(0)}</Sale>                            
                       
                               
                           
                              
                   
                   
               
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