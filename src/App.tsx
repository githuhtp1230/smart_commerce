import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./pages/client/Cart";
import HomePage from "./pages/client/HomePage";
import Header from "./components/client/layout/Header";
import Navbar from "./components/client/layout/Navbar";
import ClientLayout from "./components/client/layout/ClientLayout";
import AdminLayout from "./components/admin/layout/AdminLayout";
import { ADMIN_PATH, PATH } from "./constants/path";
import Product from "./pages/admin/Product";
import Products from "./pages/client/Products";

function App() {
  return (
    <>
      <div className="h-screen">
        <Routes>
          <Route element={<ClientLayout />}>
            <Route path={PATH.HOME_PAGE} element={<HomePage />} />
            <Route path={PATH.CART} element={<Cart />} />
            <Route path={PATH.PRODUCTS} element={<Products />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Product />} />
            <Route path={ADMIN_PATH.PRODUCT} element={<Product />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
