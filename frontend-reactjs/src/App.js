import React from "react";
import { Button } from "antd";
import axios from "axios";
import "./App.css";
import "antd/dist/reset.css";

// import numeral from "numeral";
// import "numeral/locales/vi";

import CustomerPage from "./pages/CustomerPage";
import CategoriesPage from "./pages/CategoriesPage";
import EmployeesPage from "./pages/EmployeesPage";
import ProductPage from "./pages/ProductPage";
import SuppliersPage from "./pages/SuppliersPage";
import OrdersPage from "./pages/OrdersPage";

// numeral.locale("vi");

function App() {
  // React.useEffect(() => {
  //   axios.get("http://localhost:9000/customers").then((response) => {
  //     console.log(response.data);
  //   });
  // }, []);

  return (
    <div className="App">
      {/* <CustomerPage /> */}
      {/* <CategoriesPage /> */}
      {/* <EmployeesPage /> */}
      {/* <ProductPage /> */}
      {/* <SuppliersPage /> */}
      <OrdersPage />
    </div>
  );
}

export default App;
