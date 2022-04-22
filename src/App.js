import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route path="profile" element={<ProfilePage />} />
      <Route path="admin" element={<AdminPage />} />
    </Routes>
   
  );
}

export default App;
