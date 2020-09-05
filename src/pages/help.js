import React from "react";
import styled from "styled-components";
import { Helmet } from 'react-helmet';
import { Link } from "gatsby";

const DivAbout = styled.article.attrs(props=>({
    props:props.padd
}))`
   width: 80%;
   margin: 0 auto;
   height: auto;
    background-color: #fff;
    padding: 0 30px;
    color: #000;
    text-align: left;
  
    p {
        padding-left: 20px;
       font-size: 18px;
    }
    li {
        margin: 0 ;
    }
    span {
        font: 600 39px/30px 'Arial', san-serif;
        vertical-align: middle;
    }
    @media(max-width: 600px) {
        width: 100%;
    } 
`;
const DivInput = styled.div`
    background-color: blue;
    width: 100%;
    
    padding: 10px 30px;
    h2 {
        color: #fff;
        margin: 0 0 20px;
    }
`;
const Input = styled.input`
    width: 70%;
    padding: 10px;
    font: 20px;
    margin-right: 10px;
    border: none;
`;
const Button = styled.button`
    width: 20%;
    padding: 10px;
    font: 20px;
`;
const Help = () => {
    
    return (
        <>
        <Helmet>
        
        <title>Only better brands shoes for run</title>
        <html lang="en" /> 
        </Helmet>     
           <DivAbout>
                    <Link to="/" className="to_main" ></Link>   
                   
                    <span>Customer service  </span>
                    <DivInput>
                        <h2>Send us</h2>
                        <Input type="text" placeholder="Own question"/>
                        <Button>Send</Button>
                    </DivInput>
                    <Link to="/">Home</Link>
                    <h3>About us:</h3>
                    <p> The online shop <b>ShopForRun.by</b> the better ability
                         to buy run shoes and clothing the best world brands
                          Adidas, Puma, New-balance, Nike, Reebok. All items
                           is original, not used, in the original box.
                           We selected for you the better for running.
                    </p>
                    <h3>Contact:</h3>
                        <ul>
                            <li>tel: +350 21 650 00 45</li>
                            <li>tel: +350 48 569 87 41</li>
                            <li>email: shopforrun@tut.by</li>
                        </ul>    
                   
                    <h3>Delivery</h3>
                        <ul>
                            <li>Delivery to warehouse-<b>10$</b></li>
                            <li>Standart delivery (3 days)-<b>20$</b></li>
                            <li>Express delivery (1 days)-<b>30$</b></li>
                            <li>Free delivery (3 days) if on item cost over <b>100$</b></li>
                        </ul>
                    <h3>Return</h3>
                        <p>Free Return. <b>Return within 30 days</b></p>
            </DivAbout>
        </>    
              
        
    )
};
 export default Help ;