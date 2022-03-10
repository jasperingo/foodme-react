import { CART } from "../actions/cartActions";
import cartState from "../states/cartState";

export default function CartReducer (state, { type, payload }) {
  
  switch (type) {  

    case CART.EMPTIED:
      return cartState;
    
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
      delete state.cart.customer_address_id;
      delete state.cart.delivery_total;
      delete state.cart.delivery_firm_id;
      delete state.cart.delivery_route_id;
      return {
        ...state,
        cart: {
          ...state.cart,
          delivery_method: payload
        },
        cartItems: [...state.cartItems.map(i=> {
          delete i.delivery_duration_id;
          delete i.delivery_weight_id;
          return i;
        })]
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
          delivery_total: payload.delivery_total,
          delivery_firm_id: payload.delivery_firm_id,
          delivery_route_id: payload.delivery_route_id,
        },
        cartItems: [...state.cartItems.map(i=> ({
          ...i,
          delivery_duration_id: payload.delivery_duration_id,
          delivery_weight_id: payload.delivery_weights.find(x=> x.product_variant_id === i.product_variant.id).delivery_weight_id
        }))]
      };

    case CART.DISCOUNT_CHOOSEN:
      return {
        ...state,
        cart: {
          ...state.cart,
          discount_total: payload.reduce((p, c)=> p + c.discount_amount, 0),
        },
        cartItems: [...state.cartItems.map(i=> {
          const val = payload.find(x=> x.product_id === i.product_variant.product.id);
          if (val !== undefined) {
            return { ...i, discount_product_id: val.discount_product_id };
          } else {
            delete i.discount_product_id;
            return i;
          }
        })]
      };

    default:
      return state;
  }
}

