
import React from 'react'
import { useTranslation } from 'react-i18next';
import { categoryIcon } from '../../assets/icons';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useListFooter } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import CategoryItem from '../list_item/CategoryItem';
import Loading from '../Loading';
import Reload from '../Reload';
import SingleList from './SingleList';

export default function CategoryList(
  { headerText, grid, categories, categoriesLoading, categoriesLoaded, categoriesError, fetchCategories }
) {

  const { t } = useTranslation();

  const listFooter = useListFooter();

  return (
    <div className="container-x py-2">
      <h3 className="font-bold my-2">{ t(headerText) }</h3>
      <SingleList
        data={categories}
        className={ grid ? 'grid gap-4 grid-cols-3 md:grid-cols-4' : 'category-list'}
        renderDataItem={(item)=> (
          <CategoryItem 
            grid={grid}
            category={item} 
            key={`category-${item.id}`}
            />
        )}
        footer={listFooter([
          { 
            canRender: categoriesLoading, 
            render() { 
              return <li key="category-footer" className="col-span-3"> <Loading /> </li>;
            }
          }, 
          { 
            canRender: categoriesError === NetworkErrorCodes.UNKNOWN_ERROR, 
            render() { 
              return <li key="category-footer" className="col-span-3"> <Reload action={fetchCategories} /> </li>;
            }
          },
          { 
            canRender: categoriesError === NetworkErrorCodes.NO_NETWORK_CONNECTION, 
            render() { 
              return <li key="category-footer" className="col-span-3"> <Reload message="_errors.No_netowrk_connection" action={fetchCategories} /> </li>;
            }
          },
          { 
            canRender: categoriesLoaded && categories.length === 0, 
            render() { 
              return <li key="category-footer" className="col-span-3"> <EmptyList text="_empty.No_category" icon={categoryIcon} /> </li>;
            }
          },
        ])}
        />
    </div>
  );
}
