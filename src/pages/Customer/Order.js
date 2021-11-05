
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useMoneyFormat } from '../../context/AppHooks';
import DeliveryIcon from '../../icons/DeliveryIcon';
import StoreIcon from '../../icons/StoreIcon';


function OrderItem({ item: { quantity, amount, delivery_fee, product: { photo, title } } }) {

  return (
    <li>
      <div className="mb-5">
        <div className="flex">
          <img 
            src={`/photos/products/${photo}`} 
            alt={'ja'} 
            className="w-20 h-20 border rounded block md:w-40 md:h-40" 
            />
          <div className="flex-grow pl-2">
            <h4 className="mb-1">{ title }</h4>
            <div className="font-bold mb-1">{ useMoneyFormat(amount) }</div>
            <div className="mb-1">
              <span>QTY: </span> 
              <span>{ quantity }</span>
            </div>
            <div className="text-sm text-blue-500">
              <span>Delivery: </span>
              <span className="">{ useMoneyFormat(delivery_fee) }</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Order() {

  const { t } = useTranslation();

  return (
    <section className="flex-grow">
      <div className="py-4 border-b">
        <div className="container-x">
          
          <h3 className="text-3xl font-bold">#092838</h3>
          <div>{ t('_order.item__Num', { count: 2 }) }</div>
          <div className="text-color-primary font-bold">
            <span>{ t('_extra.Total') }: </span> 
            <span>{ useMoneyFormat(460.45) }</span>
          </div>
          <div>
            <span>{ t('_order.Placed_on') }: </span>
            <span>20 June 2021</span>
          </div>
          <div className="my-2">
            <div className="text-sm font-bold">{ t('_order.Ordered_from') }</div>
            <Link to="/store/1/products" className="flex gap-1 items-center">
              <StoreIcon classList="text-color-primary w-8 h-8" />
              <div>Immaculate kitchen</div>
            </Link>
          </div>

          <button className="btn-color-primary p-2 rounded my-2">{ t('_order.Reorder') }</button>
        </div>
      </div>

      <div className="py-4 border-b">
        <div className="container-x lg:flex lg:gap-4">
          <div className="lg:w-1/2">
            <h4 className="font-bold py-2 text-color-primary">{ t('_order.Payment_information') }</h4>
            <dl>
              <div className="mb-2">
                <dt className="text-sm font-bold">Payment method</dt>
                <dd>Debit card</dd>
              </div>
              <div>
                <dt className="text-sm font-bold">Payment details</dt>
                <dd>
                  <ul>
                    <li>
                      <span>Items total: </span>
                      <span>{ useMoneyFormat(300) }</span>
                    </li>
                    <li>
                      <span>Delivery fee: </span>
                      <span>{ useMoneyFormat(50) }</span>
                    </li>
                    <li>
                      <span>Discount amount: </span>
                      <span>{ useMoneyFormat(6.89) }</span>
                    </li>
                    <li>
                      <span>Total: </span>
                      <span>{ useMoneyFormat(460.45) }</span>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div> 

          <div className="lg:w-1/2">
            <h4 className="font-bold py-2 text-color-primary">{ t('_order.Delivery_information') }</h4>
            <dl>
              <div className="mb-2">
                <dt className="text-sm font-bold">Delivery method</dt>
                <dd>Home delivery</dd>
              </div>
              <div className="mb-2">
                <dt className="text-sm font-bold">Delivery company</dt>
                <dd>
                  <div className="flex gap-1 items-center">
                    <DeliveryIcon classList="text-color-primary w-8 h-8" />
                    <div>Green logistics</div>
                  </div>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold">Delivery address</dt>
                <dd>Lorem ipsum dolor sit amet, consectetur adipisicing elit</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    

      <div className="py-4 border-b">
        <div className="container-x">
          <h4 className="font-bold py-2 text-color-gray">{ t('_order.Order_items') }</h4>
          <ul>
            <OrderItem item={{
              quantity: 2, 
              amount: 200.80, 
              delivery_fee: 40, 
              product: { 
                photo: 'p1.jpg', 
                title: 'Wallnuts prime' 
              }
            }} 
            />

            <OrderItem item={{
              quantity: 1, 
              amount: 4500.80, 
              delivery_fee: 500, 
              product: { 
                photo: 'p2.jpg', 
                title: 'Sushi smash' 
              }
            }} 
            />
          </ul>
        </div>
      </div>

      

    </section>
  );
}


