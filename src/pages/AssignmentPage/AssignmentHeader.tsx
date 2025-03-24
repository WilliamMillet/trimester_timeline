import React from 'react';
import { Box, Typography } from '@mui/material';

interface AssignmentHeaderProps {
  courseCode: string;
  averageTime: string;
}

const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({ courseCode, averageTime }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {courseCode}
      </Typography>
      <Typography variant="h6" sx={{ color: 'primary.light' }}>
        Avg. Time: {averageTime}
      </Typography>
    </Box>
  );
};

export default AssignmentHeader;