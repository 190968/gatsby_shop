import React from "react";

import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faUser } from "@fortawesome/free-solid-svg-icons"


export const LinkToAccount = () => {
    return (
        <Link to="/orders" title="open account">
            <FontAwesomeIcon icon={faUser} size="2x" className="icon" /> 
        </Link> 
    )            
};        


   
