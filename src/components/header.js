import React from "react";
import { connect } from "react-redux";
import Search from "./search";
import styled from "styled-components";
import { addBag, euro } from "../state/app";
import "../styles/global.css";
import { graphql, StaticQuery, Link } from "gatsby";
import Linktobag from "./linktobag";

import { LinkToAccount } from "./linktoaccount";

const One = styled.h2.attrs(props=>({
    src:props.src,
}))`
    width: auto;
    margin: 0 0 0 10px;
    border-radius: 30px;
    display: inline-block;
    padding-left:16%;
    font: italic 300 1.5vw/50px "Times new roman", sans;
    color: maroon;
    cursor: pointer;
    transition: all 0.7s;
    background:url(${props=>props.src}) left/20% no-repeat;
    &:hover {
        padding-right: 20%;
        color: #fff;
        background:url(${props=>props.src}) right/20% no-repeat;
        transition: all 0.7s;     
    }
    
    @media (max-width: 880px) {
        font: italic 300 0px/50px "Times new roman", sans;
        width: 50px;
        height: 50px;
        vertical-align: top;
        background:url(${props=>props.src}) center/100% no-repeat;
    }
    @media (max-width: 580px) {
        display: none;
    }
`;

const Account = styled.p`
    float: right;
    width: 47px;
    box-sizing: border-box;
    height: 40px;   
    margin: 4px;
    cursor: pointer;
    background: url(https://myrunshop.000webhostapp.com/wp-content/image/icon/men.png) center/60% 80% no-repeat;
    &:hover {
        box-shadow: 0 0 2px 2px #fff;
    }
    @media(max-width: 500px) {
        width: 47px;
        
    } 
   
`;

const Euro = styled(Account)`   
    font: 300 30px/47px 'Arial', sans-serif;
    color: #fff;   
    background: none;
    text-align: center;
    margin: 3px auto;
    width: 45px;
   
    &:hover {
        box-shadow: none;
        color: yellow;
    }
    
`;
const DivCur = styled.div`
    display: block;
    width: 45px;
    height: 45px;
    position: absolute;
    right: 125px;
    top: 0px;
    overflow: hidden;
    
    transition: all 0.5s;    
    &:hover {
        height: 150px;
        transition: all 0.5s;       
        background-color: cornflowerblue;
        
    }
    @media(max-width: 500px) {
        right: 120px;
        
    } 

`;


export const Header = ({ euro, currency }) => { 
    const s = currency === 0.8 ? '€' : currency === 1 ? "$"  : "£" ;
  
    return (
    <StaticQuery
        query={ graphql`
            query NonPageQuery {
                allDatoCmsHeader {
                    nodes {
                        title
                        siteimage {                            
                           url                             
                        }
                    }
                }
            }
        `}
       
        render={(data) => (   
            <div className="header">              
                <Link to="/" className="shopIcon" >                
                    <One src={data.allDatoCmsHeader.nodes[0].siteimage.url} >
                        {data.allDatoCmsHeader.nodes[0].title}
                    </One>
                </Link>                  
                <Search />               
                <Linktobag  title="open bag"  /> 
                <LinkToAccount title="to account" />
               
                           
                <DivCur>                 
                    {["€","$","£"].filter(i=>i!==s).concat(s).reverse().map( i =>
                        <Euro key={i}  onClick={()=>euro(i)}>{i}</Euro> )
                    }  
                   
                   
                </DivCur>           
            
            </div>
        )}
    />
)};





const mapStateToProps = state => ({
    bag: state.app.bag,
    link: state.app.link,
    currency: state.app.currency
});
   
const mapDispatchToProps = dispatch => ({
    addBag: () => dispatch(addBag()),
    euro: (a) => dispatch(euro(a))
    
});
export default connect(mapStateToProps,mapDispatchToProps)(Header);


