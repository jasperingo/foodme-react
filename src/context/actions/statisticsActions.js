
export const STATISTICS = {
  FETCHED: 'STATISTICS_FETCHED',
  UNFETCHED: 'STATISTICS_UNFETCHED',
  FETCHING: 'STATISTICS_FETCHING',
  ERROR_CHANGED: 'STATISTICS_ERROR_CHANGED'
};

export const getStatisticsFetchStatusAction = (fetchStatus, loading) => ({
  type: STATISTICS.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

