import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const From = styled.span`
    font: 600 20px/20px 'Arial',sans-serif;
`;
 
const Country = () => { 
    const [data, setCountry] = React.useState();
    const [bob, setBob] = React.useState();
   
    useEffect(() => {
        const fetch = async () => {
            axios("http://ip-api.com/json/")
            .then(res =>{
        
            
            setCountry(res.data.country);
            });
        };
        fetch();    
    },[]);
    return (
        <From>{data}</From>

    )
};
export default Country;    
