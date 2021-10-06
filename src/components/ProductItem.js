
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export default function ProductItem({ prod }) {

  let match = useRouteMatch();

  return (
    <li>
      <Link to={`${match.url}/product/${prod.id}`} className="flex mb-5 hover:bg-color-gray-h md:block">
        <img 
          src={`/photos/products/${prod.photo}`} 
          alt={prod.title} 
          className="w-20 h-20 border md:w-full md:h-40" 
          />
        <div className="flex-grow pl-2 lg:pt-2">
          <h4 className="font-bold mb-1">{ prod.title }</h4>
          <div className="text-color-gray text-sm mb-1">{ prod.sub_title }</div>
          <div className="font-bold">&#8358; { prod.price }</div>
        </div>
      </Link>
    </li>
  );
}


