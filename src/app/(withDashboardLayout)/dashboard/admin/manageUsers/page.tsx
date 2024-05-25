"use client"

import { Box, IconButton, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetAllUserQuery } from '@/redux/api/userManagementApi';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const ManageUsers = () => {
   const query: Record<string, any> = {};

   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);

   query['page'] = page;
   query['limit'] = limit;

   const [users, setAllUsers] = useState<any>([]);
   const { data, isLoading } = useGetAllUserQuery({ ...query });
   console.log(data);

   const meta = data?.meta;

   let pageCount: number;

   if (meta?.total) {
      pageCount = Math.ceil(meta.total / limit);
   }

   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
   };

   useEffect(() => {
      const updateData = data?.map((user: any, index: number) => {
         return {
            sl: index + 1,
            id: user?.id,
            username: user.username,
            email: user.email,
      
         };
      });
      setAllUsers(updateData);
   }, [data]);

   const columns: GridColDef[] = [
      { field: 'sl', headerName: 'Serial', flex: 1 },
      { field: 'username', headerName: 'User name', flex: 1 },
      { field: 'email', headerName: 'Email', flex: 1 },

      {
         field: 'action',
         headerName: 'Action',
         flex: 1,
         headerAlign: 'center',
         align: 'center',
         renderCell: ({ row }) => {
            return (
               <IconButton aria-label='delete'>
                  <DeleteIcon sx={{ color: 'red' }} />
                
               </IconButton>
            );
         },
      },
      {
         field: 'changeRole',
         headerName: 'Change Role',
         flex: 1,
         headerAlign: 'center',
         align: 'center',
         renderCell: ({ row }) => {
            return (
               <IconButton aria-label='delete'>
                  <ManageAccountsIcon sx={{ color: 'red' }} />
               </IconButton>
            );
         },
      },
   ];

   return (
      <Box>
         <Box>
            {!isLoading ? (
               <Box my={2}>
                  <DataGrid
                     rows={users ?? []}
                     columns={columns}
                     hideFooterPagination
                     slots={{
                        footer: () => {
                           return (
                              <Box
                                 sx={{
                                    mb: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                 }}
                              >
                                 <Pagination
                                    color='primary'
                                    count={pageCount}
                                    page={page}
                                    onChange={handleChange}
                                 />
                              </Box>
                           );
                        },
                     }}
                  />
               </Box>
            ) : (
               <h1>Loading.....</h1>
            )}
         </Box>
      </Box>
   );
};

export default ManageUsers;
