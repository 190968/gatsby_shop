import React from "react";
import "../styles/global.css";
import { connect } from "react-redux";
import styled from "styled-components";
import { addBag } from "../state/app";
import Linktobag from "./linktobag";


const Cost = styled.h2.attrs(props => ({
    sale:props.sale,
    props:props.currency
}))`    
    display: inline-block;
    margin: 0;
    font: 400 25px/25px 'Taroma',sans-serif;
    width: auto;
    position: relative;
    text-align: center;
    padding: 0;
    color: #000;
    &:before {
        content: '-${props=>props.sale}%';
       
        left: 50px;
        color: yellow;
        display: ${props=>props.sale ? 'inline-block':'none'};
        color: red;   
        position: absolute;
        font: 600 25px/25px 'Arial', sans-serif;
    }
    &:after {
        content: '${props=>props.currency}';
        left: 28px;
        position: absolute;      
           
       
    }
`;
const Close = styled.button`    
    float: left;
    cursor: pointer;
    border: none;
    background-color: #fff;
    height: 40px;
    width: 40px;    
    margin: 0;
    &:hover {
        background-color: #ddd;
    }
`;

const Input = styled.input`
    width: 100%;
    border: 2px solid lime;
    outline: none;
    cursor: pointer;
    background-color: lime;
    font-weight: 600;
    color: #000;    
    margin: 0;
    padding: 10px 0;
    &:hover {
       background-color: yellow;      
    }
    &:active {
        box-shadow: inset 0 0 5px  1px green;
        
    }
`;
 const Size = styled.b.attrs(props=>({
        setSize: props.setSize,
        newSize: props.newSize
    }))`
        
        margin: 0 ;
        z-index: 1;
        text-align: center;     
        font: 400 19px/19px 'Arial', sans-serif;
        border: 1px solid #fff;
        background-color: ${props => props.setSize === props.newSize ? "#ccc": "#fff"};
        display: inline-block;
        cursor: pointer;
        &:hover {
            border: 1px solid #ccc;
        }
        
    `;
const Item = (props) => {

    const { currency,addBag, page, gender, closeImage, image_color, image_model, size =  0, cost, sale = false, item = 'shoes' } = props;
    const [new_size, set_size] = React.useState(true);
    const s = (currency === 0.8) ? "€" : (currency === 1) ? "$"  : "£" ;
    const handClose = () => closeImage(false) ;
    const [ number, set_number ] = React.useState("");
   

    return (
        <div className="div_item">
           
            <div className="div_image">
                 <Close  onClick={handClose}>x</Close>
                <div className="div_big_image"                             
                    style={{backgroundSize: "90%", backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model.replace(" ","_") + "_" + image_color}${number}.jpg),
                    url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model.replace(" ","_") + "_" + image_color}${number}.webp),
                    url(https://github.com/superHotBob/image/blob/main/${page.brand}/${image_model.replace(" ","_") + "_" + image_color}${number}.jpg?raw=true)
                    `}}
                
                />
                {["",1,2].map((i,index) => <div className="div_small_image" key={index}
                        onClick={()=>set_number(i)}                       
                        style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model.replace(" ","_") + "_" + image_color}${i}.jpg),
                                url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model.replace(" ","_") + "_" + image_color}${i}.webp),
                                url(https://github.com/superHotBob/image/blob/main/${page.brand}/${image_model.replace(" ","_") + "_" + image_color}${i}.jpg?raw=true)`,

                                borderBottom: number === i ? "2px solid #000" : "none"
                        }}
                    />
                )}   
           
           
            </div>            
            <div className="div_content">
                <h3>{page.brand} <Linktobag /></h3>
                <p>
                    {image_model.replace("T_S","T-S").replace(/_/g," ")} {gender}s run {item}                        
                </p>                  
                <Cost sale={sale} currency={s}>{Math.trunc(cost*currency)}</Cost>
                <p><strong>color:</strong> {image_color}</p>
                <p><strong>size: </strong>{new_size}</p>
                <p>{size.split(",").map((i,index) => 
                    <Size key={index} newSize={new_size} setSize={i} onClick={()=>set_size(i)}>
                        {item === 'shoes' ? `${i - 29} (${i})` : i}
                    </Size>)}
                </p>        
                <Input type="button"
                        disabled = {!parseInt(new_size)}                        
                       
                        onClick={()=>addBag({
                            "brand": page.brand.toUpperCase(),
                            "model": image_model,
                            "gender": gender,
                            "cost": cost,
                            "color": image_color,
                            "size": new_size,
                            "count": 1
                        })}
                        value={!parseInt(new_size)  ? "SELECT SIZE":"ADD TO BAG"}
                />        
                   
               
                
                    
                   

            </div>
            <div className="div_description">
                <b>Description</b>
                    <ul>
                        <li>{gender} {item} for run</li>
                        <li>Upper: Textile. Aggressive Chevron grip pattern</li>
                        <li>Lining: Textile/Sinthetic</li>
                        <li>Outsole: Sintehic. Full length Ignite Foam midsole</li>
                        <li>Made in: Chine</li>
                    </ul>
            </div>
           
        </div>       

    )

};
const mapStateToProps = state => ({
    bag: state.app.bag,   
    currency: state.app.currency
});
   
const mapDispatchToProps = dispatch => ({
    addBag: (a) => dispatch(addBag(a))
});
export default connect(mapStateToProps,mapDispatchToProps)(Item);
