
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import RefreshButton from '../RefreshButton';

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
      >
      {
        refreshPage &&
        <div className="text-right pt-2">
          <RefreshButton onRefresh={refreshPage} />
        </div>
      }
      <ul className={className}>
        { header }
        { makeList() }
        { footer }
      </ul>
    </InfiniteScroll>
  );
}

