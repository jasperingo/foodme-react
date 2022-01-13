
import React, { useEffect } from 'react';
import { useURLQuery } from '../../context/AppHooks';
import { useAppContext } from '../../context/AppContext';
import { SEARCH } from '../../context/AppActions';
import Tab from '../../components/Tab';
import SearchEmpty from '../../components/SearchEmpty';
import ProductsSearchList from '../../components/ProductsSearchList';
import ProductApi from '../../api/ProductApi';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const TAB_LINKS = [
  { title : '_product.Products', href: '/products' },
  { title : '_order.Orders', href: '/orders' },
];

export default function Search() {

  const match = useRouteMatch();
  
  const queryParam = useURLQuery().get('q');

  const { 
    user: { user }, 
    search: { query }, 
    searchDispatch 
  } = useAppContext();

  useEffect(()=> {
    if (queryParam !== null && queryParam !== query)
      searchDispatch({
        type: SEARCH.QUERY_CHANGED,
        payload: queryParam
      });
  }, [queryParam, query, searchDispatch]);

  if (queryParam === null) {
    return <SearchEmpty />
  }
 
  return (
    <section>

      <div className="container-x">
        <Tab items={ TAB_LINKS.map(item=> ({...item, href:`${item.href}?q=${queryParam}` })) } keyPrefix="search-tab" />
      </div>

      <div className="container-x">
        <Switch>
          <Route path={`${match.url}/products`} render={()=> <ProductsSearchList api={new ProductApi(user.api_token)} queryParam={queryParam} />} />
          
        </Switch>
      </div>

    </section>
  );
}


