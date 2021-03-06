import React from "react";
import { connect } from "react-redux";
import styled,{css} from "styled-components";
import { navigate } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"

const BagLink = styled.p.attrs(props=> ({
    count: props.count,
}))`
    float: right;
    width: 43px;
    height: 43px;
    margin: 1px 10px 0;   
   
    opacity: ${props=>props.count === 0 ? "0.5" : "1"};
    position: relative;
    
   
    &: after {
        position: absolute;
        content: '${props=>props.count}';
        padding: 0 4px;
        color: blue;
        display: ${props=>props.count === 0 ? "none" : " inline-block"};
        top: 2px;
        left: 25px;
        background-color: yellow;
        text-align: center;
        font: 600 16px/18px 'Verdana' , sans-serif;
        border-radius: 50%;
        
        text-shadow: none;
    }
`;

const LinkToBag = ({ bag }) => {
    return <BagLink onClick={()=>navigate("/bag")} count={bag.length} >

    <FontAwesomeIcon  icon={faShoppingCart} css={`width: 28, height: 28`} className="icon" />
    </BagLink>
};        

const mapStateToProps = state => ({ bag: state.app.bag });  
   
export default connect(mapStateToProps)(LinkToBag);