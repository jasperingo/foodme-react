import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDateFormatter, useWorkingHoursDay } from '../../hooks/viewHook';
import WorkingHour from '../../models/WorkingHour';

const workingHourFormatOpts = { time: true, addDate: true };

export default function WorkingHoursList({ workingHours = [] }) {
  const { t } = useTranslation();

  const dateFormat = useDateFormatter();

  const workingDay = useWorkingHoursDay();

  return (
    <div className="container-x">
      <ul>
        {
          WorkingHour.getDays().map(day=> {
            const data = workingHours?.find(i=> i.day === day);
            return (
              <li className="mb-4" key={`working-hour-${day}`}>
                <div className="text-color-primary">{t(workingDay(day))}</div>
                <div className="font-bold">
                  {
                    data 
                      ? `${dateFormat(data.opening, workingHourFormatOpts)} - ${dateFormat(data.closing, workingHourFormatOpts)}`
                      : t('_extra.Not_open') 
                  }
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}
