
import React from 'react';

export default function Dialog({ children }) {
  return (
    <div className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-25 dark:bg-white">
      <div className="w-3/4 bg-color rounded md:w-1/2 lg:w-1/3">
        { children }
      </div>
    </div>
  );
}
