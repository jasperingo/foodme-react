
import Icon from '@mdi/react';
import React from 'react';
import { reviewIcon } from '../../assets/icons';

export default function ReviewStars({ ratings }) {
  
  const stars = [];

  for(let i=0; i<5; i++) {
    if (i < ratings) 
      stars.push(<Icon path={reviewIcon} key={i} className="w-4 h-4 text-yellow-500" />);
    else 
      stars.push(<Icon path={reviewIcon} key={i} className="w-4 h-4 text-gray-500" />);
  }

  return <div className="flex flex-grow">{ stars }</div>;
}

