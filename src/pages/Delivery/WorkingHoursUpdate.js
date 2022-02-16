
import React from 'react';
import WorkingHoursForm from '../../components/form/WorkingHoursForm';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmWorkingHoursUpdate } from '../../hooks/delivery_firm/deliveryFirmWorkingHoursUpdateHook';
import { useHeader } from '../../hooks/headerHook';

export default function WorkingHoursUpdate() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm
      }
    } 
  } = useAppContext();

  useHeader({
    title: `${deliveryFirm.user.name ?? 'Loading...'} - Working Hours`,
    headerTitle: '_user.Edit_working_hours'
  });

  const [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess
  ] = useDeliveryFirmWorkingHoursUpdate();

  return (
    <section>
      <div className="container-x">
        <WorkingHoursForm 
          workingHours={deliveryFirm.user.working_hours} 
          onSubmit={onSubmit} 
          dialog={dialog}
          formError={formError}
          formSuccess={formSuccess}
          />
      </div>
    </section>
  );
}
