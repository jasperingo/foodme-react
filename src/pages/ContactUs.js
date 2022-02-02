
import React from 'react';
import { useTranslation } from 'react-i18next';


function ContactUsData({ param, value }) {

  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <dt className="text-color-gray font-bold text-sm">{ t(param) }</dt>
      <dd>{ value }</dd>
    </div>
  );
}

export default function ContactUs() {

  const { t } = useTranslation();

  function sendMessage(e) {
    e.preventDefault();
  }

  return (
    <section>

      <div className="container-x">
      
        <div className="py-4 md:max-w-2xl md:mx-auto md:flex md:gap-4 md:justify-center">

          <div>

            <h2 className="font-bold text-2xl mb-2">{ t('Send_Us_A_Message') }</h2>
            
            <p className="text-gray-500 text-sm">{ t('contact_us_note_') }</p>

            <form method="POST" action="/contact-us" className="my-5 pb-1" onSubmit={sendMessage}>

              <div>
                <div className="mb-4">
                  <label htmlFor="contact-us-name-input" className="sr-only">{ t('Name') }</label>
                  <input 
                    type="text"
                    id="contact-us-name-input"
                    placeholder={ t('Name') }
                    className="block w-full border border-gray-500 bg-white focus:outline-none rounded p-2" 
                    />
                </div>

                <div className="mb-4">
                  <label htmlFor="contact-us-email-input" className="sr-only">{ t('Email') }</label>
                  <input 
                    type="email"
                    id="contact-us-email-input"
                    placeholder={ t('Email') }
                    className="block w-full border border-gray-500 bg-white focus:outline-none rounded p-2" 
                    />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="contact-us-message-input" className="sr-only">{ t('Message') }</label>
                <textarea
                  id="contact-us-message-input"
                  placeholder={ t('Message') }
                  className="block w-full h-28 border border-gray-500 bg-white focus:outline-none rounded p-2" 
                ></textarea>
              </div>

              <div className="mb-4">
                <button 
                  type="submit" 
                  className="block w-full p-2 bg-yellow-500 hover:bg-yellow-300 text-white font-bold rounded">
                  { t('Send') }
                </button>
              </div>

            </form>
          </div>

          <div className="bg-color-gray rounded p-4 pb-1 my-4">
            <dl>
              <ContactUsData param="_user.Phone_number" value="+234806470889" />
              <ContactUsData param="_user.Email" value="dailyneeds785@gmail.com" />
              <ContactUsData param="_user.Working_hours" value="Monday - Sunday: 24/7" />
            </dl>
          </div>

        </div>

      </div>
      
    </section>
  );
}

