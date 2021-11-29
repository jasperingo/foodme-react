
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AdminApp from '../../apps/AdminApp';
import CustomerItem from '../../components/CustomerItem';
import DeliveryFirmItem from '../../components/DeliveryFirmItem';
import OrderItem from '../../components/OrderItem';
import StoreItem from '../../components/StoreItem';
import { useMoneyFormat } from '../../context/AppHooks';

function H3({ text, viewAllHref }) {
  const { t } = useTranslation();
  return (
    <h3 className="flex mb-1">
      <span className="font-bold flex-grow">{ t(text) }</span>
      { viewAllHref && <Link to={viewAllHref} className="text-color-primary">{ t('_extra.View_all') }</Link> }
    </h3>
  );
}

function StatisticsData({ number, text, amount }) {

  const { t } = useTranslation();

  const _amount = useMoneyFormat(amount || 0);

  return (
    <li className="flex-grow w-1/3 md:w-1/4">
      <div className="shadow p-3 rounded">
        { number && <div className="font-bold">{ number }</div> }
        { amount && <div className="font-bold">{ _amount }</div> }
        <div className="text-sm">{ t(text) }</div>
      </div>
    </li>
  );
}

export default function Dashboard() {
  return (
    <section>
      <div className="container-x">
        
        <div className="my-4">
          <H3 text="_extra.Statistics" />
          <ul className="flex gap-2 flex-wrap mb-8 md:gap-4">
            <StatisticsData number={500} text="_user.Customers" />
            <StatisticsData number={50} text="_store.Stores" />
            <StatisticsData number={12} text="_delivery.Logistics" />
            <StatisticsData number={1938} text="_order.Orders" />
            <StatisticsData amount={500989.89} text="_transaction.Earnings" />
          </ul>
        </div>

        <div className="my-4">
          <H3 text="_order.Recent_orders" viewAllHref="/orders" />
          <ul className="list-2-x">
            <OrderItem 
              key={`order-${1}`} 
              order={{
                id: 1,
                customer_name: "John Doe",
                store_name: "Favour Stores",
                total: 300,
                status: "delivered",
                created_at: "12 June 2021"
              }} 
              href={`/order/${1}`} 
              appType={AdminApp.TYPE}
              />

            <OrderItem 
              key={`order-${2}`} 
              order={{
                id: 2,
                customer_name: "Gift Israel",
                store_name: "Black wears Stores",
                total: 25000.45,
                status: "in-transit",
                created_at: "6 June 2021"
              }} 
              href={`/order/${2}`} 
              appType={AdminApp.TYPE}
              />
          </ul>
        </div>

        <div className="my-4">
          <H3 text="_user.Recent_customers" viewAllHref="/customers" />
          <ul className="list-2-x">
            <CustomerItem 
              customer={{
                id: 1,
                first_name: 'John',
                last_name: 'Fisher',
                photo: 'user.jpg'
              }}
             />

            <CustomerItem 
              customer={{
                id: 2,
                first_name: 'Glory',
                last_name: 'Rooney',
                photo: 'user.jpg'
              }}
             />
          </ul>
        </div>

        <div className="my-4">
          <H3 text="_store.Recent_stores" viewAllHref="/stores" />
          <ul className="list-x">
              <li>
                <StoreItem store={{
                  id : 1,
                  name : "Grill D' Punch",
                  logo : "r1.webp",
                  address : "Ihiagwa, Owerri",
                  ratings : 4.7
                }}
                />
              </li>

              <li>
                <StoreItem store={{
                    id : 1,
                    name : "Flat cakes kiosk",
                    logo : "r2.jpg",
                    address : "Oji, Owerri",
                    ratings : 2.4
                  }}
                  />
              </li>
            </ul>
        </div>

        <div className="my-4">
          <H3 text="_delivery.Recent_delivery_firms" viewAllHref="/delivery-firms" />
          <ul className="list-x">
            <DeliveryFirmItem
              delivery={{
                id: 1,
                name: 'FastGo logistics',
                photo: 'delivery.jpeg',
                ratings: 4
              }}
              />

            <DeliveryFirmItem
              delivery={{
                id: 2,
                name: 'Godwill packages',
                photo: 'delivery.jpeg',
                ratings: 2
              }}
              />
          </ul>
        </div>

      </div>
    </section>
  );
}


