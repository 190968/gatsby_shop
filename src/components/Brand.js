import React from "react";
import { navigate } from "gatsby";


const brands = ["adidas","new-balance","nike","puma","salomon","reebok"];
const gender = ["men","women","kids"];

const Brand = ({ number }) => (   
        <>       
            {gender.map(i => <div   
                    style={{ backgroundImage: `url(https://myrunshop.000webhostapp.com/brands/${brands[number]}_${i}.jpg)`}}         
                    onClick={()=>navigate(`/${brands[number]}`,{state: { name: i }},{ replace: true } )}               
                    className="img_brand"
                    key={i}
                >
                    <span>veiw {brands[number]}{" "}{i}</span>
                </div>
            )}            
        </> 
)


export default Brand; 