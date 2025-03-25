import React, { useState, useMemo, useEffect } from 'react';
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
import useFetchData from '../../hooks/useFetchData';

interface Assignment {
  id: number;
  courseCode: string;
  name: string;
  description: string;
  isObsolete: number;
  avgTimeTaken: string | null;
  avgDueDate: string | null;
  avgReleaseDate: string | null;
}

const BrowseAssignmentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const query = useFetchData();

  const camelCaseifyRows = (rows: any[]): Assignment[] => {
    return rows.map((row: any) => {
      const newRow: any = {};
      Object.keys(row).forEach((key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        newRow[camelKey] = row[key];
      });
      return newRow as Assignment;
    });
  };

  useEffect(() => {
    query.fetchData('http://localhost:5000/api/assignments', 'GET', {}, null, {
      onSuccess: (data) => {
        if (data.data) {
          setAssignments(camelCaseifyRows(data.data));
        }
      },
      onError: (error) => {
        console.error("Failed to fetch assignments:", error);
      },
    });
  }, []);

  const filteredAndSortedAssignments = useMemo(() => {
    let filtered = assignments.filter((assignment) =>
      (
        (assignment.name?.toLowerCase() || '') +
        (assignment.courseCode?.toLowerCase() || '') +
        (assignment.description?.toLowerCase() || '')
      ).includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortOption === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      } else if (sortOption === 'courseCode') {
        return (a.courseCode || '').localeCompare(b.courseCode || '');
      } else if (sortOption === 'avgTimeTaken') {
        // Handle null values and convert to numbers for proper numeric sorting
        const timeA = a.avgTimeTaken ? parseFloat(a.avgTimeTaken) : -Infinity;
        const timeB = b.avgTimeTaken ? parseFloat(b.avgTimeTaken) : -Infinity;
        return timeA - timeB;
      }
      return 0;
    });

    return filtered;
  }, [assignments, searchQuery, sortOption]); // Added assignments to dependencies

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
            <MenuItem value="courseCode">Course Code</MenuItem>
            <MenuItem value="avgTimeTaken">Time Taken</MenuItem>
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