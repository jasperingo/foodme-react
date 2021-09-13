
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

export default function Footer() {

  return (
    <footer className="px-2 py-4 bg-gray-900 text-white text-center">
      <div>
        <ul>
          <FooterLink text="About_us" href="/about-us" />
          <FooterLink text="Contact_us" href="contact-us" />
          <FooterLink text="Terms_of_service" href="terms-of-service" />
        </ul>
      </div>
    </footer>
  );
}


