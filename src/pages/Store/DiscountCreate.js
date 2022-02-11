
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DiscountForm from '../../components/form/DiscountForm';
import { useDiscountCreate } from '../../hooks/discount/discountCreateHook';
import { useHeader } from '../../hooks/headerHook';

export default function DiscountCreate() {

  useHeader({ 
    title: `Create Discount - DailyNeeds`,
    headerTitle: '_discount.Add_discount'
  });

  const [
    onSubmit, 
    id, 
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
  ] = useDiscountCreate();

  const history = useHistory();
  
  useEffect(
    ()=> {
      if (id) {
        history.push(`/discount/${id}`);
      }
    }, 
    [id, history]
  );

  return (
    <section>
      <div className="container-x">
        <DiscountForm 
          discount={{}}
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
      </div>
    </section>
  );
}
