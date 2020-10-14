import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "gatsby";


const BagLink = styled(Link).attrs(props=> ({
    count: props.count,
}))`
    float: right;
    width: 43px;
    height: 43px;
    margin: 2px 10px;   
    background: cornflowerblue url(https://myrunshop.000webhostapp.com/wp-content/image/icon/bag.png) center/100% 80% no-repeat ;
    opacity: ${props=>props.count === 0 ? "0.5" : "1"};
    position: relative;
    &: hover {
        background: cornflowerblue url(https://myrunshop.000webhostapp.com/wp-content/image/icon/bag.png) center/100% 80% no-repeat ;
    }
    &:hover {
        box-shadow: 0 0 2px 2px #fff;
    } 
    &: after {
        position: absolute;
        content: '${props=>props.count}';
        // background: red;
        color: yellow;
        display: ${props=>props.count === 0 ? "none" : " inline-block"};
        top: 18px;
        left: 13px;
        height: 18px;
        width: 18px;
        text-align: center;
        font: 600 16px/18px 'Verdana' , sans-serif;
        border-radius: 50%;
        text-shadow: none;
    }
`;

const LinkToBag = ({ bag }) => <BagLink to="/bag" count={bag.length} /> 

const mapStateToProps = state => ({ bag: state.app.bag });  
   
export default connect(mapStateToProps)(LinkToBag);