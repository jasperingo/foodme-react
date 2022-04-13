
import { useMemo, useState } from "react";
import SubCategoryRepository from "../../repositories/SubCategoryRepository";
import { useAppContext } from "../contextHook";
import { useSubCategoryValidation } from "./subCategoryValidationHook";

export function useSubCategoryCreate() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    }
  } = useAppContext();

  const [id, setId] = useState(0);

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [descriptionError, setDescriptionError] = useState('');

  const validator = useSubCategoryValidation();

  const api = useMemo(function() { return new SubCategoryRepository(adminToken); }, [adminToken]);
  
  async function onSubmit(name, category_id, description, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    
    const [error, nameError, categoryError, descriptionError] = validator(validity);
    
    setNameError(nameError);
    setCategoryError(categoryError);
    setDescriptionError(descriptionError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.create({ name, description, category_id });

      if (res.status === 201) {
        
        setFormSuccess(res.body.message);

        setId(res.body.data.id);
        
      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'name':
              setNameError(error.message);
              break;

            case 'category_id':
              setCategoryError(error.message);
              break;

            case 'description':
              setDescriptionError(error.message);
              break;

            default:
          }
        }

      } else {
        throw new Error();
      }
      
    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [
    onSubmit,
    loading, 
    id, 
    setId,
    formError, 
    formSuccess, 
    nameError, 
    categoryError,
    descriptionError
  ];
}
