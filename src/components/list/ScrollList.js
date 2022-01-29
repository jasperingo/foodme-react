
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import RefreshPull from './RefreshPull';
import RefreshRelease from './RefreshRelease';

export default function ScrollList({ data, hasMore, nextPage, refreshPage, className, renderDataItem, footer }) {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={nextPage}
      hasMore={hasMore}
      pullDownToRefresh={refreshPage !== undefined}
      pullDownToRefreshContent={<RefreshPull />}
      releaseToRefreshContent={<RefreshRelease />}
      pullDownToRefreshThreshold={50}
      refreshFunction={refreshPage}
      >
      <ul className={className}>
        { data.map((item, i)=> renderDataItem(item, i)) }
        { footer }
      </ul>
    </InfiniteScroll>
  );
}

