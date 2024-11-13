import React, { useState, useEffect } from "react";
import SoloAlert from "soloalert";
import axios from "axios";
import validation from "validator";

export default function AddPaidSalary() {
  const [isLoading, setLoading] = useState(false);
  const [paymentid, setpaymentid] = useState("");
  const [emplid, setemplid] = useState("");
  const [email, setemail] = useState("");
  const [accountnumber, setaccountnumber] = useState("");
  const [basicsalary, setbasicsalary] = useState("");
  const [totalsalary, settotalsalary] = useState("");
  const [paiddate, setpaiddate] = useState("");

  
  const [employeeData, setEmployeeData] = useState([]); 

  useEffect(() => {
    async function getEmployeeDetails() {
      try {
        const response = await axios.get("http://localhost:5000/employees/");
        setEmployeeData(response.data.data); 
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    }
    getEmployeeDetails();
  }, []);

  async function submitData(e) {
    setLoading(true);
    try {
      e.preventDefault();
      if (
        !paymentid ||
        !emplid ||
        !email ||
        !accountnumber ||
        !basicsalary ||
        !totalsalary ||
        !paiddate
      ) {
        SoloAlert.alert({
          title: "Oops!",
          body: "Please fill all fields",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
          onOk: function () {},
        });
      } else if (!validation.isEmail(email)) {
        SoloAlert.alert({
          title: "Oops!",
          body: "Please enter valid email",
          icon: "error",
          theme: "dark",
          useTransparency: true,
          onOk: function () {},
        });
      } else {
        const newDetails = {
          paymentid,
          emplid,
          email,
          accountnumber,
          basicsalary,
          totalsalary,
          paiddate,
        };
        const data = (
          await axios.post("http://localhost:5000/paidsalaries/", newDetails)
        ).status;
        if (data === 200) {
          SoloAlert.alert({
            title: "Success!",
            body: "New Employee added successfully",
            icon: "success",
            theme: "dark",
            useTransparency: true,
            onOk: function () {},
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  function clear() {
    setpaymentid("");
    setemplid("");
    setemail("");
    setaccountnumber("");
    setbasicsalary("");
    settotalsalary("");
    setpaiddate("");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6">Add Paid Salary Details</h3>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={submitData}
      >
        <div>
          <label className="block font-medium mb-2">Payment ID</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={paymentid}
            onChange={(e) => setpaymentid(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Emp ID</label>
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={emplid}
            onChange={(e) => setemplid(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose
            </option>
            {employeeData.map((employee) => (
              <option key={employee._id} value={employee.empid}>
                {employee.empid}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Account No</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={accountnumber}
            onChange={(e) => setaccountnumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Basic Salary</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={basicsalary}
            onChange={(e) => setbasicsalary(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Total Salary</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={totalsalary}
            onChange={(e) => settotalsalary(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Paid Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={paiddate}
            onChange={(e) => setpaiddate(e.target.value)}
            required
          />
        </div>

        <div className="col-span-2 flex justify-end space-x-4 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600 focus:outline-none"
            onClick={clear}
          >
            <i className="fa fa-ban"></i> Clear form
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none"
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
