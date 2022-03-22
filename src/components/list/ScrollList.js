
import Icon from '@mdi/react';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { refreshIcon } from '../../assets/icons';

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
          <button 
            onClick={refreshPage}
            className="btn-color-primary px-1 rounded inline-flex gap-1 items-center"
            >
            <Icon path={refreshIcon} className="w-4 h-4" />
            <span>Refresh</span>
          </button>
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

