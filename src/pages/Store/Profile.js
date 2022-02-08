
import React, { useRef } from 'react';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import FormPhotoField from '../../components/form/FormPhotoField';
import FormSelect from '../../components/form/FormSelect';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useStoreCategoryList } from '../../hooks/category/storeCategoryListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreUpdate } from '../../hooks/store/storeUpdateHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

function ProfileForm({ stores }) {

  const nameInput = useRef(null);

  const categoryInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  const [
    onSubmit,
    onPhotoChoose,
    photoUploaded,
    store,
    dialog, 
    formError, 
    formSuccess, 
    nameError, 
    categoryError, 
    emailError, 
    phoneError
  ] = useStoreUpdate();

  function updateProfile(e) {
    e.preventDefault();
    onSubmit(
      nameInput.current.value, 
      categoryInput.current.value, 
      emailInput.current.value, 
      phoneInput.current.value,
      nameInput.current.validity, 
      categoryInput.current.validity, 
      emailInput.current.validity, 
      phoneInput.current.validity
    );
  }

  return (
    <section className="flex-grow">
      
      <div className="container-x">
      
        <form method="POST" action="" className="form-1-x" onSubmit={updateProfile}>
          
          <FormMessage 
            error={formError} 
            success={formSuccess} 
            /> 

          <FormPhotoField 
            alt={store.user.name} 
            src={store.user.photo.href} 
            text="_extra.Edit_photo" 
            onChoose={onPhotoChoose}
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

      { dialog && <LoadingDialog /> }

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
    stores, 
    storesFetchStatus, 
    refetchStores
  ] = useStoreCategoryList();

  useHeader({ 
    title: `${store.user.name} - Profile`,
    headerTitle: "_user.Profile"
  });

  return (
    <section>

      <div className="container-x">

        {
          useRenderOnDataFetched(
            storesFetchStatus,
            ()=> <ProfileForm stores={stores} />,
            ()=> <Loading />,
            ()=> <Reload action={refetchStores} />,
          )
        }
        
      </div>

    </section>
  );
}

