import React, { useEffect } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("email is required"),
  name: Yup.string()
    .min(2, "Password must be at least 6 characters")
    .required("name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("password is required"),
});

const SigbUpForm: React.FC = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signUp);
  const error = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    if (!error && !loading) {
      navigate("/");
    }
  }, [error, navigate, loading]);

  // Form submission handler
  const handleSubmit = (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      signup(values.email, values.password, values.name);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      p={2}
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Box p={{ xs: 4, sm: 12.5, xl: 17.5 }}>
          <Typography variant="h6" paragraph>
            sign up or{" "}
            <span style={{ textDecoration: "underline" }}>
              {" "}
              <Link to="/login">sign up here</Link>
            </span>
          </Typography>
          <Typography variant="h2" gutterBottom>
            Sign up to Book App
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mb={4}>
                  <label htmlFor="name">Name</label>
                  <Field
                    as={TextField}
                    type="name"
                    name="name"
                    placeholder="Enter your full name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <ErrorMessage name="name" component="div" className="error" />
                </Box>
                <Box mb={4}>
                  <label htmlFor="email">Email</label>
                  <Field
                    as={TextField}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </Box>

                <Box mb={6}>
                  <label htmlFor="password">Password</label>
                  <Field
                    as={TextField}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </Box>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {" "}
                  {isSubmitting ? "Submitting..." : "Sign up"}{" "}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default SigbUpForm;
