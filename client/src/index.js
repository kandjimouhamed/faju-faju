import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './style.css'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-quill/dist/quill.snow.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { ModalsProvider } from '@mantine/modals';
let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <MantineProvider 
    withGlobalStyles
     withNormalizeCSS
     theme={{
      breakpoints: {
        xs: '30em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
      },
    }}
     >
      <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <GoogleOAuthProvider clientId='959078892775-j765uh1b479arbpst6i07dbto6896lm9.apps.googleusercontent.com' >
              <App />
            </GoogleOAuthProvider>
          </PersistGate>
        </Provider>
      </ModalsProvider>
    </MantineProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

