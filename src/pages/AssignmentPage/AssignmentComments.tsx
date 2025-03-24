import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

interface Comment {
  author: string;
  time: string;
}

interface AssignmentCommentsProps {
  comments: Comment[];
}

const AssignmentComments: React.FC<AssignmentCommentsProps> = ({ comments }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Time Only Comments
      </Typography>
      <List>
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={comment.author}
                secondary={comment.time}
                primaryTypographyProps={{ color: 'text.primary' }}
                secondaryTypographyProps={{ color: 'primary.light' }}
              />
            </ListItem>
            {index < comments.length - 1 && <Divider sx={{ bgcolor: 'border-1' }} />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default AssignmentComments;