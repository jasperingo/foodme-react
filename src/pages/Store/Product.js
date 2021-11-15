
import React from 'react';
import ProductProfile from '../../components/ProductProfile';

export default function Product() {
  return (
    <section>
      <div className="md:container mx-auto">
        
        <div className="lg:flex lg:items-start lg:gap-2 lg:mt-4">
          
          <ProductProfile product={{
            id: 1,
            title: "Egusi soup",
            sub_title: "Egusi with fish and meat",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            unit: "Plate",
            price: 620.59,
            photo: "p1.jpg",
            availability_status: "available", 
          }} />
          
        </div>

      </div>
    </section>
  );
}
