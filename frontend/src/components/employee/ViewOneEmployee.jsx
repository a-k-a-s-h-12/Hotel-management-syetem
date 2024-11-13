import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert';
import { useParams } from "react-router";
import axios from 'axios';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function ViewOneEmployee() {
    const [isLoading, setLoading] = useState(false);
    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);
    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);

    const [empid, setempid] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [emptype, setemptype] = useState("");
    const [ssn, setssn] = useState("");
    const [mobile, setmobile] = useState("");
    const [bank, setbank] = useState("");
    const [branch, setbranch] = useState("");

    const { id } = useParams();

    useEffect(() => {
        async function getDetails() {
            try {
                const result = await axios.get(`http://localhost:5000/employees/${id}`);
                const data = result.data.data[0];
                setempid(data.empid);
                setfirstname(data.firstname);
                setlastname(data.lastname);
                setemptype(data.emptype);
                setssn(data.ssn);
                setmobile(data.mobile);
                setbank(data.bank);
                setbranch(data.branch);

                setLoaderStatus(true);
                setTableStatus(false);
            } catch (err) {
                console.log(err.message);
            }
        }

        getDetails();
    }, [id]);

    async function updateData(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const newDetails = { empid, firstname, lastname, emptype, ssn, mobile, bank, branch };
            const result = await axios.put(`http://localhost:5000/employees/${id}`, newDetails);
            if (result.status === 200) {
                SoloAlert.alert({
                    title: "Success!",
                    body: "Details updated successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                });
            } else {
                SoloAlert.alert({
                    title: "Error!",
                    body: "Update failed, please try again later.",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                });
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    function edit(e) {
        e.preventDefault();
        setTextState(false);
        setBtnGroupstate1(false);
        setBtnGroupstate2(true);
    }

    function cancel(e) {
        e.preventDefault();
        setTextState(true);
        setBtnGroupstate1(true);
        setBtnGroupstate2(false);
    }

    function deleteUser(e) {
        e.preventDefault();
        SoloAlert.confirm({
            title: "Confirm Delete",
            body: "Are you sure you want to delete this employee?",
            theme: "dark",
            useTransparency: true,
            onOk: async function () {
                try {
                    const result = await axios.delete(`http://localhost:5000/employees/${id}`);
                    if (result.status === 200) {
                        SoloAlert.alert({
                            title: "Deleted!",
                            body: "Employee deleted successfully",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: () => window.location = "/empManager/view",
                        });
                    }
                } catch (err) {
                    SoloAlert.alert({
                        title: "Error!",
                        body: "Failed to delete employee",
                        icon: "error",
                        theme: "dark",
                        useTransparency: true,
                    });
                }
            },
            onCancel: () => {
                SoloAlert.alert({
                    title: "Cancelled!",
                    body: "Delete request canceled",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                });
            },
        });
    }

    return (
      <div className="content p-6 bg-gray-100">
        <div className="flex justify-center my-4">
          <div
            className={`${
              loaderStatus ? "hidden" : "flex"
            } animate-spin w-20 h-20 border-4 border-blue-500 rounded-full`}
          ></div>
        </div>

        <div
          className={`${
            tebleStatus ? "hidden" : "block"
          } bg-white p-6 rounded-lg shadow-md`}
        >
          <h3 className="text-xl font-bold mb-4">Edit Employee</h3>
          <hr className="mb-4" />
          <form className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-1/2">
                <label className="block font-medium text-gray-700">
                  Emp ID
                </label>
                <input
                  type="text"
                  value={empid}
                  onChange={(e) => setempid(e.target.value)}
                  disabled={textState}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label className="block font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  disabled={textState}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label className="block font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  disabled={textState}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label className="block font-medium text-gray-700">
                  Emp Type
                </label>
                <select
                  value={emptype}
                  onChange={(e) => setemptype(e.target.value)}
                  disabled={textState}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>
                    {emptype}
                  </option>
                  <option>Chef</option>
                  <option>Room-Service</option>
                  <option>Receiptionalist</option>
                </select>
              </div>

              <div className="w-full md:w-1/2">
                <label className="block font-medium text-gray-700">
                  Mobile No
                </label>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={mobile}
                  onChange={setmobile}
                  disabled={textState}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label className="block font-medium text-gray-700">NIC</label>
                <input
                  type="text"
                  value={ssn}
                  onChange={(e) => setssn(e.target.value)}
                  disabled={textState}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label className="block font-medium text-gray-700">Bank</label>
                <select
                  value={bank}
                  onChange={(e) => setbank(e.target.value)}
                  disabled={textState}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>
                    {bank}
                  </option>
                  <option value="sbi">SBI</option>
                  <option value="indian bank">Indian Bank</option>
                  <option value="hdfc">HDFC</option>
                  <option value="kotak">Kotak</option>
                  <option value="icici">ICICI</option>
                </select>
              </div>

              <div className="w-full md:w-1/2">
                <label className="block font-medium text-gray-700">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setbranch(e.target.value)}
                  disabled={textState}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>
                    {branch}
                  </option>
                  <option>Cheran managar</option>
                  <option>Peelamedu</option>
                  <option>Ganapathy</option>
                  <option>Saravanampatti</option>
                  <option>Gandhipuram</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                type="button"
                onClick={edit}
                className={`px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
                  btngrpState1 ? "block" : "hidden"
                }`}
              >
                Edit
              </button>

              <button
                type="submit"
                onClick={updateData}
                className={`px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
                  btngrpState2 ? "block" : "hidden"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Save"}
              </button>

              <button
                type="button"
                onClick={cancel}
                className={`px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 ${
                  btngrpState2 ? "block" : "hidden"
                }`}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={deleteUser}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}
