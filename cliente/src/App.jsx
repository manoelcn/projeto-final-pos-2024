import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Brands from './pages/Brands';
import Categories from './pages/Categories';
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
          </Routes>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  )
}

export default App
