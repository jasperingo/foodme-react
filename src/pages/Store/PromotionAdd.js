
import React from 'react';
import PromotionForm from '../../components/PromotionForm';

export default function PromotionAdd() {

  const promotion = {};

  return (
    <section className="flex-grow">
      <div className="container-x">
        <PromotionForm promotion={promotion} />
      </div>
    </section>
  );
}

