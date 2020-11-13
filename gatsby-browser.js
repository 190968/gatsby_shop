import "./src/styles/global.css"
// import React from "react";
// or:
// require('./src/styles/global.css')
// const { createStore } = require('redux');
// exports.onRouteUpdate = ({ location, prevLocation }) => {
//     console.log('new pathname', location.pathname)
//     console.log('old pathname', prevLocation ? prevLocation.pathname : null)
// }
// exports.onClientEntry = () => {
//     console.log("We've started!")
    
// };
export { default as wrapRootElement } from './src/state/ReduxWrapper';
// const React = require("react")
// const { Provider } = require("react-redux")

// // const createStore = require("./src/state/ReduxWrapper")
// const store = createStore()

// exports.wrapRootElement = ({ element }) => {
//   return (
//     <Provider store={store}>
//       {element}
//     </Provider>
//   )
// }