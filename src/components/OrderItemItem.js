
import React from 'react'
import { useMoneyFormat } from '../context/AppHooks';

export default function OrderItemItem({ item: { quantity, amount, delivery_fee, product: { photo, title } } }) {

  return (
    <li>
      <div className="mb-5 md:shadow">
        <div className="flex">
          <img 
            src={`/photos/products/${photo}`} 
            alt={title} 
            className="w-20 h-20 border rounded block md:w-32 md:h-32" 
            />
          <div className="flex-grow pl-2">
            <div className="mb-1">{ title }</div>
            <div className="text-color-primary font-bold mb-1">{ useMoneyFormat(amount) }</div>
            <div>
              <span>QTY: </span> 
              <span>{ quantity }</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

