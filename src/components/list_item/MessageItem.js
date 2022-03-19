import Icon from '@mdi/react';
import { useEffect } from 'react';
import { checkIcon, timeIcon } from '../../assets/icons';
import { useMessageCreate } from '../../hooks/message/messageCreateHook';
import { useDateFormatter } from '../../hooks/viewHook';

export default function MessageItem({ userToken, userId, receiverId, onSend, message: { id, content, created_at, user_id, clientId  } }) {

  const dateFormat = useDateFormatter();

  const [sender, onResponse, data, unsetData] = useMessageCreate(userToken, id > 0);
  
  useEffect(
    function() {
      if (id < 1) 
        sender(receiverId, content);
    },
    [id, content, receiverId, sender]
  );

  useEffect(
    function() {
      if (data !== null) {
        onSend(clientId, data);
        unsetData();
      }
    },
    [data, unsetData, clientId, onSend]
  );
  
  useEffect(
    function() {
      return onResponse();
    },
    [onResponse]
  );

  return (
    <li className={`px-2 py-4 flex ${userId === user_id && 'justify-end'}`}>
      <div className={`p-2 rounded-lg border ${userId === user_id ? 'border-yellow-500' : 'border-black'}`} style={{maxWidth: '80%'}}>
        <div className="mb-1">{ content }</div>
        <div className="flex justify-end gap-2">
          {
            id > 0 ?
            <Icon path={checkIcon} className="w-5 h-5 text-blue-500" />
            :
            <Icon path={timeIcon} className="w-5 h-5 text-blue-500" />
          }
          <span className="text-color-gray text-sm">{ dateFormat(created_at) }</span>
        </div>
      </div>
    </li>
  );
}
