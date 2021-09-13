
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import FormButton from '../components/FormButton';
import FormField from '../components/FormField';
import SocialLoginButton from '../components/SocialLoginButton';
import SubHeader from '../components/SubHeader';
import FacebookIcon from '../icons/FacebookIcon';
import GoogleIcon from '../icons/GoogleIcon';

export default function Register() {

  const { t } = useTranslation();
  
  return (
    <section>

      <SubHeader title="Register" />

      <div className="flex px-2 py-5 justify-around gap-2">
        <SocialLoginButton text="Facebook" Icon={FacebookIcon} href="/login" bgColor="bg-blue-600" />
        <SocialLoginButton text="Google" Icon={GoogleIcon} href="/login" bgColor="bg-red-600" />
      </div>

      <div className="text-center my-2">
        <span className="bg-gray-200 rounded-full p-2 text-sm">{ t('OR') }</span>
      </div>

      <form method="POST" action="" className="px-2 py-5">

        <FormField _id="fn-input" label="First_name" />

        <FormField _id="ln-input" label="Last_name" />

        <FormField _id="email-input" label="Email" />

        <FormField _id="password-input" label="Password" type="password" />

        <div className="mb-4 text-sm">
          <span>{ t('By_registering_you_agree_to_our') }</span>
          <Link to="/terms-of-service" className="text-blue-500 font-bold"> { t('Terms_of_service') }.</Link>
        </div>

        <FormButton text="Register" />

        <div className="mb-4 text-center text-sm">
          <span>{ t('Already_have_an_account') } </span>
          <Link to="/login" className="text-blue-500 font-bold">{ t('login') }</Link>
        </div>

      </form>

      <Footer />
      
    </section>
  );
}

