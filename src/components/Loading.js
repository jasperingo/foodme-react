
import React from 'react';

export default function Loading() {
  return (
    <div className="flex py-5 items-center gap-2 justify-center">
      <span className="flex h-5 w-5 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
        <span className="inline-flex rounded-full h-5 w-5 bg-yellow-500"></span>
      </span>
      <span className="flex h-7 w-7 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
        <span className="inline-flex rounded-full h-7 w-7 bg-yellow-500"></span>
      </span>
      <span className="flex h-5 w-5 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
        <span className="inline-flex rounded-full h-5 w-5 bg-yellow-500"></span>
      </span>
    </div>
  );
}

