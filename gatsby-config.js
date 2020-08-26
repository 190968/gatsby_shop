module.exports = { 
  siteMetadata: {   
    title: `Shop ADIDAS, NIKE, PUMA, SALOMON, REEBOK,NEW-BALANCE  SHOES FOR RUN `,
    defaultImage: `https://i.ibb.co/DDZBPXB/002.jpg` ,
    siteUrl: `https://www.myshop.surge.sh`,
    description: `E-shop sport shoes and clothing. The best brands Adidas, Nike, Salomon. Buying shoes and clothing for running.Sport shoes for men,women and children.`, 
    twitter: `@kylemathews`,
    titleTemplate: `%s | myshop.surge.sh`,
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
        host: 'http://www.myshop.surge.sh',
        sitemap: 'https://www.myshop.surge.sh/sitemap.xml',
        resolveEnv: () => process.env.GATSBY_ENV,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', allow: '/',disallow: '/holobuda/y' }]
          }
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
        icon: `src/image/Globe.png`, // This path is relative to the root of the site.
      },
     
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
        // server: { address: `gcp.mongodb.net/test`, port: 43532 },
        // auth: { user: `alex`, password: `alex` },
        // map: {
        //   orders: { name: `text/markdown` },
        // },
        
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
