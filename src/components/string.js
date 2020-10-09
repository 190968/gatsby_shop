import React  from "react";
import { Link } from "gatsby";

export const String  = ({ brands, gender}) => {

    return <>
        {brands !== undefined &&  
            <div  className="string">
                <Link to="/" >main </Link>
                {"/"}{brands ??
                    <b>
                        {`/ ${brands}`}{" "}{gender.length === 2 ? "kids" : gender.length === 4 ? "" : gender}
                    </b>
                }              
            </div>
        }
    </>
};   