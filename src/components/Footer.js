
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserDomain } from '../hooks/viewHook';
import User from '../models/User';

const dev = true; //process.env.NODE_ENV === 'development';

function FooterLink({ text, href, reload = false }) {

  const { t } = useTranslation();

  return (
    <li className="mb-3">
      { 
        reload 
        ? <a href={href} className="hover:underline">{ t(text) }</a>
        : <Link to={href} className="hover:underline">{ t(text) }</Link>
      }
    </li>
  );
}

export default function Footer({ noRegister }) {

  const userDomain = useUserDomain();

  return (
    <footer className={`py-4 bg-color text-blue-500 text-center text-sm absolute bottom-0 left-0 w-full pb-16 lg:block`}>
      <div className="container-x">
        <ul className="flex flex-wrap gap-2 justify-around">
          <div>
            { !noRegister && <FooterLink text="_user.Register" href="/register" /> }
            <FooterLink text="_user.Log_in" href="login" />
          </div>

          <div>
            <FooterLink 
              reload={true}
              text="_store.Become_a_store_partner" 
              href={dev ? '/?app=1' : userDomain(User.TYPE_STORE)} 
              />
            <FooterLink 
              reload={true} 
              text="_delivery.Become_a_courier_partner" 
              href={dev ? '/?app=2' : userDomain(User.TYPE_DELIVERY_FIRM)} 
              />
          </div>

          {
            dev &&
            <div>
              <FooterLink text="_user.Admin" href="/?app=3" reload={true} />
              <FooterLink text="_user.Customer" href="/?app=0" reload={true} />
            </div>
          }

          <div>
            <FooterLink text="_extra.About_us" href="/about-us" />
            <FooterLink text="_extra.Contact_us" href="/contact-us" />
          </div>

          <div>
            <FooterLink text="_extra.Privacy_policy" href="/privacy-policy" />
            <FooterLink text="_extra.Terms_of_service" href="/terms-of-service" />
          </div>
        </ul>
      </div>
    </footer>
  );
}
