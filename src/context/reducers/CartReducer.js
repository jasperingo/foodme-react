import { CART } from "../actions/cartActions";

export default function CartReducer (state, { type, payload }) {
  
  switch (type) {  
    
    case CART.ITEM_ADDED:

      let item = state.cartItems.find(i=> i.product_variant.id === payload.item.product_variant.id);

      if (item === undefined) {
        item = payload.item;
      } else {
        const qty = item.quantity + payload.item.quantity;
        if (qty <= item.product_variant.quantity) {
          item.amount += payload.item.amount;
          item.quantity += payload.item.quantity;
        }
      }
      
      return {
        cartItemsFetchStatus: payload.fetchStatus,
        cartItems: [item, ...state.cartItems.filter(i=> i.product_variant.id !== item.product_variant.id)]
      };
    
    case CART.ITEM_REMOVED:
      return {
        cartItemsFetchStatus: payload.fetchStatus,
        cartItems: [...state.cartItems.filter(item=> item.product_variant.id !== payload.item.product_variant.id)]
      };
    
    case CART.ITEM_QUANTITY_CHANGED:

      const items = state.cartItems.map(i=> {
        let item = { ...i };
        if (item.product_variant.id === payload.item.product_variant.id) {
          const qty = item.quantity + payload.quantity;
          if (qty <= item.product_variant.quantity) {
            item.amount += payload.amount;
            item.quantity += payload.quantity;
          }
        }
        return item;
      });
      
      return {
        ...state,
        cartItems: items
      };
    
    case CART.ITEMS_REPLACED:
      return {
        cartItems: [...payload.list],
        cartItemsFetchStatus: payload.fetchStatus
      };

    default:
      return state;
  }
}



