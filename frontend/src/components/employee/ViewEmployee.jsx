import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SoloAlert from "soloalert";
import validation from "validator";
import jspdf from "jspdf";
import "jspdf-autotable";
// import "../Home.css";

export default function ViewAllEmp() {
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [tebleStatus, setTableStatus] = useState(true);

  const [search, setsearch] = useState("");
  const [filtered, setfiltered] = useState([]);

  const [AllEmp, setAllEmp] = useState([]);

  //This useEffect function used to get all emp data
  useEffect(() => {
    async function getDetails() {
      try {
        const result = await (
          await axios.get("http://localhost:5000/employees/")
        ).data.data;
        // console.log(result);
        
        setAllEmp(result);
        setLoaderStatus(true);
        setTableStatus(false);
      } catch (err) {
        console.log(err.message);
      }
    }

    getDetails();
  }, []);

  //This useEffect method is used to perform a searching function
  useEffect(() => {
    setfiltered(
      AllEmp.filter((items) => {
        return (
          items.empid.toLowerCase().includes(search.toLowerCase()) ||
          items.firstname.toLowerCase().includes(search.toLowerCase()) ||
          items.lastname.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, AllEmp]);

  return (
    <div className="content"> 
      <div hidden={tebleStatus}>
        
        <nav className="bg-white p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Employee Management</h3>
            <form className="flex">
              <input
                className="form-input rounded-md p-2 border border-gray-300"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
            </form>
          </div>
        </nav>

        <hr className="my-4" />

        <div className="bodyContent px-4 py-2">
          <table className="min-w-full table-auto border-collapse bg-gray-300 text-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Emp ID</th>
                <th className="p-2 text-left">First Name</th>
                <th className="p-2 text-left">Last Name</th>
                <th className="p-2 text-left">Emp Type</th>
                <th className="p-2 text-left">SSN</th>
                <th className="p-2 text-left">Mobile</th>
                <th className="p-2 text-left">Bank</th>
                <th className="p-2 text-left">Branch</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered
                .slice(0)
                .reverse()
                .map((Emp) => {
                  return (
                    <tr
                      key={Emp._id}
                      className="bg-gray-200"
                    >
                      <td className="p-2">{Emp.empid}</td>
                      <td className="p-2">{Emp.firstname}</td>
                      <td className="p-2">{Emp.lastname}</td>
                      <td className="p-2">{Emp.emptype}</td>
                      <td className="p-2">{Emp.ssn}</td>
                      <td className="p-2">{Emp.mobile}</td>
                      <td className="p-2">{Emp.bank}</td>
                      <td className="p-2">{Emp.branch}</td>
                      <td className="p-2 text-center">
                        <Link
                          to={"/empManager/view/" + Emp._id}
                          className="text-white bg-blue-600 px-2 py-1 font-bold rounded-md hover:transition-all scale-105"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
