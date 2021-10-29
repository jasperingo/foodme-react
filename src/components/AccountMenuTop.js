
import React from 'react';

export default function AccountMenuTop({ photo, name }) {
  return (
    <div className="py-5">
      <img 
        alt={name} 
        width="100" 
        height="100" 
        src={`/photos/${photo}`}
        className="w-20 h-20 rounded-full mx-auto my-2 border"
        />
      <div className="text-center font-bold text-lg">{ name }</div>
    </div>
  );
}

