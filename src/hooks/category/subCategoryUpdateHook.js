
import { useMemo, useState } from "react";
import SubCategoryRepository from "../../repositories/SubCategoryRepository";
import { useAppContext } from "../contextHook";
import { CATEGORY } from "../../context/actions/categoryActions";
import { useSubCategoryValidation } from "./subCategoryValidationHook";

export function useSubCategoryUpdate() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    category: { 
      categoryDispatch,
      category: {
        subCategory
      }
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');

  const [descriptionError, setDescriptionError] = useState('');

  const validator = useSubCategoryValidation();

  const api = useMemo(function() { return new SubCategoryRepository(adminToken); }, [adminToken]);
 
  async function onSubmit(name, description, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    
    const [error, nameError, , descriptionError] = validator(validity);
    
    setNameError(nameError);
    setDescriptionError(descriptionError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.update(subCategory.id, { name, description });

      if (res.status === 200) {
        
        setFormSuccess(res.body.message);
        
        categoryDispatch({
          type: CATEGORY.SUB_FETCHED, 
          payload: {
            id: String(subCategory.id),
            subCategory: res.body.data, 
          }
        });

        setSuccess(true);

      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'name':
              setNameError(error.message);
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
    success, 
    setSuccess,
    formError, 
    formSuccess, 
    nameError, 
    descriptionError
  ];
}
