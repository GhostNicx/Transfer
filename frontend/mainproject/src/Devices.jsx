import React, { useEffect, useState } from "react";

function Devices() {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false); // To toggle Create form
    const [currentDevice, setCurrentDevice] = useState(null); // For editing device
    const [formData, setFormData] = useState({
        description: "",
        address: "",
        maximumHourlyConsumption: "",
    });

    // Fetch devices data
    useEffect(() => {
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
                setError("Something went wrong!");
            }
        };

        fetchDevices();
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle device create
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/devices/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                setIsCreating(false); // Close the form
                const newDevice = await response.json(); // Get the created device from the response
                setDevices(prevDevices => [...prevDevices, newDevice]); // Add the new device to the list
            } else {
                setError("Failed to create device");
            }
        } catch (error) {
            setError("Something went wrong!");
        }
    };

    // Handle device edit
    const handleEdit = (id) => {
        const device = devices.find((device) => device.id === id);
        setCurrentDevice(device); // Set the device being edited
        setFormData({
            description: device.description,
            address: device.address,
            maximumHourlyConsumption: device.maximumHourlyConsumption,
        });
    };

    // Handle device update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/devices/update/${currentDevice.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                setCurrentDevice(null); // Close the form after update
                setDevices(prevDevices => prevDevices.map(device => 
                    device.id === currentDevice.id ? { ...device, ...formData } : device
                )); // Update the device in the list
            } else {
                setError("Failed to update device");
            }
        } catch (error) {
            setError("Something went wrong!");
        }
    };

    // Handle device delete
    const handleDeleteDevice = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/devices/delete/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setDevices(devices.filter(device => device.id !== id)); // Remove deleted device from the list
            } else {
                setError("Failed to delete device");
            }
        } catch (error) {
            setError("Something went wrong!");
        }
    };

    return (
        <div className="devices-container">
            <h2>Devices</h2>
            {error && <p className="error">{error}</p>}

            {/* Create device form toggle */}
            <button onClick={() => setIsCreating(true)} className="btn create-btn">Create Device</button>

            {isCreating && (
                <form onSubmit={handleCreate} className="device-form">
                    <h3>Create Device</h3>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Maximum Hourly Consumption</label>
                        <input
                            type="text"
                            name="maximumHourlyConsumption"
                            value={formData.maximumHourlyConsumption}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn submit-btn">Submit</button>
                    <button type="button" onClick={() => setIsCreating(false)} className="btn cancel-btn">Cancel</button>
                </form>
            )}

            {/* Update device form toggle */}
            {currentDevice && (
                <form onSubmit={handleUpdate} className="device-form">
                    <h3>Update Device</h3>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Maximum Hourly Consumption</label>
                        <input
                            type="text"
                            name="maximumHourlyConsumption"
                            value={formData.maximumHourlyConsumption}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn submit-btn">Update</button>
                    <button type="button" onClick={() => setCurrentDevice(null)} className="btn cancel-btn">Cancel</button>
                </form>
            )}

            {/* Display devices */}
            <div className="devices-list">
                <h3>Devices</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Maximum Hourly Consumption</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device) => (
                            <tr key={device.id}>
                                <td>{device.description}</td>
                                <td>{device.address}</td>
                                <td>{device.maximumHourlyConsumption}</td>
                                <td>
                                    <button onClick={() => handleEdit(device.id)} className="btn edit-btn">Edit</button>
                                    <button onClick={() => handleDeleteDevice(device.id)} className="btn delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Devices;