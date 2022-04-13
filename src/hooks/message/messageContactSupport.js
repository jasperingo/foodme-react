import { useMemo, useState, useCallback } from 'react';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import MessageRepository from '../../repositories/MessageRepository';

export function useMessageContactSupport(userToken) {

  const [support, setSupport] = useState(null);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const api = useMemo(function() { return MessageRepository.getInstance(userToken); }, [userToken]);

  const onResponse = useCallback(
    function() {
      return api.onGetApplicationSupport(function(response) {
        if (response.data) {
          setSupport(response.data);
        } else {
          setError(NetworkErrorCodes.UNKNOWN_ERROR);
        }

        setLoading(false);
      });
    },
    [api]
  );

  const fetchChat = useCallback(
    function() {
      
      if (loading) return;

      if (!window.navigator.onLine) {
        setError(NetworkErrorCodes.NO_NETWORK_CONNECTION);
        return;
      }

      setLoading(true)

      api.getApplicationSupport();
    },
    [api, loading]
  );

  return [
    fetchChat, 
    onResponse,
    support,
    loading,
    error,
    useCallback(function() { setSupport(null) }, [])
  ];
}
