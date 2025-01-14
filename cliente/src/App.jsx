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
import DetailInflow from './pages/inflows/DetailInflows';
import CreateInflow from './pages/inflows/CreateInflow';

import Outflows from './pages/outflows/Outflows';
import DetailOutflow from './pages/outflows/DetailOutflows';
import CreateOutflow from './pages/outflows/CreateOutflow';

import Products from './pages/products/Products';
import CreateProduct from './pages/products/CreateProduct';
import DetailProduct from './pages/products/DetailProduct';
import EditProduct from './pages/products/EditProduct';

import Suppliers from './pages/suppliers/Suppliers';
import CreateSupplier from './pages/suppliers/CreateSupplier';
import DetailSupplier from './pages/suppliers/DetailSupplier';
import EditSupplier from './pages/suppliers/EditSupplier';

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

          <Route path='/suppliers' element={<Suppliers />} />
          <Route path='/suppliers/:id' element={<DetailSupplier />} />
          <Route path='/createsupplier' element={<CreateSupplier />} />
          <Route path="/suppliers/:id/edit" element={<EditSupplier />} />

          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<DetailProduct />} />
          <Route path='/createproduct' element={<CreateProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />

          <Route path='/inflows' element={<Inflows />} />
          <Route path='/inflows/:id' element={<DetailInflow />} />
          <Route path='/createinflow' element={<CreateInflow />} />

          <Route path='/outflows' element={<Outflows />} />
          <Route path='/outflows/:id' element={<DetailOutflow />} />
          <Route path='/createoutflow' element={<CreateOutflow />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  )

};
export default App
