import React from "react";
import { connect } from "react-redux";
import { delete_from_bag, add_count } from "../state/app";
import styled from "styled-components";
import  Layout  from "../components/layout";
import { Curr} from "../components/currency";
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
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    background-color: lime;
    color: #000;    
   
    padding: 10px 0;
    &:hover {
       background-color: yellow;    
       
    }
   
`;
const ButtonCode = styled(Button)`
    width: 30%;
    height: 40px;
    background-color: #ccc;
    font-size: 16px;
`;

const P = styled.p`
    margin: 0;
    display: inline-block;
`;
const Items = styled.div`
    textAlign: left;
    display: inline-block;
    vertical-align: middle;
        width: 45%;
        padding-left: 16%;
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 30%;
    
`;
const Input = styled.input`
    width: 20px;
    height: 20px;
   
    float: right;
    margin-right: 5%;
    
    
`;
const InputCode = styled(Input)`
   margin: 10px;
   display: inline-block;
    height: 40px;
    width: 60%;
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
   
    margin-right: 10px;
    text-align: right;
    width: 70%;
    

`;
const Add = styled.b`
        border: 1px solid #ddd;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        padding: 1px 7px;
        margin: 10px;
        &:hover {
            background-color: cornflowerblue;
            color: yellow;
        }    
    `;
    const Quant = styled.div`
        display: inline-block;
        vertical-align: middle;
        width: 23%;
        text-align: center;
    `;   

const Bag =  ({ bag, delete_from_bag, add_count, currency }) => {
   
    const [number, set_number] = React.useState(0);
    const [continue_buy, set_continue_buy] = React.useState(false); 
    const [delivery, set_delivery] = React.useState(10);
    return (
        <Layout set_number={set_number}>       
            <div className="div_bag_menu">           
                <span style={{width:"45%"}}>Items</span>
                <span style={{width:"23%"}}>Qty</span>
                <span>Cost</span>
                <span>Total</span>            
            </div>       
            {bag.length !== 0 ?  <> 
                {bag.map((i,index) => 
                    <div className="div_bag_item" key={index}>
                    
                        <Items 
                            style={{backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand.toLowerCase()}/${i.model}_${i.color}.jpg),url(https://myrunshop.000webhostapp.com/wp-content/image/${i.brand.toLowerCase()}/${i.model}_${i.color}.webp)`}}
                        >
                            <P><b>{i.brand}</b></P> 
                            <P>{i.model}</P>
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
                        <span>{(i.cost*currency).toFixed(0)} <Curr count={currency} /></span>
                        <span><b style={{fontSize: "1.3em"}}>{(i.cost*i.count*currency).toFixed(0)}</b><Curr count={currency} /></span>
                        
                        
                    
                        
                    </div>
                
                )}
                <div className="div_delivery">
                    <p><InputSpan>Delivery to the warehouse</InputSpan>10 <Curr count={currency} />
                        <Input type="checkbox" value="10" checked={delivery===10} onChange={()=>set_delivery(10)}/>
                    </p>
                    <p><InputSpan>Home delivery</InputSpan>20 <Curr count={currency} />
                        <Input type="checkbox" value="20" checked={delivery===20} onChange={()=>set_delivery(20)}/>
                    </p>
                    <p><InputSpan>Express delivery </InputSpan>30 <Curr count={currency} />
                        <Input type="checkbox" value="30" checked={delivery===30} onChange={()=>set_delivery(30)}/>
                    </p>
                    <p style={{borderTop: "1px solid #ccc; paddingTop: 20" }}>
                        <InputCode placeholder="Discount code" type="text" />
                        <ButtonCode>Apply</ButtonCode>
                    </p>
                    <Total>
                        Total cost: {bag.reduce(((total,num)=> Number(total) + num.cost*num.count*currency + delivery),[]).toFixed(0)}
                        <Curr count={currency} />
                    
                    </Total>
                    <Button onClick={()=>set_continue_buy(true)}> GO TO CHECKOUT</Button>
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
    currency: state.app.currency   
});
   
const mapDispatchToProps = dispatch => ({
    delete_from_bag: (a) => dispatch(delete_from_bag(a)),
    add_count: (a,b) => dispatch(add_count(a,b))
    
});
export default connect(mapStateToProps,mapDispatchToProps)(Bag);
   
