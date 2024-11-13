import React, { useState } from "react";
import axios from "axios";

export default function CusLogin() {
  const [isLoading, setLoading] = useState(false);
  const [cusemail, setcusemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    if (email.includes("@gmail") && email.includes(".com")) {
      setEmailError("");
      return true;
    } else {
      setEmailError("Please enter a valid email address.");
      return false;
    }
  };

  async function loginData(e) {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(cusemail)) {
      setLoading(false);
      return;
    }

    try {
      const loginDetails = { cusemail, password };
      const data = (
        await axios.post("http://localhost:5000/customer/login", loginDetails)
      ).data;

      console.log(data);
      if (data.status.role === "customer") {
        window.location = "/rooms";
      } else {
        window.location = "/dashboard";
      }
      // console.log(cusemail, password);
    } catch (e) {
      alert("Unauthorized user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-center mb-6">Login</h3>
        <form onSubmit={loginData}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={cusemail}
              required
              onChange={(e) => {
                setcusemail(e.target.value);
                validateEmail(e.target.value);
              }}
              className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setpassword(e.target.value)}
              className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
