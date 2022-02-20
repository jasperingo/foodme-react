
export function useSavedCartItemsToCartItems()  {

  return (saved_cart_items)=> {
    
    const cartItems = [];
    let itemsUnavailable = 0;

    for (let item of saved_cart_items) {

      if (
        !item.product_variant.available || 
        item.product_variant.quantity < item.quantity || 
        item.product_variant.quantity === 0
      ) {
        itemsUnavailable++;
        continue;
      }

      cartItems.push({
        quantity: item.quantity,
        product_variant: item.product_variant,
        amount: (item.product_variant.price * item.quantity),
        product: item.product_variant.product
      });
    }

    return [cartItems, itemsUnavailable];
  }
}