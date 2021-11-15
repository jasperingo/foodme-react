
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CartCodeForm() {

  const { t } = useTranslation();

  return (
    <div className="container-x">
      <form className="py-3 flex gap-2" onSubmit={(e)=> e.preventDefault()}>
        <input 
          type="text" 
          placeholder={ t('_cart.Enter_cart_code')}
          className="p-2 flex-grow rounded outline-none border border-yellow-500 bg-color" 
          />
        <button className="p-2 rounded btn-color-primary">{ t('_search.Search') }</button>
      </form>
    </div>
  )
}
