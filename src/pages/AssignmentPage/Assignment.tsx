import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography } from '@mui/material';
import AssignmentHeader from './AssignmentHeader';
import AssignmentDescription from './AssignmentDescription';
import AssignmentHistogram from './AssignmentHistogram';
import AssignmentComments from './AssignmentComments';

// Dummy data for now
const assignmentData = {
  courseCode: 'COMP1511',
  description: 'Description asd Description asd Description asd',
  averageTime: '4 hours',
  comments: [
    { author: 'John', time: '4.12 hours' },
    { author: 'Anon', time: '4.2 hours' },
  ],
  histogramData: [
    { time: 1, count: 2 },
    { time: 2, count: 5 },
    { time: 3, count: 8 },
    { time: 4, count: 10 },
    { time: 5, count: 3 },
  ],
};

const AssignmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // For future fetch

  return (
    <main className="assignments-page" style={{display: 'flex', flexDirection: 'column', width: '1100px', margin: 'auto'}}>
        <div className="first-row">
            <div className="course-name-and-description" style={{width: '50%'}}>
                <h1 className='assignment-title'>CS Caverun</h1>
                <h2 className='course-title'>COMP1511</h2>
                <p>CS Caverun is a simplification of game mechanics explored by the 1980s 8-bit video game Boulder Dash. The classic 1984 version can be played here (all trademarks are the property of their respective owners).</p>
            </div>
            <div className="histogram">

            </div>
        </div>
        <div className="second-row">
            <div className="text-comments">
                
            </div>
            <div className="time-only-comments">

            </div>
        </div>
    </main>
  );
};

export default AssignmentPage;