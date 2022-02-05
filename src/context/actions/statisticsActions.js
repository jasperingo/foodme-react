
export const STATISTICS = {
  FETCHED: 'STATISTICS_FETCHED',
  UNFETCHED: 'STATISTICS_UNFETCHED',
  FETCH_STATUS_CHANGED: 'STATISTICS_FETCH_STATUS_CHANGED'
};

export const getStatisticsFetchStatusAction = (fetchStatus, loading) => ({
  type: STATISTICS.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

