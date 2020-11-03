import React from "react";
import "../styles/global.css";
import SEO from "../components/seo";
import Brand from "../components/Brand";
import { Helmet } from 'react-helmet';
import Favorite from "../components/favorite";
import FavoriteSale from "../components/favoriteSale";
import Layout from "../components/layout";




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
          <link rel="canonical" href="https://www.aplacadance.ru"/>
          <meta
            name="description"
            content="This is shop for shoes and clothing for running favorite brands  ADIDAS,NIKE,SALOMON,PUMA,REBOOK."
            
          />
         
          <html lang="en" /> 
      </Helmet>     
      <Layout set_number={set_number} >
        <SEO title="Shoes and clothing the best of world brands for running" />       
        <Brand  number={number} />
        <FavoriteSale />
        <Favorite />                
      </Layout>
    </>     
  ) 
};

 
export default Main;