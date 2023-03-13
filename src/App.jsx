import { Routes, Route } from 'react-router-dom';
import { Home, NavBar } from './components/index';

const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
