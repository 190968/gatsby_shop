import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addBag, euro } from "../state/app";
import "../styles/global.css";
import { Link, graphql, StaticQuery } from "gatsby";
import Linktobag from "./linktobag";


const One = styled.h1`
    width: auto;
    margin: 0 20px;
    display: inline-block;
    font: italic 300 30px/30px "Times new roman", sans;
    color: maroon;
    @media (max-width: 780px) {
        font: italic 300 20px/30px "Times new roman", sans;
    }
    @media (max-width: 580px) {
        display: none;
    }
`;
const Image = styled.img`
    width: 50px;
    margin: 0;
    border-radius: 50%;
`;
const ImageBag = styled.img`
    float: right;
    width: 50px;
    height: 50px;   
    margin: 0 10px;
    border-radius: 50%;
    &:hover {
        width: 55px;
        height: 55px;
        transition: all 0.5s;  
    }

    
    
`;

const Header = ({ euro,currency, bag }) => (
    <StaticQuery
        query={ graphql`
            query NonPageQuery {
                allDatoCmsHeader {
                    nodes {
                        siteimage {                            
                           url                             
                        }
                    }
                }
            }
        `}
        render={(data) => (   
        <div className="header">  

            <Link to="/" className="main_link" >
                <Image src={data.allDatoCmsHeader.nodes[0].siteimage.url}  alt="my site" />
            </Link>
            <One>This is my site</One> 
           
            <Linktobag />        
            <Link to="/orders">
                
            <ImageBag  
                src="https://i.ibb.co/ngy0fnd/2703062-48.png" 
                alt="2703062-48" 
                border="0"    
                  
            />
            </Link>
            {currency === 1 ?
                <ImageBag src="https://i.ibb.co/82TnYVS/euro.png" alt="euro" border="0"
                    
                    onClick={()=>euro(1.2)}
                />
            :
                <ImageBag src="https://i.ibb.co/6ZFBmMH/coin.png" alt="coin" border="0"
                    
                    onClick={()=>euro(1)}
                />
            }
           
           
        </div>
    )}
    />
);





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


