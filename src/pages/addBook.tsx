import AddBookForm from "../components/addBook";
import withAuth from "../hoc/withAuth";

const AddBook = () => {
  return <AddBookForm />;
};

export default withAuth(AddBook);
