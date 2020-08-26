import React, { useEffect }  from "react";
import "../styles/global.css";
import axios from "axios";

import styled from "styled-components";
const Index = styled.b.attrs(props=>({
    ind: props.ind,
}))`
    font: 300 16px/16px 'Arial', sans-serif;
    position: relative;
    text-align: center;
    vertical-align: top;
    width: 20%;
    display: inline-block;
    padding: 5px 0 0;
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
const P = styled.p`
    font: 300 16px/16px 'Arial', sans-serif;
    position: relative;
    text-align: left;
    margin: 0 0 5px;
    vertical-align: top;
    width: 80%;
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

const InputCheckbox = styled.input`
    width: 20px;
    height: 20px;
    color: yellow;
    
    margin:10px 2%;
    cursor: pointer;
    
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
    width: 42%;
`;

const Admin = () => {
    
    const [orders, set_orders] = React.useState([]);
    //  const url = 'http://localhost:5001';
    const url = 'http://gatsbyshop.herokuapp.com';
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${url}/admin?name=admin&phone=666666&limit=10`);           
            set_orders(orders.concat(result.data));            
        };           
        fetchData();
    },[]);

    const Update_status = (a,b) =>{
        const fetchData = async () => {
            const result1 = await axios(`https://gatsbyshop.herokuapp.com/status?status=${b}&date=${a}`); 
            const result = await axios('http://gatsbyshop.herokuapp.com/admin?name=admin&phone=666666&limit=10');           
            // set_orders([]);
            set_orders([].concat(result.data));                 
                   
        }; 
        fetchData();          
    }

    return (
        <div className="admin" >
            <h3>ADMIN PANEL</h3>
        <p style={{marginBottom: "50px"}}>
           <button>
            <a href="https://shop-5589.admin.datocms.com/editor">to cms</a>
           </button>
           <button>
            <a href="https://files.000webhost.com/">to image</a>
           </button>
          
            <button>view questions</button>
            <button>send base</button>
           
        </p>    
        {orders.reverse().map((i,index)=><div key={index} style={{textAlign:"left",borderBottom:"1px solid #ccc",padding: "5px 0"}}>
            <IndexOne ind={index} text="№">{index + 1}.</IndexOne>
            <IndexDate ind={index} text="date">{i.date}</IndexDate>
            <IndexPhone ind={index} text="name | &#9743; | @ ">
                {i.person.name} | {i.person.phone} | {i.person.email}
            </IndexPhone>
            <IndexItem ind={index} text="item | cost | delivery">
                {i.bag.map((a,index) => 
                    <div key={index}>
                        <P  text={1 + index}>
                            {a.brand},{a.model},
                            <br/>color:{a.color},size:{a.size},Qnt:{a.count},
                            <span>{a.cost}$</span>,
                            <span>{i.delivery}$</span>
                        </P>
                    </div>
                )}
            </IndexItem>    
            <Index ind={index} text="status" style={{width:"10%"}}>
                <InputCheckbox type="radio" checked={i.status===1} onChange={()=>Update_status(i.date,1)}/>
                
                <InputCheckbox type="radio" checked={i.status===2} onChange={()=>Update_status(i.date,2)}/>
               
                <InputCheckbox type="radio" checked={i.status===3} onChange={()=>Update_status(i.date,3)}/>
            </Index>
            </div>
        )}
        </div>
    
    )
}
 export default Admin;