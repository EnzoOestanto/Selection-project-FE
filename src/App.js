import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing';
import Login from './Components/Login';


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
      </Routes>
    </>
  );
}

export default App;
