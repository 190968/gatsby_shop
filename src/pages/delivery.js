import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { delete_from_bag, add_count, delBag } from "../state/app";
import styled from "styled-components";

import "../styles/global.css";
import { Link } from "gatsby";

const Input = styled.input`
    display: inline-block;
    width: 20%;
    margin: 0 0 20px;
    font-size: 1.2vw;
    padding: 5px;
    border: none;
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
    border: none;
  
    &:hover {
        background-color: yellow;    
       
    }
`;
const FormDelivery = ({ bag, delBag, delivery }) => {
    const [name, set_name] = React.useState("");
    const [phone, set_phone] = React.useState("");
    const [email, set_email] = React.useState("");
    const [ok, set_ok] = React.useState("");   

    function sendData() {
        axios({
            method: 'post',
            
            url: "https://www.aplacadance.ru/.netlify/functions/tobag",
            data: {           
                name: name,
                phone: phone,
                email: email,
                bag: bag,
                delivery: delivery 
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
          
               
        })
        .then(res=>{
            set_ok("YOUR ORDER ACCEPTED");
          
        })
        .then(res=>{
            
            setTimeout(delBag(),2000);
        })
    };
    return (
        <div className="delivery_main">            
            <div className="delivery_name">            
               
            
                <label>COUNTRY:</label>
                <Input type="text" required value={name}  onChange={(e)=>set_name(e.target.value)} placeholder="input country" />
                <label>CITY:</label> 
                <Input type="phone" required value={phone} onChange={(e)=>set_phone(e.target.value)} placeholder="input city" />
                <label>STREET: </label>
                <Input type="email" required value={email} onChange={(e)=>set_email(e.target.value)} placeholder="input street" />
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
                <h3>{ok}</h3>
            </div>

        </div>
        
    )
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