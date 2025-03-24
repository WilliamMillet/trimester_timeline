import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
interface Assignment {
  id: number;
  name: string;
  subject: string;
  description: string;
  duration: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  return (
    <Card
      sx={{
        backgroundColor: 'var(--background-2)',
        color: 'var(--text-1)',
        borderRadius: 'var(--standard-radius)',
        height: '200px;',
        cursor: 'pointer'
      }}
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
        <Typography variant="subtitle1">{assignment.subject}</Typography>
      </Box>
      <CardContent>
        <Typography variant="body1">{assignment.description}</Typography>
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          Duration: {assignment.duration}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;