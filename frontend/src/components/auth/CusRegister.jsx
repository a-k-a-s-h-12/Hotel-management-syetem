import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SoloAlert from "soloalert";
import axios from "axios";

export default function CusRegister() {
  const [isLoading, setLoading] = useState(false);
  const [cusname, setcusname] = useState("");
  const [cusemail, setcusemail] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [password, setpassword] = useState("");
  const [Confirmpw, setconfirmpw] = useState("");
  const navigate = useNavigate();
  async function submitData(e) {
    e.preventDefault();
    setLoading(true);
    try {

      if (password !== Confirmpw) {
        SoloAlert.alert({
          title: "Oops!",
          body: "Password Mismatch!",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
        });
      }else {
        const newDetails = { cusname, cusemail, phoneno, password };
        // console.log(cusemail,cusname,phoneno,password);
        
        const data = (
          await axios.post(
            "http://localhost:5000/customer/register",
            newDetails
          )
        ).status;
        if (data === 200) {
          SoloAlert.alert({
            title: "Welcome!",
            body: "Registered Successfully",
            icon: "success",
            theme: "dark",
            useTransparency: true,
          });
        }
        navigate('/login')
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-center mb-6">Register</h3>
        <form onSubmit={submitData}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => setcusname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => setcusemail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => setphoneno(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => setconfirmpw(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-start mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
