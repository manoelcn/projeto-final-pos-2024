import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Brands from './pages/Brands';
import Categories from './pages/Categories';
import Inflows from './pages/Inflows';
import Outflows from './pages/Outflows';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <div>
      <Header></Header>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path='/brands' element={<Brands />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/inflows' element={<Inflows />} />
            <Route path='/outflows' element={<Outflows />} />
          </Routes>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  )
}

export default App
