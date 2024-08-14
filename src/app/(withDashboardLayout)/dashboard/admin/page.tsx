import { Box } from "@mui/material";
import ManageUsers from "./manageUsers/page";
import BasicTable from "../profile/flatRequests/page";

const AdminPage = () => {
  return (
    <Box>
    <h1 className="text-sky-800 mb-5">Overview</h1>
    <div>
      <div className="flex flex-col md:flex-row lg:flex-row justify-evenly gap-5">
        <div className="border bg-sky-600 p-5 w-72 h-44 rounded-lg">
          <div className="">
          <p className="text-white text-sm"> Flats</p>
          <p className="text-white text-4xl py-5">156</p>
          </div>
          <hr />
          <p className="font-mono text-white">13% Increase</p>
          <div>

          </div>
        </div>

        <div className="border bg-purple-600 p-5 w-72 h-44 rounded-lg">
          <div className="">
          <p className="text-white text-sm"> Users</p>
          <p className="text-white text-4xl py-5">89</p>
          </div>
          <hr />
          <p className="font-mono text-white">3% Increase</p>
          <div>

          </div>
        </div>
        <div className="border bg-rose-500 p-5 w-72 h-44 rounded-lg">
          <div className="">
          <p className="text-white text-sm"> Flat Requests</p>
          <p className="text-white text-4xl py-5">12</p>
          </div>
          <hr />
          <p className="font-mono text-white">42% Increase</p>
          <div>

          </div>
        </div>
      </div>
      <h3 className="mt-10">User History</h3>
      <ManageUsers></ManageUsers>
      <h2 className="my-6"> Flat Request Pending</h2>
      <BasicTable></BasicTable>
    </div>
  </Box>
  );
};

export default AdminPage;
