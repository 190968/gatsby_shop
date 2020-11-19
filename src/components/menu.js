import React from "react";

import { Link } from "gatsby";

const brands = ["adidas","new-balance","nike","puma","salomon","reebok"];

const Menu = ({  set_number }) => {

   
    
    return ( 
        <nav className="div_menu">             
            {brands.map((i,index)=>
                <Link 
                    key={i}
                    activeStyle={{ color: "white",backgroundColor: "cornflowerblue" }}
                    partiallyActive={true}
                    to = {`/${i}`} 
                    state={{name: "all",sale: 0 }}

                    onMouseEnter = {()=>set_number(index)}
                    
                    
                    className="main_Menu_link"
                >
                    {i === "new-balance" ? "NB" : i.toUpperCase()}
                </Link>
            )}            
        </nav>
    )
};



export default Menu;
