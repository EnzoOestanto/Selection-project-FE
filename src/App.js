import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing';
import Activation from './Pages/Activation';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import ProfilePage from './Pages/ProfilePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import PostDetail from './Pages/PostDetail';

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
            <RegisterPage />
          } />
        <Route path="/login"
          element={
            <LoginPage />
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
          <Route path="/post"
          element={
            <PostDetail />
          } />
      </Routes>
    </>
  );
}

export default App;
