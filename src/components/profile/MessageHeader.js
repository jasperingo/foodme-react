
import React from 'react';

export default function MessageHeader({ chat, recipient }) {

  const member = chat.member_one_id === recipient ? chat.member_one : chat.member_two;

  return (
    <div className="bg-color-primary p-2 flex items-center gap-2">
      <img src={member.photo.href} alt="Gift" width="50" height="50" className="w-12 h-12 rounded-full" />
      <div className="text-xl text-white">{ member.name }</div>
    </div>
  );
}
