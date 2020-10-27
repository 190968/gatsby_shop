import React from "react";
import { connect } from "react-redux";
import { delete_from_bag, add_count, setDelivery } from "../state/app";
import styled from "styled-components";
import  Layout  from "../components/layout";
import { Link } from "gatsby";

import  DeliveryName  from "../components/delivery";
import "../styles/global.css";

const Total = styled.h3`   
    text-align: right;    
    padding: 10px 15px;
    color: red;
    margin-bottom: 0;    
    background-color: #bbb;
`;
const Empty = styled.span`
    display: block;
    width: 100%;   
    margin: 20px;
    text-align: center;
`;
const Button = styled.button`
    width: 100%;
    border: 2px solid lime;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    background-color: lime;
    color: #000;    
   
    padding: 8px 0;
    &:hover {
       background-color: yellow;    
       
    }
    &:active {
       border: 2px solid red;
    }
   
`;
const ButtonCode = styled(Button)`
    width: 31%;
    height: 40px;
    background-color: #ccc;
    font-size: 16px;
    margin-right: 4%;
`;

const P = styled.p`
    margin: 0;
   
    display: inline-block;
    b {
        padding: 0 10px 0 0;
    }
`;
const Items = styled.div`
  
    display: inline-block;
    vertical-align: middle;
    width: 53%;
    padding-left: 16%;
    background-color: #fff;
    background-position: left center;
    background-repeat: no-repeat;
    background-size: 30%;
    
`;

const InputCode = styled.input`
   margin: 1vw;
   display: inline-block;
    height: 40px;
    width: 40%;
    float: none;
    padding: 10px;
    font-size: 16px;
    border-radius: 0;
    outline: 1px solid #ccc;
    border: none;
    background-color: #fff;

`;
const InputSpan = styled.span`
    font-size: 16px;
    display: inline-block;
    margin: 0;   
    
    text-align: right;
    width: 70%;
`;
const Add = styled.b`
        border: 1px solid #ddd;
        border-radius: 50%;
        cursor: pointer;       
        padding: 1px 7px;        
        margin: 10px;
        &:hover {
            background-color: cornflowerblue;
            color: yellow;
        }
        @media(max-width: 650px) {
            display: block;
            width: 25px;
            height: 25px;
            margin: 0 auto;
        }    
    `;
    const Quant = styled.div`
        display: inline-block;
        vertical-align: middle;
        font-size: 22px;
        width: 15%;
        text-align: center;
    `;   

const Bag =  ({ bag, delete_from_bag, add_count, currency, delivery, setDelivery }) => {
    const s = currency === 0.8 ? '€' : currency === 1 ? "$"  : "£" ;
    const [number, set_number] = React.useState(0);
    const [continue_buy, set_continue_buy] = React.useState(false); 
   
    return (
        <Layout set_number={set_number} title="Your bag">       
            <div className="div_bag_menu">           
                <span style={{width:"53%"}}>Items</span>
                <span style={{width:"15%"}}>Qty</span>
                <span>Cost</span>
                <span>Total</span>            
            </div>       
            {bag.length !== 0 ?  <> 
                {bag.map((i,index) => 
                    <div className="div_bag_item" key={index}>
                        <h1>This is better site to buy run shoes.</h1>
                        <Items 
                            style={{ backgroundImage: `
                                url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand.toLowerCase()}/${i.model}_${i.color}.jpg),
                                url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand.toLowerCase()}/${i.model}_${i.color}.webp)
                                ` }}
                        >
                            <P><b>{i.brand},</b></P> 
                            <P>{i.model},</P>
                            <br/>
                            <P>{i.gender}, {i.color}, size: {i.size}</P>
                            <P onClick={()=>delete_from_bag(index)}  style={{display: "block",fontSize: "15px"}}>
                                <img src="https://i.ibb.co/grVRjyB/trash.png" alt="trash" />
                                remove
                            </P>
                        </Items>
                        <Quant>
                            <Add onClick={()=>add_count(index,-1)}>-</Add>
                                {i.count}
                            <Add onClick={()=>add_count(index,1)}>+</Add>
                        </Quant>
                        <span>{s}{(i.cost*currency).toFixed(0)} </span>
                        <span><b style={{fontSize: "1.3em"}}>{s}{(i.cost*i.count*currency).toFixed(0)}</b></span>
                        
                        
                    
                        
                    </div>
                
                )}
                <div className="div_delivery">
                    <p><InputSpan>Delivery to the warehouse</InputSpan> <b>{s}10</b>
                        <input type="checkbox" value="10" checked={delivery===10} onChange={()=>setDelivery(10)}/>
                    </p>
                    <p><InputSpan>Home delivery</InputSpan> <b>{s}20</b>
                        <input type="checkbox" value="20" checked={delivery===20} onChange={()=>setDelivery(20)}/>
                    </p>
                    <p><InputSpan>Express delivery </InputSpan> <b>{s}30</b>
                        <input type="checkbox" value="30" checked={delivery===30} onChange={()=>setDelivery(30)}/>
                    </p>
                    <p style={{borderTop: "1px solid #ccc; padding: 20px" }}>
                        <InputCode placeholder="Discount code" type="text" />
                        <ButtonCode>Apply</ButtonCode>
                    </p>
                    <Total>
                        Total cost: {bag.reduce(((total,num)=> Number(total) + num.cost*num.count*currency + delivery),[]).toFixed(0)}
                        {s}
                    
                    </Total>
                    
                    <Button> <Link to="/delivery">GO TO CHECKOUT</Link></Button>
                   
                </div>
                {continue_buy && <DeliveryName cost_delivery={delivery} handClose={set_continue_buy}/>}
                </>
                :
                <Empty>Your bag is empty</Empty>
            }            
        </Layout>
    )
};

const mapStateToProps = state => ({
    bag: state.app.bag,    
    currency: state.app.currency,
    delivery: state.app.delivery   
});
   
const mapDispatchToProps = dispatch => ({
    delete_from_bag: (a) => dispatch(delete_from_bag(a)),
    add_count: (a,b) => dispatch(add_count(a,b)),
    setDelivery: (a) => dispatch(setDelivery(a))
    
});
export default connect(mapStateToProps,mapDispatchToProps)(Bag);
   
