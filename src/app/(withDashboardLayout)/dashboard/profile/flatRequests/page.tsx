'use client'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGetAllFlatRequestQuery} from "@/redux/api/flatRequest";
import { Box, IconButton, Paper,Button, Typography } from '@mui/material';


export default function BasicTable() {
  const {data,isLoading}=useGetAllFlatRequestQuery({})
  if (isLoading) {
    return <Typography variant="body1" sx={{
      height:"100vh",
      color:"primary.main",
      fontWeight:"600",
      fontSize:"30px",
      textAlign:"center",
      margin:"50px auto"
      
    }}>Loading ...</Typography>;
  }
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 450 }}>
      <Table sx={{ minWidth: 150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{
               fontWeight:"600",
               fontSize:"15px",
              
            }}>Flat Location</TableCell>
            <TableCell align="right" sx={{
               fontWeight:"600",
               fontSize:"15px",
              
            }}>STATUS</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row:any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.flat?.location}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
    
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
