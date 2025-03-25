import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import './AssignmentPage.css'
import formatIsoDate from "../../utils/formatIsoDate";
import { TextField, Button, Slider } from "@mui/material";
import Divider from '@mui/material/Divider';

const AssignmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [assignment, setAssignment] = useState<any>('');
  const fetchDataReturn = useFetchData();

  // Existing fetch for assignment details
  useEffect(() => {
    if (id) {
      fetchDataReturn.fetchData(
        `http://localhost:5000/api/assignments/${id}`,
        "GET",
        {},
        null,
        {
          onSuccess: (data) => setAssignment(data.data),
        }
      );
    }
  }, [id, fetchDataReturn.fetchData]);

  // State for comment (review) content
  const [comment, setComment] = useState<string>("");

  // New state for date fields and completion time slider
  const [dueMonth, setDueMonth] = useState("1");
  const [dueDay, setDueDay] = useState("1");
  const [releaseMonth, setReleaseMonth] = useState("1");
  const [releaseDay, setReleaseDay] = useState("1");
  const [completionTime, setCompletionTime] = useState<number>(5);

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;

    // Build a review date using the release month/day (year fixed to 2025)
    const releaseDate = new Date(2025, Number(releaseMonth) - 1, Number(releaseDay));
    // Add the completion time (in weeks converted to days)
    const reviewDate = new Date(releaseDate);
    reviewDate.setDate(releaseDate.getDate() + completionTime * 7);
    const reviewDateStr = reviewDate.toISOString().split('T')[0];

    // Build the payload for the review.
    // Note: studentId is hard-coded (e.g., 1) and is_anonymous is set to false.
    const payload = {
      studentId: localStorage.getItem('zid'),
      assignmentId: Number(id),
      content: comment,
      timeTakenInWeeks: completionTime,
      reviewDate: reviewDateStr,
      is_anonymous: false
    };

    console.log(payload)
    fetchDataReturn.fetchData(
      "http://localhost:5000/api/reviews",
      "POST",
      {},
      payload,
      {
        onSuccess: (data) => {
          console.log("Review submitted successfully:", data);
          // Optionally clear form fields after a successful submission:
          setComment("");

        },
        onError: (error) => {
          console.error("Error submitting review:", error);
        }
      }
    );
  };

  return (
    <main className="assignment-page">
      <div className="top-row">
        <div className="top-left">
          <h1>{assignment.name}</h1>
        </div>
        <div className="top-right">
          Completion time distribution
        </div>
      </div>

      <div className="second-row">
        <div className="mid-left">
          {fetchDataReturn.error && (
            <div className="error">Error: {fetchDataReturn.error}</div>
          )}
          {assignment.avg_release_date && <div><strong>Average release date:</strong> {formatIsoDate(assignment.avg_release_date)}</div>}
          {assignment.avg_due_date && <div><strong>Average due date:</strong> {formatIsoDate(assignment.avg_due_date)}</div>}
          {assignment.is_obselete && <span><strong>This assignment is obsolete:</strong> A notification will pop up to explain what this means.</span>}
          <div className="description"><strong>Description:</strong> {assignment.description}</div>
        </div>
        <div className="spacer" />
      </div>

      <div className="full-row">
        <div className="add-comment">
          <h2>Add a Comment</h2>
          <TextField
            label="Write your comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <div style={{ marginBottom: "1rem" }}>
            <TextField
              select
              label="Due Month"
              variant="outlined"
              style={{ marginRight: "1rem", width: "49.2%" }}
              SelectProps={{ native: true }}
              value={dueMonth}
              onChange={(e) => setDueMonth(e.target.value)}
            >
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </TextField>
            <TextField
              label="Due Day"
              variant="outlined"
              type="number"
              inputProps={{ min: 1, max: 31 }}
              style={{ width: "49.2%" }}
              value={dueDay}
              onChange={(e) => setDueDay(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <TextField
              select
              label="Release Month"
              variant="outlined"
              style={{ marginRight: "1rem", width: "49.2%" }}
              SelectProps={{ native: true }}
              value={releaseMonth}
              onChange={(e) => setReleaseMonth(e.target.value)}
            >
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </TextField>
            <TextField
              label="Release Day"
              variant="outlined"
              type="number"
              inputProps={{ min: 1, max: 31 }}
              style={{ width: "49.2%" }}
              value={releaseDay}
              onChange={(e) => setReleaseDay(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <h3>Completion Time (Weeks)</h3>
            <Slider
              value={completionTime}
              step={0.5}
              marks
              min={1}
              max={10}
              valueLabelDisplay="auto"
              onChange={(e, newValue) => setCompletionTime(newValue as number)}
            />
          </div>
          <div className="flex">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommentSubmit}
              disabled={!comment.trim()}
            >
              Submit
            </Button>
            {assignment.success && <span>Comment posted successfully</span>}
          </div>
        </div>
      </div>
      <Divider />
      <div className="bottom-row">
        <div className="bottom-left" />
        <div className="bottom-right" />
      </div>
    </main>
  );
};

export default AssignmentPage;
