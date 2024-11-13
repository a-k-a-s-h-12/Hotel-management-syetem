import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";

export default class Dashboard extends Component {
  state = {
    isOpen: false,
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6">
          <head>
            <title>Manager Login</title>
          </head>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
            <Link
              to="/empManager/view"
              className="flex flex-col items-center p-4 border rounded-lg bg-white shadow hover:shadow-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="currentColor"
                className="text-blue-500 mb-3"
                viewBox="0 0 16 16"
              >
                <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
                <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <span className="text-gray-700 text-lg font-medium">
                Employee Manager
              </span>
            </Link>

            <Link
              to="/roommanager/view"
              className="flex flex-col items-center p-4 border rounded-lg bg-white shadow hover:shadow-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="currentColor"
                className="text-blue-500 mb-3"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207l-5-5-5 5V13.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7.207Zm-5-.225C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982Z"
                />
              </svg>
              <span className="text-gray-700 text-lg font-medium">
                Room Manager
              </span>
            </Link>

            <Link
              to="/viewbookings"
              className="flex flex-col items-center p-4 border rounded-lg bg-white shadow hover:shadow-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="currentColor"
                className="text-blue-500 mb-3"
                viewBox="0 0 16 16"
              >
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
              </svg>
              <span className="text-gray-700 text-lg font-medium">
                Room Bookings
              </span>
            </Link>

            <Link
              to="/admin/view"
              className="flex flex-col items-center p-4 border rounded-lg bg-white shadow hover:shadow-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="currentColor"
                className="text-blue-500 mb-3"
                viewBox="0 0 16 16"
              >
                <path d="M10 1a1 1 0 0 1 1 1v3H5V2a1 1 0 0 1 1-1h4zM3 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H3zm8 9.5a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5H8.5a.5.5 0 0 1-.5-.5V10h-2v1a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H7V8H4.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2.5V6h1v.5h2.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H9V8h2.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H9.5V10h2z" />
              </svg>
              <span className="text-gray-700 text-lg font-medium">
                Admin Manager
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
