import { data, Route, Routes, useNavigate } from "react-router-dom";
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
import Profile from "./components/client/profile/Profile";
import { PrivateRoute } from "./components/private-routes";
import { useEffect } from "react";
import { getCookie } from "typescript-cookie";
import { SECURITY } from "./constants/common";
import { fetchMe } from "./services/me.service";
import { useAuthStore } from "./store/auth-store";

function App() {
  const navigate = useNavigate();
  const setMe = useAuthStore((state) => state.setMe);

  useEffect(() => {
    if (getCookie(SECURITY.ACCESS_TOKEN)) {
      fetchMe()
        .then((data) => {
          setMe(data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, []);

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
            <Route element={<PrivateRoute />}>
              <Route path={PATH.PROFILE} element={<Profile />} />
            </Route>
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
