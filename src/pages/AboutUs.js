
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SubHeader from '../components/SubHeader';
import DeliveryIcon from '../icons/DeliveryIcon';
import ResturantIcon from '../icons/ResturantIcon';
import DiscountIcon from '../icons/DiscountIcon';


const h2Style = "font-bold text-xl mb-2";

function AboutFeature({ Icon, text }) {

  return (
    <li className="md:flex-grow md:border md:rounded md:hover:bg-gray-200">
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
        <div className="absolute bottom-0 left-0 text-white w-full bg-black bg-opacity-50 p-2 rounded-b">
          { t(text) }
        </div>
      </Link>
    </li>
  );
}


export default function AboutUs() {

  const { t } = useTranslation();

  return (
    <section>

      <SubHeader title="About_us" />

      <div>
      
        <div className="container px-2 mx-auto">
          
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
              <AboutFeature Icon={ResturantIcon} text={ t('_num_Resturants', { num : '50+' }) } />
              <AboutFeature Icon={DiscountIcon} text={ t('Discount_System') } />
            </ul>
          </div>
          
        </div>

      </div>

      <div className="bg-gray-900">

        <div className="container px-2 mx-auto">
          
          <div className="py-10">
            <h2 className="text-white text-3xl font-bold mb-5">
              <span>{ t('Make_orders_with_our') }</span> 
              <span className="text-yellow-500"> { t('Application') }</span>
            </h2>
            <ul className="flex">
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

        <div className="container px-2 mx-auto">
          
          <div className="py-10">
            <h2 className={h2Style}>{ t('Partner_with_us') }</h2>
            <ul className="md:flex md:gap-2">
              <PartnerWithUsItem image="/photos/about-resturant.jpg" url="/about-us" text="Become_a_resturant_partner" />
              <PartnerWithUsItem image="/photos/about-delivery.jpg" url="/about-us" text="Become_a_courier_partner" />
            </ul>
          </div>
          
        </div>

      </div>

    </section>
  );
}

