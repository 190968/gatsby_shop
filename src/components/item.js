import React from "react";
import "../styles/global.css";
import { connect } from "react-redux";
import styled from "styled-components";
import { addBag } from "../state/app";
import Linktobag from "./linktobag";

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
    border: none;
    outline: none;
    background-color: lime;    
    margin: 0;
    padding: 10px 0;
    &:hover {
       box-shadow: 0 0 15px 1px lime;
       color: #fff;
    }
   
`;

const Item = (props) => {

    const { addBag, page, gender, closeImage, image_color, image_model, size = size || 0, cost, sale=sale || 0 } = props;
    const [new_size, set_size] = React.useState("select size");
    const Size = styled.span.attrs(props=>({
        setSize: props.setSize,
    }))`
        padding: 5px;
        vertical-align: top;
        z-index: 1;
        margin: 5px;
        width: 15%;
        border: ${props => props.setSize === new_size ? "1px solid #000": "1px solid #fff"};
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
                            
                    style={{backgroundSize: "90%", backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model + "_" + image_color}${number}.jpg),url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model + "_" + image_color}${number}.webp)`}}
                
                />
                {["",1,2].map(i => <div className="div_small_image"
                    onMouseEnter={()=>set_number(i)}
                    onKeyDown={()=>set_number(i)}
                    role="button"
                    tabIndex={0}
                    style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model + "_" + image_color}${i}.jpg),url(https://myrunshop.000webhostapp.com/wp-content/image/${page.brand}/${image_model + "_" + image_color}${i}.webp)`,
                        borderBottom: number === i ? "2px solid #000" : "none"
                    }}
                    />
                )}   
           
           
            </div>
            { size !== 0 && <>
                <div className="div_content">
                    <h2>{page.brand.toUpperCase()} <Linktobag /></h2>
                    <p>{image_model} {gender} run shoes
                        
                    </p>
                    <h2>                        
                        {sale === 0 ? 
                            cost + `$` 
                            :
                            <> 
                            <del>{cost}$</del>  <b>{(cost*(100-sale)/100).toFixed(0) + `$`}</b>
                            </>
                        }
                    </h2>
                
                    <p><b>color:</b> {image_color}</p>
                    <b>size:</b> {new_size}
                    <p>{size.split(",").map((i,index)=><Size key={index} setSize={i} onClick={()=>set_size(i)}>{i}</Size>)}</p>
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
                    >Add to bag</Button>

                </div>
                <div className="div_description">
                    <b>Description</b>
                    <ou>
                        <li>{gender} shoes for run</li>
                        <li>Upper: Textile</li>
                        <li>Lining: Textile/Sinthetic</li>
                        <li>Outsole: Sintehic</li>
                    </ou>
                </div>
                </>    
            }
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
