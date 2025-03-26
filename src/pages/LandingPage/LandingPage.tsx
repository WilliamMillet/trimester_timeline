import "./LandingPage.css";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SearchIcon from "@mui/icons-material/Search";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    
    const features = [
        {
          title: "Personalized Assignment Timeline",
          icon: <AccountTreeIcon fontSize="large" />,
          text: "Get tailored recommendations on when to start assignments based on your unique skill levels and aggregated student data."
        },
        {
          title: "Real-time Adjustments",
          icon: <BarChartIcon fontSize="large" />,
          text: "Easily update your assignment progress and instantly receive adjusted timelines to keep you on track."
        },
        {
          title: "AI-powered Insights",
          icon: <ChatBubbleIcon fontSize="large" />,
          text: "Chat with an AI assistant to estimate assignment completion times and gain valuable insights from historical user data."
        },
        {
          title: "Community-driven Reviews",
          icon: <PeopleIcon fontSize="large" />,
          text: "Read and share comments about assignment difficulties, helping you navigate coursework effectively."
        },
        {
          title: "Average Completion Times",
          icon: <GroupAddIcon fontSize="large" />,
          text: "View aggregated data showing the typical time your peers take to complete assignments, enabling smarter planning."
        },
        {
          title: "Course Insights & Warnings",
          icon: <SearchIcon fontSize="large" />,
          text: "Stay informed with common assignment release dates and know if you need to do extra preparation."
        }
      ];

      const navigate = useNavigate();


  return (
    <main className="landing-page">
      <Box
        sx={{
          color: "var(--text-1)",
          padding: "2rem",
          borderRadius: "var(--standard-radius)",
          maxWidth: "600px",
          margin: "auto",
          textAlign: "left",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            background: `linear-gradient(90deg, var(--color-primary-gradient-start) 10%, var(--color-primary-gradient-end)) 40%`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
          }}
        >
          Plan your trimester in seconds, not days.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
          With Trimester Timeline, you can know for certain how long assignments
          will take and make sure you're starting early enough
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginBottom: "2rem",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate('/signup')}
            sx={{
              border: "3px solid transparent",
              borderImage:
                "linear-gradient(90deg, var(--color-primary-gradient-start), var(--color-primary-gradient-end)) 1;",
              color: "var(--text-1)",
              background: "none",
              fontWeight: "bold",
            }}
          >
            Signup now
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: "var(--background-2)",
            padding: "1rem",
            borderRadius: "var(--standard-radius)",
          }}
        >
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Donwload today to boost your WAM and save your free time
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ width: "700px", margin: "auto" }} />
      <div className="gray-section">
        <Box sx={{ py: 8, px: 4, textAlign: "center", width: '1250px', margin: 'auto' }}>
          <Typography variant="h4" sx={{ color: "#FFF", mb: 6 }}>
            Know exactly when to start an assignment
          </Typography>
          <Grid container spacing={4}>
            {features.map(({ title, icon, text }) => (
              <Grid item key={title} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "#1E1E2A",
                    color: "#FFF",
                    borderTop: "4px solid",
                    borderImage:
                      "linear-gradient(90deg, var(--color-primary-gradient-start) 0%, var(--color-primary-gradient-end) 100%) 1",
                    boxShadow: "0px 4px 16px rgba(0,0,0,0.5)",
                  }}
                >
                  <CardContent>
                    <Box mb={2}>{icon}</Box>
                    <Typography variant="h6" gutterBottom>
                      {title}
                    </Typography>
                    <Typography variant="body2" lineHeight={1.6}>
                      {text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </main>
  );
};

export default LandingPage;
