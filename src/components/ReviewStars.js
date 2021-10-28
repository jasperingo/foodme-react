
import React from 'react';
import StarIcon from '../icons/StarIcon';

export default function ReviewStars({ ratings }) {
  
  const stars = [];

  for(let i=0; i<5; i++) {
    if (i < ratings) 
      stars.push(<StarIcon key={i} classList="w-4 h-4 text-yellow-500 fill-current" />);
    else 
      stars.push(<StarIcon key={i} classList="w-4 h-4 text-gray-500 fill-current" />);
  }

  return (
    <div className="flex flex-grow">
      { stars }
    </div>
  );
}
