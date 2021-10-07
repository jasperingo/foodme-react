
import React from 'react';
import { useTranslation } from 'react-i18next';
import SubHeader from '../components/SubHeader';
import AddRoundIcon from '../icons/AddRoundIcon';
import RemoveRoundIcon from '../icons/RemoveRoundIcon';

function QuantityChangeButton({ text, Icon }) {

  const { t } = useTranslation();

  return (
    <button>
      <Icon classList="fill-current text-color-primary" />
      <span className="sr-only">{ t(text) }</span>
    </button>
  );
}

export default function Product() {

  const { t } = useTranslation();

  return (
    <section>

      <SubHeader title="Product" />

      <div className="lg:container">
        
        <div>
          <img 
            src="/photos/products/p1.jpg" 
            alt="Pic"
            className="h-60"
            />
        </div>

        <div className="p-2">

          <div className="font-bold text-2xl text-color-primary mb-1">&#8358; 58903.98</div>

          <div className="text-xl mb-1">Fried rice salad and chicken</div>

          <div className="text-color-gray text-sm  mb-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit</div>
          
          <div className="mb-1">
            <div className="text-sm mb-1">{ t('_product.Quantity') }</div>
            <div className="flex items-center">
              <QuantityChangeButton text="_product.Decrease_quantity" Icon={RemoveRoundIcon} />
              <input 
                type="number"
                value="1"
                className="bg-color-gray mx-2 p-1 rounded w-20"
                />
              <QuantityChangeButton text="_product.Increase_quantity" Icon={AddRoundIcon} />
              <div className="ml-2 font-bold">Plates</div>
            </div>
          </div>

          <button className="w-full bg-color-primary text-white my-4 py-3 px-5 font-bold rounded">Add to cart</button>

          <div className="p-2 shadow rounded">
            <div className="max-h-40 overflow-auto">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

