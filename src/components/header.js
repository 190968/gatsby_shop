import React from "react";
import { connect } from "react-redux";
import Search from "./search";
import styled from "styled-components";
import { addBag, euro } from "../state/app";
import "../styles/global.css";
import { graphql, StaticQuery, Link } from "gatsby";
import Linktobag from "./linktobag";


const One = styled.h2.attrs(props=>({
    src:props.src,
}))`
    width: auto;
    margin: 0 0 0 10px;
    border-radius: 30px;
    display: inline-block;
    padding-left:16%;
    font: italic 300 1.7vw/50px "Times new roman", sans;
    color: maroon;
    cursor: pointer;
    transition: all 0.7s;
    background:url(${props=>props.src}) left/20% no-repeat;
    &:hover {
        padding-right: 20%;
        background:url(${props=>props.src}) right/20% no-repeat;
        transition: all 0.7s;     
    }
    
    @media (max-width: 780px) {
        font: italic 300 18px/50px "Times new roman", sans;
    }
    @media (max-width: 580px) {
        display: none;
    }
`;

const Account = styled.p`
    float: right;
    width: 45px;
    box-sizing: border-box;
    height: 45px;   
    margin: 2px 10px;
    cursor: pointer;
    background: url(https://myrunshop.000webhostapp.com/wp-content/image/icon/men.png) center/80% no-repeat;
    &:hover {
        box-shadow: 0 0 2px 2px #fff;
    } 
   
`;

const Euro = styled(Account)`   
    font: 300 45px/47px 'Arial', sans-serif;
    color: #fff;   
    background: none;
    text-align: center;
   
   
`;


const Header = ({ euro, currency }) => { 
    
   
   

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
               
                    <Link to="/" className="icon" style={{textShadow: 'none',backgroundImage:'none'}}>                
                        <One src={data.allDatoCmsHeader.nodes[0].siteimage.url} >
                            {data.allDatoCmsHeader.nodes[0].title}
                        </One>
                    </Link>
                  
                <Search />   
                <Linktobag  title="open bag" /> 
                <Link to="/orders" title="open account">
                    <Account />
                </Link>                         
                              
            
                
                {currency === 1 ?
                    <Euro  onClick={()=>euro(1.2)}>&#8364;</Euro>               
                :
                    <Euro onClick={()=>euro(1)}>$</Euro>               
                }
            
            
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


