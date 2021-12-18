
import React, { useEffect, useMemo, useRef, useState } from 'react';
import SubCategoryApi from '../api/SubCategoryApi';
import { FETCH_STATUSES } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import AlertDialog, { LOADING_DIALOG } from './AlertDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';
import PhotoChooser from './PhotoChooser';

export default function SubCategoryForm({ type, category }) {

  const { user: { user } } = useAppContext();

  const nameInput = useRef(null);

  const typeInput = useRef(null);

  const categoryInput = useRef(null);
  
  const descriptionInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [nameError, setNameError] = useState('');

  const [typeError, setTypeError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [descriptionError, setDescriptionError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const [photoFetchStatus, setPhotoFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const api = useMemo(() => new SubCategoryApi(user.api_token), [user]);

  function onFormSubmit(e) {
    e.preventDefault();

    let error = false;

    setFormError('');

    setFormSuccess('');

    setFetchStatus(FETCH_STATUSES.PENDING);

    setPhotoFetchStatus(FETCH_STATUSES.PENDING);
    
    if (!nameInput.current.validity.valid) {
      error = true;
      setNameError('_errors.This_field_is_required');
    } else {
      setNameError('');
    }

    if (!typeInput.current.validity.valid) {
      error = true;
      setTypeError('_errors.This_field_is_required');
    } else {
      setTypeError('');
    }

    if (!categoryInput.current.validity.valid) {
      error = true;
      setCategoryError('_errors.This_field_is_required');
    } else {
      setCategoryError('');
    }
    
    if (!descriptionInput.current.validity.valid) {
      error = true;
      setDescriptionError('_errors.This_field_is_required');
    } else {
      setDescriptionError('');
    }

    if (!error) {
      setFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  function onPhotoSuccess(res) {

    setPhotoFetchStatus(FETCH_STATUSES.DONE);

    if (res !== null) {
      setFormSuccess(res.message);
    }
  }

  function onPhotoError(err) {
    
    setFetchStatus(FETCH_STATUSES.ERROR);

    if (err.errors) {
      setFormError(err.errors.form);
    } else {
      setFormSuccess('_errors.Something_went_wrong');
    }
  }

  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {

      const form = {
        name: nameInput.current.value,
        type: typeInput.current.value,
        category: categoryInput.current.value,
        description: descriptionInput.current.value,
      };
      
      const request = type === SubCategoryForm.UPDATE ? api.updateSubCategory(form) : api.addSubCategory(form);
      
      request.then(res=> {
        
        setFormSuccess(res.message);
        setFetchStatus(FETCH_STATUSES.DONE);
        
        nameInput.current.value = '';
        typeInput.current.value = '';
        categoryInput.current.value = '';
        descriptionInput.current.value = '';
        
      }).catch(err=> {

        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFormError(err.errors.form);
          setNameError(err.errors.name);
          setTypeError(err.errors.type);
          setCategoryError(err.errors.category);
          setDescriptionError(err.errors.description);
        } else {
          setFormError('_errors.Something_went_wrong');
        }

      });

    } else if(fetchStatus === FETCH_STATUSES.DONE && photoFetchStatus === FETCH_STATUSES.PENDING) {
      setPhotoFetchStatus(FETCH_STATUSES.LOADING);
    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [type, user, api, fetchStatus, photoFetchStatus, dialog]);

  return (
    <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

      { 
        (formError || formSuccess) && 
        <FormMessage 
          text={formSuccess ? formSuccess : formError} 
          type={formSuccess ? FormMessage.TYPE_SUCCESS : FormMessage.TYPE_ERROR} 
          /> 
      }

      <PhotoChooser 
        api={api}
        apiID={category.id}
        src={`/photos/category/${category.photo}`}
        status={photoFetchStatus}
        onSuccess={onPhotoSuccess}
        onError={onPhotoError}
        />

      <FormField 
        ref={ nameInput }
        error={ nameError }
        ID="name-input" 
        label="_extra.Name" 
        required={true}
        value={category.name}
        />

      <FormSelect 
        ref={ typeInput }
        error={ typeError }
        ID="type-input" 
        label="_extra.Type" 
        required={true}
        value={category.type}
        options={[
          'Store',
          'Category'
        ]}
        />

      <FormSelect 
        ref={ categoryInput }
        error={ categoryError }
        ID="category-input" 
        label="_category.Category" 
        required={true}
        value={category.category}
        options={[
          'Pharmacy',
          'Supermarket'
        ]}
        />

      <FormTextArea 
        ref={ descriptionInput }
        error={ descriptionError }
        ID="description-input" 
        label="_extra.Description"
        value={category.description}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <AlertDialog dialog={dialog} /> }

    </form>
  );
}

SubCategoryForm.ADD = 'add';
SubCategoryForm.UPDATE = 'update';
