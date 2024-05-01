import { Box } from "@mui/material";
import Header from "../components/shared/layout/header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      width="100vw"
      rowGap={2}
    >
      <Header />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
