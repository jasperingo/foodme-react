
import React from 'react';
import AdminApp from '../../apps/AdminApp';
import StoreForm from '../../components/StoreForm';

export default function StoreAdd() {

  return (
    <section>
      <div className="container-x">
        <StoreForm type={StoreForm.ADD} store={{ photo: 'default.jpeg' }} appType={AdminApp.TYPE} />
      </div>
    </section>
  );
}
