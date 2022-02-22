
import React from 'react';
import { useTranslation } from 'react-i18next';
import FormButton from '../components/form/FormButton';
import FormField from '../components/form/FormField';
import FormTextArea from '../components/form/FormTextArea';
import { useHeader } from '../hooks/headerHook';


function ContactUsData({ param, value, href }) {

  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <dt className="text-color-gray font-bold text-sm">{ t(param) }</dt>
      <dd>
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

  const { t } = useTranslation();

  function sendMessage(e) {
    e.preventDefault();
  }

  return (
    <section>

      <div className="container-x">
      
        <div className="py-4 md:max-w-2xl md:mx-auto md:flex md:gap-4 md:justify-center">

          <div>

            <h2 className="font-bold text-2xl mb-2">{ t('_message.Send_Us_A_Message') }</h2>
            
            <p className="text-gray-500 text-sm">{ t('_message._contact_us_note') }</p>

            <form method="POST" action="" className="my-5 pb-1" onSubmit={sendMessage} noValidate>

              <FormField 
                ID="contact-us-name-input"
                label="_user.Name"
                required={true}
                />

              <FormField 
                ID="contact-us-email-input"
                label="_user.Email"
                required={true}
                />  

              <FormTextArea 
                ID="contact-us-message-input"
                label="_message.Message"
                required={true}
                />

              <FormButton text="_message.Send" />

            </form>

          </div>

          <div className="bg-color-gray rounded p-4 pb-1 my-4">
            <dl>
              <ContactUsData param="_user.Phone_number" value="+2348064709889" href="tel:+2348064709889" />
              <ContactUsData param="_user.Email" value="dailyneeds785@gmail.com" href="mailto:dailyneeds785@gmail.com" />
              <ContactUsData param="_user.Working_hours" value="Monday - Sunday: 24/7" />
            </dl>
          </div>

        </div>

      </div>
      
    </section>
  );
}

