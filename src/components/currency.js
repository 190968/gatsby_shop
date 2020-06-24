import React from "react";
import styled from "styled-components";



const Curr = ({count}) => (count === 1.2 ? "$" : "€");
   

export { Curr } 