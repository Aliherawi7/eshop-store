import './App.css';
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Loading from './Component/UI/Loading/Loading';

const Home = React.lazy(() => import('./Component/Home/Home'));
const Store = React.lazy(() => import("./Component/Store/Store"));
const Login = React.lazy(() => import("./Component/Authentication/Login/Login"));
const Signup = React.lazy(() => import('./Component/Authentication/signup/signup'));
const ProductDetails = React.lazy(() => import('./Component/Store/ProductDetails/ProductDetails'));
const NotFound = React.lazy(() => import('./Component/Pages/NotFoundPage/NotFound'));
const SearchPage = React.lazy(() => import('./Component/Pages/SearchPage/SearchPage'));
const Checkout = React.lazy(() => import('./Component/Store/Checkout/Checkout'));
const About = React.lazy(() => import('./Component/Pages/About/About'));
const AdminPanel = React.lazy(()=> import('./Component/Admin-panel/AdminPanel'))
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/account" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/store/productdetails/:id" element={<ProductDetails />} />
            <Route path="/search/:id" element={<SearchPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path='/admin-panel' element={<AdminPanel />}/>
            <Route path="*" element={<NotFound size="large" />} />
          </Routes>
        </Layout>
      </Router>
    </Suspense>
  );
}

export default App;
