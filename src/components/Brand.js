import React from "react";
import { Link } from "gatsby";


const brands = ["adidas","new-balance","nike","puma","salomon","reebok"];
const gender = ["men","women","kids"];

const Brand = ({ number }) => (   
        <>       
            {gender.map(i => <div   
                    style={{ backgroundImage: `url(https://myrunshop.000webhostapp.com/brands/${brands[number]}_${i}.jpg)`}}         
                                     
                    className="img_brand"
                    key={i}
                >
                    <Link to = {`/${brands[number]}/${i}`} >veiw {brands[number]}{" "}{i}</Link>
                </div>
            )}            
        </> 
)


export default Brand; 