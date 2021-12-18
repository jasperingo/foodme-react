
import React from 'react';
import CategoryForm from '../../components/CategoryForm';

export default function CategoryAdd() {

  return (
    <section>
      <div className="container-x">
        <CategoryForm type={CategoryForm.ADD} category={{ photo: 'store-cat.jpg' }} />
      </div>
    </section>
  );
}
