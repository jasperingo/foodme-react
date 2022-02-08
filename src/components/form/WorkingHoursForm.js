
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addIcon, deleteIcon, refreshIcon } from '../../assets/icons';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';


function WorkingHourField({ ID, label, added, value, onAdd, onRemove, onUpdate }) {

  const { t } = useTranslation();

  const [day, setDay] = useState(value?.day);

  const [error, setError] = useState(null);

  const [opening, setOpening] = useState(value?.opening);

  const [closing, setClosing] = useState(value?.closing);

  
  function add() {

    setError(null);

    if (day && closing && opening) {

      const d1 = new Date('01/01/2022 '+opening);
      const d2 = new Date('01/01/2022 '+closing);

      if (d1.getTime() >= d2.getTime()) {
        setError('_errors.This_field_is_invalid');
      } else {

        const data = { day, opening, closing };
  
        if (value?.id) {
          data.id = value.id;
        }

        if (added) {
          onUpdate(data);
        } else {
          onAdd(data);
          setDay('');
          setOpening('');
          setClosing('');
        }
      }

    } else {
      setError('_errors.This_field_is_invalid');
    }
  }
  
  
  return (
    <div className="mb-4">
      <div className="mb-2">
        <div className="flex gap-2 items-center mb-1">
          {
            added ? 
            <>
              <button 
                type="button"
                onClick={()=> onRemove(value)}
                className="btn-color-primary rounded-full p-0.5" 
                >
                <Icon path={deleteIcon} className="w-6 h-6" />
                <span className="sr-only">{ t('_extra.Delete') }</span>
              </button>
              <button 
                type="button"
                onClick={add}
                className="btn-color-primary rounded-full p-0.5" 
                >
                <Icon path={refreshIcon} className="w-6 h-6" />
                <span className="sr-only">{ t('_extra.Update') }</span>
              </button>
            </>
            :
            <button 
              type="button"
              onClick={add}
              className="btn-color-primary rounded-full p-0.5" 
              >
              <Icon path={addIcon} className="w-6 h-6" />
              <span className="sr-only">{ t('_extra.Add') }</span>
            </button>
          }

          {
            added ?
            <label htmlFor={ID} className="font-bold">{ t(label) }</label>
            :
            <div>
              <label className="sr-only">{ t(label) }</label>
              <select 
                onChange={(e)=> setDay(e.target.value)}
                className="w-full border border-yellow-500 px-2 py-2.5 rounded bg-color"
                >
                <option value="">--{ t(label) }--</option>
                <option value="sunday">{ t('_extra.Sunday') }</option>
                <option value="monday">{ t('_extra.Monday') }</option>
                <option value="tuesday">{ t('_extra.Tuesday') }</option>
                <option value="wednesday">{ t('_extra.Wednesday') }</option>
                <option value="thursday">{ t('_extra.Thursday') }</option>
                <option value="friday">{ t('_extra.Friday') }</option>
                <option value="saturday">{ t('_extra.Saturday') }</option>
              </select>
            </div>
          }
        </div>
        
        <div className="mb-1">
          <label className="text-sm block mb-1">{ t('_extra.Opening') }</label>
          <input 
            type="time" 
            value={opening} 
            className="w-full border border-yellow-500 p-2 rounded bg-color" 
            onChange={(e)=> setOpening(e.target.value)} 
            />
        </div>

        <div  className="mb-1">
          <label className="text-sm block  mb-1">{ t('_extra.Closing') }</label>
          <input 
            type="time" 
            value={closing} 
            className="w-full border border-yellow-500 p-2 rounded bg-color" 
            onChange={(e)=> setClosing(e.target.value)}
            />
        </div>

      </div>
      
      <div className="text-red-500 text-sm">{ t(error) }</div>
    </div>
  );
}

export default function WorkingHoursForm({ workingHours, onSubmit, dialog, formError, formSuccess }) {

  const [hours, setHours] = useState(workingHours);

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(hours);
  }

  function hoursAdded(data) {
    const list = hours.filter(i=> i.day !== data.day);
    list.push(data);
    setHours(list);
  }

  function hourRemoved(data) {
    const list = hours.filter(i=> i.day !== data.day);
    setHours(list);
  }

  function hourUpdated(data) {
    const list = hours.map(i=> {
      if (i.day === data.day) {
        return {
          id: i.id,
          day: i.day,
          opening: data.opening,
          closing: data.closing
        }
      }
      return i;
    });

    setHours(list);
  }

  return (
    <div>
      
      <div className="form-1-x">
        <WorkingHourField label="_extra.Day" onAdd={hoursAdded} added={false} />
      </div>

      <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit} noValidate>

        <FormMessage 
          error={formError} 
          success={formSuccess} 
          />

        {
          hours.map(i=> (
            <WorkingHourField 
              key={`day-${i.day}`} 
              label={i.day} 
              onRemove={hourRemoved} 
              onUpdate={hourUpdated} 
              added={true} 
              value={i} 
              />
          ))
        }

        <FormButton text="_extra.Submit" />

      </form>

      { dialog && <LoadingDialog /> }

    </div>
  );
}

