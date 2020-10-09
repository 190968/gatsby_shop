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
    width: 25%;
    z-index: 1;
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
        padding:10px 0;       
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
    margin: 50px 0 5px;
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
    width: 20%;
    font-size: calc(10px + 1vw);
    padding: 3px;   
    margin: 50px 0 0;
    background-color: yellow;
    border: none;
    outline: none;
    cursor: pointer;
    &:hover {       
        background-color: blue;
        color: yellow;
       
    }
`;
const But = styled(Button)`
    width: 80%;
    padding:  5px;
    margin: 10px auto;
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
   
    width: 25%;
`;
const IndexItem = styled(Index)`
    width: 30%;
`;
const FormAnswer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    z-index: 100;
    background-color: rgba(0,0,0,0.5);
    div {
        width: 40vw;
        padding: 0 0 10px;
        text-align: center;
        border: 1px solid #fff;
        z-index: 100;
        height: fit-content;
        margin: 30vh auto;
        background-color: rgba(255,255,255,1.0);
        span {
            float: right;
            background-color: #ddd;
            border: 1px solid #fff;
            cursor: pointer;
            padding: 0 7px;
            :hover {
                border: 1px solid #000;
            }        
        }
        h4 {
            margin: 20px;
        }    
        textarea, input {          
            padding: 0 10px;
            width: 80%;
            outline: none;
	        -moz-appearance: none;
            border: 1px solid #999;
            margin: 10px;
            resize: none; 
        }
        But {
            position: relative;
            bottom: 0;
            width: 60%;
        }
        
    }
`;

const Admin = () => {
    
    const [orders, set_orders] = React.useState({ord:[]});
    const [questions, set_questions] = React.useState({que:[]});
    const [view_bags, set_view_bags] = React.useState(false);
    const [view_questions, set_view_questions] = React.useState(false);   
    const [text, answer] = React.useState([]);
    const [answered, set_answered] = React.useState(false);
    const [email, set_email] = React.useState("");
    const [password, set_password] = React.useState("");
    
    // const url = 'http://localhost:8888/.netlify/functions/hello';
    // const url = 'https://www.aplacadance.ru/.netlify/functions/all_bags';
    const openAnswerWindow =  (a) => {
        set_email(a);
        set_answered(true);
    }
    const SendAnswer = (a,b,c) => {
        // const url =  "https://www.aplacadance.ru/.netlify/functions/new-question";
        
        const url = 'https://www.aplacadance.ru/.netlify/functions/answer';       
        const params = {           
            name: a,           
            email: b,
            question: c,
            details: text,
            password: password
        };
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };
        axios.post(url,JSON.stringify(params))     
       
        .then(res=>{            
           set_answered(!answered)
        })
        
    };

    useEffect(() => {
        const fetchData = async () => {        
            const result = await axios( 
                'https://aplacadance.ru/.netlify/functions/all_bags', {         
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Content-Type" : "Application/json",
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            });     
            set_orders(result.data);
            set_view_bags(true);
                       
        };  
        fetchData();
    },[]); 

    const UpdateStatusDelivery =  (a,b) => {        
        axios(
            `https://www.aplacadance.ru/.netlify/functions/status_rewrite?status=${b}&date=${a}`,{                            
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type" : "Application/json",
            "Access-Control-Allow-Methods": "OPTIONS,GET"
        })            
        .then((res)=>{
            set_orders([...res]);    
        })
        .catch(()=>{})                   
    };
    const ViewQuestions =  async () => {        
       let res = await axios(
            `https://www.aplacadance.ru/.netlify/functions/all-questions`,{                            
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type" : "Application/json",
            "Access-Control-Allow-Methods": "OPTIONS,GET"
        });      
        set_questions(res.data);
        set_view_bags(false);
        set_view_questions(true);
                  
    };
    const reboot =  () => {          
        axios.post(
            "https://api.netlify.com/build_hooks/5f48b46b75f3d244801b7483",{                            
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type" : "Application/json",
            "Access-Control-Allow-Methods": "OPTIONS,GET"
        })            
        .then((res)=>  res  )
        .catch(()=>{})        
         
       
    };
    return (
        <>
            <Helmet>
                <meta
                name="viewport"
                content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
                    
                />
                <title>Admin panel</title>
                <html lang="en" />
                <link rel="canonical" ></link> 
            </Helmet>
            <div className="admin" >
                <h4>ADMIN PANEL</h4> 
            
                <p>
                    <Button>
                        <a href="https://shop-5589.admin.datocms.com/editor">CMS</a>
                    </Button>
                    <Button>
                        <a href="https://files.000webhost.com/">IMAGE</a>
                    </Button>                    
                    {view_questions && 
                        <Button 
                            onClick={()=>{set_view_bags(!view_bags);set_view_questions(!view_questions)}}
                        >
                            BAGS
                        </Button>
                    }
                    {!view_questions && <Button onClick={ViewQuestions}> QUESTIONS </Button> }
                        
                           
                       
                   
                    <Button>BASE {questions.length}</Button>
                    <Button onClick={()=>reboot()}>REBUILD</Button>                
                </p>
                {view_bags && <>    
                    {orders.reverse().map((i,index) => <div key={index}  className="order" >
                    <IndexOne ind={index} text="№">{index + 1}.</IndexOne>
                    <IndexDate ind={index} text="date">{i.date}</IndexDate>
                    <IndexPhone ind={index} text="buyer">
                        {i.person.name} <br/> {i.person.phone} <br/> {i.person.email}
                    </IndexPhone>
                    <IndexItem ind={index} text="orders">
                        {i.bag.map((a,index) => 
                            <div key={index}>
                                <P  text={1 + index}>
                                    {a.brand}, {a.model},
                                    <br/>color:{a.color}, size:{a.size}, Qnt:{a.count},
                                    <br/>cost:<span>{a.cost}$</span>,
                                    delivery:<span>{i.delivery}$</span>
                                </P>
                            </div>
                        )}
                    </IndexItem>    
                    <Index ind={index} text="status">
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
                    </>
                }
                { ( !view_bags && questions.length > 0 ) && <>
                    {questions.map((i,index) => <div key={index}  className="order" >
                        <IndexOne ind={index} text="№">{index + 1}.</IndexOne>
                        <IndexDate ind={index} text="date">{i.date}</IndexDate>
                        <IndexPhone ind={index} text="buyer">
                            {i.name} <br/>  {i.email}
                        </IndexPhone>
                        <IndexItem ind={index} text="question">                     
                            {i.question}                 
                        </IndexItem>    
                        <Index ind={index} text="answer">                              
                               
                            {i.answer ? i.answer:<But onClick={()=>openAnswerWindow(i.email)}>answer</But>}
                            
                        
                                        
                        
                        </Index>
                        {(answered && (i.email === email)) && <FormAnswer>

                                <div>
                                    <span onClick={()=>set_answered(false)}>x</span>
                                    <h4>Answer to {i.name} on question: {i.question}</h4>
                                    
                                    <textarea rows="5" placeholder="answer"  autofocus type="text" value={text} onChange={(e)=>answer(e.target.value)}/>
                                    <input 
                                        required 
                                        type="password" 
                                        placeholder="password" 
                                        value={password}
                                        onChange={(e)=>set_password(e.target.value)}
                                    />
                                    <But onClick={() => SendAnswer(i.name,i.email,i.question)} >ANSWER</But>
                                </div>
                            </FormAnswer>
                        }
                        </div>
                    )}
                    </>
                }
            </div>
            
        </>
    
    )
}
export default Admin;