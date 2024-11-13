import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/layouts/Home";
import CusRegister from "./components/auth/CusRegister";
import CusLogin from "./components/auth/CusLogin";
import "./App.css";
import Dashboard from "./Dashboard";
import Empsidenav from "./components/layouts/Empsidenav";
import AddEmployee from "./components/employee/AddEmployee";
import ViewAllEmp from "./components/employee/ViewEmployee";
import ViewOneEmployee from "./components/employee/ViewOneEmployee";
import ViewAllPaidSalaries from "./components/employee/ViewPaidSalary";
import AddPaidSalary from "./components/employee/AddPaidSalary";

// Layout component that includes the sidebar and the main content
function EmpManagerLayout() {
  return (
    <div className="flex">
      <Empsidenav />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<CusLogin />} />
        <Route path="/register" element={<CusRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />


        <Route path="/empManager" element={<EmpManagerLayout />}>
          <Route path="add" element={<AddEmployee />} />
          <Route path="view" element={<ViewAllEmp />} />
          <Route path="view/:id" element={<ViewOneEmployee />} />
        </Route>

        <Route path="/paidsalManager" element={<EmpManagerLayout />}>
          <Route path='view' element={<ViewAllPaidSalaries />} />
          <Route path='add' element={<AddPaidSalary/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
