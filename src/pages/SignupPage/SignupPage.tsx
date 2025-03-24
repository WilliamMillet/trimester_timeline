import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    IconButton,
    InputAdornment,
    Autocomplete,
    Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./SignupPage.css";
import { degreeOptions } from "./degreeList";

// Define the form data structure using an interface
interface SignupFormData {
    name: string;
    zid: string;
    password: string;
    degree: string;
    year: number;
}

const SignupPage = () => {
    // Initialize React Hook Form with type safety
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SignupFormData>();

    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Form submission handler to post data to API
    const onSubmit = async (data: SignupFormData) => {
        
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
                <form onSubmit={handleSubmit(onSubmit)} className="signup-main-fields">
                    <div className="signup-input-container">
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            variant="outlined"
                            {...register("name", { required: "Name is required" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </div>
                    <div className="signup-input-container">
                        <TextField
                            fullWidth
                            id="zid"
                            label="What's your zID?"
                            variant="outlined"
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
                            label="Password?"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password should be at least 8 characters",
                                },
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
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="signup-input-container">
                        <Controller
                            name="degree"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Autocomplete
                                    options={degreeOptions}
                                    onChange={(_, v) => field.onChange(v)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Degree"
                                            error={!!errors.degree}
                                            helperText={errors.degree?.message}
                                        />
                                    )}
                                />
                            )}
                        />
                    </div>
                    <div className="signup-input-container">
                        <TextField
                            fullWidth
                            id="year"
                            label="Year"
                            type="number"
                            variant="outlined"
                            {...register("year", {
                                required: "Year is required",
                                min: {
                                    value: 1,
                                    message: "Your year cant be below 1!",
                                },
                                valueAsNumber: true,
                            })}
                            error={!!errors.year}
                            helperText={errors.year?.message}
                        />
                    </div>
                    <Button type="submit" variant="contained" sx={{ height: "50px" }}>
                        Signup
                    </Button>
                </form>
            </section>
        </main>
    );
};

export default SignupPage;