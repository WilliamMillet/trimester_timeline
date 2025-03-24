import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import GanttBar from './GanttBar';

interface GanttChartProps {
    rows?: React.ReactNode[];
}

const GanttChart = ({ rows = [] }: GanttChartProps) => {
    const arrOfNumsZeroToTen = Array.from({ length: 10 }, (_, index) => index);

    // The data format that will be used
    const data = [
        { courseCode: 'COMP1511',
          assignments: [
            { number: 1, /* If it is the first assignemnt, 2nd, etc*/
              name: '', /* Name is optional */
              startDate: 'date',
              avgWeeksToDo: 3.45 
            }
          ]}
    ]

    interface GetAllTimesToCompleteProps {
        green: number;
        yellow: number;
        red: number;
        extreme: number;
    }

    const getAllTimesToComplete = (avgWeeksToDo: number): GetAllTimesToCompleteProps => {
        return {
            green: Math.round(avgWeeksToDo * 1.25),
            yellow: Math.round(avgWeeksToDo) ,
            red: Math.round(avgWeeksToDo * 0.5),
            extreme: Math.round(avgWeeksToDo * 0.25)
        }
    }





    for (let i = 1; i <= 10; i++) {

    }    
    
    return (
        <div className='main-schedule'>
            <div className="schedule-subjects-cards">
                <SubjectCardComponent subject='COMM1140'/>
                <SubjectCardComponent subject='COMP1511'/>
                <SubjectCardComponent subject='MATH1131'/>
            </div>
            <table>
                <thead>
                    <tr>
                        {arrOfNumsZeroToTen.map(index => (
                            <th>Week {index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <GanttBar dueDate={new Date(2025, 2, 29)} avgWeeksToDo={3} />
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GanttChart;

interface SubjectCardProps {
    subject: string;
}

const SubjectCardComponent = ({ subject }: SubjectCardProps) => {
    const SquareCard = styled(Card)(({ theme }) => ({
        width: 140,
        height: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }));

    return (
        <SquareCard>
            <CardContent>
                <Typography variant="h6" align="left">
                    {subject}
                </Typography>
                <Typography variant="body2" align="left">
                    Assignments
                </Typography>
                <Typography variant="body2" align="left">
                    Homework
                </Typography>
            </CardContent>
        </SquareCard>
    );
};
