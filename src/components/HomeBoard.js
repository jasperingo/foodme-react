
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function HomeBoard({ text, links }) {

  const { t } = useTranslation();

  return (
    <div className="my-2 rounded relative bg-color-primary py-12 px-4">
      <div className="text-inverse-color mb-8 font-bold text-3xl md:text-5xl">{ text }</div>
      <ul className="flex items-center gap-4">
        {
          links.map(i=> (
            <li>
              <Link 
                to={i.href} 
                className="text-color-primary bg-white py-3 p-4 rounded dark:bg-gray-800 font-bold dark:text-white hover:bg-color-gray-h"
                >
                { t(i.text) }
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
