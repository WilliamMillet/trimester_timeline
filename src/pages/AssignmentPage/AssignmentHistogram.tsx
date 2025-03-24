import React from 'react';
import { Paper, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

interface HistogramData {
  time: number;
  count: number;
}

interface AssignmentHistogramProps {
  data: HistogramData[];
}

const AssignmentHistogram: React.FC<AssignmentHistogramProps> = ({ data }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Histogram
      </Typography>
      <BarChart
        xAxis={[{ scaleType: 'band', data: data.map((d) => d.time), label: 'Time (hours)' }]}
        series={[{ data: data.map((d) => d.count), color: 'rgb(45, 255, 160)' }]}
        height={300}
      />
    </Paper>
  );
};

export default AssignmentHistogram;