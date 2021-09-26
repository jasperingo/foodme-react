
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';


function FooterLink({ text, href }) {

  const { t } = useTranslation();

  return (
    <li className="mb-3">
      <Link to={href} className="hover:underline">{ t(text) }</Link>
    </li>
  );
}

export default function Footer() {
  
  const { showHeader } = useAppContext();

  return (
    <footer className={`px-2 py-4 bg-white text-blue-500 text-center text-sm absolute bottom-0 left-0 w-full ${!showHeader ? '' : ' hidden'} lg:block`}>
      <div>
        <ul className="flex justify-around">
          <FooterLink text="About_us" href="/about-us" />
          <FooterLink text="Contact_us" href="contact-us" />
          <FooterLink text="Terms_of_service" href="terms-of-service" />
        </ul>
      </div>
    </footer>
  );
}


