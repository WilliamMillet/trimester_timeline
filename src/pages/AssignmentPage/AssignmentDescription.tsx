import React from 'react';
import { Paper, Typography } from '@mui/material';

interface AssignmentDescriptionProps {
  description: string;
}

const AssignmentDescription: React.FC<AssignmentDescriptionProps> = ({ description }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Paper>
  );
};

export default AssignmentDescription;