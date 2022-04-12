
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import DeleteForm from '../../components/form/DeleteForm';
import DiscountForm from '../../components/form/DiscountForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useDiscountDelete } from '../../hooks/discount/discountDeleteHook';
import { useDiscountFetch } from '../../hooks/discount/discountFetchHook';
import { useDiscountUpdate } from '../../hooks/discount/discountUpdateHook';
import { useHeader } from '../../hooks/headerHook';

export default function DiscountUpdate() {

  const { ID } = useParams();

  const history = useHistory();

  const {
    store: { 
      store: {
        storeToken
      }
    }
  } = useAppContext();

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
    headerTitle: '_discount.Edit_discount',
  });
  
  const [
    onSubmit, 
    loading, 
    formError, 
    formSuccess, 
    titleError, 
    typeError, 
    valueError,
    minQtyError, 
    minAmountError, 
    startDateError, 
    endDateError,
  ] = useDiscountUpdate();

  const [
    onDeleteSubmit, 
    deleteLoading, 
    deleteFormSuccess, 
    deleteFormError
  ] = useDiscountDelete();

  useEffect(
    function() {
      if ((discount !== null || discountError !== null) && discountID !== ID) 
        unfetchDiscount();
      else if (discount === null && discountError === null)
        fetchDiscount(ID);
    },
    [ID, discount, discountError, discountID, fetchDiscount, unfetchDiscount]
  );

  useEffect(
    function() {
      if (deleteFormSuccess !== null) history.push('/discounts');
    }, 
    [deleteFormSuccess, history]
  );
  
  return (
    <section>
      <div className="container-x">
        {
          discount !== null && 
          <>
            <DiscountForm
              discount={discount} 
              onSubmit={onSubmit}
              dialog={loading}
              formError={formError}
              formSuccess={formSuccess}
              titleError={titleError}
              typeError={typeError}
              valueError={valueError}
              minQtyError={minQtyError}
              minAmountError={minAmountError}
              startDateError={startDateError}
              endDateError={endDateError}
              />

            <DeleteForm 
              confirmMessage="_discount._discount_delete_confirm"
              onSubmit={onDeleteSubmit} 
              dialog={deleteLoading}
              formSuccess={deleteFormSuccess}
              formError={deleteFormError}
              />
          </>
        }

        { discountLoading && <Loading /> }
        { discountError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        { discountError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        { discountError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchDiscount(ID)} /> }
        { discountError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchDiscount(ID)} /> }
      
      </div>
    </section>
  );
}
