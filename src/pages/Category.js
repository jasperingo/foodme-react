
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
import { useRenderOnDataFetched } from '../hooks/viewHook';


function Profile({ category, canAdd }) {

  const { t } = useTranslation();

  const topLinks = [];

  if (canAdd) {
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
          canAdd && <AddButton text="_category.Add_sub_category" href={`/sub-category/add?category=${category.id}`} />
        }
        <ul className="category-list">
          {
            category.sub_categories.map((item, i)=> (
              <CategoryItem 
                key={`sub-category-${item.id}`} 
                path={category.type}
                category={item} 
                index={i} 
                sub={true} 
                canEdit={false}
                />
            ))
          }
        </ul>
      </div>
    </>
  );
}


export default function Category() {

  const [
    category, 
    categoryFetchStatus, 
    refetch
  ] = useCategoryFetch();

  return (
    <section>
      <div className="container-x">

        {
          useRenderOnDataFetched(
            categoryFetchStatus,
            ()=> <Profile category={category} />,
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />
          )
        }

      </div>
    </section>
  );
}
