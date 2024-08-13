"use client"
import React, { useState } from 'react';
import { Box, Button, Container, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Grid } from '@mui/material';
import Image from 'next/image';

const LandingPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showFreeformInput, setShowFreeformInput] = useState(false);

  const handleSelectChange = (e:any) => {
    const value = e.target.value as string;
    setSelectedOption(value);
    setShowFreeformInput(value === '20'); // Show the freeform input when 'Other' is selected
  };

  return (
    <main className='border border-gray-600'>
      <Container>
    
        <Box className="form-and-review" sx={{ mt: 5 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className="form-guide">
                <Typography variant="h4" gutterBottom>
                  Download our free guide?
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                  Just sign up to our free lodger tips and advice newsletter and we’ll email you your free guide.
                </Typography>
                <form method="post" action="/autoresponder.pl">
                  <input type="hidden" name="list_id" value="3" />
                  <input type="hidden" name="function" value="signup" />
                  <input type="hidden" name="template" value="autoresponder_simple" />
                  <input type="hidden" name="file" value="tube-landing" />
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      label="Name"
                      name="first_name"
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      label="Email"
                      name="email"
                      fullWidth
                      variant="outlined"
                      type="email"
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="i-am-label">I am:</InputLabel>
                      <Select
                        labelId="i-am-label"
                        id="I_am"
                        value={selectedOption}
                        onChange={handleSelectChange}
                        label="I am"
                      >
                        <MenuItem value="">
                          <em>Choose an option</em>
                        </MenuItem>
                        <MenuItem value="17">Thinking about getting a lodger</MenuItem>
                        <MenuItem value="18">Preparing to get my first lodger</MenuItem>
                        <MenuItem value="19">Already a lodger landlord/have had a lodger before</MenuItem>
                        <MenuItem value="20">Other - none of the above</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {showFreeformInput && (
                    <Box sx={{ mb: 2 }}>
                      <TextField
                        label="Please specify"
                        name="1st_pre_qualifying_response_freeform"
                        fullWidth
                        variant="outlined"
                      />
                    </Box>
                  )}
                  <Button variant="contained" color="secondary" type="submit">
                    Sign up for the free guide
                  </Button>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    *We take your privacy <em>very</em> seriously. Your data will never be sold or shared with anyone. See our <a href="/content/default/terms-uk">terms</a> & <a href="/content/default/privacy-uk">privacy</a>. You can unsubscribe easily anytime.
                  </Typography>
                </form>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="trustpilot-review">
                <div className="review">
                  <Image
                    src="https://assets.spareroom.co.uk/img/spareroom/landingpages/trustpilot/stars_trustpilot.svg"
                    alt="trustpilot 5 stars"
                    width={120}
                    height={20}
                  />
                  <Typography variant="body1" component="p">
                    “We received our first enquiry just over an hour after making our listing live. This prospective tenant viewed the property in less than 24 hours and was exactly the type of tenant we were after. Thank you SpareRoom”
                  </Typography>
                  <Typography variant="subtitle2">- Denise</Typography>
                </div>
                <div className="review" style={{ marginTop: '16px' }}>
                  <Image
                    src="https://assets.spareroom.co.uk/img/spareroom/landingpages/trustpilot/stars_trustpilot.svg"
                    alt="trustpilot 5 stars"
                    width={120}
                    height={20}
                  />
                  <Typography variant="body1" component="p">
                    “Plenty of response. I have found the perfect tenant.”
                  </Typography>
                  <Typography variant="subtitle2">- Jackie</Typography>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>

       
      </Container>
    </main>
  );
};

export default LandingPage;
