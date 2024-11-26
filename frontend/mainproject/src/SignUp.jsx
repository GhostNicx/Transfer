import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you would usually handle the signup logic (e.g., call an API to create a new user)
        console.log('Signup submitted:', { username, password });
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit} className="signup-form">
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
                <button type="submit" className="submit-btn">Sign Up</button>
            </form>
            <div className="login-link">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
            <div className="back-to-home">
                <p>Back to <Link to="/">Home</Link></p> {/* Link to homepage */}
            </div>
        </div>
    );
}

export default SignUp;
