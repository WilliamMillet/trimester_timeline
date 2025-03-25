import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  Chip,
  Tooltip,
  Fade,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AnonymousIcon from '@mui/icons-material/PersonOutline';

// Define the comment prop type (content is optional)
interface CommentProps {
  user_zid: number;
  assignment_id: number;
  content?: string; // Optional content
  time_taken_in_weeks: string;
  review_date: string;
  release_date: string;
  due_date: string;
  is_anonymous: number;
}

// Styled components for custom styling
const CommentCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '16px auto',
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 40,
  height: 40,
}));

const TimeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  fontWeight: 'bold',
}));

const TimeProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[300],
}));

const CommentComponent = ({ comment }: any) => {
  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const reviewDate = formatDate(comment.review_date);
  const dueDate = formatDate(comment.due_date);

  // Convert time_taken_in_weeks to a number and bound it between 1 and 10
  const timeTaken = parseFloat(comment.time_taken_in_weeks);
  const boundedTime = Math.min(Math.max(timeTaken, 1), 10);
  const timePercentage = (boundedTime / 10) * 100;

  return (
    <CommentCard>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Tooltip
            title={comment.is_anonymous ? 'Anonymous User' : `User ID: ${comment.user_zid}`}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <UserAvatar>
              {comment.is_anonymous ? <AnonymousIcon /> : comment.user_zid.toString()[0]}
            </UserAvatar>
          </Tooltip>
          <Box ml={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              {comment.is_anonymous ? 'Anonymous' : `User ${comment.user_zid}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Reviewed: {reviewDate}
            </Typography>
          </Box>
        </Box>

        {/* Optional Content */}
        {comment.content && (
          <Typography variant="body1" color="text.primary" paragraph>
            {comment.content}
          </Typography>
        )}

        {/* Time Taken Graphic */}
        {!comment.content && <Box my={2}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Time Taken ({comment.time_taken_in_weeks} weeks)
          </Typography>
          <Tooltip title={`${boundedTime} / 10 weeks`} placement="top">
             <TimeProgress
              variant="determinate"
              value={timePercentage}
              sx={{
                '& .MuiLinearProgress-bar': {
                  backgroundColor:
                    boundedTime >= 7
                      ? 'success.main'
                      : boundedTime >= 4
                      ? 'warning.main'
                      : 'error.main',
                },
              }}
            />
          </Tooltip>
        </Box>}

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="text.secondary">
              Assignment ID: {comment.assignment_id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Due: {dueDate}
            </Typography>
          </Box>
          <Tooltip title="Time taken to complete" placement="top">
            <TimeChip
              icon={<AccessTimeIcon />}
              label={`${comment.time_taken_in_weeks} weeks`}
              size="small"
              sx={{ backgroundColor: 'var(--color-primary-1)' }}
            />
          </Tooltip>
        </Box>
      </CardContent>
    </CommentCard>
  );
};

export default CommentComponent