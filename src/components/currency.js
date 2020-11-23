import React from 'react';
import styled from "styled-components";

const Sizing = styled.div`
    display: inline-block;
    position: fixed;
    top:0;
    right: 5vw;
    text-align: center;
    width: 33vw;
    height: 100vh;
    background-color: #fff;
    h5 span {
        display: inline-block;
        font-size: 25px;
        width: 50%;
        text-align: left;
    }
    h5 span:last-of-type {
        text-align: right;
        cursor: pointer;
    }
    div {
        width: 25%;
        float: left;
    }
    p {
        border-right: 1px solid #000;
        margin: 0;
        padding: 5px;
    }
    p:first-of-type {
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        padding: 10px;
        border-right: none;
    }
    div:last-of-type p {
        border-right: none;
    }
    @media (max-width: 660px) {
        right: 0;
        width: 100%;
        padding: 0 10px; 
        font: 300 15px/25px 'Verdana', sans-serif;  
   } 
`;
const usa_men = ["USA",4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,14,14.5];
const eur_men = ["EUR",36,36.5,37.5,38,38.5,39,40,40.5,41,42,42.5,43,44,44.5,45,45.5,46,47,47.5,48.5,49.5];
const uk_men = ["UK",3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,14];
const cm_men = ["CM",22,22.4,22.9,23.3,23.7,24.1,24.5,25,25.4,25.8,26.2,26.7,27.1,27.5,27.9,28.3,28.8,29.2,29.6,30.5,31.3];

const uk_women = ["UK",1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5];
const eur_women = ["EUR",34,34.5,35,35.5,36,36.5,37,37.5,38,38.5,39,39.5,40,40.5,41,41.5,42,42.5];
const usa_women = ["USA",4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5];
const cm_women = ["CM",8.25,8.5,8.625,8.75,9,9.125,9.25,9.5,9.625,9.75,10,10.125,10.25,10.5,10.625,11,11.25,11.625];
export default ({set_size,gender,item}) => {
   
    return (
       <>
       
        {gender === "men" &&   <Sizing>
                <h5 css="margin: 10px 0;">
                    <span>{gender}'s {item} sizes  </span>
                    
                    <span  onClick={()=>set_size(false)}>x</span>
                </h5>
                <div>
                    {usa_men.map(i=><p>{i}</p>)}

                </div>
                <div>
                    {eur_men.map(i=><p>{i}</p>)}
                    
                </div>
                <div>
                    {uk_men.map(i=><p>{i}</p>)}
                    
                </div>
                <div>
                    {cm_men.map(i=><p>{i}</p>)}
                    
                </div>
            </Sizing>
            }

            {gender === "women" &&   <Sizing>
                <h5 css="margin: 10px 0;">
                    <span>Sizing for {gender}'s {item}</span>
                    
                    <span  onClick={()=>set_size(false)}>x</span>
                </h5>
                <div>
                    {usa_women.map(i=><p>{i}</p>)}

                </div>
                <div>
                    {eur_women.map(i=><p>{i}</p>)}
                    
                </div>
                <div>
                    {uk_women.map(i=><p>{i}</p>)}
                    
                </div>
                <div>
                    {cm_women.map(i=><p>{i === "CM" ? i : (i*2.56).toFixed(1)}</p>)}
                    
                </div>
            </Sizing>
            }


        </>    
    )  
  
     
};







