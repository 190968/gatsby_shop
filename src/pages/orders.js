import React, { useRef, useEffect } from "react";
import axios from "axios";

import styled from "styled-components";
import Layout  from "../components/layout";

import "../styles/global.css";


const Index = styled.b.attrs(props=>({
    ind: props.ind,

}))`
    font: 300 18px/16px 'Arial', sans-serif;
    position: relative;
    text-align: center;
    vertical-align: top;
    width: 20%;
    display: inline-block;
    padding: 10px 0;
    &:before {
        content: '${props=>props.text}';
        position: absolute;
        font: 600 22px/22px 'Arial', sans-serif;
        top: -45px;
        left: 0;
        background-color: #ccc;
        text-align: center;
        width: 100%;
        padding: 10px 0;
       
        display: ${props=>props.ind === 0 ? "inline-block" : "none"}
    }

`;

const Button = styled.button`
    width: 30%;
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: 800;
    background-color: lime;
    color: blue;    
    height: 45px;
    padding: 8px 0;
    border: 1px solid lavander;    
    &:hover {
       
       border: 1px solid red;    
       
    }
   
`;
const Input = styled.input`
    vertical-align: top;
    height: 45px;
    padding: 0 10px;
    width: 30%;
    color: red;
    border: none;
    outline: none;
    background-color: #fff;
    margin: 5px;
`;

const ButtonAccount = styled(Button)`
    margin: 5px;
    width: 30%;
   
`;
const IndexOne = styled(Index)`
    width: 3%;
`;
const IndexDate = styled(Index)`
    width: 15%;
    
`;
const IndexStatus = styled(Index)`
   
    width: 20%;
`;
const IndexItem = styled(Index)`
    width: 62%;
`;
const Order = styled.div`
    text-align: left;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
`;
const Orders = () => {

    const inputRef = useRef();
    const [number, set_number] = React.useState(0);
    const [ orders, set_orders] = React.useState({ord:[]});
    const [visible_order, set_visible] = React.useState(false);
    const [visible_account, set_visible_account] = React.useState(true);
    const [name , set_name] = React.useState();
    const [phone , set_phone] = React.useState();

    useEffect(()=>{
        inputRef.current.focus();

    },[]);
   
    // const url = 'http://localhost:5001';
    const url = 'http://gatsbyshop.herokuapp.com';
    const Go_account = () => {
        const fetchData = async () => {
            const result = await axios(`${url}/toaccount?name=${name}&phone=${phone}`);          
            set_orders(result.data);   
            set_visible_account(false);
            set_visible(true);    
        };    
           
        fetchData();

    };

    
    return (
        <Layout set_number={set_number} title="Your orders">
            {visible_account ? 
                <div className="go_to_account">
                   
                    <p> 
                   
                        <Input type="text" ref={inputRef} value={name} placeholder="input name" onChange={(e)=>set_name(e.target.value)} />

                        <Input type="phone" value={phone} placeholder="input phone" onChange={(e)=>set_phone(e.target.value)}/>
                        <ButtonAccount onClick={Go_account}>ENTER</ButtonAccount>     
                        
                    </p>
                   
                </div>        
            :   <>
                {visible_order ? <div className="orders">
                    {orders.map((i,index)=><Order key={index}>
                        <IndexOne ind={index} text="№">{index+1}.</IndexOne>
                        <IndexDate ind={index} text="date">{i.date}</IndexDate>
                       
                        <IndexItem ind={index} text="item">
                            {i.bag.map((a,index) => 
                                <div style={{textAlign: "left",margin: 0}} key={index}>
                                    <p style={{margin: "0 0 10px" }}>
                                        {index+1}.{a.brand},{a.model},
                                      
                                        color:{a.color},size:{a.size},Qnt:{a.count},cost: 
                                        <b>{a.cost}$</b>
                                       
                                    </p>
                                    
                                </div>
                            )}
                        </IndexItem>    
                        <IndexStatus ind={index} text="status">{i.status===2?"delivery" : i.status===3?"delivered":"on"}</IndexStatus>
                        </Order>
                    )}
                
                    {orders.length === 0 && <h2>None orders</h2>}
                    </div>
                    :
                    <div>
                        <h1>ONE MOMENTS</h1>
                    </div>
                    
                } 
            
                
                </>
            }   
        </Layout>    
    )

};
export default Orders ;