
import React from 'react';
import WorkingHoursForm from '../../components/form/WorkingHoursForm';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreWorkingHoursUpdate } from '../../hooks/store/storeWorkingHoursUpdateHook';

export default function WorkingHoursUpdate() {

  const { 
    store: { 
      store: {
        store
      } 
    } 
  } = useAppContext();

  useHeader({
    title: `${store.user.name ?? 'Loading...'} - Working Hours`,
    headerTitle: '_user.Edit_working_hours'
  });

  const [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess
  ] = useStoreWorkingHoursUpdate();

  return (
    <section>
      <div className="container-x">
        <WorkingHoursForm 
          workingHours={store.user.working_hours} 
          onSubmit={onSubmit} 
          dialog={dialog}
          formError={formError}
          formSuccess={formSuccess}
          />
      </div>
    </section>
  );
}
