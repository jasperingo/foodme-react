
import React from 'react';
import FormField from '../../components/FormField';

export default function PromotionAdd() {

  function onFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <section>
      <div className="container-x">
        
        <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x">

          <FormField ID="title-input" label="_extra.Title" />

        </form>

      </div>
    </section>
  );
}

