import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    TextField,
    IconButton,
    InputAdornment,
    Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import "./LoginPage.css";

// Define the form data structure for login
interface LoginFormData {
    zid: string;
    password: string;
}

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { response, error, loading, success, fetchData } = useFetchData();
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async (data: LoginFormData) => {
        await fetchData(
            "http://localhost:5000/api/users/login", // Adjust this to your actual login endpoint
            "POST",
            {
                contentType: "application/json",
            },
            data,
            {
                onSuccess: (data) => {
                    if (success) { // Check the success flag from useFetchData
                        localStorage.setItem("name", data.name);
                        localStorage.setItem("zid", data.zid);
                        navigate("/dashboard");
                    }
                },
                onError: (err) => {
                    console.error("Login error:", err);
                },
                onFinally: () => {
                    console.log("Login attempt completed");
                },
            }
        );
    };

    return (
        <main className="signup-page">
            <section className="signup-form-container standard-section">
                <div className="form-container-header">
                    <h1>
                        Log In to{" "}
                        <span className="signup-title-gradient">Trimester Timeline</span>
                    </h1>
                </div>
                <p className="signup-prompt-text">
                    Log in to access your account
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="signup-main-fields">
                    <div className="signup-input-container">
                        <TextField
                            fullWidth
                            id="zid"
                            label="What's your zID?"
                            variant="outlined"
                            disabled={loading}
                            {...register("zid", {
                                required: "zID is required",
                                pattern: {
                                    value: /^\d{7}$/,
                                    message: "zID should be 7 digits",
                                },
                            })}
                            error={!!errors.zid}
                            helperText={errors.zid?.message || "Don't include the 'z'"}
                        />
                    </div>
                    <div className="signup-input-container">
                        <TextField
                            fullWidth
                            id="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            disabled={loading}
                            {...register("password", {
                                required: "Password is required",
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            disabled={loading}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    {error && (
                        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ height: "50px" }}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </Button>
                </form>
            </section>
        </main>
    );
};

export default LoginPage;