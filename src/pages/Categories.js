
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategoriesIcon from '../icons/CategoriesIcon';
import { API_URL } from '../context/AppContext';
import Loading from '../components/Loading';
import { useCategoryColor } from '../context/AppHooks';
import EmptyList from '../components/EmptyList';
import Reload from '../components/Reload';

function CategoryItem({ category, index }) {

  const { t } = useTranslation();

  const iconColor = useCategoryColor(index);

  return (
    <li className="">
      <Link to={`/search?category=${category.name}`} className={ `flex gap-2 bg-color py-2 rounded md:shadow md:block md:text-center hover:bg-color-gray-h ${iconColor}` }>
        <CategoriesIcon classList="fill-current mx-auto" />
        <div className="flex-grow">
          <div className="font-bold">{ category.name }</div>
          <div className="text-sm text-color-gray">
            { category.stores_count && t('_store.store__Count', { count : parseInt(category.stores_count) }) }
            { category.products_count && t('_product.product__Count', { count : parseInt(category.products_count) }) }
          </div>
        </div>
      </Link>
    </li>
  );
}

export default function Categories() {

  const { t } = useTranslation();

  const [stores, setStores] = useState([]);

  const [products, setProducts] = useState([]);

  const [storesFetched, setStoresFetched] = useState(stores.length < 1 ? 0 : 1);

  const [productsFetched, setProductsFetched] = useState(products.length < 1 ? 0 : 1);

  const listStyle = "md:grid md:grid-cols-3 md:gap-4";

  let productsRender, storesRender;

  //const { dispatch, restaurantCategories } = useAppContext();

  async function fetchStores() {
    if (storesFetched !== 0) return;
    
    try {
      let response = await fetch(`${API_URL}category-store.json`);

      if (!response.ok)
        throw new Error(response.status);
      
      let data = await response.json();

      setStores(data.data);
      setStoresFetched(1);

    } catch (err) {
      setStoresFetched(-1);
    }
  }

  function refetchStores() {
    setStoresFetched(0);
    fetchStores();
  }

  async function fetchProducts() {
    if (productsFetched !== 0) return;
    
    try {
      let response = await fetch(`${API_URL}category-product.json`);

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

  useEffect(fetchStores);

  useEffect(fetchProducts);

  if (storesFetched === 0) {
    storesRender = <Loading />;
  } else if (storesFetched === -1) {
    storesRender = <Reload action={refetchStores} />;
  } else if (storesFetched === 1 && stores.length === 0) {
    storesRender = <EmptyList text="_empty.No_store_category" Icon={CategoriesIcon} />;
  } else {
    storesRender = (
      <ul className={listStyle}>
        { 
          stores.map((item, i) => (
            <CategoryItem 
              key={i} 
              index={i}
              category={item} 
              />
          ))
        } 
      </ul>
    );
  }

  if (productsFetched === 0) {
    productsRender = <Loading />;
  } else if (productsFetched === -1) {
    productsRender = <Reload action={refetchProducts} />;
  } else if (productsFetched === 1 && products.length === 0) {
    productsRender = <EmptyList text="_empty.No_product_category" Icon={CategoriesIcon} />;
  } else {
    productsRender = (
      <ul className={listStyle}>
        { 
          products.map((item, i) => (
            <CategoryItem 
              key={i} 
              index={i}
              category={item} 
              />
          ))
        } 
      </ul>
    );
  }

  return (
    <section>
      <div className="container-x">
        <div className="py-2">
          <h2 className="font-bold my-2">{ t('_store.Store_categories') }</h2>
          { storesRender }
        </div>
        <div className="py-2">
          <h2 className="font-bold my-2">{ t('_product.Product_categories') }</h2>
          { productsRender }
        </div>
      </div>
    </section>
  );
}


