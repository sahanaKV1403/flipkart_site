// import Navbar from "./Components/Navbar/Navbar";
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Myorders from './Components/Myorders/Myorders';
import { CategoryContextProvider } from '../src/context/category.context';
import { CartContextProvider } from '../src/context/cart.context';
import { AddressContextProvider } from '../src/context/address.context';
import Cart_page from './Components/Cart_page/Cart_page';
import  Navbar  from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      
      <CategoryContextProvider>
        <CartContextProvider>
          <AddressContextProvider>   
          <Navbar /> 
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Myorders' element={<Myorders />} />
              <Route path='/Cart_page' element={<Cart_page />} />
            </Routes>
          </AddressContextProvider>
        </CartContextProvider>
      </CategoryContextProvider>
    </div>
  );
}

export default App;
