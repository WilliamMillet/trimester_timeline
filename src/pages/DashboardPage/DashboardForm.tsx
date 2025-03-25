import React, { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Autocomplete,
    TextField,
    Slider,
    Button,
    Box,
    Typography,
    Chip,
    IconButton,
    Paper,
    InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { ClassContext } from "./DashboardPage";

interface CourseRating {
    courseCode: string;
    skillLevel: number;
    completionPercentage?: number; // Added completion percentage
}

interface FormData {
    courses: CourseRating[];
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 600,
    margin: "0 auto",
    borderRadius: 16,
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.primary.main,
    "& .MuiSlider-thumb": {
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    },
    "& .MuiSlider-rail": {
        backgroundColor: theme.palette.grey[300],
    },
    "& .MuiSlider-track": {
        backgroundColor: theme.palette.primary.main,
    },
}));

const CourseRatingForm: React.FC = () => {
    const { control, handleSubmit, setValue, watch } = useForm<FormData>({
        defaultValues: {
            courses: [],
        },
    });

    function updateWeeksToComplete(courses: any[], completionPercentage: number): any[] {
        const multiplier = 1 - (completionPercentage / 100) + 0.01;
        return courses.map(course => ({
            ...course,
            assignments: course.assignments.map((assignment: any) => ({
                ...assignment,
                averageWeeksToComplete: assignment.averageWeeksToComplete * multiplier
            }))
        }));
    }

    const { setClassData } = useContext(ClassContext);
    const [courseTags, setCourseTags] = useState<string[]>([]);
    const courses = watch("courses", []);

    useEffect(() => {
        fetch("http://localhost:5000/api/courses")
            .then((res) => res.json())
            .then((data) =>
                setCourseTags(data.courses.map((course: any) => course.course_code))
            )
            .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    const handleAddCourse = (courseCode: string | null) => {
        if (courseCode && !courses.some((course) => course.courseCode === courseCode)) {
            setValue("courses", [...courses, { courseCode, skillLevel: 3, completionPercentage: 0 }]);
        }
    };

    const handleRemoveCourse = (courseCode: string) => {
        setValue(
            "courses",
            courses.filter((course) => course.courseCode !== courseCode)
        );
    };

    const handleSkillChange = (courseCode: string, newValue: number) => {
        setValue(
            "courses",
            courses.map((course) =>
                course.courseCode === courseCode
                    ? { ...course, skillLevel: newValue }
                    : course
            )
        );
    };

    const handleCompletionChange = (courseCode: string, newValue: string) => {
        const percentage = Math.min(100, Math.max(0, parseFloat(newValue) || 0));
        setValue(
            "courses",
            courses.map((course) =>
                course.courseCode === courseCode
                    ? { ...course, completionPercentage: percentage }
                    : course
            )
        );
    };

    const onSubmit = (data: FormData) => {
        const courseCodes = data.courses.map((course) => course.courseCode);
        if (courseCodes?.length > 0) {
            fetch("http://localhost:5000/api/courses/get-assignments-duration-data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseCodes }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then((assignmentsData) => {
                    const enrichedData = assignmentsData.map((assignment: any) => {
                        const course = data.courses.find((c) => c.courseCode === assignment.courseCode);
                        return { 
                            ...assignment, 
                            ability: course ? course.skillLevel : null,
                        };
                    });
                    
                    // Apply completion percentage multiplier to each course
                    const updatedData = data.courses.reduce((acc, course) => {
                        return updateWeeksToComplete(acc, course.completionPercentage || 0);
                    }, enrichedData);
                    
                    setClassData(updatedData);
                })
                .catch((error) => {
                    console.error("Error fetching assignments data:", error);
                });
        } else {
            setClassData([]);
        }
    };

    return (
        <div className="dasboard-form">
            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600 }}>
                What classes are you doing?
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Controller
                    name="courses"
                    control={control}
                    render={() => (
                        <Autocomplete
                            options={courseTags}
                            getOptionLabel={(option) => option}
                            onChange={(event, value) => handleAddCourse(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Add a course"
                                    variant="outlined"
                                    sx={{ mb: 3, width: "400px" }}
                                />
                            )}
                            sx={{ mb: 2, width: "400px" }}
                        />
                    )}
                />
                {courses.map((course) => (
                    <Box
                        key={course.courseCode}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: "var(--background-3)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                            width: "900px",
                        }}
                    >
                        <Chip label={course.courseCode} sx={{ mr: 2, fontWeight: 500 }} />
                        <Box sx={{ flexGrow: 1, mr: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Your skill level
                            </Typography>
                            <StyledSlider
                                value={course.skillLevel}
                                onChange={(e, newValue) =>
                                    handleSkillChange(course.courseCode, newValue as number)
                                }
                                min={1}
                                max={5}
                                step={1}
                                marks={[
                                    { value: 1, label: "Bad" },
                                    { value: 3, label: "Average" },
                                    { value: 5, label: "Strong" },
                                ]}
                                valueLabelDisplay="auto"
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "200px",
                                mr: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Completion %
                            </Typography>
                            <TextField
                                type="number"
                                value={course.completionPercentage}
                                onChange={(e) =>
                                    handleCompletionChange(course.courseCode, e.target.value)
                                }
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    inputProps: { min: 0, max: 100 },
                                }}
                            />
                        </Box>
                        <IconButton
                            onClick={() => handleRemoveCourse(course.courseCode)}
                            sx={{ ml: 2 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                ))}
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: 8,
                        backgroundColor: "#1976d2",
                        "&:hover": { backgroundColor: "#1565c0" },
                        textTransform: "none",
                        fontSize: "1rem",
                        width: "400px",
                    }}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default CourseRatingForm;