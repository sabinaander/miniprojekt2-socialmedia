import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useStore } from 'react-redux';
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import ProfilePage from './pages/ProfilePage';
import AdminPageUsers from './pages/AdminPageUsers';
import AdminPagePosts from './pages/AdminPagePosts';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import loginauthreducer from './features/login-auth/reducers/loginauthreducer';

function App() {
  const store = useStore(loginauthreducer);
  const state = store.getState();
  const [user, setUser] = useState(state.auth.user);

  store.subscribe(() => {
    setUser(store.getState().auth.user);
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="profile/:username" element={<ProfilePage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
        {user?.role === 'admin' ? (
          <>
            <Route path="admin/users" element={<AdminPageUsers />} />
            <Route path="admin/posts" element={<AdminPagePosts />} />
          </>
        ) : null}
      </Route>
    </Routes>
  );
}

export default App;
