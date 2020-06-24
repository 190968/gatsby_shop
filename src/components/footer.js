import React from "react";
import styled from "styled-components";
import "../styles/global.css";

const Div = styled.div.attrs(props=>({
    text: props.text
}))`
    position: relative;
    width: 33.33%;
    height: 200px;
    margin-top: 50px;
    float: left;
&:before {
    content: '${props=>props.text}';
    position: absolute;
    color: #000;
    font: 400 16px/20px 'Arial', sans-serif;
    top: -45px;
    left: 0;
    border-top: 1px solid #ddd;
    text-align: center;
    width: 100%;
    padding: 10px 0;
   
   
}

`;
const Footer = () => {
    return(
        <div className="footer">
            <Div text="CUSTOMER SERVICES">delivery</Div>
            <Div text="SHOPPING">
                <p>Delivery</p>
                <p>Account</p>
                <p>Store Finder</p>
            </Div>    
            <Div text="ABOUT US">delivery</Div>
            <h6>2020 ShopForRun.com</h6>
        </div>
    )
};

export {Footer};