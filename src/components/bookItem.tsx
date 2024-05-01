import { Box, Typography } from "@mui/material";

const BookCard = ({
  title,
  description,
  author,
  publishedDate,
}: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
}) => {
  return (
    <Box
      sx={{
        border: 1,
        borderRadius: 2,
        borderColor: "grey.400",
        p: 2,
        maxWidth: "300px",
        width: "300px",
        minWidth: "200px",
        height: "150px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {description}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Author: {author}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Published Date: {new Date(publishedDate).toDateString()}
      </Typography>
    </Box>
  );
};

export default BookCard;
