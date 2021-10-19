
import { CART, FETCH_STATUSES } from "../AppActions";

export default function CartReducer (state, action) {
  
  switch (action.type) {  
    
    case CART.ITEM_ADDED:

      let found = false;

      const items = state.cartItems.map(item=> {
        if (item && item.product.id === action.payload.product.id) {
          found = true;
          item.amount += action.payload.amount;
          item.quantity += action.payload.quantity;
        }
        return item;
      });

      if (!found) {
        items.unshift(action.payload);
      }

      return {
        cartItems: items,
        cartItemsFetchStatus: FETCH_STATUSES.DONE
      };
    
    case CART.ITEM_REMOVED:

      const itemss = state.cartItems.filter(item=> item && item.product.id !== action.payload.product.id);

      return {
        cartItems: [...itemss, null],
        cartItemsFetchStatus: (itemss.length > 0 ? FETCH_STATUSES.DONE: FETCH_STATUSES.EMPTY)
      };
    
    case CART.ITEM_QUANTITY_CHANGED:

      const itemsss = state.cartItems.map(item=> {
        if (item && item.product.id === action.payload.item.product.id) {
          let value = item.quantity + action.payload.value;
          item.quantity = (value < 1 ? 1 : value);
          item.amount = action.payload.item.product.price * item.quantity;
        }
        
        return item;
      });
      
      return {
        cartItems: itemsss,
        cartItemsFetchStatus: FETCH_STATUSES.DONE
      };

    default:
      return state;
  }
}



