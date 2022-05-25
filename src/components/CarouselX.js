import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
import { nextIcon, prevIcon } from '../assets/icons';

export default function CarouselX({ items }) {
  
  const INTERVAL = 5000;

  const [navUsed, setNavUsed] = useState(false);

  const [current, setCurrent] = useState(0);

  function navNext() {
    setNavUsed(true);
    setCurrent(c=> c+1 >= items.length ? 0 : c+1);
  }

  function navPrev() {
    setNavUsed(true);
    setCurrent(c=> c-1 < 0 ? (items.length-1) : c-1);
  }

  useEffect(
    function() {

      let timeoutHandler = null;

      function changeCurrent() {

        if (!navUsed) setCurrent(c=> c+1 >= items.length ? 0 : c+1);
    
        setNavUsed(false);
    
        timeoutHandler = setTimeout(changeCurrent, INTERVAL);
      }
      
      timeoutHandler = setTimeout(changeCurrent, INTERVAL);

      return function() {
        clearTimeout(timeoutHandler)
      }

    }, 
    [navUsed, items.length]
  );

  return (
    <div className="my-4 relative h-52 overflow-x-hidden md:h-96">

      <div className="w-full flex justify-between absolute top-1/2 z-20 text-white">
        <button onClick={navPrev}>
          <Icon path={prevIcon} className="w-8 h-8" />
        </button>
        <button onClick={navNext}>
          <Icon path={nextIcon} className="w-8 h-8" />
        </button>
      </div>

      {
        items.map((item, i)=> (
          <div 
            key={`promotion-${item.id}`} 
            className={`w-full transition-all absolute top-0 ${i !== current ? '-right-full' : 'right-0'}`}
            >
            
            <img
              className="block w-full h-52 rounded filter brightness-75 md:h-96"
              src={item.photo.href}
              alt={item.title}
            />

            <p className="absolute z-10 bottom-0 text-center w-full p-4 text-white font-bold text-3xl my-4">{ item.title }</p>
            
          </div>
        ))
      }
    </div>
  );
}
