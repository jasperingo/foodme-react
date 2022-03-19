
import Icon from '@mdi/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { backIcon } from '../../assets/icons';
import { useMessageMemberGet } from '../../hooks/message/messageMemberGetHook';
import Loading from '../Loading';

export default function MessageHeader({ loading, chat, userId }) {

  const history = useHistory();

  const getMember = useMessageMemberGet();

  const member = loading || chat === null ? null : getMember(chat, userId);
  
  return (
    <div className="bg-color-primary p-2 flex items-center gap-2">
      <button 
        onClick={()=> history.goBack() }
        className="p-1 hover:bg-color-gray-h"
        >
        <Icon path={backIcon} className="h-6 w-6" />
      </button>

      {
        loading &&
        <div className="bg-color flex-grow rounded">
          <Loading />
        </div>
      }

      { 
        chat &&
        <>
          <img src={member.photo.href} alt="Gift" width="50" height="50" className="w-12 h-12 rounded-full" />
          <div className="text-xl text-white">{ member.name }</div>
        </>
      }
    </div>
  );
}
