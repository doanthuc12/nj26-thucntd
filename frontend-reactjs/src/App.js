import React from "react";
import { Button } from "antd";
import axios from "axios";
import "./App.css";
import "antd/dist/reset.css";
import CustomerPage from "./pages/CustomerPage";
import CategoriesPage from "./pages/CategoriesPage";
import EmployeesPage from "./pages/EmployeesPage";

function App() {
  //Call API
  // React.useEffect(() => {
  //   fetch("http://localhost:9000/customers")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then(json => {
  //       console.log(json);
  //     });
  // }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/customers").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div className="App">
      <CustomerPage />
      {/* <CategoriesPage /> */}
      {/* <EmployeesPage /> */}
    </div>
  );
}

export default App;
