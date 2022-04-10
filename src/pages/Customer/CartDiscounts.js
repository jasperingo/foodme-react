
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import EmptyList from '../../components/EmptyList';
import SingleList from '../../components/list/SingleList';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { CART } from '../../context/actions/cartActions';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useOrderDiscountSuggest } from '../../hooks/order/orderDiscountSuggestHook';
import { useMoneyFormatter } from '../../hooks/viewHook';
import Discount from '../../models/Discount';

function DiscountChooser({ discount, selected, onSelect, onDeselect }) {

  const { t } = useTranslation();

  const moneyFormat = useMoneyFormatter();

  return (
    <li className="mb-2">
      <div className="flex gap-2 items-center">
        <div>{ discount.title }</div>
        <div className="text-sm p-1 flex gap-2 items-center">
          <span className="font-bold">{ discount.type === Discount.TYPE_AMOUNT ? moneyFormat(discount.value) : `${discount.value}%`}</span>
          <span className="bg-color-gray px-2 rounded-full"> { t('_extra.Off') }</span>
        </div>
        {
          selected ?
          <button onClick={onDeselect} className="btn-color-red px-2 rounded">{ t('_extra.Deselect') }</button>
          :
          <button onClick={onSelect} className="btn-color-primary px-2 rounded">{ t('_extra.Select') }</button>
        }
      </div>
    </li>
  );
}

function ProductWithDiscount({ item, selectedDiscount, onSelect, onDeselect }) {

  const { 
    cart: {
      cart: {
        cartItems
      } 
    }
  } = useAppContext();

  const moneyFormat = useMoneyFormatter();

  const { product_variant: { product } } = cartItems.find(i=> i.product_variant.product.id === item.id);

  const variantIds = item.product_variants.map(i=> i.id);

  const itemsByVariants = cartItems.filter(i=> variantIds.indexOf(i.product_variant.id) > -1);

  function selectDiscount(discountProduct) {
    let discountAmount = 0;

    if (discountProduct.discount.type === Discount.TYPE_AMOUNT) {
      discountAmount = discountProduct.discount.value;
    } else {
      const total = itemsByVariants.reduce((prev, curr)=> prev + (curr.product_variant.price * curr.quantity), 0);
      discountAmount = Number(((discountProduct.discount.value / 100) * total).toFixed(2));
    }

    onSelect(product.id, discountProduct.id, discountAmount);
  }

  return (
    <li>
      <div className="mt-2 mb-5 md:p-2 md:shadow md:rounded">
        <div className="flex gap-2 items-center mb-1">
          <img 
            src={product.photo.href}
            alt="jack"
            className="w-12 h-12 border rounded block" 
            />
          <div className="flex-grow">{ product.title }</div>
        </div>
        <ul className="mb-2 border-b">
          {
            itemsByVariants.map(({ product_variant, quantity })=> (
              <li key={`product-variant-${product_variant.id}`}>
                <div className="mb-1 flex gap-2 items-center py-1">
                  <span className="text-color-primary font-bold">{ product_variant.name } </span>
                  <span className="text-xs bg-color-gray py-1 px-2 rounded-full">QTY:{ quantity }</span>
                  <span className="text-xs bg-color-gray py-1 px-2 rounded-full">{ moneyFormat(product_variant.price * quantity) }</span>
                </div>
              </li>
            ))
          }
        </ul>
        <ul>
          {
            item.discount_products.map(i=> (
              <DiscountChooser 
                key={`discount-product-${i.id}`} 
                discount={i.discount} 
                onSelect={()=> selectDiscount(i)}
                onDeselect={()=> onDeselect(product.id)}
                selected={selectedDiscount !== undefined && selectedDiscount.discount_product_id === i.id}
                />
            ))
          }
          {
            item.discount_products.length === 0 &&
            <EmptyList text="_empty.No_discount" />
          }
        </ul>
      </div>
    </li>
  );
}

export default function CartDiscounts() {

  useHeader({ 
    title: `Discount offers (Cart) - Dailyneeds`,
    headerTitle: '_discount.Discount_offers',
    topNavPaths: ['/cart']
  });

  const { 
    cart: {
      cartDispatch,
      cart: {
        cartItems
      } 
    }
  } = useAppContext();

  const history = useHistory();

  const { t } = useTranslation();

  const [fetchDiscountSugggestions, data, isLoading, error, isLoaded] = useOrderDiscountSuggest();
  
  const [discounts, setDiscounts] = useState([]);

  useEffect(
    function() {
      if (!isLoaded && error === null && cartItems.length > 0) 
        fetchDiscountSugggestions();
    }, 
    [isLoaded, error, fetchDiscountSugggestions, cartItems.length]
  );

  function onDiscountSelected(productId, discountProductId, discountAmount) {
    const value = { product_id: productId, discount_product_id: discountProductId, discount_amount: discountAmount };
    const index = discounts.findIndex(i=> i.product_id === productId);
    if (index > -1) {
      setDiscounts(discounts.map(i=> i.product_id === productId ? value: i));
    } else {
      setDiscounts([...discounts, value]);
    }
  }
  
  function onDiscountDeselected(productId) {
    setDiscounts(discounts.filter(i=> i.product_id !== productId));
  }

  function onContinueClicked() {
    cartDispatch({
      type: CART.DISCOUNT_CHOOSEN,
      payload: discounts
    });
    
    history.push('/cart/summary');
  }
  
  if (cartItems.length === 0) {
    return <Redirect to="/" />
  }
  
  return (
    <section>

      <div className="container-x">

        <SingleList
          data={data}
          className="list-2-x"
          renderDataItem={(item)=> (
            <ProductWithDiscount 
              key={`dicount-product-${item.id}`} 
              item={item} 
              onSelect={onDiscountSelected}
              onDeselect={onDiscountDeselected}
              selectedDiscount={discounts.find(i=> i.product_id === item.id)}
              />
          )}
          footer={
            (isLoading && <li key="discounts-footer" className="list-2-x-col-span"> <Loading /> </li>) ||
            (error && <li key="discounts-footer" className="list-2-x-col-span"> <Reload message={error} action={fetchDiscountSugggestions} /> </li>) || 
            (
              isLoaded && 
              <li 
                key="discounts-footer"
                onClick={onContinueClicked}
                className="list-2-x-col-span btn-color-primary p-2 rounded text-center"
                > 
                <button>{ t('_extra.Continue') }</button> 
              </li>
            )
          }
          />

      </div>

    </section>
  );
}
