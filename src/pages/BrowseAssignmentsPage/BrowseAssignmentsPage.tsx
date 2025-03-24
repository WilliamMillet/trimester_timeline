import React, { useState, useMemo } from 'react';
import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentCard from './AssignmentCard';

interface Assignment {
  id: number;
  name: string;
  subject: string;
  description: string;
  duration: string;
}

const assignments: Assignment[] = [
  {
    id: 1,
    name: 'Caverun',
    subject: 'COMP1511',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, repellat!',
    duration: '3.9 weeks',
  },
  {
    id: 2,
    name: 'Database project',
    subject: 'COMP1234',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, repellat!',
    duration: '5.1 weeks',
  },
  {
    id: 3,
    name: 'Java project',
    subject: 'COMP0101',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, repellat!',
    duration: '4.2 weeks',
  },
];

const BrowseAssignmentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');

  const filteredAndSortedAssignments = useMemo(() => {
    let filtered = assignments.filter((assignment) =>
      (
        assignment.name.toLowerCase() +
        assignment.subject.toLowerCase() +
        assignment.description.toLowerCase()
      ).includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'subject') {
        return a.subject.localeCompare(b.subject);
      } else if (sortOption === 'duration') {
        return a.duration.localeCompare(b.duration);
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, sortOption]);

  return (
    <div style={{ padding: '20px', width: '1100px', margin: 'auto', backgroundColor: 'var(--background-1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          variant="outlined"
          placeholder="Search assignments"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'var(--text-1)' }} />
              </InputAdornment>
            ),
            sx: { color: 'var(--text-1)', width: '400px' },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'var(--background-3)',
              '& fieldset': { borderColor: 'var(--border-1)' },
              '&:hover fieldset': { borderColor: 'var(--color-primary-1)' },
              '&.Mui-focused fieldset': { borderColor: 'var(--color-primary-1)' },
            },
          }}
        />
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: 'var(--text-1)' }}>Sort by</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as string)}
            label="Sort by"
            sx={{
              color: 'var(--text-1)',
              backgroundColor: 'var(--background-3)',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-1)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary-1)' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary-1)' },
            }}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="subject">Subject</MenuItem>
            <MenuItem value="duration">Duration</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={3}>
        {filteredAndSortedAssignments.map((assignment) => (
          <Grid item xs={12} sm={6} md={4} key={assignment.id}>
            <AssignmentCard assignment={assignment} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BrowseAssignmentsPage;