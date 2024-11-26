import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout logic here (e.g., clear session, remove tokens)
        // For simplicity, we'll just navigate to the login page
        navigate("/login");
    };

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <p>Manage users, devices, and more.</p>
                <button onClick={handleLogout} className="btn logout-btn">Logout</button>
            </header>

            <div className="dashboard-content">
                <div className="dashboard-menu">
                    <div className="dashboard-card">
                        <h3 className="card-title">Users</h3>
                        <p className="card-description">Manage all the users in your system.</p>
                        <Link to="/admin-dashboard/users" className="btn dashboard-btn">View Users</Link>
                    </div>
                    <div className="dashboard-card">
                        <h3 className="card-title">Devices</h3>
                        <p className="card-description">Manage the devices assigned to users.</p>
                        <Link to="/admin-dashboard/devices" className="btn dashboard-btn">View Devices</Link>
                    </div>
                    <div className="dashboard-card">
                        <h3 className="card-title">Assign Devices</h3>
                        <p className="card-description">Assign devices to users and view the listing.</p>
                        <Link to="/admin-dashboard/assign-devices" className="btn dashboard-btn">Assign Devices</Link>
                    </div>
                    {/* Add more cards as needed for other admin sections */}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;