
import React from 'react';

export default function StoreProductCategoryItem({ item, onFilterChange }) {

  return (
    <li key={`category-${item.id}`}>
      <button className="block shadow" onClick={()=> onFilterChange(item.id)}>
        <img 
          width="100" 
          height="100" 
          alt={item.name} 
          src={item.photo.href} 
          className="w-full mb-1 h-20 block mx-auto rounded lg:h-52 lg:w-full lg:mb-1"
          />
        <div className="p-1 truncate overflow-ellipsis">{ item.name }</div>
      </button>
    </li>
  );
}
