import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { ListContextProvider } from './context/listContext/ListContext';
import { ProductContextProvider } from './context/ProductContext/ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthContextProvider > 
    <ProductContextProvider>
    <ListContextProvider>
    <App />
    </ListContextProvider>
    </ProductContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);


