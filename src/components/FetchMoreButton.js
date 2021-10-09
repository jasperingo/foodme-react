
import React from 'react';

export default function FetchMoreButton({ action }) {
  return (
    <div className="my-2 text-center">
      <button className="btn-color-primary p-2 rounded" onClick={action}>Load more</button>
    </div>
  );
}

