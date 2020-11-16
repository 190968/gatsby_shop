import React from "react";

import { navigate } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faUser } from "@fortawesome/free-solid-svg-icons"


export const LinkToAccount = () => {
    return (
       
        <FontAwesomeIcon icon={faUser} onClick={()=>navigate("/orders")} className="icon" style={{height: 35, width: 35}}/> 
       
    )            
};        


   
