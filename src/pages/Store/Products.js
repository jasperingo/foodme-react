
import React from 'react';
//import { useTranslation } from 'react-i18next';
import { URL } from '../../apps/StoreApp';
import AddButton from '../../components/AddButton';
import ProductItem from '../../components/ProductItem';

export default function Products() {

  //const { t } = useTranslation();

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_product.Add_product" href={URL+'/products'} />
      
        <ul className="list-x">
          <ProductItem prod={{
            "id": 1,
            "title": "Egusi soup",
            "sub_title": "Egusi with fish and meat",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "unit": "plate",
            "price": 620.59,
            "photo": "p1.jpg",
            "store": {
              "id" : 1
            }
          }} />
          <ProductItem prod={{
            "id": 1,
            "title": "Egusi soup",
            "sub_title": "Egusi with fish and meat",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "unit": "plate",
            "price": 620.59,
            "photo": "p1.jpg",
            "store": {
              "id" : 1
            }
          }} />
          <ProductItem prod={{
            "id": 1,
            "title": "Egusi soup",
            "sub_title": "Egusi with fish and meat",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "unit": "plate",
            "price": 620.59,
            "photo": "p1.jpg",
            "store": {
              "id" : 1
            }
          }} />
        </ul>

      </div>
      
    </section>
  );
}

