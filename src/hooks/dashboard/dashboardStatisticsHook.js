import { useCallback, useMemo } from "react";
import { STATISTICS } from "../../context/actions/statisticsActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import AdminRepository from "../../repositories/AdminRepository";
import { useAppContext } from "../contextHook";

export function useDashboardStatistics() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    dashboard: {
      dashboardDispatch,
      dashboard: {
        statistics,
        statisticsLoading,
        statisticsError
      }
    }
  } = useAppContext();

  const api = useMemo(function() { return new AdminRepository(adminToken); }, [adminToken]);

  const unfetchStatistics = useCallback(
    function() { dashboardDispatch({ type: STATISTICS.UNFETCHED }); },
    [dashboardDispatch]
  );

  const fetchStatistics = useCallback(
    async function() {

      if (statisticsLoading) return;
        
      if (!window.navigator.onLine) {
        dashboardDispatch({
          type: STATISTICS.ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      dashboardDispatch({ type: STATISTICS.FETCHING });
    
      try {

        const res = await api.getStatistics();
          
        if (res.status === 200) {

          dashboardDispatch({
            type: STATISTICS.FETCHED, 
            payload: { statistics: res.body.data, }
          });

        } else {
          throw new Error();
        }

      } catch {
        dashboardDispatch({
          type: STATISTICS.ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
      
    },
    [api, statisticsLoading, dashboardDispatch]
  );

  return [
    fetchStatistics,
    statistics,
    statisticsLoading,
    statisticsError,
    unfetchStatistics
  ];
}
