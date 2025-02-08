
import Navbar from './Components/Nav/Navbar';
import Home from './Components/Home';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import {Routes, Route} from "react-router-dom";

function App() {
   return (
   <div>
    <Navbar />
    <div className='container'>
      <Routes>
<Route path= "/home" element={<Home />}/>
<Route path= "/login" element={<LoginSignup />}/>
      </Routes>

    </div>
   
   </div>
  );
}

export default App;
