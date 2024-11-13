import React, { useState } from "react";
import SoloAlert from "soloalert";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function AddEmployee() {
  const [isLoading, setLoading] = useState(false);
  const [empid, setempid] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [emptype, setemptype] = useState("");
  const [ssn, setssn] = useState("");
  const [mobile, setmobile] = useState("");
  const [bank, setbank] = useState("");
  const [branch, setbranch] = useState("");

  async function submitData(e) {
    setLoading(true);
    try {
      e.preventDefault();
      if (
        !empid ||
        !firstname ||
        !lastname ||
        !emptype ||
        !ssn ||
        !mobile ||
        !bank ||
        !branch
      ) {
        SoloAlert.alert({
          title: "Oops!",
          body: "Please fill all fields",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
        });
      } else {
        const newDetails = {
          empid,
          firstname,
          lastname,
          emptype,
          ssn,
          mobile,
          bank,
          branch,
        };
        console.log(newDetails);
        
          const data = (
            await axios.post("http://localhost:5000/employees/", newDetails)
          ).status;
          if (data === 200) {
            SoloAlert.alert({
              title: "Welcome!",
              body: "New Employee added successfully",
              icon: "success",
              theme: "dark",
              useTransparency: true,
            });
          }
        }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  function clear(e) {
    e.preventDefault();
    setempid("");
    setfirstname("");
    setlastname("");
    setemptype("");
    setssn("");
    setmobile("");
    setbank("");
    setbranch("");
  }

  return (
    <div className="  p-6 bg-white rounded-md shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Add Employee</h3>
      <hr className="mb-4" />

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emp ID
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              value={empid}
              onChange={(e) => setempid(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emp Type
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              value={emptype}
              onChange={(e) => setemptype(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              <option>Chef</option>
              <option>Room-Service</option>
              <option>Receiptionalist</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              SSN
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              value={ssn}
              onChange={(e) => setssn(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile No
            </label>
            <PhoneInput
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              placeholder="Enter phone number"
              value={mobile}
              onChange={setmobile}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bank
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              value={bank}
              onChange={(e) => setbank(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              <option>SBI</option>
              <option>Indian Bank</option>
              <option>HDFC</option>
              <option>Kotak</option>
              <option>ICICI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              value={branch}
              onChange={(e) => setbranch(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              <option>Cheran managar</option>
              <option>Peelamedu</option>
              <option>Ganapathy</option>
              <option>Saravanampatti</option>
              <option>Gandhipuram</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={clear}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            <i className="fa fa-ban"></i> Clear form
          </button>
          <button
            onClick={submitData}
            className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            <i className="fa fa-file-export"></i>{" "}
            {isLoading ? "Sending..." : "Submit form"}
          </button>
        </div>
      </form>
    </div>
  );
}
