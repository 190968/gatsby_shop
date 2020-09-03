import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const From = styled.span`
    font: 400 16px/16px 'Arial',sans-serif;
`;
 
const Country = () => { 
    const [data, setCountry] = React.useState();
   
   
    useEffect(() => {
        const fetch = async () => {
            axios("https://ipapi.co/json/")
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
