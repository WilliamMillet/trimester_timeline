import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import GanttBar from "./GanttBar";

interface GanttChartProps {
  rows?: React.ReactNode[];
}

const GanttChart = ({ rows = [] }: GanttChartProps) => {
  const arrOfNumsZeroToTen = Array.from({ length: 10 }, (_, index) => index);

  // The data format that will be used
  const data = [
    {
      courseCode: "COMP1511",
      assignments: [
        {
          number: 1,
          name: "",
          startDate: "date",
          avgWeeksToDo: 3.45,
        },
      ],
    },
  ];

  interface GetAllTimesToCompleteProps {
    green: number;
    yellow: number;
    red: number;
    extreme: number;
  }

  const getAllTimesToComplete = (
    avgWeeksToDo: number
  ): GetAllTimesToCompleteProps => {
    return {
      green: Math.round(avgWeeksToDo * 1.25),
      yellow: Math.round(avgWeeksToDo),
      red: Math.round(avgWeeksToDo * 0.5),
      extreme: Math.round(avgWeeksToDo * 0.25),
    };
  };

  return (
    <div className="main-schedule">
      <div className="gantt-weeks">
        {arrOfNumsZeroToTen.map((index) => (
          <div key={index}>Week {index + 1}</div>
        ))}
      </div>
    <div className="schedule-subjects-cards">
      <section className="course-schedule-container">
        <SubjectCardComponent subject="COMM1140" />
        <div className="track-container">
        <div className="track">
        <GanttBar dueDate={new Date(2025, 3, 5)} avgWeeksToDo={2} />
        </div>
        <div className="track"></div>
        </div>
      </section>
      <section className="course-schedule-container">
        <SubjectCardComponent subject="COMP1511" />
        <div className="track-container">
        <div className="track">
          <GanttBar dueDate={new Date(2025, 2, 29)} avgWeeksToDo={3} />
        </div>
        <div className="track"></div>
        </div>
      </section>
      <section className="course-schedule-container">
        <SubjectCardComponent subject="MATH1131" />
        <div className="track-container">
        <div className="track">
        <GanttBar dueDate={new Date(2025, 3, 5)} avgWeeksToDo={5} />
        <GanttBar dueDate={new Date(2025, 3, 22)} avgWeeksToDo={1} />
        </div>
        <div className="track"></div>
        </div>
      </section>
    </div>
      <div className="gantt-chart">
        <div className="gantt-bars">
        </div>
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
