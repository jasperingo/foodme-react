
import React from 'react';
import { searchIcon } from '../assets/icons';
import EmptyList from './EmptyList';

export default function SearchEmpty() {
  return (
    <div className="container-x">
      <EmptyList text="_search.Search__app" icon={searchIcon} />
    </div>
  );
}
