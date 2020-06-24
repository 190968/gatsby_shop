import React from "react";
import axios from "axios";
import { navigate } from "gatsby";
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
    font-size: 25px;
    padding: 3px;
    height: auto;
    margin: 10px 0 0;
    background-color: yellow;
    border: 2px solid yellow;
    border-radius: 3px;
    &:hover {
        box-shadow: 0 0 15px 1px lime;
        color: blue;
    }
`;
const Input = styled.input`
    vertical-align: top;
    height: 45px;
    padding: 0 10px;
    width: 20%;
    color: red;
    border: none;
    background-color: #fff;
    margin: 10px;
`;

const ButtonAccount = styled(Button)`
    margin: 10px;
    width: 20%;
    padding: 3px 10px;
`;
const IndexOne = styled(Index)`
    width: 3%;
`;
const IndexDate = styled(Index)`
    width: 15%;
    
`;
const IndexPhone = styled(Index)`
   
    width: 30%;
`;
const IndexItem = styled(Index)`
    width: 62%;
`;

const Orders = () => {
    const [number, set_number] = React.useState(0);
    const [ orders, set_orders] = React.useState({ord:[]});
    const [visible_order, set_visible] = React.useState(false);
    const [visible_account, set_visible_account] = React.useState(true);
    const [name , set_name] = React.useState();
    const [phone , set_phone] = React.useState();
   

    const Go_account = () => {
        const fetchData = async () => {
            const result = await axios(`http://gatsbyshop.herokuapp.com/toaccount?name=${name}&phone=${phone}`);            
           
           
            set_orders(result.data);   
            set_visible_account(false);
            set_visible(true);
    
        };    
           
        fetchData();

    };

    // const set = () => {
    //     const fetchData = async () => {
    //         const result = await  axios("http://gatsbyshop.herokuapp.com/count");             
             
    //           set_orders(result.data);
             
    //       };    
             
    //       fetchData();
    // };   
    return (
        <Layout set_number={set_number}>
            {visible_account ? 
                <div className="go_to_account">
                   
                    <p> 
                   
                        <Input type="text" value={name} placeholder="input name" onChange={(e)=>set_name(e.target.value)} />

                        <Input type="phone" value={phone} placeholder="input phone" onChange={(e)=>set_phone(e.target.value)}/>
                        <ButtonAccount onClick={Go_account}>ENTER</ButtonAccount>     
                        
                    </p>
                   
                </div>        
            :   <>
                {visible_order ? <div className="orders">
                    {orders.map((i,index)=><div key={index} style={{textAlign:"left",borderBottom:"1px solid #ccc",padding: "10px 0"}}>
                        <IndexOne ind={index} text="№">{index+1}.</IndexOne>
                        <IndexDate ind={index} text="date">{i.date}</IndexDate>
                        {/* <IndexPhone ind={index} text="name/ &#9743; / @">
                            {i.person.name}/{i.person.phone}/{i.person.email}
                        </IndexPhone> */}
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
                        <Index ind={index} text="status" style={{width:"10%"}}>{i.status===2?"delivery" : i.status===3?"delivered":"on"}</Index>
                        </div>
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