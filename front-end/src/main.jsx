import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './style.css';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <>
   <BrowserRouter>
            <App />
    </BrowserRouter>
  </>
)