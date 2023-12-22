import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './components/MainLayout/MainLayout';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AuthProvider from './components/AuthProvider/AuthProvider';
import Blog from './components/Blog/Blog';
import DashboardHome from './components/Dashboard/Home/DashboardHome';
import AddTask from './components/Dashboard/AddTask/AddTask';
import AllTask from './components/Dashboard/AllTask/AllTask';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from 'react-toast-notifications';
import UpdateTask from './components/Dashboard/UpdateTask/UpdateTask';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
const queryClient = new QueryClient()
const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/dashboard/home',
        element: <DashboardHome></DashboardHome>
      },
      {
        path: '/dashboard/add-task',
        element: <AddTask></AddTask>
      },
      {
        path: '/dashboard/tasks',
        element: <AllTask></AllTask>
      },
      {
        path : '/dashboard/updatetask/:id',
        element : <UpdateTask></UpdateTask>
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/blog',
    element: <Blog></Blog>
  },
  
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <RouterProvider router={routes}></RouterProvider>
          </ToastProvider>
        </QueryClientProvider>
      </AuthProvider>
    </DndProvider>
  </React.StrictMode>
)
