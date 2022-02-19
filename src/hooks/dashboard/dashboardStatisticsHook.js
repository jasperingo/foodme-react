import { useCallback, useEffect } from "react";
import { getStatisticsFetchStatusAction, STATISTICS } from "../../context/actions/statisticsActions";
import AdminRepository from "../../repositories/AdminRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
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
        statisticsFetchStatus
      }
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (statisticsFetchStatus !== FETCH_STATUSES.LOADING) 
        dashboardDispatch(getStatisticsFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [dashboardDispatch, statisticsFetchStatus]
  );

  useEffect(
    ()=> {
      if (statisticsLoading && statisticsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        dashboardDispatch(getStatisticsFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (statisticsLoading && statisticsFetchStatus === FETCH_STATUSES.LOADING) {
        
        dashboardDispatch(getStatisticsFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new AdminRepository(adminToken);
        api.getStatistics()
        .then(res=> {
          
          if (res.status === 200) {

            dashboardDispatch({
              type: STATISTICS.FETCHED, 
              payload: {
                statistics: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE
              }
            });

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          dashboardDispatch(getStatisticsFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [adminToken, statisticsLoading, statisticsFetchStatus, dashboardDispatch]
  );


  return [statistics, statisticsFetchStatus, refetch];
}
