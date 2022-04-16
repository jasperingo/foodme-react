import { useMemo, useState } from "react";
import { ADDRESS } from "../../context/actions/addressActions";
import AddressRepository from "../../repositories/AddressRepository";
import { useAppContext } from "../contextHook";

export function useAddressDelete() {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    address: { 
      addressDispatch,
      address: {
        address
      } 
    },
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new AddressRepository(customerToken); }, [customerToken]);

  async function onSubmit() {
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    setLoading(true);

    try {

      const res = await api.delete(address.id);

      if (res.status === 200) {

        setFormSuccess(res.body.message);
        addressDispatch({ type: ADDRESS.UNFETCHED });

      } else {
        throw new Error();
      }
      
    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [onSubmit, loading, formSuccess, formError];
}
