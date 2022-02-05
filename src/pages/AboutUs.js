
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { deliveryIcon, discountIcon, storeIcon } from '../assets/icons';
import { useHeader } from '../hooks/headerHook';


const h2Style = "font-bold text-xl mb-2";

function AboutFeature({ icon, text }) {

  return (
    <li className="mb-2 border rounded md:flex-grow md:hover:bg-gray-200">
      <div className="my-4 p-4">
        <div className="text-yellow-500">
          <Icon path={icon} className="w-6 h-6 mx-auto text-yellow-500" />
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

  useHeader({
    title: `About Us - Dailyneeds`,
    headerTitle: '_extra.About_us'
  });

  const { t } = useTranslation();

  return (
    <section className="md:text-center">

      <div>
      
        <div className="container-x md:max-w-2xl">
          
          <div className="py-4">
            <h2 className={h2Style}>{ t('Who_we_are') }</h2>
            <p className="mb-4">
              Hello and welcome to Dailyneeds! We are an e-commerce company where you can discover and shop for your daily consumer products such as dishes, groceries, drugs, etc for every taste and occasion. 
            </p>
            <p className="mb-4">
              Starting as a small business in Owerri City, Imo State in Nigeria, we have big dreams. Our ambition is to grow across and beyond the country and to continue providing our customers with products that keep them happy, at prices that keep them happy. With a motivated and creative team, we’re always looking for innovative new ways to get the best to them. We strive daily to be industrious, innovative, build long-lasting and meaningful relations that bring smiles to their faces. 
            </p>
            <p className="mb-4">
              We always keep an eye on the latest trends in food, groceries, drugs, etc and put our customers’ wishes first. We aim to offer our customers a variety of the latest Daily consumer needs such as food, drugs, groceries, etc. If you’re looking for something new, you’re in the right place. 
            </p>
            <p className="mb-4">
              We thoroughly check the quality of goods on our platform, working only with reliable suppliers so that our customers only receive the best quality product that are guaranteed to meet their needs and keep them satisfied. We’ve come a long way, so we know exactly which direction to take when supplying you with high quality yet budget-friendly products. 
            </p>
            <p className="mb-4">
              Most importantly, we believe shopping is a right, not a luxury, so we strive to deliver the best products at the most affordable prices, and ship them to you regardless of where you are located. We believe passionately in great bargains and excellent service, which is why we commit ourselves to giving you the best of both. Our customers are always our top priority. We offer all of this while providing excellent customer service and friendly support. 
            </p>
            <p className="mb-4">
              That is why we have satisfied customers all over the place, and are thrilled to be a part of the Consumer needs industry. We hope you will enjoy shopping your daily needs on our platform as much as we enjoy making them available to you.
            </p>
          </div>

          <div className="py-4">
            <h2 className={h2Style}>{ t('Why_our_customers_choose_us') }</h2>
            <ul className="md:flex md:gap-2">
              <AboutFeature icon={deliveryIcon} text={ t('Express_Delivery') } />
              <AboutFeature icon={storeIcon} text={ t('_store.store__Num', { num : '50+' }) } />
              <AboutFeature icon={discountIcon} text={ t('Discount_System') } />
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

