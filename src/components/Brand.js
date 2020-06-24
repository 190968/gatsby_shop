import React from "react";
import { Link } from "gatsby";
import "../styles/global.css";

const brands = ["adidas","new-balance","nike","puma","salomon","reebok"];
const gender = ["men","women","kids"];

const Brand = ({number}) => {
    
    return (
        <>
       
            {gender.map(i => <Link   
                    style={{ backgroundImage: `url(https://myrunshop.000webhostapp.com/wp-content/uploads/2020/05/${brands[number]}_${i}.jpg)`}}         
                    to = {`/${brands[number]}/${i}`}                   
                    className="img_main_link"
                >
            {brands[number]}{" "}{i}
                </Link>
            )}    
           
        </>    
    ) 
}
export {Brand}; 