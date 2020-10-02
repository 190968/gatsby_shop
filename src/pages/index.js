import React from "react";
import { Helmet } from 'react-helmet';

import Layout from "../components/layout";
import "../styles/global.css";

import Brand from "../components/Brand";

import SEO from "../components/seo";

import Favorite from "../components/favorite";
import FavoriteSale from "../components/favoriteSale";



const Main = () => {   
  const [number, set_number] = React.useState(0); 
  return ( 
    <>
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177617068-1"></script>
        
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
            
          />
          <link rel="canonical" href="https://aplacadance.ru"/>
          <meta
            name="description"
            content="This is shop for shoes and clothing for running favorite brands  ADIDAS,NIKE,SALOMON,PUMA,REBOOK."
            
          />
          {/* <title>Shoes for run</title> */}
          <html lang="en" /> 
      </Helmet>     
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