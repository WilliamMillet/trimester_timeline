import React, { useContext } from "react";
import { Card, CardContent, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import GanttBar from "./GanttBar";
import { ClassContext } from "./DashboardPage";
import { useNavigate } from "react-router-dom";



const GanttChart = () => {
  const { classData } = useContext(ClassContext); // Access the fetched data from context
  const arrOfNumsZeroToTen = Array.from({ length: 10 }, (_, index) => index);

  console.log(classData)


  if (!classData || !Array.isArray(classData)) {
    return <div>Loading class data...</div>;
  }

  if (classData.length === 0) {
    return (
      <div className="empty-schedule">
        Write in your class details to get started!   
      </div>
    )
  }

  const navigate = useNavigate()

  return (
    <div className="main-schedule">
  
      <div className="gantt-weeks">
        {arrOfNumsZeroToTen.map((index) => (
          <div key={index}>Week {index + 1}</div>
        ))}
      </div>
      <div className="schedule-subjects-cards">
        {classData.map((course) => (
          <section key={course.courseCode} className="course-schedule-container">
            <SubjectCardComponent subject={course.courseCode} />
            <div className="track-container">
            <div className="current-time-vertical-line"></div>
              <div className="track">
                {course.assignments.map((assignment: any) => (
                    <GanttBar
                      key={assignment.id}
                      dueDate={new Date(assignment.averageDueDate)}
                      releaseDate={new Date(assignment.averageReleaseDate)}
                      avgWeeksToDo={assignment.averageWeeksToComplete}
                      ability={course.ability}
                      assignmentName={assignment.name}
                      courseCode={course.courseCode}
                      onClick={() => navigate(`/assignments/${assignment.id}`)}
                    />

                ))}
              </div>
              <div className="track"></div>
            </div>
          </section>
        ))}
      </div>
      <div className="gantt-chart">
        <div className="gantt-bars"></div>
      </div>
    </div>
  );
};

export default GanttChart;

interface SubjectCardProps {
  subject: string;
}

const SubjectCardComponent = ({ subject }: SubjectCardProps) => {
  const SquareCard = styled(Card)(({ theme }) => ({
    width: 140,
    height: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
  }));

  const TopStripe = styled("div")(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 5,
    backgroundColor: theme.palette.primary.main,
  }));

  return (
    <SquareCard>
      <TopStripe />
      <CardContent style={{ paddingTop: 20, paddingLeft: '13px' }}>
        <Typography variant="h6" align="left" sx={{ fontWeight: 'bold' }}>
          {subject}
        </Typography>
        <Typography variant="body2" align="left">
          Assignments and homework timeline
        </Typography>

      </CardContent>
    </SquareCard>
  );
};