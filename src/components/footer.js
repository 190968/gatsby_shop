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
    p {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;
const Div_About = styled.article.attrs(props=>({
    props:props.padd
}))`
    position: fixed;
    top: 50px;
    width: 60%;
    left: 20%;
    height: 40vw;
    background-color: #fff;
    padding: 30px;
    text-align: left;

    p {
        padding-left: 20px;
       
    }

`;
const Close = styled.button`    
    float: left;
    cursor: pointer;
    border: none;
    background-color: #fff;
    height: 40px;
   
    width: 40px;    
    margin: -30px;
    &:hover {
        background-color: #ddd;
    }
`;
const Footer = () => {
    const [padd, set_padd] = React.useState("");

    const handClose = () => {
        set_padd("")
    };
    return(
        <div className="footer">
            <Div text="CUSTOMER SERVICES"  onClick={()=>set_padd("10")}>
                <p>Return item</p>
                <p>Table size</p>
                <p>Question to us</p>
            </Div>
            <Div text="SHOPPING"  onClick={()=>set_padd("10")}>
                <p>Delivery</p>
                <p>Account</p>
                <p>Store Finder</p>
            </Div>    
            <Div text="ABOUT US" onClick={()=>set_padd("10")}>
                <p>About Us</p>

            </Div>
            <h6>&#169; 2020 ShopForRun.com</h6>
            {padd && <Div_About>
                <Close  onClick={handClose}>x</Close>
                    <h3>About us:</h3>
                    <p> The online shop <b>ShopForRun.by</b> the better ability
                         to buy run shoes and clothing the best world brands
                          Adidas, Puma, New-balance, Nike, Reebok. All items
                           is original, not used, in the original box.
                           We selected for you the better for running.
                    </p>
                    <h3>Contact Us:</h3>
                   
                        <p>tel: +354 29 650 00 45</p>
                        <p>tel: +354 47 569 87 41</p>
                        <p>EMAIL: shopforrun@tyr.by</p>
                   
                    <h3>Delivery</h3>
                    <p>Return</p>
                </Div_About>
            }    
        </div>
    )
};

export {Footer};