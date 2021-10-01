
import React from 'react';
import { Link } from 'react-router-dom';
import LocationIcon from '../icons/LocationIcon';
import ReviewIcon from '../icons/ReviewIcon';

export default function ResturantItem({ photo, name, location, ratings }) {
  return (
    <li className="bg-white">
      <Link to="/" className="flex mb-5 hover:bg-gray-100 md:block">
        <img src={ "/photos/"+photo } alt="Resturant logo" className="w-20 h-20 border md:w-full md:h-full" />
        <div className="flex-grow pl-2 lg:pt-2">
          <h4 className="font-bold mb-1">{ name }</h4>
          <div className="text-gray-500 mb-1 flex">
            <LocationIcon classList="fill-current inline-block" />
            <span className="inline-block">{ location }</span>
          </div>
          <div>
            <ReviewIcon small={true}classList="inline-block fill-current text-red-500 w-5 h-5" />
            <span className="inline-block align-middle text-xs">{ ratings }</span>
          </div>
        </div>
      </Link>
    </li>
  );
}


