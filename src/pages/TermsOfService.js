
import React from 'react';
//import { useTranslation } from 'react-i18next';


function TermsOfServiceItem({ heading, body }) {
  return (
    <div className="mb-5">
      <dt className="font-bold text-xl mb-2 text-yellow-500 border-b border-yellow-500">{ heading }</dt>
      <dd>{ body }</dd>
    </div>
  );
}

export default function TermsOfService() {

  //const { t } = useTranslation();

  return (
    <section>
      
      <div className="container px-2 mx-auto">
        <dl className="my-5 md:max-w-2xl md:mx-auto">
          <TermsOfServiceItem 
            heading="Mollit culpa nulla aliqua enim" 
            body="Mollit culpa nulla aliqua enim. Ullamco ad id est sunt officia occaecat nisi est nulla.
            Duis exercitation aute non culpa minim velit ea occaecat enim est commodo laborum adipisicing non. 
            Commodo proident qui pariatur nisi esse excepteur ea ullamco ea anim quis. " 
            />

          <TermsOfServiceItem 
            heading="Mollit culpa nulla aliqua enim" 
            body="Mollit culpa nulla aliqua enim. Ullamco ad id est sunt officia occaecat nisi est nulla.
            Duis exercitation aute non culpa minim velit ea occaecat enim est commodo laborum adipisicing non. 
            Commodo proident qui pariatur nisi esse excepteur ea ullamco ea anim quis. " 
            />

          <TermsOfServiceItem 
            heading="Mollit culpa nulla aliqua enim" 
            body="Mollit culpa nulla aliqua enim. Ullamco ad id est sunt officia occaecat nisi est nulla.
            Duis exercitation aute non culpa minim velit ea occaecat enim est commodo laborum adipisicing non. 
            Commodo proident qui pariatur nisi esse excepteur ea ullamco ea anim quis. " 
            />
          
        </dl>
      </div>
      
    </section>
  );
}


