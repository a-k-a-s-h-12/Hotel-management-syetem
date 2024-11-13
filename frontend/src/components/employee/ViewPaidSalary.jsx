import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function ViewAllPaidSalaries() {
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [tebleStatus, setTableStatus] = useState(true);
  const [search, setsearch] = useState("");
  const [filtered, setfiltered] = useState([]);
  const [AllPaidSalaries, setAllPaidSalaries] = useState([]);

  useEffect(() => {
    async function getDetails() {
      try {
        const result = await (
          await axios.get("http://localhost:5000/paidsalaries")
        ).data;
        setAllPaidSalaries(result);
        setLoaderStatus(true);
        setTableStatus(false);
        console.log(result);
      } catch (err) {
        console.log(err.message);
      }
    }
    getDetails();
  }, []);

  useEffect(() => {
    setfiltered(
      AllPaidSalaries.filter((items) => {
        return (
          items.paymentid.toLowerCase().includes(search.toLowerCase()) ||
          items.emplid.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, AllPaidSalaries]);

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <div
          className={`w-40 h-40 mt-20 ${
            loaderStatus ? "hidden" : ""
          }`}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>

      <div className={tebleStatus ? "hidden" : ""}>
        <nav className="bg-white shadow mb-4">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Paid Salary Management</h3>
            <form className="flex">
              <input
                className="border border-gray-300 rounded p-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setsearch(e.target.value)}
              />
            </form>
          </div>
        </nav>

        {/* Salary Table */}
        <div className="overflow-auto">
          <table className="min-w-full bg-gray-300  text-md">
            <thead>
              <tr>
                <th className="p-3 text-left">Payment ID</th>
                <th className="p-3 text-left">Emp ID</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Account No</th>
                <th className="p-3 text-left">Basic Salary</th>
                <th className="p-3 text-left">Total Salary</th>
                <th className="p-3 text-left">Paid Date</th>
                <th className="p-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {filtered
                .slice(0)
                .reverse()
                .map((Paidsal) => {
                  return (
                    <tr key={Paidsal._id} className="border-t border-gray-300">
                      <td className="p-3">{Paidsal.paymentid}</td>
                      <td className="p-3">{Paidsal.emplid}</td>
                      <td className="p-3">{Paidsal.email}</td>
                      <td className="p-3">{Paidsal.accountnumber}</td>
                      <td className="p-3">{Paidsal.basicsalary}</td>
                      <td className="p-3">{Paidsal.totalsalary}</td>
                      <td className="p-3">{Paidsal.paiddate}</td>
                      <td className="p-3">
                        <Link
                          to={`/paidsalManager/view/${Paidsal._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          <i className="far fa-edit"></i>
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
