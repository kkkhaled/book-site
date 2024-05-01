import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../layout/mainLayout";

import NotFound from "../components/notFound";
import LogIn from "../pages/login";
import SignUp from "../pages/signup";
import AddBook from "../pages/addBook";
import BookList from "../pages/bookList";
import ToastMessage from "../components/shared/toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <BookList />,
      },
      {
        path: "/add-book",
        index: true,
        element: <AddBook />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastMessage />
    </>
  );
};

export default AppRouter;
