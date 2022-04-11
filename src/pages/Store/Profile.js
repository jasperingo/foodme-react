
import React, { useRef, useEffect } from 'react';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import FormPhotoField from '../../components/form/FormPhotoField';
import FormSelect from '../../components/form/FormSelect';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useStoreCategoryList } from '../../hooks/category/storeCategoryListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStorePhotoUpdate } from '../../hooks/store/storePhotoUpdateHook';
import { useStoreUpdate } from '../../hooks/store/storeUpdateHook';

function ProfileForm({ stores }) {

  const nameInput = useRef(null);

  const categoryInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  const [
    onSubmit, 
    store, 
    loading, 
    success,
    setSuccess,
    formError, 
    formSuccess, 
    nameError, 
    categoryError, 
    emailError, 
    phoneError
  ] = useStoreUpdate();

  const [
    photoSubmit,
    photo,
    setPhoto,
    photoLoading,
    photoUploaded,
    photoFormError
  ] = useStorePhotoUpdate();

  useEffect(
    function() {
      if (success && photo !== null && !photoUploaded && photoFormError === null)
        photoSubmit();
      else if (success) 
        setSuccess(false);
    }, 
    [success, photo, photoUploaded, photoFormError, photoSubmit, setSuccess]
  );

  function updateProfile(e) {
    e.preventDefault();
    onSubmit(
      nameInput.current.value, 
      categoryInput.current.value, 
      emailInput.current.value, 
      phoneInput.current.value,
      
      { 
        nameValidity: nameInput.current.validity, 
        categoryValidity: categoryInput.current.validity, 
        emailValidity: emailInput.current.validity, 
        phoneValidity: phoneInput.current.validity
      }
    );
  }

  return (
    <section className="flex-grow">
      
      <div className="container-x">
      
        <form method="POST" action="" className="form-1-x" onSubmit={updateProfile}>
          
          <FormMessage 
            success={formSuccess} 
            error={formError || photoFormError} 
            /> 

          <FormPhotoField 
            alt={store.user.name} 
            src={store.user.photo.href} 
            text="_extra.Edit_photo" 
            onChoose={setPhoto}
            uploaded={photoUploaded}
            />
          
          <FormField 
            ref={nameInput}
            error={nameError}
            ID="name-input" 
            label="_user.Name" 
            required={true}
            value={ store.user.name }
            />

          <FormSelect  
            ref={categoryInput}
            error={categoryError}
            ID="category-input" 
            label="_store.Store_category"
            required={true}
            value={store.sub_category_id}
            options={stores.flatMap(i=> i.sub_categories).map(i=> ({ key: i.id, value: i.name }))}
            />

          <FormField 
            ref={emailInput}
            error={emailError}
            ID="email-input" 
            label="_user.Email" 
            type="email" 
            required={true}
            value={ store.user.email }
            />

          <FormField 
            ref={phoneInput}
            error={phoneError}
            ID="phone-input" 
            label="_user.Phone_number" 
            type="tel" 
            required={true}
            value={ store.user.phone_number }
            />

          <FormButton text="_user.Update_profile" />

        </form>
        
      </div>

      { (loading || photoLoading) && <LoadingDialog /> }

    </section>
  );
}

export default function Profile() {

  const { 
    store: { 
      store: {
        store
      }
    } 
  } = useAppContext();

  const [
    fetchStoreCategories, 
    stores,
    storesLoading,
    storesLoaded,
    storesError
  ] = useStoreCategoryList();

  useHeader({ 
    title: `${store.user.name} - Profile`,
    headerTitle: "_user.Profile"
  });

  useEffect(
    function() { 
      if (!storesLoaded && storesError === null) 
        fetchStoreCategories(); 
    },
    [storesLoaded, storesError, fetchStoreCategories]
  );

  return (
    <section>
      <div className="container-x">
        { storesLoaded && <ProfileForm stores={stores} /> }
        { storesLoading && <Loading /> }
        { storesError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={fetchStoreCategories} /> }
        { storesError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={fetchStoreCategories} /> }
      </div>
    </section>
  );
}
