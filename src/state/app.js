const initialState = {
  currency: 1,
  delivery: 20,
  country: "",
  bag: []
};

const add_Bag = 'add_Bag';
const delete_from_Bag = 'delete_from_Bag';
const euRo = 'euRo';
const del_bag = 'del_bag';
const set_delivery = 'set_delivery';
const set_country = 'set_country';

export const setCountry = a => ({
  type: set_country, a
});
export const setDelivery = a => ({
  type: set_delivery, a
});
export const addBag = bag => ({
  type: add_Bag, bag
});
export const delBag = bag => ({
  type: del_bag, bag
});
export const add_count = (a,b) => ({
  type: add_count, a ,b
});
export const delete_from_bag = index => ({
  type: delete_from_Bag, index
});
export const euro = currency => ({
    type: euRo, currency
});


export default (state = initialState, action) => {
  switch (action.type) {
    case set_country:
      return {...state, country: action.a};
    case set_delivery:
      return {...state, delivery: action.a};
    case del_bag:
      return { ...state, bag: [] };
    case add_Bag:
      return { ...state, bag: state.bag.concat(action.bag) };
    case delete_from_Bag:
      return {...state, bag: state.bag.filter((i,index)=> index !== action.index )};  
    case euRo:
      return { ...state, currency: action.currency === "€" ?
       0.8 : action.currency === "$" ? 1 : action.currency === "£" ?  0.6 : 10 };
    case add_count:
        return { ...state, bag: state.bag.filter((i,index)=>index === action.a ? i.count = i.count + action.b : i.count)};
   
      
    default:
      return state;
  }
};