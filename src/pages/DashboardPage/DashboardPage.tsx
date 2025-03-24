import { Box, CircularProgress, Typography } from '@mui/material';
import GanttChart from './GanntChart';
import './DashboardPage.css'
import CookedOMeter from './CookedOMeter';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';


const DashboardPage = () => {
    const value = 75;

    const name = localStorage.getItem('name')

    return ( 
    <main className="dashboard-page">
            <div className="dashboard-page-top-text">
             <h1 className='schedule-prompt-text'>Good luck {name}, you're gonna need to hurry up...</h1>
             <div className="cooked-o-meter">
                <span>Cooked-o-meter</span>
                <CookedOMeter value={50}/>
             </div>
            </div>
            <div className="second-row">
                <AccessTimeFilledIcon/>
                <h2>Trimester 1</h2>
             </div>
            <GanttChart/>
        </main>
     );
}
 
export default DashboardPage;