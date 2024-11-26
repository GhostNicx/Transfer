import React, { useEffect, useState } from "react";

function AssignDevicesPage() {
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState("");
  const [selectedDevices, setSelectedDevices] = useState({});

  useEffect(() => {
    const fetchUsersWithDevices = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/persons/allWithDevices",
          {
            method: "GET",
            headers: {
              userRole: "ADMIN", // Only Admin role can view users
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setError("Failed to fetch users with devices");
        }
      } catch (error) {
        setError("Something went wrong with getting users with devices!");
      }
    };

    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:8080/devices/getAll", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setDevices(data);
        } else {
          setError("Failed to fetch devices");
        }
      } catch (error) {
        setError("Something went wrong with retrieving devices!");
      }
    };

    fetchUsersWithDevices();
    fetchDevices();
  }, []);

  const handleAssignDevice = async (userId) => {
    const selectedDevice = selectedDevices[userId];
    if (!selectedDevice) {
      setError("Please select a device to assign.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/devices/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceId: selectedDevice,
          personId: userId,
        }),
      });

      if (response.ok) {
        setError("");
        alert("Device assigned successfully!");
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            user.devices.push({ id: selectedDevice });
          }
          return user;
        });
        setUsers(updatedUsers);
      } else {
        setError("Failed to assign device");
      }
    } catch (error) {
      setError("Something went wrong in device listing!");
    }
  };

  const handleDeviceSelect = (userId, deviceId) => {
    setSelectedDevices((prevSelectedDevices) => ({
      ...prevSelectedDevices,
      [userId]: deviceId,
    }));
  };

  return (
    <div className="assign-devices-container">
      <h2>Assign Devices to Users</h2>
      {error && <p className="error">{error}</p>}

      <div className="users-list">
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Devices</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  {user.devices && user.devices.length > 0 ? (
                    user.devices.map((device) => (
                      <span key={device.id}>{device.description}</span>
                    ))
                  ) : (
                    <span>No devices assigned</span>
                  )}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => handleAssignDevice(user.id)}
                      className="btn assign-btn"
                    >
                      Assign Device
                    </button>
                    <select
                      onChange={(e) =>
                        handleDeviceSelect(user.id, e.target.value)
                      }
                      value={selectedDevices[user.id] || ""}
                    >
                      <option value="">Select Device</option>
                      {devices.map((device) => (
                        <option key={device.id} value={device.id}>
                          {device.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignDevicesPage;
