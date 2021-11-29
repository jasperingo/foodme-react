
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function CarouselX({ items }) {

  return (
    <Carousel className="my-4">
      {
        items.map((item, i)=> (
          <Carousel.Item key={i}>
            <img
              className="block w-full h-52 rounded filter brightness-75 md:h-96"
              src={`/photos${item.photo}`}
              alt={item.title}
            />
            <Carousel.Caption>
              <h3 className="font-bold text-3xl">{ item.title }</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      }
    </Carousel>
  );
}
