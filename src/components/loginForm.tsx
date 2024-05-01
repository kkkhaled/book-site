import React, { useEffect } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const LogInForm: React.FC = () => {
  const navigate = useNavigate();
  // Define validation schema using Yup
  const logIn = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    if (!error && !loading) {
      navigate("/");
    }
  }, [error, navigate, loading]);

  // Form submission handler
  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      logIn(values.email, values.password);
      setSubmitting(false);
      console.log(error);
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
            Log In or{" "}
            <span style={{ textDecoration: "underline" }}>
              {" "}
              <Link to="/signup">Register</Link>
            </span>
          </Typography>
          <Typography variant="h2" gutterBottom>
            Sign In to Book App
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
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
                  {isSubmitting ? "Submitting..." : "Sign In"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default LogInForm;
