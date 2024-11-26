import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Clear previous errors
    
        try {
            const response = await fetch("http://localhost:8081/persons/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
    
                console.log("Login successful:", data);  // Log response to check structure
                const { role, userId } = data;
    
                // Redirect based on the person's role
                if (role === "ADMIN") {
                    navigate("/admin-dashboard", { state: { userId } });
                } else if (role === "USER") {
                    navigate("/user-dashboard", { state: { userId } });
                }
            } else {
                const errorText = await response.text();
                setError(errorText || "Invalid login credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong. Please try again.");
        }
    };
    

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Login
                </button>
            </form>
            <div className="home-link">
                <Link to="/">Go to Home</Link>
            </div>
        </div>
    );
}

export default Login;