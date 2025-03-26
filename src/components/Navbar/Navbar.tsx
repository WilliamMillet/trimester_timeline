import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../../assets/logo.png";

const Navbar = () => {
    const loggedIn = Boolean(localStorage.getItem("zid"));
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="main-navbar">
            <Link to="/">
                <img src={Logo} alt="Logo" className="logo" />
                <span>Trimester Timeline</span>
            </Link>
            <Link to="/">
                <HomeRoundedIcon />
                <span>Home</span>
            </Link>
            {loggedIn && <Link to="/dashboard">
                <DashboardRoundedIcon />
                <span>Dashboard</span>
            </Link>}
            {loggedIn ? (
                <div onClick={handleSignOut} style={{cursor: "pointer"}}>
                    <LogoutIcon />
                    <span>Signout</span>
                </div>
            ) : (
                <>
                    <Link to="/login">
                        <LoginRoundedIcon />
                        <span>Login</span>
                    </Link>
                    <Link to="/signup">
                        <PersonAddAlt1RoundedIcon />
                        <span>Signup</span>
                    </Link>
                </>
            )}
            {loggedIn && <Link to="/assignments">
                <LibraryBooksIcon />
                <span>Browse Assignments</span>
            </Link>}
        </nav>
    );
};

export default Navbar;
