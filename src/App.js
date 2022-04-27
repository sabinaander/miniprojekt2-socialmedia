import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useStore } from 'react-redux';
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AdminPageUsers from './pages/AdminPageUsers';
import AdminPagePosts from './pages/AdminPagePosts';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import loginauthreducer from './features/login-auth/reducers/loginauthreducer';

function App() {
  const store = useStore(loginauthreducer);
  const state = store.getState();
  const [user] = useState(state.auth.user);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        {user.role === 'admin' ? (
          <>
            <Route path="admin/users" element={<AdminPageUsers />} />
            <Route path="admin/posts" element={<AdminPagePosts />} />
          </>
        ) : null}
      </Route>
      <Route path="profile/:username" element={<ProfilePage />} />
      <Route path="/settings" element={<ProfileSettingsPage />} />
    </Routes>
  );
}

export default App;
