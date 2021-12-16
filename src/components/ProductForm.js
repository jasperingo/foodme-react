
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ProductApi from '../api/ProductApi';
import { FETCH_STATUSES } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import AlertDialog, { LOADING_DIALOG } from './AlertDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';
import PhotoChooser from './PhotoChooser';

export default function ProductForm({ type, product }) {

  const { user: { user } } = useAppContext();

  const titleInput = useRef(null);

  const subTitleInput = useRef(null);

  const categoryInput = useRef(null);

  const subCategoryInput = useRef(null);

  const quantityInput = useRef(null);

  const priceInput = useRef(null);

  const unitInput = useRef(null);
  
  const descriptionInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [titleError, setTitleError] = useState('');

  const [subTitleError, setSubTitleError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [subCategoryError, setSubCategoryError] = useState('');

  const [quantityError, setQuantityError] = useState('');

  const [priceError, setPriceError] = useState('');

  const [unitError, setUnitError] = useState('');

  const [descriptionError, setDescriptionError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const [photoFetchStatus, setPhotoFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const api = useMemo(() => new ProductApi(user.api_token), [user]);

  function onFormSubmit(e) {
    e.preventDefault();

    let error = false;

    setFormError('');

    setFormSuccess('');

    setFetchStatus(FETCH_STATUSES.PENDING);

    setPhotoFetchStatus(FETCH_STATUSES.PENDING);
    
    if (!titleInput.current.validity.valid) {
      error = true;
      setTitleError('_errors.This_field_is_required');
    } else {
      setTitleError('');
    }

    if (!subTitleInput.current.validity.valid) {
      error = true;
      setSubTitleError('_errors.This_field_is_required');
    } else {
      setSubTitleError('');
    }

    if (!categoryInput.current.validity.valid) {
      error = true;
      setCategoryError('_errors.This_field_is_required');
    } else {
      setCategoryError('');
    }

    if (!subCategoryInput.current.validity.valid) {
      error = true;
      setSubCategoryError('_errors.This_field_is_required');
    } else {
      setSubCategoryError('');
    }

    if (!quantityInput.current.validity.valid) {
      error = true;
      setQuantityError('_errors.This_field_is_required');
    } else {
      setQuantityError('');
    }

    if (!priceInput.current.validity.valid) {
      error = true;
      setPriceError('_errors.This_field_is_required');
    } else {
      setPriceError('');
    }

    if (!unitInput.current.validity.valid) {
      error = true;
      setUnitError('_errors.This_field_is_required');
    } else {
      setUnitError('');
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
      setFormSuccess(res.msg);
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
        title: titleInput.current.value,
        sub_title: subTitleInput.current.value,
        category: categoryInput.current.value,
        sub_category: subCategoryInput.current.value,
        quantity: quantityInput.current.value,
        price: priceInput.current.value,
        unit: unitInput.current.value,
        description: descriptionInput.current.value,
      };
      
      const request = type === ProductForm.UPDATE ? api.update(form) : api.add(form);
      
      request.then(res=> {
        
        setFormSuccess(res.msg);
        setFetchStatus(FETCH_STATUSES.DONE);
        
        titleInput.current.value = '';
        subTitleInput.current.value = '';
        categoryInput.current.value = '';
        subCategoryInput.current.value = '';
        quantityInput.current.value = '';
        priceInput.current.value = '';
        unitInput.current.value = '';
        descriptionInput.current.value = '';
        
      }).catch(err=> {

        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFormError(err.errors.form);
          setTitleError(err.errors.title);
          setSubTitleError(err.errors.sub_title);
          setCategoryError(err.errors.category);
          setSubCategoryError(err.errors.sub_category);
          setQuantityError(err.errors.quantity);
          setPriceError(err.errors.price);
          setUnitError(err.errors.unit);
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
        src={`/photos/products/${product.photo}`}
        status={photoFetchStatus}
        onSuccess={onPhotoSuccess}
        onError={onPhotoError}
        />

      <FormField 
        ref={ titleInput }
        error={ titleError }
        ID="title-input" 
        label="_extra.Title" 
        required={true}
        value={product.title}
        />

      <FormField 
        ref={ subTitleInput }
        error={ subTitleError }
        ID="subtitle-input" 
        label="_extra.Sub_title" 
        required={true}
        value={product.sub_title}
        />

      <FormSelect 
        ref={ categoryInput }
        error={ categoryError }
        ID="category-input" 
        label="_extra.Category" 
        required={true}
        value={product.category}
        options={[
          'Soup'
        ]}
        />
      
      <FormSelect 
        ref={ subCategoryInput }
        error={ subCategoryError }
        ID="sub-category-input" 
        label="_extra.Sub_category" 
        required={true}
        value={product.sub_category}
        options={[
          'Egusi'
        ]}
        />

      <FormField 
        ref={ quantityInput }
        error={ quantityError }
        ID="quantity-input" 
        label="_extra.Quantity" 
        type="number" 
        required={true}
        value={product.quantity}
        min={0}
        />

      <FormField 
        ref={ priceInput }
        error={ priceError }
        ID="price-input" 
        label="_extra.Price" 
        type="number" 
        step="0.01"
        required={true}
        value={product.price}
        min={0}
        />

      <FormSelect 
        ref={ unitInput }
        error={ unitError }
        ID="unit-input" 
        label="_extra.Unit" 
        required={true}
        value={product.unit}
        options={[
          'Plate'
        ]}
        />

      <FormTextArea 
        ref={ descriptionInput }
        error={ descriptionError }
        ID="description-input" 
        label="_extra.Description" 
        required={true}
        value={product.description}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <AlertDialog dialog={dialog} /> }

    </form>
  );
}

ProductForm.ADD = 'add';
ProductForm.UPDATE = 'update';
