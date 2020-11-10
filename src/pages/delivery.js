import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { delete_from_bag, add_count, delBag } from "../state/app";
import styled from "styled-components";


import { Link } from "gatsby";

const Input = styled.input`
    display: inline-block;
    width: 44%;
    text-transform: capitalize;
    margin: 20px;
    font-size: 1vw;
    padding: 15px 5px;
   
    @media(max-width: 600px) {
        font-size: 4vw;
        width: 80%;
    }
`;
const Button = styled.input`
    width: 45%;
    margin: 20px;
    
   
`;
const Total = styled(Input)`
    width: 45%;
    margin:  20px ;
    border: none;
    background-color: inherit;
    font: 600 20px/20px 'Verdana' , sans-serif;
    float: none;
`;
const Div = styled.div`
    max-width: 1350px;
    margin: 0 auto;
    div:last-of-type {
        text-align: center;
    }
    p {
        width: 25%;
    }
    a {
        width: 50%;
        vertical-align: bottom;
        font-weight: 600;
        box-sizing: border-box;   
        padding: 8px;   
        background-color: cornflowerblue;
    }
    h2 {
        margin-left: 20px;
        font: 600 20px/20px 'Verdana' , sans-serif;
    }
`;

const FormDelivery = ({ bag = [], delBag, delivery, currency }) => {
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
        `Total sum:  ${bag.reduce(((total,num)=> Number(total) + num.cost*currency),[]).toFixed(0)}${s}`
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
            <h2>Delivery Options</h2>
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
            <Input type="submit" 
                onClick={sendData}
                disabled={!(name.length > 3 & email.includes("@") & email.includes("."))}
               
                value="BUY" 
            />
            <Total type="text" value={Total_sum} required/>        
            <Link to="/bag" className="delivery_main_link">BACK TO BAG</Link>
            <Link to="/" className="delivery_main_link two">TO MAIN</Link>
            <h3>{ok}</h3>      
                   
                  
                    
                   
        </form>
        <p>Subscription on new sale: <Input type="checkbox" value="30" /></p>
        <p>Subscription on new sale: <Input type="checkbox" value="30" /></p>
        
        
    </Div>
};




const mapStateToProps = state => ({
    bag: state.app.bag,
    delivery: state.app.delivery,
    currency: state.app.currency    
   
});
   
const mapDispatchToProps = dispatch => ({
    delete_from_bag: (a) => dispatch(delete_from_bag(a)),
    add_count: (a,b) => dispatch(add_count(a,b)),
    delBag: () => dispatch(delBag())
    
});
export default connect(mapStateToProps,mapDispatchToProps)(FormDelivery);