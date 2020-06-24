import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "gatsby";


const BagLink = styled(Link).attrs(props=> ({
    count: props.count,
}))`
    float: right;
    background-image: none;
    opacity: ${props=>props.count === 0 ? "0.5" : "1"};
    position: relative;
    &: hover {
        transform: scale(1.1);
        tramsition: all 0.5s;
    }
    &: after {
        position: absolute;
        content: '${props=>props.count}';
        background: yellow;
        color: blue;
        display: ${props=>props.count === 0 ? "none" : " inline-block"};
        top: -5px;
        left: 45px;
        height: 20px;
        width: 20px;
        text-align: center;
        font: 400 16px/20px 'Arial' , sans-serif;
        border-radius: 50%;
    }
`;
const ImageBag = styled.img`
    float: right;
    width: 50px;
    height: 50px;   
    margin: 0 10px;
    border-radius: 0; 
`;
const LinkToBag = ({ bag }) => (

    <BagLink to="/bag" count={bag.length}>
        <ImageBag src="https://i.ibb.co/KhBFscx/bag.png" alt="bag" border="0" title="to bag"   />               
    </BagLink>
);
const mapStateToProps = state => ({
    bag: state.app.bag
   
});
   
   
export default connect(mapStateToProps)(LinkToBag);