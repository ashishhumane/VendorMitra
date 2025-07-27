import { useState } from 'react'
import {createBrowserRouter,RouterProvider,} from "react-router";
import Products from './pages/products.jsx'
import AddProductPage from './pages/addProduct.jsx'
import SupplierDashboard from './pages/supplierDashboard.jsx'
import Landing from './pages/landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import VendorDashboard from './pages/venDashborad.jsx';
import ProtectedRoute from './components/rolebasedauth.jsx';
import Cart from './pages/cart.jsx';
import Checkout from './pages/checkout.jsx';
import GroupBuyPage from './pages/groupBuy.jsx';
import Orders from './pages/order.jsx'
function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/sdashboard",
      element: (
        <ProtectedRoute allowedRoles={["supplier"]}>
          <SupplierDashboard />
        </ProtectedRoute>
      )
    },
    {
      path: "/vdashboard",
      element: (
        <ProtectedRoute allowedRoles={["vendor"]}>
          <VendorDashboard />
        </ProtectedRoute>
      )
    },
    {
      path: "/cart",
      element: (
        <ProtectedRoute allowedRoles={["vendor"]}>
          <Cart />
        </ProtectedRoute>
      )
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute allowedRoles={["vendor"]}>
          <Checkout />
        </ProtectedRoute>
      )
    },
    {
      path: "/groupbuy/create",
      element: (
        <ProtectedRoute allowedRoles={["vendor"]}>
          <GroupBuyPage />
        </ProtectedRoute>
      )
    },
    {
      path: "/products",
      element: (
        <ProtectedRoute allowedRoles={["vendor"]}>
          <Products />
        </ProtectedRoute>
      )
    },
    {
      path: "/orders",
      element: (
        <ProtectedRoute allowedRoles={["vendor"]}>
          <Orders />
        </ProtectedRoute>
      )
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/addproducts",
      element: (
        <ProtectedRoute allowedRoles={["supplier"]}>
          <AddProductPage />
        </ProtectedRoute>
      )
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
