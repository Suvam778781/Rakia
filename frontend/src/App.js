import logo from './logo.svg';
import './App.css';
import AllRoutes from './Components/AllRoutes.jsx/AllRoutes';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Order from './Pages/Orders';
import { CartSection, QuantityButton } from './Pages/AddToCartPage';

function App() {
  return (
    <div className="App">
     <Navbar/>
     <AllRoutes/>
<Footer/>
{/* <Order/> */}
    </div>
  );
}

export default App;
