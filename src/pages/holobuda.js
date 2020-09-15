import React, { useEffect }  from "react";
import "../styles/global.css";
import axios from "axios";
import { Helmet } from 'react-helmet';
import styled from "styled-components";

const Index = styled.b.attrs(props=>({
    ind: props.ind,
}))`
    font: 300 calc(10px + 0.5vw)/20px 'Arial', sans-serif;
    position: relative;
    text-align: left;
    vertical-align: top;
    width: 22%;
    display: inline-block;
    padding: 5px 0 0;
    &:before {
        content: '${props=>props.text}';
        position: absolute;
        font: 600 calc(10px + 0.5vw)/22px 'Arial', sans-serif;
        top: -48px;
        left: -6px;
        text-align: left;
        padding-left: 10px;
        background-color: #ccc;
       
        width: 105%;
        padding:10px 20px;       
        display: ${props=>props.ind === 0 ? "inline-block" : "none"}
    }
    p {
        margin: 0;
        padding: 0;
        
       
        b {
            display: inline-block;
            width: 80%;
            font-size: 14px;
            margin: 0;
            text-align: left;
            vertical-align: middle;
        }
    }
`;
const P = styled.p`
    font: 300 calc(10px + 0.5vw)/22px 'Arial', sans-serif;
    position: relative;
    text-align: left;
    margin: 0 0 5px;
    vertical-align: top;
    width: 100%;
    padding: 0 5px;
    display: inline-block;   
    &:before {
        content: '${props=>props.text}.';
        margin: 0 2px 0 -15px;
        font-weight: 600;
       
        
        
    }
    span {
        display: inline-block;
        width: 15%;
        text-align: center;
    }
`;

const Button = styled.button`
    width: 25%;
    font-size: calc(10px + 1vw);
    padding: 3px;   
    margin: 10px 0 0;
    background-color: yellow;
    border: 2px solid yellow;
    border-radius: 3px;
    &:hover {
        border: 2px solid red;
        color: blue;
    }
`;

const InputCheckbox = styled.input`
    width: 20px;
    height: 20px;
    color: yellow;
    vertical-align: middle;   
    cursor: pointer;    
`;

const IndexOne = styled(Index)`
    width: 5%;
`;
const IndexDate = styled(Index)`
    width: 15%;
    
`;
const IndexPhone = styled(Index)`
   
    width: 30%;
`;
const IndexItem = styled(Index)`
    width: 30%;
`;

const Admin = () => {
    
    const [orders, set_orders] = React.useState([]);
    
    //  const url = 'http://localhost:5001/all_bags';
    const url = 'https://www.aplacadance.ru/.netlify/functions/all_bags';
   
    
    useEffect(() => {        
        axios(`${url}`)
        .then((result)=>{
            set_orders([...result])  
        })
        .catch(()=>{})       
    },[orders])
   

    const UpdateStatusDelivery = (a,b) =>{
        
            axios(`https://www.aplacadance.ru/.netlify/functions/status_rewrite?status=${b}&date=${a}`) 
            
           .then((res)=>{
                set_orders([...res.data]);    
           })
           .catch(()=>{})
                        
                   
    }; 
       
    

    return (
        <>
        <Helmet>
            <meta
            name="viewport"
            content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
                
            />
            <title> Admin panel
            </title>
            <html lang="en" />
            <link rel="canonical" ></link> 
        </Helmet>
        <div className="admin" >
            <h3>ADMIN PANEL</h3>
            
          
            <p style={{marginBottom: "50px"}}>
            <Button>
                <a href="https://shop-5589.admin.datocms.com/editor">DATO CMS</a>
            </Button>
            <Button>
                <a href="https://files.000webhost.com/">image</a>
            </Button>
            
                <Button>view questions</Button>
                <Button>send base</Button>
            
            </p>    
            {orders.reverse().map((i,index)=><div key={index} style={{border:"1px solid #ccc",padding: "5px"}}>
            <IndexOne ind={index} text="№">{index + 1}.</IndexOne>
            <IndexDate ind={index} text="date">{i.date}</IndexDate>
            <IndexPhone ind={index} text="buyer">
                {i.person.name} <br/> {i.person.phone} <br/> {i.person.email}
            </IndexPhone>
            <IndexItem ind={index} text="orders">
                {i.bag.map((a,index) => 
                    <div key={index}>
                        <P  text={1 + index}>
                            {a.brand},{a.model},
                            <br/>color:{a.color},size:{a.size},Qnt:{a.count},
                            <br/>cost:<span>{a.cost}$</span>,
                            deliv:<span>{i.delivery}$</span>
                        </P>
                    </div>
                )}
            </IndexItem>    
            <Index ind={index} text="status" style={{width:"20%"}}>
                <p>
                    
                    <InputCheckbox type="radio" checked={i.status===1} onChange={()=>UpdateStatusDelivery(i.date,1)}/>
                    <b>in work</b>
                </p>
                <p>
                
                <InputCheckbox type="radio" checked={i.status===2} onChange={()=>UpdateStatusDelivery(i.date,2)}/>
                <b>in delivery</b>
                </p>
                <p> 
                                   
                <InputCheckbox type="radio" checked={i.status===3} onChange={()=>UpdateStatusDelivery(i.date,3)}/>
                <b>delivered</b>
                </p>
            </Index>
            </div>
            )}
        </div>
        </>
    
    )
}
export default Admin;