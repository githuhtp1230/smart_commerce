import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SubCategory from "./components/admin/category/SubCategories";
import AdminLayout from "./components/admin/layout/AdminLayout";
import AuthLayout from "./components/client/auth/AuthLayout";
import ForgotPassword from "./components/client/auth/ForgotPassword";
import Login from "./components/client/auth/Login";
import Register from "./components/client/auth/Register";
import ClientLayout from "./components/client/layout/ClientLayout";
import Profile from "./components/client/profile/Profile";
import { ADMIN_PATH, PATH } from "./constants/path";
import AddProductPage from "./pages/admin/AddProductPage";
import ManageCategoryPage from "./pages/admin/ManageCategoryPage";
import ManageProductPage from "./pages/admin/ManageProductPage";
import ManageUserPage from "./pages/admin/ManageUserPage";
import CartPage from "./pages/client/CartPage";
import HomePage from "./pages/client/HomePage";
import ProductDetailPage from "./pages/client/product/ProductDetailPage";
import Products from "./pages/client/product/Products";
import { AuthRoute } from "./routes/auth-route";
import { fetchMe } from "./services/me.service";
import { useAuthStore } from "./store/auth-store";
import CheckoutCompletedPage from "./pages/client/CheckoutCompletedPage";

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
            <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route
              path={PATH.CHECKOUT_COMPLETED}
              element={<CheckoutCompletedPage />}
            />
          </Route>

          <Route element={<ClientLayout />}>
            <Route path={PATH.HOME_PAGE} element={<HomePage />} />
            <Route path={PATH.CART} element={<CartPage />} />
            <Route path={PATH.PRODUCTS} element={<Products />} />
            <Route
              path={`${PATH.PRODUCTS}/:productId`}
              element={<ProductDetailPage />}
            />
            <Route element={<AuthRoute allowedRoles={["USER", "ADMIN"]} />}>
              <Route path={PATH.PROFILE} element={<Profile />} />
            </Route>
          </Route>

          <Route element={<AuthRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<ManageProductPage />} />
              <Route
                path={ADMIN_PATH.PRODUCT}
                element={<ManageProductPage />}
              />
              <Route
                path={ADMIN_PATH.CATEGORY}
                element={<ManageCategoryPage />}
              />
              <Route path={ADMIN_PATH.SUBCATEGORY} element={<SubCategory />} />
              <Route
                path={ADMIN_PATH.ADD_PRODUCT}
                element={<AddProductPage />}
              />
              <Route path={ADMIN_PATH.USER} element={<ManageUserPage />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
