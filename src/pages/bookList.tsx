import { useState, useEffect } from "react";
import useBookStore, { book } from "../store/bookStore";
import BookCard from "../components/bookItem";
import { Box, Pagination } from "@mui/material";
import Loader from "../components/shared/loader";

const BookList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const getBooks = useBookStore((state) => state.getBooks);
  const books = useBookStore((state) => state.books);
  const loading = useBookStore((state) => state.loading);
  const totalPages = useBookStore((state) => state.totalPages);
  useEffect(() => {
    getBooks(currentPage, 10);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (books.length === 0 && !loading) {
    return <div>no books added still, be first to add a book</div>;
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 2,
      }}
    >
      <Box
        sx={{
          display: "grid",
          rowGap: 2,
          columnGap: 5,
          gridTemplateColumns: [
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ],
          mb: 10,
        }}
      >
        {books.length > 0 ? (
          books.map((book: book) => (
            <BookCard
              key={book._id}
              author={book?.author.name}
              title={book.title}
              description={book.description}
              publishedDate={book.publishedDate}
            />
          ))
        ) : (
          <Loader />
        )}
      </Box>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => handlePageChange(value)}
        color="primary"
        sx={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
        }}
      />
    </Box>
  );
};

export default BookList;
