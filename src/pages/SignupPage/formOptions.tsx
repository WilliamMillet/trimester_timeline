export const formOptions = {
    name: { required: "Name is required" },
    zid: {
      required: "zID is required",
      pattern: { value: /^\d{7}$/, message: "zID should be 7 digits" },
    },
    password: {
      required: "Password is required",
      minLength: { value: 8, message: "Password should be at least 8 characters" },
    },
    degree: { required: "Degree is required" },
    year: {
      required: "Year is required",
      min: { value: 1, message: "Your year can’t be below 1!" },
      valueAsNumber: true,
    },
  };