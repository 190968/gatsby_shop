import React from "react";
import Menu from "./menu";
import Header from "./header";
import { Footer } from "./footer";
import { Helmet } from 'react-helmet';
import { String } from "./string";
import BlockPhone from "./blockPhone";



export default function Layout ({ children , context_brand, context_gender, set_number, title}){
  
  return (
    <div className="main_block" >
      <Helmet>
      <meta http-equiv="Cache-control" content="public" max-age="31536000"/>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
            
      />
      <meta 
        name="description"
        content="E-shop  shoes and clothing for active sport. The best brands Adidas, Nike, Salomon, Reebok,Puma. Buying shoes and clothing for running.Sport shoes for men,women and children."
      />   

      <title>{ context_brand === undefined ? title : `${context_brand} 
             -   for ${context_gender}`
          }
      </title>
        <html lang="en" />
        <link rel="canonical" /> 
      </Helmet>
    
      <BlockPhone />
      <Header />  
      <Menu link = {context_brand} set_number={set_number} />  
      <String  link ={context_brand} gender={context_gender} />    
        {children}
      <Footer />
    </div>
  )
};
