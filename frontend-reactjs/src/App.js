import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button, Layout, Row } from "antd";
import axios from "axios";
import "./App.css";
import "antd/dist/reset.css";

// import numeral from "numeral";
// import "numeral/locales/vi";

// numeral.locale("vi");
import MainMenu from "./components/MainMenu";
// PAGES
import HomePage from "./pages/HomePage";
import CustomerPage from "./pages/Management/CustomerPage";
import ProductPage from "./pages/Management/ProductPage";
import CategoriesPage from "./pages/Sales/Product/CategoriesPage";
import SuppliersPage from "./pages/Sales/Product/SuppliersPage";
import EmployeesPage from "./pages/Sales/Product/EmployeesPage";
import OrdersPage from "./pages/Sales/Product/OrdersPage";

import NotFoundPage from "./pages/NotFoundPage";
import DiscountPage from "./pages/Sales/Product/DiscountPage";
import StockPage from "./pages/Sales/Product/StockPage";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Sider theme="dark" style={{ minHeight: "100vh" }}>
            <MainMenu />
          </Sider>
          <Layout>
            <Header style={{ backgroundColor: "blue" }}>
              <h1 style={{ color: "white" }}> HOME PAGE - ADMIN</h1>
            </Header>

            <Content style={{ padding: 24 }}>
              {/* Register routes */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />

                {/* MANAGEMENT */}
                <Route path="/management/products" element={<ProductPage />} />
                <Route
                  path="/management/customers"
                  element={<CustomerPage />}
                />

                {/* SALES */}
                <Route
                  path="/sales/products/discount"
                  element={<DiscountPage />}
                />
                <Route path="/sales/products/stock" element={<StockPage />} />

                {/* ORDER */}

                <Route path="/sales/products/order" element={<OrdersPage />} />

                {/* NO MATCH ROUTE */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
