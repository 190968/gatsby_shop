import React from "react";

import { navigate } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faUser } from "@fortawesome/free-solid-svg-icons"


export const LinkToAccount = () => {
    return (
       
        <FontAwesomeIcon icon={faUser} onClick={()=>navigate("/orders")} className="icon account" style={{height: 25, width: 25}}/> 
       
    )            
};        


   
