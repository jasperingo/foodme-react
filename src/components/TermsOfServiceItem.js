
import React from 'react';

export default function TermsOfServiceItem({ heading, body }) {
  return (
    <div className="mb-5">
      <dt className="font-bold text-xl mb-2 text-yellow-500 border-b border-yellow-500">
        <h4>{ heading }</h4>
      </dt>
      <dd>
        { 
          body.map((item, index)=> {
            
            if (Array.isArray(item)) {
              return (
                <ol key={index} className="list-decimal pl-4 py-4">
                  { item.map((i, k)=> <li key={k} className="mb-2"> { i } </li>) }
                </ol>
              );
            }

            if (typeof item  === 'object' && item.head) {
              return <h5 key={index} className="pt-2 font-bold">{ item.head }</h5>;
            }

            return <p key={index} className="py-2"> { item } </p>
          }) 
        }
      </dd>
    </div>
  );
}
