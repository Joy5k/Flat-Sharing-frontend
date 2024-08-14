import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const FlatRequestTable=({data,width}:{data:any,width:number|string})=>{
    console.log(data,"flat requests")
    return(
        <div>
               <TableContainer component={Paper} sx={{ maxWidth: width ,
    boxShadow:" 5px 20px 10px 0 rgba(14, 165, 233, 0.3), 0 1px 2px 0 rgba(14, 165, 233, 0.06)"
  }}>
      <Table sx={{ minWidth: 150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{
               fontWeight:"600",
               fontSize:"15px",
              
            }}>No.</TableCell>
            <TableCell sx={{
               fontWeight:"600",
               fontSize:"15px",
              
            }}>Requested User</TableCell>
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
       {
        data?.length ?  data?.map((row:any,i:any) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
          
           <TableCell component="th" scope="row">
            {i+1}
          </TableCell>
           <TableCell component="th" scope="row">
            {row?.user?.username}
          </TableCell>
          <TableCell component="th" scope="row">
            {row?.flat?.location}
          </TableCell>
          <TableCell align="right">{row.status}</TableCell>
             
    
          </TableRow>
        )) :<p className='text-center w-full text-sky-800 font-mono font-semibold text-xl ml-10 py-10 '>No Flat Request Pending</p>
       }
        </TableBody>
      </Table>
      </TableContainer>
        </div>
    )
}
export default FlatRequestTable