import './App.css';
import React,{useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import Store from "./Component/Store/Store"
import Login from "./Component/Authentication/Login/Login"
import Signup from './Component/Authentication/signup/signup';
import ProductDetails from './Component/Store/ProductDetails/ProductDetails'
import NotFound from './Component/Pages/NotFoundPage/NotFound'
import SearchPage from './Component/Pages/SearchPage/SearchPage'
import Checkout from './Component/Store/Checkout/Checkout'
import About from './Component/Pages/About/About';
function App() {
  const [authState, authSetstate] = useState({auth:false})
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/store" element={ <Store />} />
          <Route path="/account" element={ <Login />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/signup" element={ <Signup />} />
          <Route path="/store/productdetails/:id" element={ <ProductDetails />} />
          <Route path="/search/:id"  element={<SearchPage/>}/>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound size="large"/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
