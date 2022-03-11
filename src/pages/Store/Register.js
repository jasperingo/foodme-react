
import React, { useRef, useState } from 'react';
import { storeIcon } from '../../assets/icons';
import AuthFormHeader from '../../components/AuthFormHeader';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import FormSelect from '../../components/form/FormSelect';
import LoginIfHasAccountLink from '../../components/form/LoginIfHasAccountLink';
import RegistrationAgreementLink from '../../components/form/RegistrationAgreementLink';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useStoreCategoryList } from '../../hooks/category/storeCategoryListHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreCreate } from '../../hooks/store/storeCreateHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

function RegisterForm({ guestMiddleware, stores }) {

  const nameInput = useRef(null);

  const categoryInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  const adminEmailInput = useRef(null);

  const adminPasswordInput = useRef(null);

  const [category, setCategory] = useState(null);

  const [
    onSubmit, 
    dialog, 
    formError, 
    nameError, 
    categoryError, 
    emailError, 
    phoneError, 
    adminEmailError, 
    adminPasswordError
  ] = useStoreCreate();

  function onRegisterSubmit(e) {
    e.preventDefault();
    onSubmit(
      nameInput.current.value, 
      categoryInput.current.value, 
      emailInput.current.value, 
      phoneInput.current.value, 
      adminEmailInput.current.value,
      adminPasswordInput.current.value, 
      nameInput.current.validity, 
      categoryInput.current.validity, 
      emailInput.current.validity, 
      phoneInput.current.validity, 
      adminEmailInput.current.validity, 
      adminPasswordInput.current.validity
    );
  }

  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onRegisterSubmit} className="form-2-x" noValidate>

          <AuthFormHeader icon={storeIcon} text="_user.Join_us" />

          <FormMessage error={formError} />

          <div className="md:flex gap-4 items-start">

            <fieldset className="md:w-1/2">

              <FormField 
                ref={nameInput}
                error={nameError}
                ID="name-input" 
                label="_store.Store_name" 
                required={true}
                />

              <FormSelect  
                ID="category-input" 
                label="_store.Store_category"
                required={true}
                options={stores.map(i=> ({ key: i.id, value: i.name }))}
                onChange={(e)=> setCategory(e.target.value)}
                />

              <FormSelect  
                ref={categoryInput}
                error={categoryError}
                ID="sub-category-input" 
                label="_store.Store_sub_category"
                required={true}
                options={stores.find(i=> i.id === Number(category))?.sub_categories.map(i=> ({ key: i.id, value: i.name }))}
                />

              <FormField 
                ref={emailInput}
                error={emailError}
                ID="email-input" 
                label="_store.Store_email" 
                type="email"
                required={true}
                />

              <FormField 
                ref={phoneInput}
                error={phoneError}
                ID="phone-input" 
                label="_store.Store_phone_number" 
                type="tel"
                required={true}
                />

            </fieldset>

            <fieldset  className="md:w-1/2">

              <FormField 
                ref={adminEmailInput}
                error={adminEmailError}
                ID="admin-email-input" 
                label="_user.Administrator_email" 
                type="email" 
                required={true}
                tip="_user._admin_email_registration_tip"
                />

              <FormField 
                ref={adminPasswordInput}
                error={adminPasswordError}
                ID="admin-password-input" 
                label="_user.Administrator_password" 
                type="password" 
                required={true}
                minLength={6}
                />
                
              <div className="text-sm bg-color-gray p-2 rounded mb-4">
                <span>Don't have a dailyneeds account? </span>
                <a href="/register?app=0" className="text-blue-500">Create a dailyneeds account</a>
              </div>

            </fieldset>

          </div>

          <RegistrationAgreementLink />

          <FormButton text="_user.Register" />

          <LoginIfHasAccountLink />

        </form>
        
      </div>

      { dialog && <LoadingDialog /> }
      
    </section>
  );
}

export default function Register({ guestMiddleware }) {

  useHeader({ 
    title: `Register store - DailyNeeds`,
    headerTitle: '_user.Register',
  });

  const [
    stores, 
    storesFetchStatus, 
    refetchStores
  ] = useStoreCategoryList();

  return (
    <section>

      <div className="container-x">

        {
          useRenderOnDataFetched(
            storesFetchStatus,
            ()=> <RegisterForm guestMiddleware={guestMiddleware} stores={stores} />,
            ()=> <Loading />,
            ()=> <Reload action={refetchStores} />,
          )
        }
        
      </div>

    </section>
  );
}
