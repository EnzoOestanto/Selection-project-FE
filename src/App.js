import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing';
import Activation from './Pages/Activation';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import Register from './Pages/Register';
import ResetPassword from './Pages/ResetPassword';
import ProfilePage from './Pages/ProfilePage';

function App() {
  return (
    <>
      <Routes>
      <Route path="/"
          element={
            <LandingPage />
          } />
        <Route path="/register"
          element={
            <Register />
          } />
        <Route path="/login"
          element={
            <Login />
          } />
          <Route path="/activation"
          element={
            <Activation />
          } />
          <Route path="/forgotpassword"
          element={
            <ForgotPassword />
          } />
          <Route path="/resetpassword"
          element={
            <ResetPassword />
          } />
           <Route path="/profile"
          element={
            <ProfilePage />
          } />

          
      </Routes>
    </>
  );
}

export default App;
