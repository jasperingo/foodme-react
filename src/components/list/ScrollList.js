
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import RefreshPull from './RefreshPull';
import RefreshRelease from './RefreshRelease';

export default function ScrollList({ data, hasMore, nextPage, refreshPage, inverse, className, renderDataItem, header, footer }) {

  function makeList() {
    let list = [];
    
    if (inverse)
      list = [...data].reverse();
    else 
      list = data;

    return list.map((item, i)=> renderDataItem(item, i));
  }

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={nextPage}
      hasMore={hasMore}
      inverse={inverse}
      pullDownToRefresh={refreshPage !== undefined}
      pullDownToRefreshContent={<RefreshPull />}
      releaseToRefreshContent={<RefreshRelease />}
      pullDownToRefreshThreshold={50}
      refreshFunction={refreshPage}
      >
      <ul className={className}>
        { header }
        { makeList() }
        { footer }
      </ul>
    </InfiniteScroll>
  );
}

