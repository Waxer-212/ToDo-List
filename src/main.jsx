import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import List from './list.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <List />
  </StrictMode>,
);
