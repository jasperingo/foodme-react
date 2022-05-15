
import React, { useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import { cartIcon, discountIcon, messageIcon, orderIcon, productIcon, storeIcon } from '../assets/icons';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import { useAppContext } from '../hooks/contextHook';
import { useStoreAuthFetch } from '../hooks/store/storeAuthFetchHook';
import { useCartCounter } from '../hooks/viewHook';
import Splash from '../pages/Splash';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import ForgotBusinessPassword from '../pages/ForgotBusinessPassword';
import LogIn from '../pages/Store/LogIn';
import Register from '../pages/Store/Register';
import AccountMenu from '../pages/Store/AccountMenu';
import Profile from '../pages/Store/Profile';
import PasswordUpdate from '../pages/Store/PasswordUpdate';
import WithdrawalAccountUpdate from '../pages/Store/WithdrawalAccountUpdate';
import AddressUpdate from '../pages/Store/AddressUpdate';
import WorkingHoursUpdate from '../pages/Store/WorkingHoursUpdate';
import Wallet from '../pages/Store/Wallet';
import Transaction from '../pages/Transaction';
import SavedCarts from '../pages/Store/SavedCarts';
import SavedCart from '../pages/SavedCart';
import Reviews from '../pages/Store/Reviews';
import Discounts from '../pages/Store/Discounts';
import Discount from '../pages/Discount';
import DiscountCreate from '../pages/Store/DiscountCreate';
import DiscountUpdate from '../pages/Store/DiscountUpdate';
import Orders from '../pages/Store/Orders';
import Products from '../pages/Store/Products';
import ProductCreate from '../pages/Store/ProductCreate';
import Product from '../pages/Store/Product';
import ProductUpdate from '../pages/Store/ProductUpdate';
import ProductVariantCreate from '../pages/Store/ProductVariantCreate';
import ProductVariantUpdate from '../pages/Store/ProductVariantUpdate';
import Cart from '../pages/Store/Cart';
import DiscountProductCreate from '../pages/Store/DiscountProductCreate';
import Home from '../pages/Store/Home';
import Chats from '../pages/Store/Chats';
import Order from '../pages/Order';
import DeliveryFirm from '../pages/Store/DeliveryFirm';
import Customer from '../pages/Customer';
import NotFoundPage from '../pages/NotFoundPage';
import { useAuthMiddleware, useGuestMiddleware } from '../hooks/authHook';

const HEADER_NAV_LINKS = [
  { href: '/', exclude: true },
  { title : '_product.Products', icon: productIcon, href: '/products' },
  { title : '_order.Orders', icon: orderIcon, href: '/orders' },
  { title: '_discount.Discounts', icon: discountIcon, href: '/discounts' },
  { title : '_user.Account', icon: storeIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_cart.Cart', icon: cartIcon, href: '/cart', useCounter: useCartCounter },
  { title : '_message.Messages', icon: messageIcon, href: '/messages', useCounter: ()=> 0 }
];

export default function StoreApp() {

  const { 
    store: { 
      store: {
        store,
        storeToken
      }
    } 
  } = useAppContext();

  const authMiddleware = useAuthMiddleware(store);

  const guestMiddleware = useGuestMiddleware(store, '/products');

  const [storeId, fetchStore, error] = useStoreAuthFetch();

  useEffect(
    function() {
      if (store === null && storeId !== null && error === null)
        fetchStore();
    },
    [store, storeId, error, fetchStore]
  );

  if (store === null && storeId !== null) {
    return <Splash onRetry={fetchStore} error={error} />;
  }

  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        />
      <main className="pb-64 md:pb-52">
        <Switch>
          
          <Route path="/terms-of-service" render={()=> <TermsOfService />} /> 
          <Route path="/privacy-policy" render={()=> <PrivacyPolicy />} /> 
          <Route path="/contact-us" render={()=> <ContactUs />} />
          <Route path="/about-us" render={()=> <AboutUs />} /> 
          <Route path="/forgot-password" render={()=> guestMiddleware() || <ForgotBusinessPassword store={true} />} />

          <Route path="/cart" render={()=> authMiddleware() || <Cart />} />
          
          <Route path="/delivery-firm/:ID" render={()=> authMiddleware() || <DeliveryFirm />} />
          <Route path="/customer/:ID" render={()=> authMiddleware() || <Customer userToken={storeToken} />} />
          <Route path="/product-variant/create" render={()=> authMiddleware() || <ProductVariantCreate />} />
          <Route path="/product-variant/:ID" render={()=> authMiddleware() || <ProductVariantUpdate />} />
          <Route path="/product/:ID/update" render={()=> authMiddleware() || <ProductUpdate />} />
          <Route path="/product/create" render={()=> authMiddleware() || <ProductCreate />} />
          <Route path="/product/:ID" render={()=> authMiddleware() || <Product />} />
          <Route path="/products" render={()=> authMiddleware() || <Products />} />
          <Route path="/order/:ID" render={()=> authMiddleware() || <Order userToken={storeToken} isStore={true} />} />
          <Route path="/orders" render={()=> authMiddleware() || <Orders />} />
          <Route path="/discount/:ID/discount-product/create" render={()=> authMiddleware() || <DiscountProductCreate />} />
          <Route path="/discount/:ID/update" render={()=> authMiddleware() || <DiscountUpdate />} />
          <Route path="/discount/create" render={()=> authMiddleware() || <DiscountCreate />} />
          <Route path="/discount/:ID" render={()=> authMiddleware() || <Discount userToken={storeToken} isStore={true} />} />
          <Route path="/discounts" render={()=> authMiddleware() || <Discounts />} />
          <Route path="/messages" render={()=> authMiddleware() || <Chats />} />
          <Route path="/reviews" render={()=> authMiddleware() || <Reviews />} />
          <Route path="/saved-cart/:ID" render={()=> authMiddleware() || <SavedCart userToken={storeToken} />} />
          <Route path="/saved-carts" render={()=> authMiddleware() || <SavedCarts />} />
          <Route path="/transaction/:ID" render={()=> authMiddleware() || <Transaction userToken={storeToken} canCancel={true} />} />
          <Route path="/wallet" render={()=> authMiddleware() || <Wallet />} />
          <Route path="/settings/working-hours" render={()=> authMiddleware() || <WorkingHoursUpdate />} />
          <Route path="/settings/address" render={()=> authMiddleware() || <AddressUpdate />} />
          <Route path="/settings/withdrawal-account" render={()=> authMiddleware() || <WithdrawalAccountUpdate />} />
          <Route path="/settings/password" render={()=> authMiddleware() || <PasswordUpdate />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/register" render={()=> guestMiddleware() || <Register />} /> 
          <Route path="/login" render={()=> guestMiddleware() || <LogIn />} />
          <Route path="/" render={()=> guestMiddleware() || <Home />} />
          <Route path="*" exact render={()=> <NotFoundPage />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}
