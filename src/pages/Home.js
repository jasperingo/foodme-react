
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ResturantItem from '../components/ResturantItem';
import CategoriesIcon from '../icons/CategoriesIcon';

function CategoryItem({ name, iconColor }) {
  return (
    <li className="">
      <Link to="/" className={"block bg-white shadow-lg px-2 py-3 rounded text-center "+iconColor}>
        <CategoriesIcon />
        <div>{ name }</div>
      </Link>
    </li>
  );
}

export default function Home() {

  const { t } = useTranslation();

  return (
    <section>
      <div className="bg-gray-200">
        <ul className="grid grid-cols-3 md:grid-cols-4 gap-4 px-2 py-3">

          <CategoryItem name="African" iconColor="text-red-500" />

          <CategoryItem name="Snacks" iconColor="text-purple-500" />

          <CategoryItem name="Coffee" iconColor="text-red-500" />

          <CategoryItem name="Pizza" iconColor="text-blue-500" />

          <CategoryItem name="Chinese" iconColor="text-pink-500" />

          <CategoryItem name="Mexican" iconColor="text-green-500" />

        </ul>
      </div>

      <div>
        <h2 className="font-bold p-2 pb-0 text-lg">{ t('Recommended') }</h2>
        <ul className="p-2">
          <ResturantItem photo="r1.webp" name="Grill D' punch" location="Ihiagwa, Owerri" ratings="4.7" />
          <ResturantItem photo="r2.jpg" name="Mama Best" location="28 Douglas Road, Owerri" ratings="3.0" />
          <ResturantItem photo="r3.jpg" name="King chef arena" location="Nekede, Owerri" ratings="4.2" />
          <ResturantItem photo="r4.webp" name="Good food" location="42 Obinze, Owerri" ratings="4.9" />
        </ul>
      </div>
    </section>
  );
}


