import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Welcome from './components/welcomePage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
