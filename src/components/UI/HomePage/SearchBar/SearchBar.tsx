"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


function valuetext(value: number) {
    return `${value}°C`;
  }

const SearchField: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [val, setPrice] = useState<number>(0);
  const [bedRoom, setBedroomNumber] = useState<number>();

  const [minPrice, setMinPrice] = React.useState<number>(20);
  const [maxPrice, setMaxPrice] = React.useState<number>(37);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setMinPrice(newValue[0]);
      setMaxPrice(newValue[1]);
    }
  };

    
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSelectBedroom = (event:any) => {
      setBedroomNumber(Number(event.target.value));
      
    };
    
  return (
    <Box sx={{ backgroundColor: "#fff", margin: "0 auto", maxWidth: 1600 }}>
      <Typography
        sx={{ fontSize: "30px", fontWeight: "600", margin: "0 auto" }}
      >
        Filter Flat
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Box sx={{ marginLeft: "100px", fontSize: "20px" }}>
          <p>Search Flat location</p>
        </Box>


 {/* price range selector */}
 <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={[minPrice, maxPrice]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>

        {/* select number of bedroom selector      Box */}

        <Box sx={{ minWidth: 120 }}>
          <Typography>Choose number of Bed room</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bed Room</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bedRoom}
              label="Bed Room"
              onChange={(e)=>handleSelectBedroom(e.target.value)}
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={6}>Six</MenuItem>
              <MenuItem value={7}>Seven</MenuItem>
              <MenuItem value={8}>Eight</MenuItem>
              <MenuItem value={9}>Nine</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ margin: "0 65px", maxWidth: 400 }}>
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
    </Box>

  );
};

export default SearchField;
