import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { delete_from_bag, add_count, delBag } from "../state/app";
import styled from "styled-components";

import "../styles/global.css";
import { Link } from "gatsby";
import BlockPhone from "../components/blockPhone";

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

const Button = styled.button`
    width: 30%;
    font-size: 25px;
    padding: 5px;
    height: auto;
    cursor: pointer;
    margin: 10px auto;
    display: block;
    background-color: lime;
    border: 2px solid lime;
    &:active {
        border: 2px solid red;
    }
    &:hover {
        background-color: yellow;       
    }
    @media(max-width: 600px) {
        font-size: 4vw;
        width: 70%;
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
        const url =  "https://www.aplacadance.ru/.netlify/functions/tobag";
       
        // const url = 'http://localhost:8888/.netlify/functions/new_bag';       
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
    console.log("This is request");
    return <>
        <BlockPhone />
        <div className="delivery_main"> 
                   
            <div className="delivery_name">            
               
            
                <label>COUNTRY:</label>
                <Input type="text" required value={country}  onChange={(e)=>set_country(e.target.value)} placeholder="input country" />
                <label>CITY:</label> 
                <Input type="phone" required value={city} onChange={(e)=>set_city(e.target.value)} placeholder="input city" />
                <label>STREET: </label>
                <Input type="email" required value={street} onChange={(e)=>set_street(e.target.value)} placeholder="input street" />
                <label>NAME:  </label>
                <Input type="text" required value={name}  onChange={(e)=>set_name(e.target.value)} placeholder="input name" />
                <label>PHONE: </label>
                <Input type="phone" required value={phone} onChange={(e)=>set_phone(e.target.value)} placeholder="input phone" />
                <label>EMAIL: </label>
                <Input type="email" required value={email} onChange={(e)=>set_email(e.target.value)} placeholder="input email" />
                
                <Button 
                    onClick={sendData}
                    disabled={!(name.length > 3 & email.includes("@") & email.includes("."))}
                >
                    BUY
                </Button>
                <Link to="/bag" className="delivery_main_link">BACK TO BAG</Link>
                <Link to="/" className="delivery_main_link two">TO MAIN</Link>
                <h3 style={{textAlign: 'center'}}>{ok}</h3>
            </div>

        </div>
        
    </>
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