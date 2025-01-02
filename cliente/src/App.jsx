import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Brands from './pages/Brands';
import Categories from './pages/Categories';
import Index from './pages/Index';
import Inflows from './pages/Inflows';
import Outflows from './pages/Outflows';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';

function App() {
  return (
    <div>
      <Sidebar></Sidebar>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/brands' element={<Brands />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/inflows' element={<Inflows />} />
          <Route path='/outflows' element={<Outflows />} />
          <Route path='/products' element={<Products />} />
          <Route path='/suppliers' element={<Suppliers />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

};
export default App
