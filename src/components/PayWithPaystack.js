
import React from 'react';
import { usePaystackPayment } from 'react-paystack';

const publicKey = 'pk_live_04d616e6eb4432d9cfde76934e2bf9fa7a288272';

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
