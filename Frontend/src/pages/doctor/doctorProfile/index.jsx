import React from 'react';
import { Box, Typography, Avatar, Grid, Paper } from '@mui/material';

const DoctorProfile = ({doctor}) => {
    console.log("doctor",doctor.profilePicture)
  return (
    <Paper sx={{ display: 'flex', padding: 3, borderRadius: 2, boxShadow: 3 }}>
      {/* Left Section - Image */}
      <Box sx={{ marginRight: 3 }}>
        <Avatar
          src={`http://localhost:3005/images/${doctor.profilePicture}`} // Image URL passed via props
          alt={doctor.fullName}
          sx={{ width: 120, height: 120 }}
        />
      </Box>

      {/* Right Section - Dynamic Content */}
      <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{doctor.fullName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textSecondary">{doctor.biography}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">{doctor.qualification}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Wait Time: {doctor.waitTime}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Experience: {doctor.specialty}</Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <Typography variant="body1">Satisfied Patients: {doctor.satisfiedPatients}</Typography>
        </Grid> */}
      </Grid>
    </Paper>
  );
};

export default DoctorProfile;
