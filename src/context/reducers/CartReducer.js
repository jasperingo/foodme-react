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
          item.quantity += payload.item.quantity;
        }
      }
      
      return {
        ...state,
        cartItemsFetchStatus: payload.fetchStatus,
        cartItems: [item, ...state.cartItems.filter(i=> i.product_variant.id !== item.product_variant.id)]
      };
    
    case CART.ITEM_REMOVED:
      return {
        ...state,
        cartItemsFetchStatus: payload.fetchStatus,
        cartItems: [...state.cartItems.filter(item=> item.product_variant.id !== payload.item.product_variant.id)]
      };
    
    case CART.ITEM_QUANTITY_CHANGED:

      const items = state.cartItems.map(i=> {
        let item = { ...i };
        if (item.product_variant.id === payload.item.product_variant.id) {
          const qty = item.quantity + payload.quantity;
          if (qty <= item.product_variant.quantity) {
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
        ...state,
        cartItems: [...payload.list],
        cartItemsFetchStatus: payload.fetchStatus
      };

    case CART.DELIVERY_METHOD_CHOOSEN:
      return {
        ...state,
        cart: {
          ...state.cart,
          delivery_method: payload
        }
      };

    case CART.DELIVERY_ADDRESS_CHOOSEN:
      return {
        ...state,
        cart: {
          ...state.cart,
          customer_address_id: payload
        }
      };

    case CART.DELIVERY_ROUTE_CHOOSEN:
      return {
        ...state,
        cart: {
          ...state.cart,
          delivery_firm_id: payload.delivery_firm_id,
          delivery_route_id: payload.delivery_route_id,
        },
        cartItems: [...state.cartItems.map(i=> ({
          ...i,
          delivery_duration_id: payload.delivery_duration_id,
          delivery_weight_id: payload.delivery_weights.find(x=> x.product_variant_id === i.product_variant.id).delivery_weight_id
        }))]
      };

    default:
      return state;
  }
}



