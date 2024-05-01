import { Box, TextField, Button, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import useAddBookStore from "../store/addBookStore";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  publishedDate: Yup.date().required("Published date is required"),
});
const AddBookForm = () => {
  const addBook = useAddBookStore((state) => state.addBook);

  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const formattedDate = dayjs(values.publishedDate).toDate();
      addBook(values.title, values.description, formattedDate);
      setSubmitting(false);
    } catch (error) {
      console.error("Error adding book:", error);
      setSubmitting(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box width="400px">
        <Typography variant="h6" gutterBottom align="center">
          Add Book
        </Typography>
        <Formik
          initialValues={{
            title: "",
            description: "",
            author: "",
            publishedDate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="title"
                  label="Title"
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage name="title" component="div" />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage name="description" component="div" />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="publishedDate"
                  label="Published Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <ErrorMessage name="publishedDate" component="div" />
              </Box>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                fullWidth
              >
                {isSubmitting ? "Adding..." : "Add Book"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddBookForm;
