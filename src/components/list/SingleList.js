
import React from 'react';
import ScrollList from './ScrollList';

export default function SingleList({ data, className, refreshPage, renderDataItem, footer }) {
  return (
    <ScrollList
      data={data}
      className={className}
      hasMore={false}
      refreshPage={refreshPage}
      footer={footer}
      renderDataItem={renderDataItem}
      />
  );
}


