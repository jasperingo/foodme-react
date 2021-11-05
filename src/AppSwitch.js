
import React from 'react';

export default function AppSwitch() {

  function changeApp(to) {
    localStorage.setItem('dn-app', to);
    window.location = '/';
  }

  return (
    <div className="flex gap-2 text-purple-600 my-5">
      <button onClick={()=> changeApp(0)}>Main app</button> |
      <button onClick={()=> changeApp(1)}>Store app</button> |
      <button onClick={()=> changeApp(2)}>Delivery app</button> |
      <button onClick={()=> changeApp(3)}>Admin app</button>
    </div>
  )
}
