import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Brands from './pages//brands/Brands';
import CreateBrand from './pages/brands/CreateBrand';
import Categories from './pages/categories/Categories';
import Index from './pages/Index';
import Inflows from './pages/inflows/Inflows';
import Outflows from './pages/outflows/Outflows';
import Products from './pages/products/Products';
import Suppliers from './pages/suppliers/Suppliers';

function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/brands' element={<Brands />} />
          <Route path="/createbrand" element={<CreateBrand />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/inflows' element={<Inflows />} />
          <Route path='/outflows' element={<Outflows />} />
          <Route path='/products' element={<Products />} />
          <Route path='/suppliers' element={<Suppliers />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  )

};
export default App
