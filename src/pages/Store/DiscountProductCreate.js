
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';

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
      <div className="flex gap-2 mb-4 md:shadow">
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

          <FormMessage error={addFormError || deleteFormError} />
          
        </div>
      </div>
    </li>
  );
}

function DiscountProductList() {

  const {
    store: { 
      store: {
        store,
        storeToken
      }
    },
    discount: {
      discount: {
        discount,
      } 
    }
  } = useAppContext();

  const [
    fetchStoreProducts,
    products, 
    productsLoading,
    productsError,
    productsLoaded,
    productsPage, 
    productsNumberOfPages,
    refreshStoreProducts
  ] = useStoreProductWithDiscountList(storeToken);

  useEffect(
    function() {
      if (!productsLoaded && productsError === null) 
        fetchStoreProducts(store.id, discount.id); 
    },
    [store.id, discount.id, productsError, productsLoaded, fetchStoreProducts]
  );

  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();

  return (
    <ScrollList
      data={products}
      refreshPage={refreshStoreProducts}
      nextPage={()=> fetchStoreProducts(store.id, discount.id)}
      hasMore={loadOnScroll(productsPage, productsNumberOfPages, productsError)}
      className="list-3-x"
      renderDataItem={(item)=> (
        <ChooseDiscountProductItem 
          key={`discount-product-${item.id}`} 
          product={item} 
          />
      )}
      footer={listFooter([
        
        { 
          canRender: productsLoading, 
          render() { 
            return <li key="discount-product-footer" className="list-3-x-col-span"> <Loading /> </li>;
          }
        },

        { 
          canRender: productsError === NetworkErrorCodes.UNKNOWN_ERROR, 
          render() { 
            return <li key="discount-product-footer" className="list-3-x-col-span"> <Reload action={()=> fetchStoreProducts(store.id, discount.id)} /> </li>;
          }
        },

        { 
          canRender: productsLoaded && products.length === 0, 
          render() { 
            return <li key="discount-product-footer" className="list-3-x-col-span"> <EmptyList text="_empty.No_product" icon={productIcon} /> </li>;
          }
        },

        { 
          canRender: productsPage <= productsNumberOfPages, 
          render() { 
            return <li key="discount-product-footer" className="list-3-x-col-span"> <FetchMoreButton action={()=> fetchStoreProducts(store.id, discount.id)} /> </li>;
          }
        },

        { 
          canRender: productsError === NetworkErrorCodes.NOT_FOUND, 
          render() { 
            return <li key="discount-product-footer" className="list-3-x-col-span"> <NotFound /> </li>;
          }
        },

        { 
          canRender: productsError === NetworkErrorCodes.FORBIDDEN, 
          render() { 
            return <li key="discount-product-footer" className="list-3-x-col-span"> <Forbidden /> </li>;
          }
        },

        {
          canRender: productsError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
          render() {
            return (
              <li key="discount-product-footer" className="list-3-x-col-span">
                <Reload message="_errors.No_netowrk_connection" action={()=> fetchStoreProducts(store.id, discount.id)} />
              </li>
            );
          }
        },

      ])}
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

  const { ID } = useParams();

  const [
    fetchDiscount,
    discount,
    discountLoading,
    discountError,
    discountID,
    unfetchDiscount
  ] = useDiscountFetch(storeToken);

  useHeader({ 
    title: `${discount?.title ?? 'Loading...'} - Discount`,
    headerTitle: "_discount.Edit_discount_product"
  });

  useEffect(
    function() {
      if ((discount !== null || discountError !== null) && discountID !== ID) 
        unfetchDiscount();
      else if (discount === null && discountError === null)
        fetchDiscount(ID);
    },
    [ID, discount, discountError, discountID, fetchDiscount, unfetchDiscount]
  );


  return (
    <section>
      <div className="container-x">

        { discount !== null && <DiscountProductList userToken={storeToken} /> }

        { discountLoading && <Loading /> }
        { discountError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        { discountError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        { discountError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchDiscount(ID)} /> }
        { discountError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchDiscount(ID)} /> }

      </div>
    </section>
  );
}
