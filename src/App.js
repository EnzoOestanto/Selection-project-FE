import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path="/"
          element={
            <Register />
          } />
      </Routes>
    </>
  );
}

export default App;
