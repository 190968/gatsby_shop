import React from "react";
import { connect } from "react-redux";
import { addBag } from "../state/app";
import  Layout  from "../components/layout";

import { useStaticQuery, graphql } from "gatsby";



// import Img from "gatsby-image";
// 
import "../styles/global.css";


const Items =  ({ link_brand,link_gender }) => {
    let brand = link_brand;
    let gender = link_gender;
    const [sort, set_sort] = React.useState(true);
    const [color, set_color] = React.useState("all");
    const data = useStaticQuery(
        graphql`
            query {
                allMongodbMyBase {     
                    nodes{       
                        
                        gender
                        color
                        brand 
                        cost 
                        model
                        size                   
                    }
                }
               
            }
        `
    )

    const orders =   data.allMongodbMyBase.nodes
    .sort((a,b)=> sort ? a.cost-b.cost:b.cost-a.cost)
    .filter(i=> brand === "all" ? i : i.brand === brand)
    .filter(i=> gender === "kids" ?
     i.gender === "boy" || i.gender === "girl" :
     gender === "women" ? i.gender === "women" : i.gender === "men")
    .filter(i=> color === "all" ? i : i.color === color);      

    return <Layout> <> 
      
        <p style={{backgroundColor:"lavender",fontSize: "20px"}}>
            <span>brand</span>
            <span>model</span>
            <span>gender</span>
            <span style={{width:"15%"}}>color</span>
            <span>size</span>
            <span className="cost" onClick={()=>set_sort(!sort)}>cost{sort ? ' 0 to 100': ' 100 to 0'}</span>
            <span style={{width:"5%"}}></span>
        </p>   
       {orders.map(i =><p>             
                <span >{i.brand}</span>
                <span>{i.model}</span>
                <span>{i.gender}</span>
                <span style={{width:"15%"}}>
                    {i.color}
                    <input 
                        type="checkbox"
                    
                        onChange={()=>set_color(color === i.color ? "all" : i.color)}
                        checked = {color === i.color } 
                />
                </span>
                <span>{i.size}</span>
                <span>{i.cost} $</span>
                <span style={{width:"5%"}}>
                    <img src="https://i.ibb.co/KhBFscx/bag.png" alt="bag" border="0"
                        style={{float: "right",width:"40px",height:"40px",margin:"-5px 0 0"}} 
                        title="to bag"
                    />
                </span>   
            </p>
       
        )}
        </>
    </Layout>
};

const mapStateToProps = state => ({
    bag: state.app.bag,
   
    link_gender: state.app.link_gender
   });
   
   const mapDispatchToProps = dispatch => ({
     addBag: () => dispatch(addBag())
    
     
   });
export default connect(mapStateToProps,mapDispatchToProps)(Items);
   
