import React, { useEffect} from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import axios from 'axios';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { setCountry,setLocations } from "../state/app";
import { connect } from "react-redux";


const Delivery = styled.h3`   
    display: inline-block;
   
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
        margin-right: 30px;
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
const NewMap = styled.div`
    width: 90vw;
    height: 100vh;
    position: fixed;
    top: 0;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    z-index: 2500;
    h2 {
        background-color: rgba(255,255,255,1);
        margin: 0 auto 0;
        padding: 20px;
        width: 50%;
    }
    span {
        background-color: rgba(255,255,255,1);
        float: right;
        padding: 0 10px;
        cursor: pointer;
        :hover {
            background-color:  rgba(0,0,0,1);
            color: #fff;
        }
    }
    p {
       
        margin: 10vw auto 0;
       
        width: 50%;
    }
   
`;
const Img = styled.img`
    width: 40px;
    height: 60px;
    opacity: 0.5;
    :hover {
        opacity: 1;
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
const BlockPhone = ({country = "BY", setCountry, locations, setLocations}) => {

   
    const [map, view_map] = React.useState(false);

    useEffect(() => {      
        axios("https://ipapi.co/json/")
        .then(res =>{        
        setCountry(res.data.country || "BY");
        setLocations([res.data.latitude,res.data.longitude]);
        });
      
    },[]);

   
    
       return (      

   
            <div className="div_phone">
               
                <H>This is the best shop world brands shoes and clothing for running</H>
                <Hi>Hello, Guest! From 
                   
                    {country &&
                        <img src = {`https://myrunshop.000webhostapp.com/flags/${country}.png`} alt={country}   title={country}/>
                    } 
                </Hi> 
                <Link to="/help"  title="help">
                   <Hi>Help & Contact</Hi> 
                </Link>
                <Delivery>Free delivery on order over 
                    <b>200$</b>
                   
               
                   <Link to="/locations">
                        <Img onClick={()=>view_map(true)} src = "https://image.flaticon.com/icons/svg/64/64113.svg" width="50" height="40" alt="Location" title="Location"/>
                        <span>our store</span>
                    </Link>
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
   