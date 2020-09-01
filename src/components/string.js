import React  from "react";
import { Link } from "gatsby";

export const String  = ({link,gender}) => {

    return <>
        {link !== undefined &&  <div  className="string">
                <Link to="/" >main</Link>
                {link !==undefined && <b>
                    {`/ ${link}`}{" "}{gender.length === 2 ? "kids" : gender.length === 4 ? "" : gender}
                    </b>
                }
            </div>
        }
    </>
};   