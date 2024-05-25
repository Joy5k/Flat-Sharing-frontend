"use client";

import { useGetSingleFlatQuery } from "@/redux/api/flatApi";
import { Box, Typography } from "@mui/material";

const FlatDetailsPage = ({ params }: any) => {
  const{data,isLoading} = useGetSingleFlatQuery(params.flatId);
console.log(data,'the flat details data');
  return (
    <Box>
      <Box>{isLoading ? "Loading..." : <Box>Params:{data}</Box>}</Box>
    </Box>
  );
};

export default FlatDetailsPage;
