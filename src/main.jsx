import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root';
import Dashboard from './pages/Dashboard';
import HighlightedCars from './pages/HighlightedCars';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Set the basename to '/car-analys'
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root/>,
      errorElement: <div>404 not Found</div>,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: '/Hightlight',
          element: <HighlightedCars/>,
        },
      ],
    },
  ],
  {
    basename: '/car-analys',
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
