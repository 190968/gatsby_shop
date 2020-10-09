module.exports = { 
  siteMetadata: {   
    title: `Shop ADIDAS, NIKE, PUMA, SALOMON, REEBOK,NEW-BALANCE  SHOES FOR RUN `,
    defaultImage: `/icon.jpg` ,
    siteUrl: `https://www.aplacadance.ru`,
    description: `E-shop  shoes and clothing for active sport. The best brands Adidas, Nike, Salomon, Reebok,Puma. Buying shoes and clothing for running.Sport shoes for men,women and children.`, 
    twitter: `@kylemathews`,
    titleTemplate: `%s`,
    twitterUsername: `Alekc`    
  }, 
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-node-reload',
    `gatsby-transformer-remark`,   
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`, 
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.aplacadance.ru',
        sitemap: 'https://www.aplacadance.ru/sitemap.xml',        
        production: {
          policy: [{ userAgent: '*', allow: '/'}]
        }        
      }
    },   
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ShopForRun`,
        short_name: `ShopForRun`,       
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,        
        display: `standalone`,
        icon: `src/image/icon.jpg`, // This path is relative to the root of the site.
      },    
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-177617068-1`,
        // Puts tracking script in the head instead of the body
        head: false,
        // enable ip anonymization
        anonymize: true,
      }
    },    
    {
      resolve:'gatsby-plugin-offline',     
        options: {
          workboxConfig: {
             globPatterns: ['**/*']
          }
       }
        
    },
    {
      resolve: 'gatsby-source-datocms',
      options: {
        // You can find your read-only API token under the Settings > API tokens
        // section of your administrative area:
        apiToken: `3afef46b170a588349fba059c0dad4`,
  
        // If you are working on development/staging environment, you might want to
        // preview the latest version of records instead of the published one:
        previewMode: false,
  
        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: false,
  
        // Custom API base URL (most don't need this)
        // apiUrl: 'https://site-api.datocms.com',
  
        // Setup locale fallbacks
        // In this example, if some field value is missing in Italian, fall back to English
        localeFallbacks: {
          it: ['en'],
        },
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },

    }, 
    {
      resolve: `gatsby-source-mongodb`,
      options: { 
        connectionString: `mongodb+srv://alex:alex@cluster0alex-mvffj.gcp.mongodb.net/test?retryWrites=true&w=majority`,
        dbName: `my`, 
        collection: `base`,
        
        
      },
    }, 
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `image`,
        path: `${__dirname}/src/image/`,
      },
    },
  ]  
}
