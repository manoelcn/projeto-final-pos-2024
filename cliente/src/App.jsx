import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';

import Brands from './pages//brands/Brands';
import CreateBrand from './pages/brands/CreateBrand';
import DetailBrand from './pages/brands/DetailBrand';
import EditBrand from './pages/brands/EditBrand';

import Categories from './pages/categories/Categories';
import CreateCategory from './pages/categories/CreateCategory';
import DetailCategory from './pages/categories/DetailCategory';
import EditCategory from './pages/categories/EditCategory';

import Index from './pages/Index';

import Inflows from './pages/inflows/Inflows';
import CreateInflow from './pages/inflows/CreateInflow';

import Outflows from './pages/outflows/Outflows';
import CreateOutflow from './pages/outflows/CreateOutflow';

import Products from './pages/products/Products';
import CreateProduct from './pages/products/CreateProduct';

import Suppliers from './pages/suppliers/Suppliers';
import CreateSupplier from './pages/suppliers/CreateSupplier';

function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/brands' element={<Brands />} />
          <Route path="/brands/:id" element={<DetailBrand />} />
          <Route path="/createbrand" element={<CreateBrand />} />
          <Route path="/brands/:id/edit" element={<EditBrand />} />


          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:id' element={<DetailCategory />} />
          <Route path="/createcategory" element={<CreateCategory />} />
          <Route path="/categories/:id/edit" element={<EditCategory />} />

          <Route path='/inflows' element={<Inflows />} />
          <Route path='/createinflow' element={<CreateInflow />} />

          <Route path='/outflows' element={<Outflows />} />
          <Route path='/createoutflow' element={<CreateOutflow />} />

          <Route path='/products' element={<Products />} />
          <Route path='/createproduct' element={<CreateProduct />} />

          <Route path='/suppliers' element={<Suppliers />} />
          <Route path='/createsupplier' element={<CreateSupplier />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  )

};
export default App
