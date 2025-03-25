import { Box, CircularProgress, Typography } from '@mui/material';
import GanttChart from './GanntChart';
import './DashboardPage.css'
import CookedOMeter from './CookedOMeter';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CourseRatingForm from './DashboardForm';
import { createContext, useState } from 'react';

export const ClassContext = createContext<any>(null);

const DashboardPage = () => {
   const [classData, setClassData] = useState<any>([]);
   const [message, setMessage] = useState<string>('Hello, William Millet')

    return ( 
    <ClassContext.Provider value={{ classData, setClassData, message, setMessage }}>
      <main className="dashboard-page">
               <div className="dashboard-page-top-text">
               <h1 className='schedule-prompt-text'>{message}.</h1>
               <div className="cooked-o-meter">
                  <span>Cooked-o-meter</span>
                  <CookedOMeter/>
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