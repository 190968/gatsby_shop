import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { delete_from_bag, add_count, delBag } from "../state/app";
import styled from "styled-components";

import "../styles/global.css";
import { Link } from "gatsby";
import BlockPhone from "../components/blockPhone";
import { Footer } from "../components/footer";

const Input = styled.input`
    display: inline-block;
    width: 20%;
    margin: 0 0 20px;
    font-size: 1.2vw;
    padding: 5px;
    border: none;
    @media(max-width: 600px) {
        font-size: 3vw;
        width: 50%;
    }
`;
const Div = styled.div`
    max-width: 1350px;
    margin: 0 auto;
    div:last-of-type {
        text-align: center;
    }
`;

const FormDelivery = ({ bag, delBag, delivery }) => {
    const [country, set_country] = React.useState("");
    const [city, set_city] = React.useState("");
    const [street, set_street] = React.useState("");
    const [name, set_name] = React.useState("");
    const [phone, set_phone] = React.useState("");
    const [email, set_email] = React.useState("");
    const [ok, set_ok] = React.useState("");   

    function sendData() {
        const url =  "https://www.aplacadance.ru/.netlify/functions/new-question";
       
        // const url = 'http://localhost:8888/.netlify/functions/new_question';       
        const params = {           
            name,
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
        <BlockPhone />              
        <form className="delivery_name">
                    <label>COUNTRY:</label>                
                    <Input type="text" required value={country}  onChange={(e)=>set_country(e.target.value)} placeholder="input country" />
                    <label>CITY:</label> 
                    <Input type="phone" required value={city} onChange={(e)=>set_city(e.target.value)} placeholder="input city" />
                    <label>STREET: </label>
                    <Input type="email" required value={street} onChange={(e)=>set_street(e.target.value)} placeholder="input street" />
                    <label>NAME:  </label>
                    <Input type="text" required value={name}  onChange={(e)=>set_name(e.target.value)} placeholder="input name" />
                    <label>PHONE: </label>
                    <Input 
                        type="phone" 
                        required value={phone.replace( /^(\d\d)(\d\d\d)(\d\d)(\d\d)/, (...match) => `+375-(${match[1]})-${match[2]}-${match[3]}-${match[4]}` )} 
                        onChange={(e)=>set_phone(e.target.value)} placeholder="input phone" 
                    />
                    <label>EMAIL: </label>
                    <Input type="email" required value={email} onChange={(e)=>set_email(e.target.value)} placeholder="input email" />
                    <p>
                       Subscription on sale: <Input type="checkbox" value="30" />
                    </p>
                    <Input type="button" 
                        onClick={sendData}
                        disabled={!(name.length > 3 & email.includes("@") & email.includes("."))}
                        value="BUY" 
                    />
                    <Link to="/bag" className="delivery_main_link">BACK TO BAG</Link>
                    <Link to="/" className="delivery_main_link two">TO MAIN</Link>
                    <h3>{ok}</h3>
                   
        </form>
        <Footer />
        
    </Div>
};




const mapStateToProps = state => ({
    bag: state.app.bag,
    delivery: state.app.delivery    
   
});
   
const mapDispatchToProps = dispatch => ({
    delete_from_bag: (a) => dispatch(delete_from_bag(a)),
    add_count: (a,b) => dispatch(add_count(a,b)),
    delBag: () => dispatch(delBag())
    
});
export default connect(mapStateToProps,mapDispatchToProps)(FormDelivery);