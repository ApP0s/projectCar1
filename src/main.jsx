import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Highlight from './pages/HighlightedCars';
import './index.css'; // Assuming you have some global styles

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
    errorElement: <div>404 not Found</div>
  },
  {
    path: '/HighlightedCars',
    element: <Highlight/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);