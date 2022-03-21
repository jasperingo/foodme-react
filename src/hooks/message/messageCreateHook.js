import { useState, useMemo, useCallback } from 'react';
import MessageRepository from '../../repositories/MessageRepository';

export function useMessageCreate(userToken, hasId) {

  const [done, setDone] = useState(hasId);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  const api = useMemo(
    function() { return done ? null : new MessageRepository(userToken); }, 
    [done, userToken]
  );
  
  const unsetData = useCallback(function() { setData(null); }, []);

  const onResponse = useCallback(
    function() {
      return api?.onMessageCreated(function(response) {
        if (response.data) {
          setDone(true);
          setLoading(false);
          setData(response.data);
        }
      });
    },
    [api]
  );

  const send = useCallback(
    function(receiverId, message) {
      
      if (loading || done) return;
      
      setLoading(true);

      api.createMessage(receiverId, message);
    },
    [loading, done, api]
  );

  return [send, onResponse, data, unsetData];
}
