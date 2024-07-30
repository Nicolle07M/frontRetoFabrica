import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Welcome from './components/welcomePage';
import Register from './components/registerPage';
import Login from './components/loginPage';
import ShowUsers from './components/ShowUsers';
import EditUser from './components/editUsersPage';
import AssignTask from './components/assignTaskPage';
import PanelTask from './components/panelTask';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Users" element={<ShowUsers />} />
        <Route path='/edit/:id' element={<EditUser />} />
        <Route path='/AssignTask' element={<AssignTask/>} />
        <Route path='/PanelTask' element={<PanelTask/>} />
        
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
