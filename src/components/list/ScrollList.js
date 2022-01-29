
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
      pullDownToRefresh={true}
      pullDownToRefreshContent={<RefreshPull />}
      releaseToRefreshContent={<RefreshRelease />}
      pullDownToRefreshThreshold={50}
      refreshFunction={refreshPage}
      >
      <ul className={className}>
        { data.map(item=> renderDataItem(item)) }
        { footer }
      </ul>
    </InfiniteScroll>
  );
}

