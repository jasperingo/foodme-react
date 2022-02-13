
import React from 'react';
import { useTranslation } from 'react-i18next';
import { productIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Forbidden from '../../components/Forbidden';
import FormMessage from '../../components/form/FormMessage';
import ScrollList from '../../components/list/ScrollList';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDiscountFetch } from '../../hooks/discount/discountFetchHook';
import { useDiscountProductCreate } from '../../hooks/discount/discountProductCreateHook';
import { useDiscountProductDelete } from '../../hooks/discount/discountProductDeleteHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreProductWithDiscountList } from '../../hooks/store/storeProductWithDiscountListHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter, useRenderOnDataFetched } from '../../hooks/viewHook';

function ChooseDiscountProductItem(
  {
    product: {
      id,
      photo,
      title,
      discount_products
    }
  }
) {
  
  const { t } = useTranslation();

  const [
    onAddSubmit, 
    addDialog, 
    addFormError, 
  ] = useDiscountProductCreate();

  const [
    onDeleteSubmit, 
    deleteDialog, 
    deleteFormError, 
  ] = useDiscountProductDelete();

  return (
    <li>
      <div className="flex gap-2 md:shadow">
        <img 
          width="200"
          height="200"
          alt={title} 
          src={photo.href} 
          className="w-24 h-24 border rounded block"
          />
        <div className="flex-grow pr-2">
          <div className="font-bold mb-1">{ title }</div>
          <div className="mb-1">
            {
              discount_products.length === 0 ?
              <button 
                onClick={()=> onAddSubmit(id)} 
                className="btn-color-primary px-2 py-1 rounded"
                >
                { t('_discount.Add_to_discount') }
              </button>
              :
              <button 
                onClick={()=> onDeleteSubmit(discount_products[0].id)}
                className="btn-color-red px-2 py-1 rounded"
                >
                { t('_discount.Remove_from_discount') }
              </button>
            }
          </div>

          { (addDialog || deleteDialog) && <Loading /> }

          <FormMessage error={addFormError} />

          <FormMessage error={deleteFormError} />
        </div>
      </div>
    </li>
  );
}

function DiscountProductList({ userToken }) {

  const [
    products, 
    productsFetchStatus, 
    productsPage, 
    productsNumberOfPages, 
    refetch, 
    refresh
  ] = useStoreProductWithDiscountList(userToken);

  return (
    <ScrollList
      data={products}
      nextPage={refetch}
      refreshPage={refresh}
      hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
      className="list-3-x"
      renderDataItem={(item)=> (
        <ChooseDiscountProductItem 
          key={`discount-product-${item.id}`} 
          product={item} 
          />
      )}
      footer={useRenderListFooter(
        productsFetchStatus,
        ()=> <li key="discount-product-footer"> <Loading /> </li>, 
        ()=> <li key="discount-product-footer"> <Reload action={refetch} /> </li>,
        ()=> <li key="discount-product-footer"> <EmptyList text="_empty.No_product" icon={productIcon} /> </li>,
        ()=> <li key="discount-product-footer"> <FetchMoreButton action={refetch} /> </li>,
        ()=> <li key="discount-product-footer"> <NotFound /> </li>,
        ()=> <li key="discount-product-footer"> <Forbidden /> </li>,
      )}
      />
  );
}

export default function DiscountProductCreate() {

  const {
    store: { 
      store: {
        storeToken
      }
    } 
  } = useAppContext();

  const [
    discount, 
    discountFetchStatus, 
    refetch
  ] = useDiscountFetch(storeToken);

  useHeader({ 
    title: `${discount?.title ?? 'Loading...'} - Discount`,
    headerTitle: "_discount.Edit_discount_product"
  });

  return (
    <section>
      <div className="container-x">
      {
        useRenderOnDataFetched(
          discountFetchStatus,
          ()=> <DiscountProductList userToken={storeToken} />,
          ()=> <Loading />,
          ()=> <Reload action={refetch} />,
          ()=> <NotFound />,
          ()=> <Forbidden />,
        )
      }
      </div>
    </section>
  );
}
