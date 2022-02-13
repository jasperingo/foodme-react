
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function CartCodeForm() {

  const { t } = useTranslation();

  // const { 
  //   cartDispatch
  // } = useAppContext();

  const input = useRef(null);

  //const [dialog, setDialog] = useState(null);


  function onFormSubmit(e) {
    e.preventDefault();
    alert("Loading... "+input.current.value);
    
  }

  return (
    <div className="container-x">
      <form className="py-3 flex gap-2" action="" method="GET" onSubmit={onFormSubmit} noValidate>
        <label className="sr-only">{ t('_cart.Enter_cart_code')}</label>
        <input 
          ref={ input }
          type="text" 
          required={true}
          placeholder={ t('_cart.Enter_cart_code')}
          className="p-2 flex-grow rounded outline-none border border-yellow-500 bg-color" 
          />
        <button className="p-2 rounded btn-color-primary">{ t('_search.Search') }</button>
      </form>
      {/* { dialog && <AlertDialog dialog={dialog} /> } */}
    </div>
  );
}
