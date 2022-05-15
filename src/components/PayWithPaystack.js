
import React from 'react';
import { usePaystackPayment } from 'react-paystack';

const publicKey = 'pk_live_c4e0e6210e3ddee953afaafad7d1c571fe3d1c79';

export default function PayWithPaystack({ reference, email, amount, onDone, onClose }) {

  const paystack = usePaystackPayment({
    publicKey,
    reference,
    email,
    amount: Math.abs(amount) * 100
  });

  paystack(onDone, onClose);

  return <div></div>;
}
