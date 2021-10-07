
import React from 'react';
import { useTranslation } from 'react-i18next';
import StoreItem from '../components/StoreItem';
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

      <div className="md:container mx-auto">
        
        <div className="lg:flex lg:items-start lg:gap-2">

          <div className="lg:w-1/3">
            <div className="container mx-auto">
              <img 
                src="/photos/products/p1.jpg" 
                alt="Pic"
                className="h-60 w-full lg:h-96 sm:rounded"
                />
            </div>
          </div>

          <div className="container-x py-4 flex-grow lg:w-1/2 lg:pt-0">

            <div className="font-bold text-2xl text-color-primary mb-2">&#8358; 58903.98</div>

            <div className="text-xl mb-2">Fried rice salad and chicken</div>

            <div className="text-color-gray text-sm mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit</div>
            
            <div className="mb-2">
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

            <button className="w-full bg-color-primary text-white my-4 py-3 px-5 font-bold rounded lg:w-auto">Add to cart</button>

            <div className="p-2 border rounded">
              <div className="max-h-40 overflow-auto">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
              </div>
            </div>

          </div>

        </div>

        <div className="md:flex md:items-start md:gap-2">

          <div className="container-x md:w-1/6">
            <h3 className="font-bold mb-1">Product Store</h3>
            <StoreItem 
              store={{
                id: 34, 
                logo: 'r2.jpg',
                name: 'Everest foods',
                address: 'Ihiagwa, Owerri', 
                ratings: 3.2
              }}
              />   
          </div>

          <div className="container-x flex-grow md:w-1/2">
            <h3 className="font-bold mb-1">Reviews</h3>
            <div>
              LOADING...
            </div>
          </div>

        </div>

        <div className="container-x py-4">
          <h3 className="font-bold mb-1">Releted products</h3>
          <div>
              LOADING...
          </div> 
        </div>

      </div>

    </section>
  );
}

