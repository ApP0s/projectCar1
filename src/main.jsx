import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Root from './pages/root';
import Dashboard from './pages/Dashboard';
import HighlightedCars from './pages/HighlightedCars';
import './index.css'; // Assuming you have some global styles
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <div>404 not Found</div>,
    children: [
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: '/Hightlight',
        element: <HighlightedCars/>,
        errorElement: <div>404 not Found</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);