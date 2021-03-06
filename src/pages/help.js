import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Helmet } from 'react-helmet';
import { Link } from "gatsby";

const DivAbout = styled.article.attrs(props=>({
    props:props.padd
}))`
   width: 80%;
   margin: 0 auto;
   height: fit-content;
    background-color: #fff;
    padding: 0 2vw 10px;
    color: #000;
    text-align: left;
  
    p {
        padding-left: 1vw;
       font-size: 20px;
    }
    li {
        margin: 5px 0 ;
        font-size: 16px;
    }
    span {
        font: 600 39px/30px 'Arial', san-serif;
        vertical-align: middle;
        @media(max-width: 600px) {
            font: 600 30px/30px 'Arial', san-serif;
        } 
    }
    @media(max-width: 600px) {
        width: 100%;
    } 
`;
const InputName = styled.input`
    width: 30.2%;
    margin: 5px 1% 20px 0;
    padding: 10px;
`;
const DivInput = styled.div`
    background-color: blue;
    width: 95%;
    margin-bottom: 20px;
    padding: 2vw;
    h1 {
        color: #fff;
        font-size: 25px;
        margin: 0 0 20px;
    }
   
`;
const Input = styled.input`
    width: 63.5%;
    padding: 10px;
   
    margin-right: 1.2%;
    border: none;
`;
const InputSub = styled.input.attrs(props=>({
    text: props.text
}))`
    width: 32%;
    padding: 10px;
    position: relative;
    color: #fff;
    :before {
        content: "input all position ";
        position: absolute;
        top: -25px;
        left: 30%;
        visibility: hidden;
        background-color: yellow;
        padding: 0 10px;      
        color: blue;
        border-radius: 10px;
    }
    :hover :before {
        visibility: ${props => props.text.length < 3 ? 'visible': 'hidden'};
    }
    :active {
        box-shadow: inset -2px -2px 3px rgba(255, 255, 255, .6),
                    inset 2px 2px 3px rgba(0, 0, 0, .6);
   
`;
const Help = () => {

    const [name, set_name] = React.useState("");
    const [phone, set_phone] = React.useState("");
    const [email, set_email] = React.useState("");
    const [question, set_message] = React.useState("");
    const [contact, set_contact] = React.useState(false);

    const setPhone = (e) => {
        return (
            set_phone(isNaN(e.target.value) ? phone : phone.length >= 10 ? phone : e.target.value)
        )
    }

    function sendMessage() {
       
       
        const url = 'https://www.aplacadance.ru/.netlify/functions/new-question';       
        const params = {           
            name,
            phone,
            email,
            question           
        };
        // const headers = {
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'application/json'
        // };
        axios.post(url,JSON.stringify(params))     
        .then(() => {           
            set_contact(true);
            set_name("");
            set_phone("");
            set_email("");
            set_message("");
            setTimeout(()=>set_contact(false),5000)
        });
        
    };
 
    
    
    return (
        <>
        <Helmet>        
          <title>Only better brands shoes for run</title>
          <html lang="en" /> 
        </Helmet>     
        <DivAbout>
            <Link to="/" className="to_main" ></Link>                    
            <span>Customer service</span>
                    
            <DivInput>
                        { contact ? 
                            <h2>Message sending to manager</h2>
                        : <form>   
                            <h1>Contact  us</h1>
                            <InputName type="text" placeholder="NAME" value={name} onChange={(e)=>set_name(e.target.value)} />
                            <InputName 
                                type="text"  
                                placeholder="PHONE " 
                                value={phone.replace( /^(\d\d)(\d\d\d)(\d\d)(\d\d)/, (...match) => `+375-(${match[1]})-${match[2]}-${match[3]}-${match[4]}` )} 
                                onChange={setPhone} 
                            />
                            <InputName type="text"  placeholder="EMAIL" value={email} onChange={(e)=>set_email(e.target.value)}  />
                            <Input 
                                type="text" 
                                placeholder="OWN QUESTION (min ten symbols)" 
                                value={question} 
                                onChange={(e)=>set_message(e.target.value)} 
                            />
                            <InputSub
                                disabled = {name.length < 3  || question.length < 20}
                                text = {name}
                                value="SEND"
                                type="submit"
                                onClick={sendMessage}
                            />
                        </form>
                        }
                </DivInput>
                    
                    <Link to="/">To home</Link>
                    <h3>About us</h3>
                    <p> The online shop <b>ShopForRun.by</b> the better ability
                        to buy run shoes and clothing the best world brands
                        Adidas, Puma, New-balance, Nike, Reebok. All items
                        is original, not used, in the original box.
                        We selected for you the better for running.
                        <b>100% Authentic, Guaranteed.</b>Authenticity is the foundation of our business,
                        and every item we sell is inspected by our expert team.
                    </p>
                    <h3>Contact</h3>
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
                            <li>Free delivery (3 days) if on item cost over <b>200$</b></li>
                        </ul>
                    <h3>Return</h3>
                        <p>Free Return.We accept returns within <b>30 business days</b> of receipt.
                         Items must be tagged and in new/unworn condition. 
                        </p>
            </DivAbout>
        </>    
              
        
    )
};
 export default Help ;