import React  from "react";
import { Link } from "gatsby";

export const String  = ({link,gender}) => {

    return <>
        {link !== undefined &&  <p style={{textAlign:"left",margin: "0",backgroundColor:"azure",padding: 10 }}>
                <Link to="/" >main</Link>
                {link !==undefined && <b style={{marginLeft: 10,width: "auto"}}>
                    {`/ ${link}`}{" "}{gender.length === 2 ? "kids" : gender.length === 4 ? "all" : gender}
                    </b>
                }
            </p>
        }
    </>
};   