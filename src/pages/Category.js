
import React from 'react';
import { useTranslation } from 'react-i18next';
import { categoryIcon, editIcon } from '../assets/icons';
import AddButton from '../components/AddButton';
import CategoryItem from '../components/list_item/CategoryItem';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import ProfileDetails from '../components/profile/ProfileDetails';
import ProfileHeader from '../components/profile/ProfileHeader';
import Reload from '../components/Reload';
import { useCategoryFetch } from '../hooks/category/categoryFetchHook';
import { useHeader } from '../hooks/headerHook';
import { useRenderOnDataFetched } from '../hooks/viewHook';


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
          }
        ]}
        />

      <div>
        {
          isAdmin && <AddButton text="_category.Add_sub_category" href={`/sub-category/add?category=${category.id}`} />
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

  const [
    category, 
    categoryFetchStatus, 
    refetch
  ] = useCategoryFetch();

  useHeader({ 
    title: `${category?.name ?? 'Loading...'} - Category`,
    headerTitle: '_category.Category'
  });

  return (
    <section>
      <div className="container-x">

        {
          useRenderOnDataFetched(
            categoryFetchStatus,
            ()=> <Profile category={category} isAdmin={isAdmin} />,
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />
          )
        }

      </div>
    </section>
  );
}
