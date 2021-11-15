
import React from 'react'
import { useMoneyFormat } from '../context/AppHooks';

export default function OrderItemItem({ item: { quantity, amount, delivery_fee, product: { photo, title } } }) {

  return (
    <li>
      <div className="mb-5 md:shadow">
        <div className="flex">
          <img 
            src={`/photos/products/${photo}`} 
            alt={'ja'} 
            className="w-20 h-20 border rounded block md:w-40 md:h-40" 
            />
          <div className="flex-grow pl-2">
            <h4 className="mb-1">{ title }</h4>
            <div className="font-bold mb-1">{ useMoneyFormat(amount) }</div>
            <div className="mb-1">
              <span>QTY: </span> 
              <span>{ quantity }</span>
            </div>
            <div className="text-sm text-blue-500">
              <span>Delivery: </span>
              <span className="">{ useMoneyFormat(delivery_fee) }</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

