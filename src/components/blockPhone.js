import React, { useEffect} from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import axios from 'axios';
import { setCountry } from "../state/app";
import { connect } from "react-redux";


const Delivery = styled.h3`   
    display: inline-block;
    text-align: left;
    width: 50%;
    padding-left: 30px;    
    font: italic 300 20px/50px 'Verdana', sans-serif;
    margin: 0;
    color: red;
    span {
        width: auto;
        font-size: 16px;
        cursor: pointer;
        color: purple;
        @media (max-width: 450px) {
            display: none;
        }
    }
    b {
        color: blue;
        font-size: 22px;
        @media (max-width: 550px) {
            font-size: 18px;
        }
       
    }
    @media (max-width: 880px) {
        display: block;
        width: 100%;
        text-align: center;
        font: italic 300 15px/25px 'Verdana', sans-serif;
    }
  
`;

const Hi = styled.span`
    display: inline-block;
    margin: 0 20px;
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
const BlockPhone = ({country = "BY", setCountry}) => {

    

    useEffect(() => {
      
        axios("https://ipapi.co/json/")
        .then(res =>{
    
        
        setCountry(res.data.country || "BY");
        });
      
    },[]);

   
    
       return (      

   
            <div className="div_phone">
               
                <H>This is the best shop world brands shoes and clothing for running</H>
                <Hi>Hi, Guest! 
                    <img src = "https://image.flaticon.com/icons/svg/64/64113.svg" width="42" height="32" alt="Location" title="Location"></img>
                    {country &&
                        <img src = {`https://myrunshop.000webhostapp.com/flags/${country}.png`} width='42' height='42' alt='flag' title='flag'/>
                    } 
                </Hi> 
                <Link to="/help" style={{textDecoration: "none",backgroundImage: "none"}}>
                   <Hi>Help & Contact</Hi> 
                </Link>
                <Delivery>Free delivery on order over <b>200$</b></Delivery>
                
                

            </div>
        

   

)};

const mapStateToProps = state => ({
    country: state.app.country   
   
});
const mapDispatchToProps = dispatch => ({
  
    setCountry: (a) => dispatch(setCountry(a))
    
    
  });  

export default connect(mapStateToProps,mapDispatchToProps)(BlockPhone);
   