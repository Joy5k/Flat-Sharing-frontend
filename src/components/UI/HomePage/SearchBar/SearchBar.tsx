"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from '@mui/material/Divider';
import FlatCard from "../FlatCard/FlatCard";

const SearchField: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bedrooms, setBedroomNumber] = useState<number|''>('');

  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(10000);
  
  const searchData={priceMin,priceMax,bedrooms,searchTerm}
// set min price and max price
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceMin(newValue[0]);
      setPriceMax(newValue[1]);
    }
  };

    // handle Search Term
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  //set bed room quantity
  const handleSelectBedroom = (event:any) => {
      setBedroomNumber(event.target.value);
      
    };
    
  return (
    <Box sx={{
      backgroundColor: "#fff",
      margin: "0 auto", maxWidth: 1200, padding: 2
    }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 0",
      }}
    >
      <Typography 
        sx={{ 
          fontSize: { xs: "24px", md: "30px" }, 
          fontWeight: "600", 
          color: "primary.main", 
          marginTop: "50px" 
        }}
      >
        Filter Your Desired Flat
      </Typography>
    </Box>
        <Divider>Spare Room</Divider>

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        gap: { xs: 2, md: 0 },
      }}
    >
      {/* Price range selector */}
      <Box sx={{ width: { xs: "100%", md: 300 } }}>
        <Typography my={2} ml={2}>Choose Price Range</Typography>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={[priceMin, priceMax]}
          onChange={handleChange}
          min={0}
          max={10000}
          valueLabelDisplay="auto"
        />
      </Box>

      {/* Select number of bedroom selector */}
      <Box sx={{ minWidth: 120, width: { xs: "100%", md: "auto" } }}>
        <Typography my={2}>Choose number of Bed room</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Bed Room</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bedrooms}
            label="Bed Room"
            onChange={handleSelectBedroom}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Search Flat Location */}
      <Box sx={{ margin: { xs: "0 auto", md: "0 65px" }, width: "100%", maxWidth: 250 }}>
        <Typography my={2}>Search Flat Location</Typography>
        <form onSubmit={handleSearch}>
          <TextField
            label="Search location"
            variant="outlined"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </form>
      </Box>
      </Box>
      <FlatCard searchData={searchData}></FlatCard>
  </Box>
  );
};

export default SearchField;
