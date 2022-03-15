
import React from 'react';
import { Link } from 'react-router-dom';

export default function PromotionItem({ item }) {
  return (
    <li>
      <Link 
        to={`/promotion/${item.id}`} 
        className="border flex gap-2 items-center mb-4 rounded hover:bg-color-gray-h"
        >
        <img 
          width={100}
          height={100}
          alt={item.title}
          src={item.photo.href}
          className="w-24 h-24 rounded-tl rounded-bl"
          />
        <div>
          <div className="font-bold mb-1">{ item.title }</div>
          <div>{ item.link_type }</div>
        </div>
      </Link>
    </li>
  );
}
