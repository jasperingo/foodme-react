
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { adminIcon, dashboardIcon, messageIcon, orderIcon, transactionIcon } from '../assets/icons';
import { useAppContext } from '../hooks/contextHook';
import { useAdminAuthFetch } from '../hooks/admin/adminAuthFetchHook';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Splash from '../pages/Splash';
import LogIn from '../pages/Admin/LogIn';
import Dashboard from '../pages/Admin/Dashboard';
import Orders from '../pages/Admin/Orders';
import Transactions from '../pages/Admin/Transactions';
import Chats from '../pages/Admin/Chats';
import AccountMenu from '../pages/Admin/AccountMenu';
import Profile from '../pages/Admin/Profile';
import PasswordUpdate from '../pages/Admin/PasswordUpdate';
import Customers from '../pages/Admin/Customers';
import Customer from '../pages/Admin/Customer';
import CustomerUpdate from '../pages/Admin/CustomerUpdate';
import Stores from '../pages/Admin/Stores';
import Store from '../pages/Admin/Store';
import StoreUpdate from '../pages/Admin/StoreUpdate';
import DeliveryFirms from '../pages/Admin/DeliveryFirms';
import DeliveryFirm from '../pages/Admin/DeliveryFirm';
import DeliveryFirmUpdate from '../pages/Admin/DeliveryFirmUpdate';
import Categories from '../pages/Categories';
import Category from '../pages/Category';
import CategoryAdd from '../pages/Admin/CategoryAdd';
import CategoryUpdate from '../pages/Admin/CategoryUpdate';
import SubCategoryAdd from '../pages/Admin/SubCategoryAdd';
import SubCategoryUpdate from '../pages/Admin/SubCategoryUpdate';
import Product from '../pages/Admin/Product';
import Discount from '../pages/Discount';
import Order from '../pages/Order';
import Transaction from '../pages/Transaction';
import DeliveryRoute from '../pages/DeliveryRoute';
import TermsOfService from '../pages/TermsOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import ContactUs from '../pages/ContactUs';
import AboutUs from '../pages/AboutUs';
import ForgotPassword from '../pages/ForgotPassword';
import ProductUpdate from '../pages/Admin/ProductUpdate';
import Home from '../pages/Admin/Home';
import Promotions from '../pages/Admin/Promotions';
import Promotion from '../pages/Admin/Promotion';
import PromotionCreate from '../pages/Admin/PromotionCreate';
import NotFoundPage from '../pages/NotFoundPage';
import { useAuthMiddleware, useGuestMiddleware } from '../hooks/authHook';

const HEADER_NAV_LINKS = [
  { href: '/', exclude: true },
  { title : '_extra.Dashboard', icon: dashboardIcon, href: '/dashboard' },
  { title : '_order.Orders', icon: orderIcon, href: '/orders' },
  { title : '_transaction.Transactions', icon: transactionIcon, href: '/transactions' },
  { title : '_user.Account', icon: adminIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_message.Messages', icon: messageIcon, href: '/messages', useCounter: ()=> 0 },
];

export default function AdminApp() {

  const { 
    admin: { 
      admin: {
        admin,
        adminToken
      }
    } 
  } = useAppContext();

  const authMiddleware = useAuthMiddleware(admin);

  const guestMiddleware = useGuestMiddleware(admin, '/dashboard');

  const [adminId, fetchAdmin, error] = useAdminAuthFetch();

  useEffect(
    function() {
      if (admin === null && adminId !== null && error === null)
        fetchAdmin();
    },
    [admin, adminId, error, fetchAdmin]
  );
  
  if (admin === null && adminId !== null) {
    return <Splash onRetry={fetchAdmin} error={error} />;
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

          <Route path="/promotion/create" render={()=> authMiddleware() || <PromotionCreate />} />
          <Route path="/promotion/:ID" render={()=> authMiddleware() || <Promotion />} />
          <Route path="/promotions" render={()=> authMiddleware() || <Promotions />} />
          <Route path="/transaction/:ID" render={()=> authMiddleware() || <Transaction userToken={adminToken} canProcessAndDecline={true} />} />
          <Route path="/order/:ID" render={()=> authMiddleware() || <Order userToken={adminToken} isAdmin={true} />} />
          <Route path="/delivery-route/:ID" render={()=> authMiddleware() || <DeliveryRoute userToken={adminToken} isDelieryFirm={false} />} />
          <Route path="/discount/:ID" render={()=> authMiddleware() || <Discount userToken={adminToken} />} />
          <Route path="/product/:ID/update" render={()=> authMiddleware() || <ProductUpdate />} />
          <Route path="/product/:ID" render={()=> authMiddleware() || <Product />} />
          <Route path="/delivery-firm/:ID/update" render={()=> authMiddleware() || <DeliveryFirmUpdate />} />
          <Route path="/delivery-firm/:ID" render={()=> authMiddleware() || <DeliveryFirm />} />
          <Route path="/delivery-firms" render={()=> authMiddleware() || <DeliveryFirms />} />
          <Route path="/store/:ID/update" render={()=> authMiddleware() || <StoreUpdate />} />
          <Route path="/store/:ID" render={()=> authMiddleware() || <Store />} />
          <Route path="/stores" render={()=> authMiddleware() || <Stores />} />
          <Route path="/customer/:ID/update" render={()=> authMiddleware() || <CustomerUpdate />} />
          <Route path="/customer/:ID" render={()=> authMiddleware() || <Customer />} />
          <Route path="/customers" render={()=> authMiddleware() || <Customers />} />
          <Route path="/sub-category/:ID/update" render={()=> authMiddleware() || <SubCategoryUpdate />} />
          <Route path="/sub-category/add" render={()=> authMiddleware() || <SubCategoryAdd />} />
          <Route path="/category/:ID/update" render={()=> authMiddleware() || <CategoryUpdate />} />
          <Route path="/category/add" render={()=> authMiddleware() || <CategoryAdd />} />
          <Route path="/category/:ID" render={()=> authMiddleware() || <Category isAdmin={true} />} />
          <Route path="/categories" render={()=> authMiddleware() || <Categories isAdmin={true} />} />
          <Route path="/settings/password" render={()=> authMiddleware() || <PasswordUpdate />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/messages" render={()=> authMiddleware() || <Chats />} />
          <Route path="/transactions" render={()=> authMiddleware() || <Transactions />} />
          <Route path="/orders" render={()=> authMiddleware() || <Orders />} />
          <Route path="/dashboard" render={()=> authMiddleware() || <Dashboard />} /> 
          <Route path="/forgot-password" render={()=> guestMiddleware() || <ForgotPassword administrator={true} />} />
          <Route path="/login" render={()=> guestMiddleware() || <LogIn />} />
          <Route path="/" exact render={()=> guestMiddleware() || <Home />} />
          <Route path="*" render={()=> <NotFoundPage />} />
        </Switch>
      </main>
      <Footer noRegister={true} />
    </>
  );
}
