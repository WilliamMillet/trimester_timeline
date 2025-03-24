import { Link } from 'react-router-dom'
import './Navbar.css'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';

const Navbar = () => {
    return ( 
        <nav className="main-navbar">
            <Link to="/">
                <span className='logo-icon'>T</span>
                <span>Trimester Timeline</span>
            </Link>
            <Link to="/">
                <HomeRoundedIcon />
                <span>Landing</span>
            </Link>
            <Link to="/dashboard">
                <DashboardRoundedIcon />
                <span>Dashboard</span>
            </Link>
            <Link to="/login">
                <LoginRoundedIcon />
                <span>Login</span>
            </Link>
            <Link to="/signup">
                <PersonAddAlt1RoundedIcon />
                <span>Signup</span>
            </Link>
            
        </nav>
    );
}
 
export default Navbar;