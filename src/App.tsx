import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./pages/client/Cart";
import HomePage from "./pages/client/HomePage";
import ClientLayout from "./components/client/layout/ClientLayout";
import AdminLayout from "./components/admin/layout/AdminLayout";
import { ADMIN_PATH, PATH } from "./constants/path";
import Product from "./pages/admin/Product";
import Products from "./pages/client/Products";
import ProductDetail from "./pages/client/ProductDetail";
import Category from "./pages/admin/Category";
import Login from "./components/client/auth/Login";
import Register from "./components/client/auth/Register";
import AuthLayout from "./components/client/auth/AuthLayout";

function App() {
  return (
    <>
      <div className="h-screen">
        <Routes>
          <Route element={<ClientLayout />}>
            <Route path={PATH.HOME_PAGE} element={<HomePage />} />
            <Route path={PATH.CART} element={<Cart />} />
            <Route path={PATH.PRODUCTS} element={<Products />} />
            <Route
              path={`${PATH.PRODUCTS}/:productId`}
              element={<ProductDetail />}
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTER} element={<Register />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Product />} />
            <Route path={ADMIN_PATH.PRODUCT} element={<Product />} />
            <Route path={ADMIN_PATH.CATEGORY} element={<Category />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
