
import React from 'react';
import ProductItem from '../../components/ProductItem';

export default function Favourites() {
  return (
    <section className="flex-grow">
      <div className="container-x">
        
        <ul className="list-2-x">
          <li>
            <ProductItem 
              prod={{
                id: 1,
                title: "Egusi soup",
                sub_title: "Egusi with fish and meat",
                desc: "Lorem ipsum dolor sit ametagna aliqua. Ut enim ad minim veniam",
                unit: "plate",
                price: 620.59,
                photo: "p1.jpg",
                store: {
                  id : 1,
                  name: 'Rack it mini mart'
                }
              }}
              layout={ProductItem.LAYOUT_LIST}
              />
          </li>
          <li>
            <ProductItem 
              prod={{
                id: 1,
                title: "Milo 900kg",
                sub_title: "Nestle milo",
                desc: "Lorem ipsum dolor sit amet,",
                unit: "tin",
                price: 3500.00,
                photo: "p2.jpg",
                store: {
                  id : 1,
                  name: 'Shola shop'
                }
              }}
              layout={ProductItem.LAYOUT_LIST}
              />
          </li>
        </ul>
      </div>
    </section>
  );
}
