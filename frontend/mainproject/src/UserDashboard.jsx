import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserDashboard() {
    const location = useLocation();
    const { userId } = location.state || {};
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            fetchUserDetails(userId);
        }
    }, [userId]);

    const fetchUserDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/persons/devices/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User Details:", data); // Log the response to check the structure
                setUserDetails(data);
            } else {
                const errorText = await response.text();
                setError(errorText || "Failed to fetch user details");
            }
        } catch (err) {
            console.error("Error fetching user details:", err);
            setError("Something went wrong while fetching user details.");
        }
    };

    const handleLogout = () => {
        // Implement logout logic here (e.g., clear session, remove tokens)
        // For simplicity, we'll just navigate to the login page
        navigate("/login");
    };

    return (
        <div className="user-dashboard">
            <header className="dashboard-header">
                <h1>Welcome, User</h1>
                <button onClick={handleLogout} className="btn logout-btn">Logout</button>
            </header>
            {error && <p className="error-message">{error}</p>}
            {userDetails ? (
                <div>
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>ID:</strong> {userDetails.id}</p>
                    <h2>Your Devices:</h2>
                    {userDetails.devices && userDetails.devices.length > 0 ? (
                        <ul>
                            {userDetails.devices.map((device) => (
                                <li key={device.id}>
                                    <p><strong>Device ID:</strong> {device.id}</p>
                                    <p><strong>Description:</strong> {device.description}</p>
                                    <p><strong>Address:</strong> {device.address}</p>
                                    <p><strong>Max Hourly Consumption:</strong> {device.maximumHourlyConsumption} kWh</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No devices assigned to you.</p>
                    )}
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
}

export default UserDashboard;