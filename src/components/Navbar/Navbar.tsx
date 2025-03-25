import { Link } from 'react-router-dom'
import './Navbar.css'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
    const loggedIn = Boolean(localStorage.getItem('zid'))
    return ( 
        <nav className="main-navbar">
            <Link to="/">
                <img src="/assets/logo.png" alt="Logo" />
                <span>Trimester Timeline</span>
            </Link>
            <Link to="/">
                <HomeRoundedIcon />
                <span>Home</span>
            </Link>
            <Link to="/dashboard">
                <DashboardRoundedIcon />
                <span>Dashboard</span>
            </Link>
            {loggedIn ? (
                <div>
                    <LogoutIcon/>
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
                </>)}
            <Link to="/assignments">
                <LibraryBooksIcon />
                <span>Browse Assignments</span>
            </Link>
            
        </nav>
    );
}
 
export default Navbar;