import React from "react";
import { navigate } from "gatsby";
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
        font: 600 18px/20px 'Verdana', sans-serif;
        top: -45px;
        left: 0;        
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
const DivAbout = styled.article.attrs(props=>({
    props:props.padd
}))`
    position: fixed;
    top: 50px;
    width: 60%;
    left: 20%;
    height: content-fix;
    background-color: #fff;
    padding: 30px;
    color: #000;
    z-index: 100;
    text-align: left;
    border: 1px solid #000;
    p {
        padding-left: 20px;
       font-size: 18px;
    }
    li {
        margin: 0 ;
    }
    @media(max-width: 600px){
        width: 100%;
        left: 0;
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
    return (
        <div className="footer">
            <Div text="CUSTOMER SERVICES"  onClick={()=>navigate("/help/")}>
                <p>Return item</p>
                <p>Table size</p>
                <p>Question to us</p>               
            </Div>
            <Div text="SHOPPING" onClick={()=>navigate("/help/")}>
                <p>Delivery</p>
                <p>Account</p>
                <p onClick={()=>navigate("/locations")}>Store Finder</p>
            </Div>    
            <Div text="ABOUT US" onClick={()=>navigate("/help/")}>
                <p>About Us</p>
            </Div>           
                
            <h6>&#169; 2020 ShopForRun.com</h6>
            
        </div>
    )
};

export {Footer};