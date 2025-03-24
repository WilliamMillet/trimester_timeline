import { TextField, IconButton, InputAdornment, Autocomplete, Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./SignupPage.css";
import { useState } from "react";
import { degreeOptions } from './degreeList'


const SignupPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <main className="signup-page">
      <section className="signup-form-container standard-section">
        <div className="form-container-header">
          <h1>
            Welcome to{" "}
            <span className="signup-title-gradient">Trimester Timeline</span>
          </h1>
        </div>
        <p className="signup-prompt-text">
          Sign up today and said goodbye to the pain of trimesters...
        </p>
        <div className="signup-main-fields">
          <TextField fullWidth id="name" label="Name" variant="outlined" />
          <TextField
            fullWidth
            id="zid"
            type="number"
            label="What's your zID?"
            variant="outlined"
            helperText="Don't include the 'z'"
          />
          <TextField
            fullWidth
            id="password"
            label="Password?"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Autocomplete
            disablePortal
            options={degreeOptions}
     
            renderInput={(params) => <TextField {...params} label="Degree" />}
            />
            <TextField
                fullWidth
                id="year"
                label="Year"
                type="number"
                variant="outlined"
            />
            <Button variant="contained" sx={{ height: '40px' }}>
                Send
            </Button>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
