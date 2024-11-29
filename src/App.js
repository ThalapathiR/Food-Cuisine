import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import { NavBar } from './NavBar';

import { CategoryList } from './Component/CategoryList/CategoryList';
import { JapanCuisine } from './Component/CategoryList/japan/JapanCuisine';
import { CusineRussia } from './Component/CategoryList/russia/CusineRussia';
import { Colombia } from './Component/CategoryList/colombia/Colombia';
import { FInland } from './Component/CategoryList/finland/FInland';
import { Venezula } from './Component/CategoryList/venezula/Venezula';
import { Newzeland } from './Component/CategoryList/newzeland/Newzeland';

function App() {
  return (
    <div className="App">
   <NavBar/>
<BrowserRouter>
<Routes>



<Route path='/' element={<FInland/>} />
<Route path='/japan' element={<JapanCuisine/>} />
<Route path='/russia' element={<CusineRussia/>} />
<Route path='/colombia' element={<Colombia/>} />
<Route path='/india' element={<CategoryList/>} />
<Route path='/venezula' element={<Venezula/>} />
<Route path='/newzeland' element={<Newzeland/>} />

</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
