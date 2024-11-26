import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import HomePage from './HomePage.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import AdminDashboard from "./AdminDashboard.jsx";
import UserDashboard from "./UserDashboard.jsx";
import Devices from "./Devices.jsx";
import Users from "./Users.jsx";
import Assign from "./Assign.jsx";

function App() {
    return (
        <Router>
            <Main />
        </Router>
    );
}

function Main() {
    const location = useLocation();
    
    return (
        <>
            {location.pathname === '/' && <Header />}  {/* Conditionally render the header only on the homepage */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/admin-dashboard/devices" element={<Devices />} />
                <Route path="/admin-dashboard/users" element={<Users />} />
                <Route path="/admin-dashboard/assign-devices" element={<Assign />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
