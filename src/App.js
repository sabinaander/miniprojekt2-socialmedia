import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import ProfilePage from './pages/ProfilePage';
import AdminPageUsers from './pages/AdminPageUsers';
import AdminPagePosts from './pages/AdminPagePosts';
import ProfileSettingsPage from './pages/ProfileSettingsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="profile/:username" element={<ProfilePage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
      </Route>   
      <Route path="adminUsers" element={<AdminPageUsers />} />
      <Route path="adminPosts" element={<AdminPagePosts />} />
    </Routes>
  );
}

export default App;
