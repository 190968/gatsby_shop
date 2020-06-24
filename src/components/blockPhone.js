import React from "react";
import styled from "styled-components";
import { graphql, StaticQuery } from "gatsby";

const Delivery = styled.div`
    width: auto;
    display: inline-block;
    text-align: left;
    padding: 10px;
    font-weight: 300;
    color: red;
    background-color: #fff;
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
    width: 48%;
    color: blue;
    font-size: 1em;
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
    font-size: 30px;
    font-weight: 600;
    width: 40%;
    color: green;
    margin-right: 5px;
    text-align: right;
    
    &:after {
        font-size: 16px;
        color: blue;
        position: relative;
        top: -5px;
        display: inline-block;
        content: '${props=>props.text}';
    }
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
                <Delivery>Free delivery on order over </Delivery>
                <Phone>
                    <PhoneImage text={data.allDatoCmsPhone.nodes[0].onephone}>&#9743; </PhoneImage>
                    
                    <PhoneImage text={data.allDatoCmsPhone.nodes[0].twophone}>&#9743; </PhoneImage>
                    
                </Phone>
            </div>
        )}

    />

);
export default BlockPhone;
