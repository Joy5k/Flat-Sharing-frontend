"use client"

import { Box } from "@mui/material";
import ManageUsers from "./manageUsers/page";
import BasicTable from "../profile/flatRequests/page";
import ApartmentIcon from '@mui/icons-material/Apartment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import GroupIcon from '@mui/icons-material/Group';
import { useGetAllUserQuery } from "@/redux/api/userManagementApi";
import { useState } from "react";
import { useGetAllFlatPostsAdminQuery } from "@/redux/api/flatApi";
import { useGetAllFlatRequestQuery } from "@/redux/api/flatRequest";
const AdminPage = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  query["page"] = page;
  query["limit"] = limit;
  const { data:flats, isLoading:flatLoading } = useGetAllFlatPostsAdminQuery({})
  const { data, isLoading } = useGetAllUserQuery({ ...query });
  const {data:flatReq,isLoading:flatReqLoading}=useGetAllFlatRequestQuery({})
  if(isLoading || flatLoading){
    return <p>loading..</p>
  }
  return (
    <Box>
    <h1 className="text-sky-800 mb-5">Overview</h1>
    <div>
      <div className="flex md:flex-row lg:flex-row justify-evenly gap-5">
        <div className="border bg-sky-600 p-5 w-72 h-44 rounded-lg">
          <div className=" flex flex-row-reverse justify-between ">
         <ApartmentIcon sx={{
          fontSize:"100px",
          color:"white"
         }}></ApartmentIcon>
          <div>
          <p className="text-white text-sm"> Flats</p>
          <p className="text-white text-4xl py-5">{flats.length}</p>
          </div>
          </div>
          <hr />
          <p className="font-mono text-white">{flats.length * 3.67}% Increase</p>
          <div>

          </div>
        </div>

        <div className="border bg-purple-600 p-5 w-72 h-44 rounded-lg">
          <div className=" flex flex-row-reverse justify-between ">
            <GroupIcon sx={{
          fontSize:"100px",
          color:"white"
         }}></GroupIcon>
          <div>
          <p className="text-white text-sm"> Users</p>
          <p className="text-white text-4xl py-5">{data.length}</p>
          </div>
          </div>
          <hr />
          <p className="font-mono text-white">{data.length * 1.23}% Increase</p>
          <div>

          </div>
        </div>
        <div className="border bg-rose-500 p-5 w-72 h-44 rounded-lg">
          <div className=" flex flex-row-reverse justify-between ">
            <PendingActionsIcon  sx={{
          fontSize:"100px",
          color:"white"
         }}></PendingActionsIcon>
        <div>
        <p className="text-white text-sm"> Flat Requests</p>
        <p className="text-white text-4xl py-5">{flatReq.length}</p>
        </div>
          </div>
          <hr />
          <p className="font-mono text-white">{flatReq.length * 2.45}% Increase</p>
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
