import { Routes, Route } from 'react-router-dom';
import { Home, NavBar } from './components/index';
import './index.css';

const App = () => {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
