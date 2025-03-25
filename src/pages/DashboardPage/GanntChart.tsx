import React, { useContext } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import GanttBar from "./GanttBar";
import { ClassContext } from "./DashboardPage";



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
                    releaseDate={new Date(assignment.averageDueDate)}
                    avgWeeksToDo={assignment.averageWeeksToComplete}
                    ability={course.ability}
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
    justifyContent: "center",
    alignItems: "flex-start",
  }));

  return (
    <SquareCard>
      <CardContent>
        <Typography variant="h6" align="left">
          {subject}
        </Typography>
        <Typography variant="body2" align="left">
          Assignments
        </Typography>
        <Typography variant="body2" align="left">
          Homework
        </Typography>
      </CardContent>
    </SquareCard>
  );
};