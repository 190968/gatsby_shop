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
    width: 300px;
    text-align: left;
    font: italic 300 20px/50px 'Verdana', sans-serif;
    margin: 0;
    color: red;
    span {
        width: auto;
        font:  300 18px/50px 'Verdana', sans-serif;
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
        margin: 0;
        vertical-align: middle;
       
    }
    @media (max-width: 880px) {
       
        text-align: center;
              
        font: italic 300 15px/25px 'Verdana', sans-serif;
    }
  
`;
const Delivery_two = styled(Delivery)`
    width: calc(100% - 300px);
    @media (max-width: 880px) {
         display: block;
         width: 100%; 
         font: 300 15px/25px 'Verdana', sans-serif;  
    } 
    span {
        float: right;
        cursor: pointer;
        :hover {
            color: blue;
           text-decoration: underline;
        }
        @media (max-width: 880px) {
            font: 300 15px/25px 'Verdana', sans-serif; 
           float: none;
           margin-left: 10px;
       } 
    }
    b {
        @media (max-width: 880px) {
           font-size: 15px;
       } 
    }      
`;
const Img = styled.img`
    width: 35px;
    height: 35px;
    opacity: 0.5;
    float: right;
    margin: 8px 10px 0 20px;
   
    &:hover {
        opacity: 1;
    }

`;
const Hi = styled.p`
    display: inline-block;
    margin: 0 20px;
    color: #bbb;
    
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
                   
                    <Hi onClick={()=>navigate("/orders")} title="Enter account">Hello, Guest! From           
                        
                        <img src = {`https://myrunshop.000webhostapp.com/flags/${country}.png`} height="40px" width="40px" alt={country}   title={country}/>
                        
                    </Hi>  
                   
                   
                     
                   
                </Delivery>
                <Delivery_two>
                    <p>Free delivery on order over 
                        <b>200$</b>         
                    </p> 
                    <Img  onClick={()=>navigate("/locations")} src = {location}  alt="Location" title="Location"/>
                    <span title="help" onClick={()=>navigate("/help")}>Help & Contact</span> 
                   
                     
                   
                </Delivery_two>

              
                

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
   