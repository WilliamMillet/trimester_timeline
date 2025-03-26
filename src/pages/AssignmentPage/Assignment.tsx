import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import './AssignmentPage.css';
import formatIsoDate from "../../utils/formatIsoDate";
import { TextField, Button, Slider, Tooltip, Skeleton, Stack } from "@mui/material";
import Divider from '@mui/material/Divider';
import CommentComponent from "./Comment";
import { BarChart } from '@mui/x-charts/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DescriptionIcon from '@mui/icons-material/Description';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

const AssignmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [assignment, setAssignment] = useState<any>(''); // Assignment details
  const [histogramData, setHistogramData] = useState<{ weeks: number; count: number }[]>([]); // Histogram data
  const fetchDataReturn = useFetchData();

  // Fetch assignment details and histogram data
  useEffect(() => {
    if (id) {
      fetchDataReturn.fetchData(
        `http://localhost:5000/api/assignments/${id}`,
        "GET",
        {},
        null,
        {
          onSuccess: (data) => {
            setAssignment(data.data.assignment);
            setHistogramData(data.data.histogram); // Set histogram data from API response
          },
        }
      );
    }
  }, [id, fetchDataReturn.fetchData]);

  // State for comment (review) content
  const [comment, setComment] = useState<string>("");

  // State for date fields and completion time slider
  const [dueMonth, setDueMonth] = useState("1");
  const [dueDay, setDueDay] = useState("1");
  const [releaseMonth, setReleaseMonth] = useState("1");
  const [releaseDay, setReleaseDay] = useState("1");
  const [completionTime, setCompletionTime] = useState<number>(5);

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;

    const releaseDate = new Date(2025, Number(releaseMonth) - 1, Number(releaseDay));
    const reviewDate = new Date(releaseDate);
    reviewDate.setDate(releaseDate.getDate() + completionTime * 7);
    const reviewDateStr = reviewDate.toISOString().split('T')[0];

    const payload = {
      studentId: localStorage.getItem('zid'),
      assignmentId: Number(id),
      content: comment,
      timeTakenInWeeks: completionTime,
      reviewDate: reviewDateStr,
      is_anonymous: false,
    };

    fetchDataReturn.fetchData(
      "http://localhost:5000/api/reviews",
      "POST",
      {},
      payload,
      {
        onSuccess: () => {
          setComment("");
          window.location.reload();
        },
        onError: (error) => {
          console.error("Error submitting review:", error);
        },
      }
    );
  };

  const [aiGen, setAiGen] = useState<string | null>(null)

  useEffect(() => {
    fetch("http://localhost:5000/api/assignments/1/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setAiGen(data.summary);
      })
      .catch((error) => console.error("Error fetching AI summary:", error));
  }, []);

  const [comments, setComments] = useState<any[]>([]);

  const aiFetch = useFetchData();

  useEffect(() => {
    if (id) {
      aiFetch.fetchData(
        `http://localhost:5000/api/reviews/assignment/${id}`,
        "GET",
        {},
        null,
        {
          onSuccess: (data) => {
            setComments(data.data);
          },
          onError: (error) => {
            console.error("Comments were not successfully fetched:", error);
          },
        }
      );
    }
  }, [id]);

  // Prepare data for BarChart
  const chartData = histogramData.map((item) => item.count); // Y-axis: count
  const chartLabels = histogramData.map((item) => item.weeks.toString()); // X-axis: weeks

  return (
    <main className="assignment-page">
      <div className="top-row">
        <div className="top-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AssignmentIcon />
          <h1>{assignment.name}</h1>
        </div>
        <div className="top-right">
          Completion Time Distribution
        </div>
      </div>

      <div className="second-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="mid-left">
          {fetchDataReturn.error && (
            <div className="error">Error: {fetchDataReturn.error}</div>
          )}
            {assignment.avg_release_date && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AccessTimeFilledIcon />
              <strong>Average release date:</strong> {formatIsoDate(assignment.avg_release_date)}
            </div>
            )}
            {assignment.avg_due_date && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AccessTimeFilledIcon />
              <strong>Average due date:</strong> {formatIsoDate(assignment.avg_due_date)}
            </div>
            )}
          {assignment.is_obselete && (
            <span><strong>This assignment is obsolete:</strong> A notification will pop up to explain what this means.</span>
          )}
          <div className="description" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><DescriptionIcon/><strong>Description:</strong></div> <div style={{textAlign: 'justify'}}>{assignment.description}</div>
        </div>
        <div className="mid-right" style={{ width: '40%' }}>
          {histogramData.length > 0 ? (
            <BarChart
              xAxis={[{ scaleType: 'band', data: chartLabels, label: 'Weeks' }]}
              series={[{ data: chartData, color: 'var(--color-primary-1)' }]}
              width={400}
              height={300}
            />
          ) : (
            <p>No histogram data available</p>
          )}
        </div>
      </div>
      <div className="full-row-1">
          <Tooltip followCursor title='Get an AI summary of the difficulty of the this course'>
          <div className="ai-summary-title">
            <AutoAwesomeRoundedIcon/>
            <h2>AI summary</h2>
          </div>
          </Tooltip>
          {!aiGen && !aiFetch.error && (
            <Stack spacing={1}>
              <Skeleton variant="rectangular" sx={{ width: "100%", height: 15, borderRadius: 10 }} />
              <Skeleton variant="rectangular" sx={{ width: "100%", height: 15, borderRadius: 10 }} />
              <Skeleton variant="rectangular" sx={{ width: "100%", height: 15, borderRadius: 10 }} />
            </Stack>
          )}  
          {aiGen && <span className="ai-gen-text">{aiGen}</span>}
          {aiFetch.error}

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
            >
              Submit
            </Button>
            {assignment.success && <span>Comment posted successfully</span>}
          </div>
        </div>
      </div>
      <Divider />
      <div className="bottom-row">
        <div className="bottom-left">
          <div className="comments">
            {comments &&
              Array.isArray(comments) &&
              comments
                .filter((com: any) => com.content)
                .map((com: any) => (
                  <CommentComponent comment={com} key={com.id} />
                ))}
          </div>
        </div>
        <div className="bottom-right">
          <div className="durations">
            {comments &&
              Array.isArray(comments) &&
              comments
                .filter((com: any) => !com.content)
                .map((com: any) => (
                  <CommentComponent comment={com} key={com.id} />
                ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AssignmentPage;