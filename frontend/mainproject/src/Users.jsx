import React, { useEffect, useState } from "react";

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        role: "USER", // Default role
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8081/persons", {
                    method: "GET",
                    headers: {
                        "userRole": "ADMIN", // Only Admin role can view users
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    setError("Failed to fetch users");
                }
            } catch (error) {
                setError("Something went wrong with getting users!");
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/persons/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsCreating(false);
                const newUser = await response.json();
                setUsers(prevUsers => [...prevUsers, newUser]);
            } else {
                setError("Failed to create user");
            }
        } catch (error) {
            setError("Something went wrong with creating user!");
        }
    };

    const handleEdit = (id) => {
        const user = users.find((user) => user.id === id);
        setCurrentUser(user);
        setFormData({
            name: user.name,
            password: user.password,
            role: user.role,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/persons/update/${currentUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "userRole": "ADMIN",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setCurrentUser(null);
                setUsers(prevUsers => prevUsers.map(user => 
                    user.id === currentUser.id ? { ...user, ...formData } : user
                ));
            } else {
                setError("Failed to update user");
            }
        } catch (error) {
            setError("Something went wrong with updating user!");
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/persons/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "userRole": "ADMIN", // Only Admin can delete users
                },
            });

            if (response.ok) {
                setUsers(users.filter(user => user.id !== id));
            } else {
                setError("Failed to delete user");
            }
        } catch (error) {
            setError("Something went wrong with deleting user!");
        }
    };

    return (
        <div className="users-container">
            <h2>Users</h2>
            {error && <p className="error">{error}</p>}

            <button onClick={() => setIsCreating(true)} className="btn create-btn">Create User</button>

            {isCreating && (
                <form onSubmit={handleCreate} className="user-form">
                    <h3>Create User</h3>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn submit-btn">Submit</button>
                    <button type="button" onClick={() => setIsCreating(false)} className="btn cancel-btn">Cancel</button>
                </form>
            )}

            {currentUser && (
                <form onSubmit={handleUpdate} className="user-form">
                    <h3>Update User</h3>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn submit-btn">Update</button>
                    <button type="button" onClick={() => setCurrentUser(null)} className="btn cancel-btn">Cancel</button>
                </form>
            )}

            <div className="users-list">
                <h3>Users</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleEdit(user.id)} className="btn edit-btn">Edit</button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="btn delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;