import React from "react";
import { Helmet } from 'react-helmet';
import Layout from "../components/layout";
import "../styles/global.css";
import { Router } from "@reach/router"
import Brand from "../components/Brand";
import Bag from "./bag";
import Help from "./help";
import Orders from "./orders"
import SEO from "../components/seo";

import Favorite from "../components/favorite";
import FavoriteSale from "../components/favoriteSale";
import FormDelivery from "./FormDelivery";
import BlockPhone from "../components/blockPhone";

const Main = () => { 
  
  const [number, set_number] = React.useState(0); 

 
  return ( 
    <>
      <Helmet>
          <meta
              name="viewport"
              content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
            
          />
          <link rel="canonical" href="https://aplacadance.ru"/>
          <meta
              name="description"
              content="This is shop for shoes and clothing for running favorite brands  ADIDAS,NIKE,SALOMON,PUMA,REBOOK."
            
          />
          <title>Shoes for run</title>
          <html lang="en" /> 
      </Helmet>
     
      <Router basepath="/" >
        <Help path="/help"/>
        <Bag path="/bag" />
        <FormDelivery path="/delivery" />
        <Orders path="/orders" />         
      </Router>              
      <Layout set_number={set_number} >
        <SEO title="Shop for run" />
         <Brand  number={number} />
        <Favorite />
        <FavoriteSale />        
      </Layout>
    </>     
  ) 
};
export default Main;
