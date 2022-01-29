
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import RefreshPull from './RefreshPull';
import RefreshRelease from './RefreshRelease';

export default function SingleList({ data, className, refreshPage, renderDataItem, footer }) {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={()=> null}
      hasMore={false}
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


