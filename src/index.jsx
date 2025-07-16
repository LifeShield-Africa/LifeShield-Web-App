import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import React, { Suspense, StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import Container from '@mui/material/Container';

import App from './app';
import { AuthProvider } from './useAuth';
import Loader from './components/Loader/Loader';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense fallback={<Container
  sx={{
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Loader />
</Container>}>
            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
