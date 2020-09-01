import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import { graphql, StaticQuery } from "gatsby";

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
        font: italic 300 16px/30px 'Verdana', sans-serif;
    }
  
`;
const Phone = styled.div`
   
    width: 50%;
    color: blue;
   
    float: right;
    @media (max-width: 880px) {
        display: block;
        width: 100%;       
        background-color: #fff;       
        text-align: left;
        float: left;
    }
`;
const Hi = styled.span`
    display: inline-block;
    margin: 0 20px;
    font: italic 300 16px/50px 'Verdana', sans-serif;

`;
const H = styled.h1`
    display: none;
`;
const BlockPhone = () => (
    <StaticQuery
        query={graphql`
            query Phone {               
                    allDatoCmsPhone {
                        nodes {
                            onephone
                            twophone
                        }
                    }
               
            }
        `}
        render={(data) => (      

   
            <div className="div_phone">
                <H>This is the best shop world brands shoes and clothing for running</H>
                <Hi>Hi, Guest!</Hi> 
                <Link to="/help" style={{textDecoration: "none"}}>
                   <Hi>Help & Contact</Hi> 
                </Link>
                <Delivery>Free delivery on order over <b>200$</b> <span>Detals!</span></Delivery>
                
                <Phone>
                   
                    {/* <PhoneImage one={data.allDatoCmsPhone.nodes[0].onephone} two={data.allDatoCmsPhone.nodes[0].twophone}>&#9743; </PhoneImage> */}
                   
                   
                    
                </Phone>
            </div>
        )}

    />

);
export default BlockPhone;
