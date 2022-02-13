
import React from 'react';
import Forbidden from '../../components/Forbidden';
import DiscountDeleteForm from '../../components/form/DiscountDeleteForm';
import DiscountForm from '../../components/form/DiscountForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDiscountDelete } from '../../hooks/discount/discountDeleteHook';
import { useDiscountFetch } from '../../hooks/discount/discountFetchHook';
import { useDiscountUpdate } from '../../hooks/discount/discountUpdateHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function DiscountUpdate() {

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
    headerTitle: '_discount.Edit_discount',
  });
  
  const [
    onSubmit, 
    dialog, 
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
    deleteDialog, 
    deleteFormSuccess, 
    deleteFormError
  ] = useDiscountDelete();

  return (
    <section>
     <div className="container-x">
        {
          useRenderOnDataFetched(
            discountFetchStatus,
            ()=> (
              <>
                <DiscountForm
                  discount={discount} 
                  onSubmit={onSubmit}
                  dialog={dialog}
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
                
                <DiscountDeleteForm 
                  onSubmit={onDeleteSubmit}
                  dialog={deleteDialog}
                  formError={deleteFormError}
                  formSuccess={deleteFormSuccess}
                  />
              </>
            ),
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
