
import React from 'react';

export default function StoreIcon({ classList }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" className={`fill-current ${classList}`}>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
    </svg>
  );
}
