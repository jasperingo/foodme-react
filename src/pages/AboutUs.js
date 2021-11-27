
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DeliveryIcon from '../icons/DeliveryIcon';
import DiscountIcon from '../icons/DiscountIcon';
import StoreIcon from '../icons/StoreIcon';


const h2Style = "font-bold text-xl mb-2";

function AboutFeature({ Icon, text }) {

  return (
    <li className="mb-2 border rounded md:flex-grow md:hover:bg-gray-200">
      <div className="my-4 p-4">
        <div className="text-yellow-500">
          <Icon classList="mx-auto text-yellow-500 fill-current" />
        </div>
        <div className="text-center font-bold">{ text }</div>
      </div>
    </li>
  );
}

function PartnerWithUsItem({ image, url, text }) {

  const { t } = useTranslation();

  return (
    <li className="mb-5 md:flex-grow">
      <Link to={ url } className="block relative mx-auto w-full h-52">
        <img 
          src={ image } 
          alt="resturant dinner table" 
          width="100" 
          height="100" 
          className="w-full h-full rounded" 
          />
        <div className="absolute bottom-0 left-0 text-white w-full bg-black bg-opacity-25 p-2 rounded-b">
          { t(text) }
        </div>
      </Link>
    </li>
  );
}


export default function AboutUs() {

  const { t } = useTranslation();

  return (
    <section className="md:text-center">

      <div>
      
        <div className="container-x md:max-w-2xl">
          
          <div className="py-4">
            <h2 className={h2Style}>{ t('Who_we_are') }</h2>
            <p>
              Mollit culpa nulla aliqua enim. Ullamco ad id est sunt officia occaecat nisi est nulla.
              Duis exercitation aute non culpa minim velit ea occaecat enim est commodo laborum adipisicing non. 
              Commodo proident qui pariatur nisi esse excepteur ea ullamco ea anim quis. 
            </p>
          </div>

          <div className="py-4">
            <h2 className={h2Style}>{ t('Why_our_customers_choose_us') }</h2>
            <ul className="md:flex md:gap-2">
              <AboutFeature Icon={DeliveryIcon} text={ t('Express_Delivery') } />
              <AboutFeature Icon={StoreIcon} text={ t('_store.store__Num', { num : '50+' }) } />
              <AboutFeature Icon={DiscountIcon} text={ t('Discount_System') } />
            </ul>
          </div>
          
        </div>

      </div>

      <div className="bg-gray-900">

        <div className="container-x md:max-w-2xl">
          
          <div className="py-10">
            <h2 className="text-white text-3xl font-bold mb-5">
              <span>{ t('Make_orders_with_our') }</span> 
              <span className="text-yellow-500"> { t('Application') }</span>
            </h2>
            <ul className="flex md:justify-center">
              <li>
                <a href="/about-us" className="border border-white text-white p-3 rounded block w-28 mr-2">Android</a>
              </li>
              <li>
                <a href="/about-us" className="border border-white text-white p-3 rounded block w-28">iOS</a>
              </li>
            </ul>
          </div>
          
        </div>
      </div>

      <div>

        <div className="container-x md:max-w-2xl">
          
          <div className="py-10">
            <h2 className={h2Style}>{ t('Partner_with_us') }</h2>
            <ul className="md:flex md:gap-2">
              <PartnerWithUsItem image="/photos/about-resturant.jpg" url="/about-us" text="_store.Become_a_store_partner" />
              <PartnerWithUsItem image="/photos/about-delivery.jpg" url="/about-us" text="_delivery.Become_a_courier_partner" />
            </ul>
          </div>
          
        </div>

      </div>

    </section>
  );
}

