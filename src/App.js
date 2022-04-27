import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AdminPageUsers from './pages/AdminPageUsers';
import AdminPagePosts from './pages/AdminPagePosts';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import userservice from './features/login-auth/userservice';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route path="profile/:username" element={<ProfilePage />} />
      <Route path="/settings" element={<ProfileSettingsPage />} />
      <Route path="adminUsers" element={<AdminPageUsers />} />
      <Route path="adminPosts" element={<AdminPagePosts />} />
    </Routes>
  );
}

export default App;
