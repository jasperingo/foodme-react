
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWorkingHoursDay } from '../../hooks/viewHook';
import WorkingHour from '../../models/WorkingHour';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';

function WorkingHourField({ ID, day, openingHour, closingHour, onUpdate, onRemove }) {

  const { t } = useTranslation();

  const workingDay = useWorkingHoursDay();

  const [error, setError] = useState(null);

  const [opening, setOpening] = useState(openingHour ?? '');

  const [closing, setClosing] = useState(closingHour ?? '');

  function onUpdateClicked() {

    setError(null);

    if (day && closing && opening) {

      const d1 = new Date('01/01/2022 '+opening);
      const d2 = new Date('01/01/2022 '+closing);

      if (d1.getTime() >= d2.getTime()) {
        setError('_errors.This_field_is_invalid');
      } else {
        const data = { day, opening, closing };
        onUpdate(data);
      }

    } else {
      setError('_errors.This_field_is_invalid');
    }
  }

  function onDeleteClicked() {
    if (openingHour && closingHour) {
      setClosing('');
      setOpening('');
      onRemove(day);
    }
  }

  return (
    <div className="mb-4">

      <div className="flex gap-2 items-center mb-1">
          <label htmlFor={ID} className="font-bold">{ t(workingDay(day)) }</label>
      </div>

      <div className="text-red-500 text-sm">{ t(error) }</div>
      
      <div className="mb-1">
        <label className="text-sm block mb-1">{ t('_extra.Opening') }</label>
        <input 
          type="time" 
          value={opening} 
          className="w-full border border-yellow-500 p-2 rounded bg-color" 
          onChange={(e)=> setOpening(e.target.value)} 
          />
      </div>

      <div  className="mb-2">
        <label className="text-sm block  mb-1">{ t('_extra.Closing') }</label>
        <input 
          type="time" 
          value={closing} 
          className="w-full border border-yellow-500 p-2 rounded bg-color" 
          onChange={(e)=> setClosing(e.target.value)}
          />
      </div>

      <div className="flex gap-2 items-center">
        <button 
          type="button"
          className="btn-color-red p-1 rounded flex-grow" 
          onClick={onDeleteClicked}>{ t('_extra.Delete') }</button>
        <button 
          type="button"
          className="btn-color-primary p-1 rounded flex-grow" 
          onClick={onUpdateClicked}>{ t('_extra.Update') }</button>
      </div>
      
    </div>
  );
}

export default function WorkingHoursForm({ workingHours, onSubmit, dialog, formError, formSuccess }) {

  const [hours, setHours] = useState(workingHours);

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(hours);
  }

  function hourRemoved(data) {
    setHours(hours.filter(i=> i.day !== data));
  }

  function hourUpdated(data) {

    const list = [...hours];

    let found = false;

    for (const hour of list) {
      if (hour.day === data.day) {
        hour.opening = data.opening;
        hour.closing = data.closing;
        found = true;
        break;
      }
    }

    if (!found) list.push(data);

    setHours(list);
  }

  return (
    <div>
      
      <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit} noValidate>

        <FormMessage 
          error={formError} 
          success={formSuccess} 
          />

        {
          WorkingHour.getDays().map(d=> {
            
            const day = hours.find(i=> i.day === d);

            return (
              <WorkingHourField 
                day={d} 
                key={`day-${d}`} 
                openingHour={day?.opening} 
                closingHour={day?.closing} 
                onRemove={hourRemoved} 
                onUpdate={hourUpdated} 
                />
            );
          })
        }

        <FormButton text="_extra.Submit" />

      </form>

      { dialog && <LoadingDialog /> }

    </div>
  );
}
