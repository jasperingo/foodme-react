
import React from 'react';

export default function TermsOfServiceHeader({ title, date }) {
  return (
    <div className="border-b pb-2 my-5 md:max-w-2xl md:mx-auto">
      <h3 className="text-3xl font-bold">{ title }</h3>
      <div className="text-color-gray">{ date }</div>
    </div>
  );
}
