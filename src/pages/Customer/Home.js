
import React from 'react';
import { useTranslation } from 'react-i18next';
import Reload from '../../components/Reload';
import Loading from '../../components/Loading';
import EmptyList from '../../components/EmptyList';
import StoreItem from '../../components/list_item/StoreItem';
import ProductItem from '../../components/list_item/ProductItem';
import CategoryItem from '../../components/list_item/CategoryItem';
import CarouselX from '../../components/CarouselX';
import SingleList from '../../components/list/SingleList';
import { categoryIcon, productIcon, storeIcon } from '../../assets/icons';
import { useHomeCategoryList } from '../../hooks/home/homeCategoryListHook';
import { useHomeStoreList } from '../../hooks/home/homeStoreListHook';
import { useHomeProductList } from '../../hooks/home/homeProductListHook';
import { useRenderListFooter } from '../../hooks/viewHook';
import { FETCH_STATUSES } from '../../repositories/Fetch';

const CAROUSEL_IMGS = [
  {
    title: 'Buy food',
    photo: '/home/burger.jpg'
  },{
    title: 'Instant delivery',
    photo: '/home/delivery.jpg'
  }, 
  {
    title: 'Buy medicine',
    photo: '/home/drugs.jpg'
  },
  {
    title: 'Buy drinks',
    photo: '/home/drink.jpg'
  }
];

// function CategoryItem({ category, index }) {

//   const iconColor = useCategoryColor(index);

//   const iconType = category.type === 'product' ? productIcon : storeIcon;

//   return (
//     <li className="lg:mb-2">
//       <Link 
//         to={`/category/${category.id}`} 
//         className={`block bg-color dark:bg-color-d hover:bg-color-gray-h shadow-lg px-2 py-3 rounded text-center ${iconColor} lg:flex lg:text-left lg:gap-2`}
//         >
//         <img src={`/photos/category/${category.photo}`} alt={category.name} width="100" height="100" className="w-10 h-10 block mx-auto rounded" />        
//         <div className="flex flex-grow gap-1 justify-center items-center lg:justify-start">
//           <div className="text-sm truncate overflow-ellipsis">{ category.name }</div>
//           <Icon path={iconType} className='w-4 h-4' />
//         </div>
//       </Link>
//     </li>
//   );
// }


function Categories({ categories, categoriesFetchStatus, refetch }) {

  const { t } = useTranslation();

  return (
    <div className="bg-color-gray lg:my-2">
      <div className="container-x border pt-2 pb-4 border-transparent">
        <h2 className="font-bold my-2">{ t('_category.Categories') }</h2>
        <SingleList
          data={categories}
          className="grid gap-4 grid-cols-3"
          renderDataItem={(item, i)=> (
            <CategoryItem 
              key={`category-${item.id}`} 
              index={i}
              category={item} 
              grid={true}
              />
          )}
          footer={useRenderListFooter(
            categoriesFetchStatus,
            ()=> <li key="categories-footer" className="col-span-3"> <Loading /> </li>, 
            ()=> <li key="categories-footer" className="col-span-3"> <Reload action={refetch} /> </li>,
            ()=> <li key="categories-footer" className="col-span-3"> <EmptyList text="_empty.No_category" icon={categoryIcon} /> </li>
          )}
          />
      </div>
    </div>
  );
}

function Stores({ stores, storesFetchStatus, refetch }) {

  const { t } = useTranslation();

  return (
    <div className="container-x py-2">
      <h2 className="font-bold my-2">{ t('_store.Stores') }</h2>
      <SingleList
          data={stores}
          className="list-x"
          renderDataItem={(item)=> (
            <li key={`store-${item.id}`}> <StoreItem store={item} /> </li>
          )}
          footer={useRenderListFooter(
            storesFetchStatus,
            ()=> <li key="stores-footer"> <Loading /> </li>, 
            ()=> <li key="stores-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="stores-footer"> <EmptyList text="_empty.No_store" icon={storeIcon} /> </li>
          )}
          />
    </div>
  );
}

function Products({ products, productsFetchStatus, refetch }) {
  
  const { t } = useTranslation();

  return (
    <div className="container-x py-2">
      <h2 className="font-bold my-2">{ t('_product.Products') }</h2>
      <SingleList
          data={products}
          className="list-x"
          renderDataItem={(item)=> (
            <li key={`product-${item.id}`}> <ProductItem product={item} /> </li>
          )}
          footer={useRenderListFooter(
            productsFetchStatus,
            ()=> <li key="products-footer"> <Loading /> </li>, 
            ()=> <li key="products-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="products-footer"> <EmptyList text="_empty.No_product" icon={productIcon} /> </li>
          )}
          />
    </div>
  );
}

export default function Home() {

  const [
    categories, 
    categoriesFetchStatus, 
    refetchCategories
  ] = useHomeCategoryList();

  const [
    stores, 
    storesFetchStatus, 
    refetchStores
  ] = useHomeStoreList(categoriesFetchStatus === FETCH_STATUSES.DONE);

  const [
    products, 
    productsFetchStatus,
    refetchProducts
  ] = useHomeProductList(storesFetchStatus === FETCH_STATUSES.DONE);

  return (
    <section>

      <div className="container-x">
        <CarouselX items={CAROUSEL_IMGS} />
      </div>

      <Categories 
        categories={categories}
        categoriesFetchStatus={categoriesFetchStatus}
        refetch={refetchCategories}
        />

      {
        categoriesFetchStatus === FETCH_STATUSES.DONE &&
        <Stores 
          stores={stores}
          storesFetchStatus={storesFetchStatus}
          refetch={refetchStores}
          />
      }

      {
        storesFetchStatus === FETCH_STATUSES.DONE &&
        <Products 
          products={products}
          productsFetchStatus={productsFetchStatus}
          refetch={refetchProducts}
          />
      }

    </section>
  );
}


