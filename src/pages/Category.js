
import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { categoryIcon, editIcon } from '../assets/icons';
import AddButton from '../components/AddButton';
import CategoryItem from '../components/list_item/CategoryItem';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import ProfileDetails from '../components/profile/ProfileDetails';
import ProfileHeader from '../components/profile/ProfileHeader';
import Reload from '../components/Reload';
import NetworkErrorCodes from '../errors/NetworkErrorCodes';
import { useCategoryFetch } from '../hooks/category/categoryFetchHook';
import { useHeader } from '../hooks/headerHook';

function Profile({ category, isAdmin }) {

  const { t } = useTranslation();

  const topLinks = [];

  if (isAdmin) {
    topLinks.push({
      href: `/category/${category.id}/update`,
      title: '_extra.Edit',
      icon: editIcon
    });
  }
  
  return (
    <>
      <ProfileHeader 
        photo={category.photo.href}
        name={category.name}
        links={topLinks}
        />
      
      <ProfileDetails
        details={[
          {
            icon: categoryIcon,
            data: t('_category.sub_category__Count', { count: category.sub_categories.length })
          },
          {
            icon: editIcon,
            data: category.description
          }
        ]}
        />

      <div>
        {
          isAdmin && <AddButton text="_category.Add_sub_category" href={`/sub-category/add?category_id=${category.id}`} />
        }
        <ul className="category-list">
          {
            category.sub_categories.map((item, i)=> (
              <CategoryItem 
                key={`sub-category-${item.id}`} 
                path={category.type+'s'}
                category={item} 
                index={i} 
                sub={true} 
                canEdit={isAdmin}
                />
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default function Category({ isAdmin }) {

  const { ID } = useParams();

  const [
    fetchCategory,
    category,
    categoryLoading,
    categoryError,
    categoryID,
    unfetchCategory
  ] = useCategoryFetch();

  useHeader({ 
    title: `${category?.name ?? 'Loading...'} - Category`,
    headerTitle: '_category.Category'
  });

  const fetch = useCallback(
    function(ID) {
      if (!categoryLoading) fetchCategory(ID);
    },
    [categoryLoading, fetchCategory]
  );

  useEffect(
    function() {
      if ((category !== null || categoryError !== null) && categoryID !== ID) 
        unfetchCategory();
      else if (category === null && categoryError === null)
        fetch(ID);
    },
    [ID, category, categoryError, categoryID, fetch, unfetchCategory]
  );

  return (
    <section>
      <div className="container-x">

        { category !== null && <Profile category={category} isAdmin={isAdmin} /> }

        { categoryLoading && <Loading /> }

        { categoryError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        
        { categoryError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetch(ID)} /> }

        { categoryError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetch(ID)} /> }

      </div>
    </section>
  );
}
