import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "gatsby";


const BagLink = styled(Link).attrs(props=> ({
    count: props.count,
}))`
    float: right;
    width: 45px;
    height: 45px;   
    background: cornflowerblue url(https://myrunshop.000webhostapp.com/wp-content/image/icon/bag.png) center/90% no-repeat ;
    opacity: ${props=>props.count === 0 ? "0.5" : "1"};
    position: relative;
    &: hover {
        background: cornflowerblue url(https://myrunshop.000webhostapp.com/wp-content/image/icon/bag.png) center/90% no-repeat ;
    }
    &: after {
        position: absolute;
        content: '${props=>props.count}';
        background: yellow;
        color: blue;
        display: ${props=>props.count === 0 ? "none" : " inline-block"};
        top: -8px;
        left: 35px;
        height: 20px;
        width: 20px;
        text-align: center;
        font: 400 14px/20px 'Arial' , sans-serif;
        border-radius: 50%;
    }
`;
const ImageBag = styled.img`
    
    width: 45px;
    height: 45px;   
    margin: 0 10px;
    border-radius: 0;
    background-color: cornflowerblue; 
`;
const LinkToBag = ({ bag }) => (

    <BagLink to="/bag" count={bag.length}>
        {/* <ImageBag src="https://myrunshop.000webhostapp.com/wp-content/image/icon/bag.png"  
            alt="bag" title="to bag"   
        />                */}
    </BagLink>
);
const mapStateToProps = state => ({
    bag: state.app.bag
   
});
   
   
export default connect(mapStateToProps)(LinkToBag);