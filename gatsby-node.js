const path = require(`path`);


exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const  brands  =  ['adidas','new-balance', 'nike','puma','salomon','reebok'];

  createPage({
      path:`/all`,
      component: require.resolve('./src/templates/items.js'),
      context: { brand : brands ,gender: ["men","women","boy","girl"]}
  })

  brands.forEach(i =>
    createPage({
      path: `/${i}`,
      component: require.resolve('./src/templates/items.js'),
      context: { brand : [`${i}`],gender: ["men","women","boy","girl"]}
      }) 
  );
  brands.forEach(i =>
    createPage({
      path: `/${i}/men`,
      component: require.resolve('./src/templates/items.js'),
      context: { brand : [`${i}`],gender: ["men"]}
      }) 
  );
  brands.forEach(i =>
    createPage({
      path: `/${i}/women`,
      component: require.resolve('./src/templates/items.js'),
      context: { brand : [`${i}`],gender: ["women"]}
      }) 
  ); 
  brands.forEach(i =>
    createPage({
      path: `/${i}/kids`,
      component: require.resolve('./src/templates/items.js'),
      context: { brand : [`${i}`],gender: ["boy","girl"]}
      }) 
  );   
 

}
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  console.log('create page');
  // You can access the variable "house" in your page queries now
  createPage({
    ...page,
    context: {
      ...page.context,
      house: `Gryffindor`,
    },
  })
}