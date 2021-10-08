
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useURLQuery } from '../context/AppHooks';
import { API_URL } from '../context/AppContext';
import SubHeader from '../components/SubHeader';
import Loading from '../components/Loading';
import ProductIcon from '../icons/ProductIcon';
import ProductItem from '../components/ProductItem';
import Reload from '../components/Reload';
import EmptyList from '../components/EmptyList';

export default function Search() {

  const { t } = useTranslation();
  
  const queryParam = useURLQuery().get('q');
  
  const categoryParam = useURLQuery().get('category');

  //const [stores, setStores] = useState([]);

  //const [storesFetched, setStoresFetched] = useState(stores.length < 1 ? 0 : 1);

  const [products, setProducts] = useState([]);

  const [productsFetched, setProductsFetched] = useState(products.length < 1 ? 0 : 1);

  let productsRender;

  async function fetchProducts() {
    if (productsFetched !== 0) return;
    
    try {
      let response = await fetch(`${API_URL}store-products.json?q=${queryParam}`);

      if (!response.ok)
        throw new Error(response.status);
      
      let data = await response.json();
      
      setProducts(data.data);
      setProductsFetched(1);

    } catch (err) {
      setProductsFetched(-1);
    }
  }

  function refetchProducts() {
    setProductsFetched(0);
    fetchProducts();
  }

  useEffect(fetchProducts);

  if (productsFetched === 0) {
    productsRender = <Loading />;
  } else if (productsFetched === -1) {
    productsRender = <Reload action={refetchProducts} />;
  } else if (productsFetched === 1 && products.length === 0) {
    productsRender = <EmptyList text="_empty.No_product" Icon={ProductIcon} />;
  } else {
    productsRender = (
      <ul className="list-x">
        { 
          products.map((p)=> (
            <ProductItem
              key={`prod_${p.id}`}
              prod={p}
              />
          ))
        }
      </ul>
    );
  }

  return (
    <section>

      <SubHeader search={true} />

      <div className="container-x">
        <h3 className="my-2 bg-color-gray inline-block py-1 px-2 rounded">
          <span>
            { queryParam && t('_search.Search_results') }
            { categoryParam && t('_search.Category_results') }
            : 
          </span> <strong>
            { queryParam }
            { categoryParam }
          </strong>
        </h3>
      </div>

      <div className="container-x">
        { productsRender }
      </div>

    </section>
  );
}


