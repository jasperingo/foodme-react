
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHeader } from '../hooks/headerHook';

function ContactUsData({ param, value, href }) {

  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <dt className=" font-bold text-sm">{ t(param) }</dt>
      <dd className="text-lg">
        { 
          href ? 
          <a href={href} title={href}>{ value }</a>
          : 
          <span>{ value }</span>
        }
      </dd>
    </div>
  );
}

export default function ContactUs() {

  useHeader({
    title: `Contact Us - Dailyneeds`,
    headerTitle: '_extra.Contact_us'
  });

  return (
    <section>

      <div className="container-x">

        <dl className="bg-color-gray rounded p-4 pb-1 my-4">
          <ContactUsData param="_user.Phone_number" value="+2348064709889" href="tel:+2348064709889" />
          <ContactUsData param="_user.Email" value="dailyneeds785@gmail.com" href="mailto:dailyneeds785@gmail.com" />
          <ContactUsData param="_user.Working_hours" value="Monday - Sunday: 24/7" />
        </dl>

      </div>
      
    </section>
  );
}
