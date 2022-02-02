
import React, { useRef } from 'react';
import FormButton from '../components/form/FormButton';
//import FormMessage from '../components/FormMessage';
import FormField from '../components/form/FormField';
import FormTopTip from '../components/form/FormTopTip';
//import AlertDialog from '../components/dialog/AlertDialog';

export default function ForgotPassword() {

  const emailInput = useRef(null);

  // const [dialog, setDialog] = useState(null);

  // const [formError, setFormError] = useState('');

  // const [formSuccess, setFormSuccess] = useState('');
  
  //const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onFormSubmit(e) {
    e.preventDefault();

    // setFormSuccess('');

    // setFetchStatus(FETCH_STATUSES.PENDING);

    // if (!emailInput.current.validity.valid) {
    //   setFetchStatus(FETCH_STATUSES.ERROR);
    //   setFormError('_errors.This_field_is_required');
    // } else {
    //   setFormError('');
    //   setFetchStatus(FETCH_STATUSES.LOADING);
    //   setDialog(LOADING_DIALOG);
    // }
  }

  // useEffect(()=> {

  //   if (fetchStatus === FETCH_STATUSES.LOADING) {
  //     const api = new UserApi();
  //     api.forgotPassword({
  //       email: emailInput.current.value,
  //     }).then(res=> {
  //       setFormSuccess(res.message);
  //       setFetchStatus(FETCH_STATUSES.DONE);
  //     }).catch(err=> {
  //       setFetchStatus(FETCH_STATUSES.ERROR);
  //       if (err.errors) {
  //         setFormError(err.errors.message);
  //       } else {
  //         setFormError('_errors.Something_went_wrong');
  //       }
  //     });

  //   } else if (dialog !== null) {
  //     setDialog(null);
  //   }

  // }, [fetchStatus, userDispatch, dialog]);

  return (
    <section>
      
      <div className="container-x">

        <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

          {/* <FormMessage 
            error={formError} 
            success={formSuccess} 
            />  */}

          <FormTopTip text="_user._forgot_password_instruction" />

          <FormField 
            ref={emailInput} 
            ID="email-input" 
            label="_user.Email" 
            type="email"
            required={true}
            />

          <FormButton text="_extra.Submit" />

        </form>

      </div>

      {/* { dialog && <AlertDialog dialog={dialog} /> } */}

    </section>
  );
}
