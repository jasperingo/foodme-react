
import React from 'react'
import SubCategoryForm from '../../components/SubCategoryForm';

export default function SubCategoryAdd() {

  return (
    <section>
      <div className="container-x">
        <SubCategoryForm type={SubCategoryForm.ADD} category={{ photo: 'store-cat.jpg' }} />
      </div>
    </section>
  );
}
