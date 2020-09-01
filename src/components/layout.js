import React from "react";
import Menu from "./menu";
import Header from "./header";
import { Footer } from "./footer";
import { Helmet } from 'react-helmet';
import { String } from "./string";
import BlockPhone from "./blockPhone";
import { Info } from "./info";



export default ({ children , context_brand, context_gender, set_number,orders, model}) => (
  <div className="main_block" >
    <Helmet>
        <meta
            name="viewport"
            content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
           
        />
        <title>{context_brand === undefined ? "Shoes shop favorite brands" : `${context_brand}- shoes and clothing for running`}</title>
        <html lang="en" /> 
    </Helmet>
   
    <BlockPhone />
    <Header />  
    <Menu link = {context_brand} set_number={set_number} />  
    <String  link ={context_brand} gender={context_gender} />
    {/* {orders > 0 && <Info brand ={context_brand} gender={context_gender} order={orders} model={model}/>}    */}
    {children}
    <Footer />
  </div>
)
