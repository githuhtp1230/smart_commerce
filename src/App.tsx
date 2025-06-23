import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/admin/layout/AdminLayout";
import AuthLayout from "./components/client/auth/AuthLayout";
import Login from "./components/client/auth/Login";
import Register from "./components/client/auth/Register";
import ClientLayout from "./components/client/layout/ClientLayout";
import Profile from "./components/client/profile/Profile";
import { ADMIN_PATH, PATH } from "./constants/path";
import Category from "./pages/admin/Category";
import Product from "./pages/admin/Product";
import Cart from "./pages/client/Cart";
import HomePage from "./pages/client/HomePage";
import ProductDetail from "./pages/client/ProductDetail";
import Products from "./pages/client/Products";
import { AuthRoute } from "./routes/auth-route";
import { fetchMe } from "./services/me.service";
import { useAuthStore } from "./store/auth-store";
import AddProduct from "./pages/admin/AddProduct";

function App() {
  const setMe = useAuthStore((state) => state.setMe);
  const [isLoading, setIsLoading] = useState(true);

  const { mutate } = useMutation({
    mutationFn: fetchMe,
    onSuccess: (data) => {
      setMe(data);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  if (isLoading) return null;

  return (
    <>
      <div className="h-screen">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTER} element={<Register />} />
          </Route>
          <Route element={<ClientLayout />}>
            <Route path={PATH.HOME_PAGE} element={<HomePage />} />
            <Route path={PATH.CART} element={<Cart />} />
            <Route path={PATH.PRODUCTS} element={<Products />} />
            <Route
              path={`${PATH.PRODUCTS}/:productId`}
              element={<ProductDetail />}
            />
            <Route element={<AuthRoute allowedRoles={["ADMIN"]} />}>
              <Route path={PATH.PROFILE} element={<Profile />} />
            </Route>
          </Route>

          <Route element={<AuthRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Product />} />
              <Route path={ADMIN_PATH.PRODUCT} element={<Product />} />
              <Route path={ADMIN_PATH.CATEGORY} element={<Category />} />
              <Route path={ADMIN_PATH.ADD_PRODUCT} element={<AddProduct />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
