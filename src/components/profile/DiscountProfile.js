
import React, { useEffect } from 'react';
import { editIcon } from '../../assets/icons';
import { useDiscountProductList } from '../../hooks/discount/discountProductListHook';
import { useDateFormatter, useMoneyFormatter } from '../../hooks/viewHook';
import Discount from '../../models/Discount';
import AddButton from '../AddButton';
import H4Heading from '../H4Heading';
import ProductList from '../list/ProductList';
import UserDescList from '../UserDescList';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';

export default function DiscountProfile(
  { 
    userToken,
    isStore,
    discount: { 
      id,
      title,
      type,
      value,
      minimium_required_amount,
      minimium_required_quantity,
      start_date,
      end_date,
      store
    } 
  }
) {

  const [
    fetchDiscountProducts,
    discountProducts, 
    discountProductsLoading,
    discountProductsLoaded,
    discountProductsError,
    discountProductsPage, 
    discountProductsNumberOfPages,
    refreshDiscountProducts
  ] = useDiscountProductList(userToken);
  
  useEffect(
    function() { 
      if (!discountProductsLoaded && discountProductsError === null) 
        fetchDiscountProducts(id); 
    },
    [id, discountProductsLoaded, discountProductsError, fetchDiscountProducts]
  );

  const dateFormat = useDateFormatter();
  
  const amountFormat = useMoneyFormatter();

  const data = [
    {
      title: '_discount.Discount_value',
      body: type === Discount.TYPE_AMOUNT ? amountFormat(value) : `${value}%`
    },
    {
      title: '_discount.Start_date',
      body: dateFormat(start_date)
    },
    {
      title: '_discount.End_date',
      body: dateFormat(end_date)
    }
  ];

  if (minimium_required_amount) {
    data.push({
      title: '_discount.Minimium_required_amount',
      body: amountFormat(minimium_required_amount ?? 0)
    });
  }

  if (minimium_required_quantity) {
    data.push({
      title: '_discount.Minimium_required_quantity',
      body: minimium_required_quantity
    });
  }
  
  return (
    <>
     <div className="py-2 border-b">
        <div className="container-x">

          <ProfileHeaderText
            text={title}
            links={isStore ? [
              {
                href: `/discount/${id}/update`,
                title: '_extra.Edit',
                icon: editIcon
              }
            ]: 
            []
            }
            />

          <ProfileDetailsText details={data} />

          {
            !isStore && 
            <UserDescList 
              users={[
                {
                  href: isStore ? '/profile' : `/store/${store.id}`,
                  photo: store.user.photo.href,
                  name: store.user.name,
                  title: '_store.Store'
                }
              ]} 
              />
          }

        </div>
      </div>
      
      <div className="py-2">
      
        <div className="container-x">

          <H4Heading color="text-color-gray" text="_product.Products" />

          <AddButton text="_product.Edit_products" href={`/discount/${id}/discount-product/create`} />
          
        </div>

        <ProductList
          single={false}  
          products={discountProducts.map(i=> i.product)} 
          productsLoading={discountProductsLoading} 
          productsLoaded={discountProductsLoaded} 
          productsError={discountProductsError} 
          productsPage={discountProductsPage} 
          productsNumberOfPages={discountProductsNumberOfPages} 
          fetchProducts={()=> fetchDiscountProducts(id)} 
          refreshList={refreshDiscountProducts}
          />
      </div>
    </>
  );
}
