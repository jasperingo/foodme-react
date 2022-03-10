
import React from 'react';
import { editIcon, productIcon } from '../../assets/icons';
import { useDiscountProductList } from '../../hooks/discount/discountProductListHook';
import { useDateFormat, useHasMoreToFetchViaScroll, useMoneyFormat, useRenderListFooter } from '../../hooks/viewHook';
import Discount from '../../models/Discount';
import AddButton from '../AddButton';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import Forbidden from '../Forbidden';
import H4Heading from '../H4Heading';
import ScrollList from '../list/ScrollList';
import ProductItem from '../list_item/ProductItem';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Reload from '../Reload';
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
    products, 
    productsFetchStatus, 
    productsPage, 
    productsNumberOfPages, 
    refetch, 
    refresh
  ] = useDiscountProductList(userToken);
  
  const amount = useMoneyFormat(value);

  const data = [
    {
      title: '_discount.Discount_value',
      body: type === Discount.TYPE_AMOUNT ? amount : `${value}%`
    },
    {
      title: '_discount.Start_date',
      body: useDateFormat(start_date)
    },
    {
      title: '_discount.End_date',
      body: useDateFormat(end_date)
    }
  ];

  const miniAmount = useMoneyFormat(minimium_required_amount ?? 0);

  if (minimium_required_amount) {
    data.push({
      title: '_discount.Minimium_required_amount',
      body: miniAmount
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

        </div>
      </div>
      
      <div className="py-2 border-b">
      
        <div className="container-x">

          <H4Heading color="text-color-gray" text="_product.Products" />

          <AddButton text="_product.Edit_product" href={`/discount/${id}/discount-product/create`} />
          
          <ScrollList
            data={products}
            nextPage={refetch}
            refreshPage={refresh}
            hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
            className="list-x"
            renderDataItem={(item)=> (
              <li key={`discount-product-${item.id}`}> <ProductItem product={item.product} /> </li>
            )}
            footer={useRenderListFooter(
              productsFetchStatus,
              ()=> <li key="discount-product-footer" className="list-x-col-span"> <Loading /> </li>, 
              ()=> <li key="discount-product-footer" className="list-x-col-span"> <Reload action={refetch} /> </li>,
              ()=> <li key="discount-product-footer" className="list-x-col-span"> <EmptyList text="_empty.No_product" icon={productIcon} /> </li>,
              ()=> <li key="discount-product-footer" className="list-x-col-span"> <FetchMoreButton action={refetch} /> </li>,
              ()=> <li key="discount-product-footer" className="list-x-col-span"> <NotFound /> </li>,
              ()=> <li key="discount-product-footer" className="list-x-col-span"> <Forbidden /> </li>,
            )}
            />

        </div>

      </div>
    </>
  );
}
