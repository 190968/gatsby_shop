import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { delete_from_bag, add_count } from "../state/app";
import styled from "styled-components";

import "../styles/global.css";

const Input = styled.input`
    display: block;
    width: 100%;
    margin: 0 0 10px;
    padding: 5px;
    border: none;
`;
const Close = styled.button`    
    float: right;
    cursor: pointer;
    border: none;
    background-color: inherit;
    height: 40px;
    width: 40px;    
    margin: 0;
    &:hover {
        background-color: #ddd;
    }
`;
const Button = styled.button`
    width: 100%;
    font-size: 25px;
    padding: 5px;
    height: auto;
    margin: 10px 0 0;
    background-color: yellow;
    border: none;
    border-radius: 3px;
    &:hover {
        box-shadow: 0 0 15px 1px lime;
       
    }
`;
const DeliveryName = ({delivery,handClose, bag}) => {
    const [name, set_name] = React.useState("");
    const [phone, set_phone] = React.useState("");
    const [email, set_email] = React.useState("");
    const [ok, set_ok] = React.useState("");   

    function sendData() {
        axios({
            method: 'post',
            url: "http://localhost:5001/write",
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
    };
    return (
        <div className="delivery_main">
            <div className="delivery_name">
            <Close  onClick={()=>handClose(false)}>x</Close>
            <h4>Last step  input yous's: </h4>
            <br/>
            NAME:  <Input type="text"  value={name}  onChange={(e)=>set_name(e.target.value)} placeholder="input name" />
            PHONE: <Input type="phone" value={phone} onChange={(e)=>set_phone(e.target.value)} placeholder="input phone" />
            EMAIL: <Input type="email" value={email} onChange={(e)=>set_email(e.target.value)} placeholder="input email" />
            <Button 
                onClick={sendData}
                disabled={!(name.length > 3 & email.includes("@") & email.includes("."))}
            >
                BUY
            </Button>
            <h3>{ok}</h3>
            </div>

        </div>
    )
};




const mapStateToProps = state => ({
    bag: state.app.bag    
   
});
   
const mapDispatchToProps = dispatch => ({
    delete_from_bag: (a) => dispatch(delete_from_bag(a)),
    add_count: (a,b) => dispatch(add_count(a,b))
    
});
export default connect(mapStateToProps,mapDispatchToProps)(DeliveryName);