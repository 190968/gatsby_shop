import React from "react";
import styled from "styled-components";
import { graphql, StaticQuery } from "gatsby";

const Delivery = styled.h3`
    width: 50%;
    display: inline-block;
    text-align: center;
    
    font: italic 300 20px/50px 'Verdana', sans-serif;
    margin: 0;
    color: red;
    
    @media (max-width: 880px) {
        display: block;
        width: 100%;
        text-align: center;
    }
    &:after {
        content: "100$";
        color: blue;
        font-weight: 600;
        font-size: 20px;
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
       
        text-align: center;
    }
`;
const PhoneImage = styled.span.attrs(props=>({
    text:props.text,
}))`
    font:  400 40px/50px 'Verdana', sans-serif;   
    width: 100%;   
    
    
    &:after {
        font:  600 15px/10px 'Verdana', sans-serif;  
       
        
        position: relative;
        top: -16px;
        display: inline-block;
        content: '${props=>props.one}';
    }
    &:before {
        font:  600 15px/10px 'Verdana', sans-serif;  
        
       
        position: relative;
        top: -1px;
        left: 224px;
        display: inline-block;
        content: '${props=>props.two}';
    }
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
                <Delivery>Free delivery on order over </Delivery>
                <Phone>
                    <PhoneImage one={data.allDatoCmsPhone.nodes[0].onephone} two={data.allDatoCmsPhone.nodes[0].twophone}>&#9743; </PhoneImage>
                    
                   
                    
                </Phone>
            </div>
        )}

    />

);
export default BlockPhone;
