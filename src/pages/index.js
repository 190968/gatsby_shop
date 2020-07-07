import React from "react";
import { Helmet } from 'react-helmet';
import Layout from "../components/layout";
import "../styles/global.css";
import { Brand } from "../components/Brand";
import Favorite from "../components/favorite";
import FavoriteSale from "../components/favoriteSale";

const Main = ({data}) => { 
  const title = data.site.siteMetadata.title;
  const [number, set_number] = React.useState(0); 
  return ( 
    <>
      <Helmet>
          <meta
              name="viewport"
              content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
            
          />
          <link rel="canonical" href="https://myshop.surge.sh"/>
          <meta
              name="description="
              content="This is shop for shoes and clothing for running favorite brands  ADIDAS,NIKE,SALOMON,PUMA,REBOOK."
            
          />
          <title>Shoes for run</title>
          <html lang="en" /> 
      </Helmet>
               
      <Layout set_number={set_number} title={title}>
       
        <Brand number={number} />
        <Favorite/>
        <FavoriteSale />        
      </Layout>
    </>     
  ) 
};
export default Main;
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }   
    }   
  }
`    