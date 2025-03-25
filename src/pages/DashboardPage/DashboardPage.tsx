import { Box, CircularProgress, Typography } from '@mui/material';
import GanttChart from './GanntChart';
import './DashboardPage.css'
import CookedOMeter from './CookedOMeter';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CourseRatingForm from './DashboardForm';
import { createContext, useState } from 'react';

export const ClassContext = createContext<any>(null);

// Data format
// [
//    {courseCode: 'COMP1511', skill: 5},
//    {courseCode: 'COMP1531', skill: 2},
// ]

const DashboardPage = () => {
   const [classData, setClassData] = useState<any>([]);

    const name = localStorage.getItem('name')

    return ( 
    <ClassContext.Provider value={{ classData, setClassData }}>
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
               <CourseRatingForm/>
         </main>
        </ClassContext.Provider>
     );
}
 
export default DashboardPage;