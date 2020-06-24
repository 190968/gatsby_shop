import React from "react";
import "../styles/global.css";
import { Link } from "gatsby";

const brands = ["adidas","new-balance","nike","puma","salomon","reebok"];

const Menu = ({  link, set_number }) => {

   
    
    return ( 
        <div className="div_menu">             
            {brands.map((i,index)=>
                <Link 
                    key={i}
                    to = {`/${i}`} 
                    onMouseEnter = {()=>set_number(index)}
                    style={{backgroundImage: "none",
                        backgroundColor: i === link  ? "cornflowerblue" : "chartreuse",
                        color: i === link ? "#fff" : "blue" 
                    }} 
                    className="main_Menu_link"
                >
                {i === "new-balance" ? "NB" : i.toUpperCase()}
                </Link>
            )}            
        </div>
    )
};



export default Menu;
