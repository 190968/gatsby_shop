import React, { useEffect} from "react";
import styled from "styled-components";
import { Link, navigate } from "gatsby";
import axios from 'axios';
import location from "../image/location.png";

import { setCountry,setLocations } from "../state/app";
import { connect } from "react-redux";


const Delivery = styled.div`   
    display: inline-block;
    vertical-align: middle;
    width: 48%;
    text-align: left;
    font: italic 300 20px/50px 'Verdana', sans-serif;
    margin: 0;
    color: red;
    span {
        width: auto;
        font-size: 18px;       
        color: red;       
    }
    b {
        color: blue;
        margin-right: 30px;
        font-size: 22px;
        @media (max-width: 550px) {
            font-size: 18px;
        }
   
    }
    @media (max-width: 880px) {
        text-align: center;
        width: 100%;        
        font: italic 300 15px/25px 'Verdana', sans-serif;
    }
  
`;
const Img = styled.img`
    width: 40px;
    height: 40px;
    opacity: 0.5;
    float: right;
    margin: 0 10px;
    :hover {
        opacity: 1;
    }

`;
const Hi = styled.p`
    display: inline-block;
    margin: 0 20px;
    color: #bbb;
    float: left;
    cursor: pointer;
    font: italic 300 16px/50px 'Verdana', sans-serif;
    &:hover {
        text-decoration: underline;
        color: blue;
    }
    @media (max-width: 880px) {
        
        font: italic 300 15px/25px 'Verdana', sans-serif;
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

   
    
       return (   
            <div className="div_phone">
               <Delivery>
                    <H>This is the best shop world brands shoes and clothing for running</H>
                    <Hi onClick={()=>navigate("/orders")} title="Enter account">Hello, Guest! From 
                    
                        {country &&
                            <img src = {`https://myrunshop.000webhostapp.com/flags/${country}.png`} alt={country}   title={country}/>
                        } 
                    </Hi> 
                   
                    <Hi title="help" onClick={()=>navigate("/help")}>Help & Contact</Hi> 
                   
                </Delivery>
                <Delivery>
                    <span>Free delivery on order over</span> 
                    <b>200$</b>         
               
                  
                        <Img  onClick={()=>navigate("/locations")} src = {location}  alt="Location" title="Location"/>
                       
                   
                </Delivery>

              
                

            </div>
        

   

)};

const mapStateToProps = state => ({
    country: state.app.country,   
    locations: state.app.locations
});
const mapDispatchToProps = dispatch => ({  
    setCountry: (a) => dispatch(setCountry(a)),
    setLocations: (a) => dispatch(setLocations(a))    
});  

export default connect(mapStateToProps,mapDispatchToProps)(BlockPhone);
   