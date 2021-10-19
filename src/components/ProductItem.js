
import React from 'react';
import { Link } from 'react-router-dom';
import { useMoneyFormat } from '../context/AppHooks';

export default function ProductItem({ prod }) {

  return (
    <Link to={`/store/${prod.store.id}/product/${prod.id}`} className="flex mb-5 hover:bg-color-gray-h md:block">
      <img 
        src={`/photos/products/${prod.photo}`} 
        alt={prod.title} 
        className="w-20 h-20 border rounded block md:w-full md:h-40" 
        />
      <div className="flex-grow pl-2 lg:pt-2">
        <h4 className="mb-1">{ prod.title }</h4>
        <div className="text-color-gray text-sm mb-1">{ prod.sub_title }</div>
        <div className="font-bold">{ useMoneyFormat(prod.price) }</div>
      </div>
    </Link>
  );
}


