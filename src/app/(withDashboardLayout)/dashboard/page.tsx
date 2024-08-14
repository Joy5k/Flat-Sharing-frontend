import { Box } from "@mui/material";
import ManageUsers from "./admin/manageUsers/page";

const DashboardHomePage = () => {
  return (
    <Box>
      <h1>Welcome to dashboard</h1>
      <div>
        <div className="flex flex-col md:flex-row lg:flex-row justify-evenly gap-5">
          <div className="border bg-sky-600 p-5 w-72 h-44 rounded-lg">
            <div className="">
            <p className="text-white text-sm">All Flats</p>
            <p className="text-white text-4xl py-5">156</p>
            </div>
            <hr />
            <p className="font-mono text-white">13% Increase</p>
            <div>

            </div>
          </div>

          <div className="border bg-purple-600 p-5 w-72 h-44 rounded-lg">
            <div className="">
            <p className="text-white text-sm">All Users</p>
            <p className="text-white text-4xl py-5">89</p>
            </div>
            <hr />
            <p className="font-mono text-white">3% Increase</p>
            <div>

            </div>
          </div>
          <div className="border bg-rose-500 p-5 w-72 h-44 rounded-lg">
            <div className="">
            <p className="text-white text-sm">All Flat Request</p>
            <p className="text-white text-4xl py-5">12</p>
            </div>
            <hr />
            <p className="font-mono text-white">42% Increase</p>
            <div>

            </div>
          </div>
        </div>
        <ManageUsers></ManageUsers>
      </div>
    </Box>
  );
};

export default DashboardHomePage;
