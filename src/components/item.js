import React from "react";
import "../styles/global.css";
import { connect } from "react-redux";
import styled from "styled-components";
import { addBag } from "../state/app";
import Linktobag from "./linktobag";


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

const Button = styled.button`
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
 const Size = styled.span.attrs(props=>({
        setSize: props.setSize,
        newSize: props.newSize
    }))`
        padding: 5px;
        margin: 0 5px 0 0;
        z-index: 1;
        text-align: center;       
        width: 15%;
        border: 1px solid #fff;
        background-color: ${props => props.setSize === props.newSize ? "#ccc": "#fff"};
        display: inline-block;
        cursor: pointer;
        &:hover {
            border: 1px solid #ccc;
        }
        h2 b {
            color: red;
            font-size: 25px;
        }
    `;
const Item = (props) => {

    const { currency,addBag, page, gender, closeImage, image_color, image_model, size =  0, cost, sale= 0, item = 'shoes' } = props;
    const [new_size, set_size] = React.useState("select size");
    const s = (currency === 0.8) ? "€" : (currency === 1) ? "$"  : "£" ;
    const handClose = () => {
        closeImage(false)
    };
    const [ number, set_number ] = React.useState("");
   

    return (
        <div className="div_item">
            <Close  onClick={handClose}>x</Close>

            <div className="div_image">
                <div 
                    className="div_big_image" 
                            
                    style={{backgroundSize: "90%", backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model.replace(" ","_") + "_" + image_color}${number}.jpg),url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model.replace(" ","_") + "_" + image_color}${number}.webp)`}}
                
                />
                {["",1,2].map(i => <div className="div_small_image"
                        onClick={()=>set_number(i)}
                        
                       
                        style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model.replace(" ","_") + "_" + image_color}${i}.jpg),
                                url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model.replace(" ","_") + "_" + image_color}${i}.webp)`,
                                borderBottom: number === i ? "2px solid #000" : "none"
                        }}
                    />
                )}   
           
           
            </div>            
            <div className="div_content">
                <h2>{page.brand.toUpperCase()} <Linktobag /></h2>
                <p>
                    {image_model.replace("T_S","T-S").replace(/_/g," ")} {gender} run {item}                        
                </p>
                <h2>                        
                    {sale === 0 ? 
                       <Sale sale={sale} currency={s} >     
                           
                            {(cost*currency).toFixed(0)} 
                              
                          
                        </Sale>           
                        :
                        <> 
                            <del>{cost*currency}$</del>  <b>{(cost*(100-sale)/100).toFixed(0) + `$`}</b>
                        </>
                    }
                </h2>
                
                    <p><strong>color:</strong> {image_color}</p>
                    <p><strong>size:</strong> {new_size}</p>
                    <p>{size.split(",").map((i,index)=><Size key={index} newSize={new_size} setSize={i} onClick={()=>set_size(i)}>{i}</Size>)}</p>
                    <Button
                        disabled={new_size === "select size" ? "disabled":""}                        
                        title={new_size === "select size" ? "select size":"add to bag"}
                        onClick={()=>addBag({
                            "brand": page.brand.toUpperCase(),
                            "model": image_model,
                            "gender": gender,
                            "cost": cost,
                            "color": image_color,
                            "size": new_size,
                            "count": 1
                        })} 
                    >ADD TO BAG</Button>

            </div>
            <div className="div_description">
                    <b>Description</b>
                    <ul>
                        <li>{gender} {item} for run</li>
                        <li>Upper: Textile</li>
                        <li>Lining: Textile/Sinthetic</li>
                        <li>Outsole: Sintehic</li>
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
