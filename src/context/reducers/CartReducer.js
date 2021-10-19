
import { CART, FETCH_STATUSES } from "../AppActions";

export default function CartReducer (state, action) {
  
  switch (action.type) {  
    
    case CART.ITEM_ADDED:
      state.cartItems.pop();

      let found = false;

      const items = state.cartItems.map(item=> {
        if (item.product.id === action.payload.product.id) {
          found = true;
          item.amount += action.payload.amount;
          item.quantity += action.payload.quantity;
        }
        return item;
      });

      if (!found) {
        items.push(action.payload);
      }

      return {
        cartItems: [...items, null],
        cartItemsFetchStatus: FETCH_STATUSES.DONE
      };
    
    case CART.ITEM_REMOVED:
      state.cartItems.pop();

      const items_ = state.cartItems.filter(item=> item.product.id !== action.payload.product.id);

      return {
        cartItems: [...items_, null],
        cartItemsFetchStatus: (items_.length > 0 ? FETCH_STATUSES.DONE: FETCH_STATUSES.EMPTY)
      };
    
    case CART.ITEM_QUANTITY_CHANGED:
      state.cartItems.pop();

      let itemss = state.cartItems.map(item=> {
        if (item.product.id === action.payload.item.product.id) {
          let value = item.quantity + action.payload.value;
          item.quantity = (value < 1 ? 1 : value);
          item.amount = action.payload.product.price * item.quantity;
        }
        return item;
      });
      console.log(itemss, 'Yww')
      return {
        cartItems: [...itemss, null],
        cartItemsFetchStatus: FETCH_STATUSES.DONE
      };

    default:
      return state;
  }
}

