import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import truncate from '../../utils/truncate';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useNavigate } from 'react-router-dom';

export interface Assignment {
  id: number;
  courseCode: string;
  name: string;
  description: string;
  isObsolete: number;
  avgTimeTaken: string | null;
  avgDueDate: string | null;
  avgReleaseDate: string | null;
}

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
      navigate(`/assignments/${assignment.id}`);
  }
  return (
    <Card
      sx={{
        backgroundColor: 'var(--background-2)',
        color: 'var(--text-1)',
        borderRadius: 'var(--standard-radius)',
        height: '260px;',
        cursor: 'pointer'
      }}
      onClick={handleRedirect}
    >
      <Box
        sx={{
          background: 'var(--color-primary-1)',
          padding: '10px',
          borderTopLeftRadius: 'var(--standard-radius)',
          borderTopRightRadius: 'var(--standard-radius)',
        }}
      >
        <div className="flex">
            <AssignmentIcon/>
            <Typography variant="h6">{assignment.name}</Typography>
        </div>
        <Typography variant="subtitle1">{assignment.courseCode}</Typography>
      </Box>
      <CardContent>
        <Typography variant="body1">{truncate(assignment.description, 151)}</Typography>
        {assignment?.avgTimeTaken && <div className='flex'>
          <AccessTimeFilledIcon/>
          <p>
            <strong>
            Duration: {Math.round((Number(assignment.avgTimeTaken) * 100))/100} Weeks
            </strong>
          </p>
        </div>}
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;