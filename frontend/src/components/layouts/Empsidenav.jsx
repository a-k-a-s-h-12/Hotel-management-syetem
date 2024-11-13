import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaUserPlus, FaMoneyBillWave, FaPlusSquare } from 'react-icons/fa';

export default function Empsidenav() {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <nav className="bg-white shadow-lg p-4 w-64 space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 text-center">Employee Manager</h2>
                
                <div className="space-y-2">
                    <Link
                        to="/empManager/view"
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 transition"
                        title="View Employees"
                    >
                        <FaUsers size={20} className="text-blue-500" />
                        <span className="text-gray-700 font-medium">View Employees</span>
                    </Link>

                    <Link
                        to="/empManager/add"
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 transition"
                        title="Add Employee"
                    >
                        <FaUserPlus size={20} className="text-green-500" />
                        <span className="text-gray-700 font-medium">Add Employee</span>
                    </Link>

                    <Link
                        to="/paidsalManager/view"
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 transition"
                        title="View Paid Salaries"
                    >
                        <FaMoneyBillWave size={20} className="text-yellow-500" />
                        <span className="text-gray-700 font-medium">View Paid Salaries</span>
                    </Link>

                    <Link
                        to="/paidsalManager/add"
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 transition"
                        title="Add Salary"
                    >
                        <FaPlusSquare size={20} className="text-red-500" />
                        <span className="text-gray-700 font-medium">Add Salary</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
