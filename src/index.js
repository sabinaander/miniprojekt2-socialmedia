import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './features/login-auth/userstore';
import { fetchPosts } from './features/blogPosts/postsSlice';

const container = document.getElementById('root');
const root = createRoot(container);

store.dispatch(fetchPosts());

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
