import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { setDelivery, delBag } from "../state/app";
import styled from "styled-components";


import { Link } from "gatsby";

const Input = styled.input`
    display: inline-block;
    width: 44%;
    text-transform: capitalize;
    margin: 2%;
    font-size: 1vw;
    padding: 15px 5px;
   
    @media(max-width: 600px) {
        font-size: 2vw;
        width: 90%;
    }
`;
const Button = styled.button`
    width: 23vw;
    margin: 20px auto;
    padding: 10px 0;
    color: black;
    font: 600 20px/20px 'Impact' , sans-serif;
    @media(max-width: 600px) {
       
        width: 90vw;
     }
   
`;
const Total = styled(Input)`
    width: 80%;
    margin:  20px 0 0;
    border: none;

    background-color: inherit;
    font: 600 20px/20px 'Verdana' , sans-serif;
   
   
`;
const Div = styled.div`
    max-width: 1350px;
    margin: 0 auto;
    div:last-of-type {
        text-align: center;
    }
    p {
        font-size: 15px;
    }
    a {
        width: 50%;
        float: left;
        font-weight: 600;
        box-sizing: border-box;   
        padding: 8px;
        text-align: center;
        border-top: 1px solid #ddd;   
        
    }
    h3 {
        margin: 20px;
        border: 1px solid #ccc;
        padding: 5px 10px; 
        font: 400 20px/20px 'Verdana' , sans-serif;
    }
`;
const InputSpan = styled.span`
    font-size: 16px;
    display: inline-block;
    margin: 0;  
    text-align: right;   
`;
const DivSumm = styled.div`
    display: inline-block;
    vertical-align: top;
    width: 23vw;
    border: 1px solid #ddd;
    margin: 20px auto;
    float: left;
    @media(max-width: 600px) {
       float: none;
        width: 100vw;
    }
    @media(max-width: 1000px) {
        float: none;
        width: 50vw;
        display: block;
        
     }
`;
const FormDelivery = ({ bag = [],  delivery, currency , setDelivery}) => {
    const s = currency === 0.8 ? '€' : currency === 1 ? "$"  : "£" ;
    const [country, set_country] = React.useState("");
    const [city, set_city] = React.useState("");
    const [street, set_street] = React.useState("");
    const [name, set_name] = React.useState("");
    const [surname, set_surname] = React.useState("");
    const [phone, set_phone] = React.useState("");
    const [email, set_email] = React.useState("");
    const [ok, set_ok] = React.useState("");
    const Total_sum =  bag.length === 1 ?    
        `${+bag.reduce(((total,num)=> Number(total) + num.cost*currency),[]).toFixed(0)}`
        : "Total sum: 0"
     ;   

    function sendData() {
        const url =  "https://www.aplacadance.ru/.netlify/functions/tobag";
       
        // const url = 'http://localhost:8888/.netlify/functions/new_question';       
        const params = {           
            name,
            surname,
            city,
            street,
            phone,
            email,
            bag,
            delivery 
        };
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };
        axios.post(url,JSON.stringify(params))     
        .then(res => set_ok("YOUR ORDER ACCEPTED"))
        .then(res=>{
            
            setTimeout(delBag(),2000);
        })
    };
   
    return <Div>
        <h1>Only the best shoes and clothing for run on ShopForRun.com</h1> 
                 
        <form className="delivery_name" method="post" action="/delivery" data-netlify="true">
            <h3>Select Delivery Method
           
                    <p><InputSpan>Delivery to the warehouse</InputSpan> <b>{s}10</b>
                        <input type="checkbox" value="10" checked={delivery===10} onChange={()=>setDelivery(10)}/>
                    </p>
                    <p><InputSpan>Home delivery</InputSpan> <b>{s}20</b>
                        <input type="checkbox" value="20" checked={delivery===20} onChange={()=>setDelivery(20)}/>
                    </p>
                    <p><InputSpan>Express delivery </InputSpan> <b>{s}30</b>
                        <input type="checkbox" value="30" checked={delivery===30} onChange={()=>setDelivery(30)}/>
                    </p>
            </h3>        
            <h3>
                <p>Delivery Address</p>
            {delivery !== 10 ? <>
                          
                <Input 
                    type="text" 
                    required 
                    value={country}  
                    onChange={(e)=>set_country(e.target.value)} 
                    placeholder="country (example: usa) *" 
                />     
                    
                <Input 
                    type="text" 
                    required 
                    value={city} 
                    onChange={(e)=>set_city(e.target.value)} 
                    placeholder="city (example: Mexico) *" 
                />
                                    
                <Input type="text" required value={street} onChange={(e)=>set_street(e.target.value)} placeholder="street*" />
                <Input type="text" required value={street} onChange={(e)=>set_street(e.target.value)} placeholder="house/flat*" />      
                </> 
                : 
                <></>
           }
            <Input type="text" required value={name}  onChange={(e)=>set_name(e.target.value)} placeholder="first name*" />
            <Input type="text" required value={surname}  onChange={(e)=>set_surname(e.target.value)} placeholder="second name*" />      
            <Input 
                type="phone" 
                required value={phone.replace( /^(\d\d)(\d\d\d)(\d\d)(\d\d)/, (...match) => `+375-(${match[1]})-${match[2]}-${match[3]}-${match[4]}` )} 
                onChange={(e)=>set_phone(e.target.value)} placeholder="phone*"             
            />
                    
            <Input type="email*" required value={email} onChange={(e)=>set_email(e.target.value)} placeholder="email*" />
           
                 
            
            <p>{ok}</p>      
            </h3>      
                  
                    
                   
        </form>
        <DivSumm>
        <p>Delivery {delivery} $</p> 
        <layout> Total 
            <Total type="text" value={parseInt(Total_sum) + delivery + s} required/>
        </layout> 
           
        <Link to="/bag" className="delivery_main_link">Edit Bag</Link>
        <Link to="/" className="delivery_main_link two">To Main</Link>
        
        </DivSumm>
        <p> <Input type="checkbox" value="30" />Subscription on new sale:</p>
        <p> <Input type="checkbox" value="30" />I accept the terms and conditions of supply</p>
        <Button 
            onClick={sendData}
            disabled={!(name.length > 3 & email.includes("@") & email.includes("."))}         
                 
        >GO to Pay</Button> 
       
        
    </Div>
};




const mapStateToProps = state => ({
    bag: state.app.bag,
    delivery: state.app.delivery,
    currency: state.app.currency    
   
});
   
const mapDispatchToProps = dispatch => ({
  
    setDelivery: (a) => dispatch(setDelivery(a))
    
});
export default connect(mapStateToProps,mapDispatchToProps)(FormDelivery);