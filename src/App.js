import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing';
import Activation from './Pages/Activation';
import Login from './Pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/"
          element={
            <LandingPage />
          } />
        <Route path="/login"
          element={
            <Login />
          } />
          <Route path="/activation"
          element={
            <Activation />
          } />
      </Routes>
    </>
  );
}

export default App;
