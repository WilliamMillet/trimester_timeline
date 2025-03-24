import { Box, Typography, Divider, Grid } from '@mui/material';
import GanttChart from './GanntChart';
import './DashboardPage.css'

const DashboardPage = () => {
    return ( 
        <main className="dashboard-page">
            <GanttChart/>
        </main>
     );
}
 
export default DashboardPage;