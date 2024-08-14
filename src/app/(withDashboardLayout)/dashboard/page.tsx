"use client"
import { Box } from "@mui/material";
import ManageUsers from "./admin/manageUsers/page";
import AdminPage from "./admin/page";
import ChartComponent from "./components/chart/Chart";

const DashboardHomePage = () => {
  return (
    <Box>
   
      <AdminPage></AdminPage>
      <ChartComponent></ChartComponent>
    </Box>
  );
};

export default DashboardHomePage;
