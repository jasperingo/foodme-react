
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function FooterLink({ text, href }) {

  const { t } = useTranslation();

  return (
    <li className="mb-3">
      <Link to={href} className="hover:underline">{ t(text) }</Link>
    </li>
  );
}

function FooterAnchor({ text, href }) {
  const { t } = useTranslation();

  return (
    <li className="mb-3">
      <a href={href} className="hover:underline">{ t(text) }</a>
    </li>
  );
}

export default function Footer() {

  return (
    <footer className={`py-4 bg-color text-blue-500 text-center text-sm absolute bottom-0 left-0 w-full pb-16 lg:block`}>
      <div className="container-x">
        <ul className="flex flex-wrap gap-2 justify-around">
          <FooterLink text="_user.Register" href="/register" />
          <FooterLink text="_user.Log_in" href="/login" />
          <FooterAnchor text="_store.Become_a_store_partner" href="/?app=1" />
          <FooterAnchor text="_delivery.Become_a_courier_partner" href="/?app=2" />
          <FooterAnchor text="_user.Admin" href="/?app=3" />
          <FooterAnchor text="_user.Customer" href="/?app=0" />
          <FooterLink text="_extra.About_us" href="/about-us" />
          <FooterLink text="_extra.Contact_us" href="/contact-us" />
          <FooterLink text="_extra.Privacy_policy" href="/privacy-policy" />
          <FooterLink text="_extra.Terms_of_service" href="/terms-of-service" />
        </ul>
      </div>
    </footer>
  );
}


