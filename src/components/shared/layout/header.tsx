import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../../utils/checkIsLogIn";
import useAuthStore from "../../../store/authStore";
import { useEffect, useState } from "react";

const Header = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(isLoggedIn());

  useEffect(() => {}, [userIsLoggedIn]);

  const logout = useAuthStore((state) => state.logout);
  // handle logout
  const handleLogout = () => {
    logout();
    setUserIsLoggedIn(false);
  };
  return (
    <AppBar position="static" sx={{ width: "100%", height: "60px" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Books
          </Link>
          {userIsLoggedIn ? (
            <>
              <Link
                to="/add-book"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Add Books
              </Link>
              <Link
                onClick={handleLogout}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  backgroundColor: "black",
                  border: "1px solid black",
                  borderRadius: "5px",
                  marginRight: 5,
                }}
                to={"/"}
              >
                logout
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              logIn{" "}
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
