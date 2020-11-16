import React, { useEffect} from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import axios from 'axios';
import location from "../image/location.png";
import { setCountry,setLocations } from "../state/app";
import { connect } from "react-redux";


const Delivery = styled.div`   
    display: inline-block;
    vertical-align: middle;
    width: 45%;
    text-align: left;
    font: italic 300 20px/25px 'Verdana', sans-serif;
    margin: 0;
    color: red;
    
    span {
        width: auto;
        font:  300 18px/25px 'Verdana', sans-serif;
        color: red;       
    }
    b {
        color: blue;     
        @media (max-width: 550px) {
            font-size: 18px;
        }
   
    }
    p {
        display: inline-block;
      
        vertical-align: middle;
       
    }
    @media (max-width: 880px) {
       
        text-align: center;
        
         width: auto;
         margin: 0 auto;    
        font: italic 300 15px/25px 'Verdana', sans-serif;
    }
  
`;
const DeliveryTwo = styled(Delivery)`
    width: 50%;
    @media (max-width: 880px) {
         display: block;
         width: 100%; 
         font: 300 15px/25px 'Verdana', sans-serif;  
    } 
   
    a {
        cursor: pointer;
        margin-top: 13px;
        float: right;
        vertical-align: middle;
        :hover {
            color: blue;
            text-decoration: underline;
        }
        @media (max-width: 880px) {
            display: none;
           
       } 
    }
   
`;
const Img = styled.div`
    width: 80px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: left center;
    background-image: url(${location});
    background-size: 30%;
    opacity: 0.5;
    cursor: pointer;   
    text-align: right;
    margin: 0 0 0 30px;   
    &:hover {
        opacity: 1;
    }
    @media (max-width: 660px) {
        margin: 0 10px;
        font: italic 300 15px/25px 'Verdana', sans-serif;
    }
`;

const Hi = styled.p`
    display: inline-block;
    margin: 0 20px;
    
    cursor: pointer;
    font: italic 300 16px/25px 'Verdana', sans-serif;
    span{
        :hover {
            color: blue;
            text-decoration: underline;
        }
    }    
    @media (max-width: 880px) {
        display: block;
        text-align: left;
        width: 100%;
        font: italic 300 15px/18px 'Verdana', sans-serif;
    }
`;
const H = styled.h1`
    display: none;
`;
const BlockPhone = ({country = "BY", setCountry,  setLocations}) => {

   
    

    useEffect(() => {      
        axios("https://ipapi.co/json/")
        .then(res =>{        
        setCountry(res.data.country || "BY");
        setLocations([res.data.latitude,res.data.longitude]);
        });
      
    },[]);

   
    
       return <>
               <Delivery>
                   
                    <Hi >
                        <span  title="Enter account" onClick={()=>navigate("/orders")}>Hello, Guest! From  </span>         
                       
                        <img src = {`/${country}.png`} height="30px" width="30px" alt={country}   title={country}/>
                        <Img  onClick={()=>navigate("/locations")} >Stores</Img>
                    </Hi>  
                   
                   
                     
                   
                </Delivery>
                <DeliveryTwo>
                    <p>Free delivery on order over 
                        <b>200$</b>         
                    </p> 
                    
                   
                    
                    <a title="help" onClick={()=>navigate("/help")}>Help & Contact</a> 
                   
                     
                   
                </DeliveryTwo>

              
                

            </>
        

   

};

const mapStateToProps = state => ({
    country: state.app.country,   
    locations: state.app.locations
});
const mapDispatchToProps = dispatch => ({  
    setCountry: (a) => dispatch(setCountry(a)),
    setLocations: (a) => dispatch(setLocations(a))    
});  

export default connect(mapStateToProps,mapDispatchToProps)(BlockPhone);
   