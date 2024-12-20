import React, { useState } from 'react';
import {
  TextField, Button, Typography, Box, Grid, MenuItem, Select, InputLabel,
  FormControl, FormHelperText, IconButton, Tooltip, CircularProgress
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { AttachFile, CloudUpload } from '@mui/icons-material';
import ChatBot from '../../pages/chatbot';

const SymptomsForm = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [symptom, setSymptom] = useState('');
  const [severity, setSeverity] = useState('');
  const [symptomDuration, setSymptomDuration] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false); // Shared state

  const isSmallScreen = useMediaQuery('(max-width:500px)');
  // Handle file uploads
  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name,
      dob,
      gender,
      symptom,
      severity,
      symptomDuration,
      files,
    };

    console.log('Form Data Submitted:', formData);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      alert('Form submitted successfully!');
    }, 2000); // Simulate 2s API response delay
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', padding: 4, boxShadow: 3, borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
  {!(isSmallScreen && showChatbot) && (
        <>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Symptom Data Submission
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              variant="outlined"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
                required
                sx={{ backgroundColor: 'white' }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Primary Symptom"
              variant="outlined"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              required
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Symptom Severity (1-10)"
              type="number"
              variant="outlined"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              inputProps={{ min: 1, max: 10 }}
              required
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Duration of Symptom"
              variant="outlined"
              value={symptomDuration}
              onChange={(e) => setSymptomDuration(e.target.value)}
              required
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Upload Medical Reports</Typography>
            <Box sx={{
              border: '2px dashed #1976d2', borderRadius: '8px', padding: 3, textAlign: 'center'
            }}>
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                multiple
                accept="image/*, .pdf, .docx"
                id="file-upload-input"
              />
              <label htmlFor="file-upload-input">
                <Tooltip title="Click to upload medical reports">
                  <IconButton
                    color="primary"
                    component="span"
                    size="large"
                    sx={{ fontSize: '30px', marginBottom: 1 }}
                  >
                    <AttachFile />
                  </IconButton>
                </Tooltip>
                <Typography variant="body1" color="textSecondary">Click or drag files here</Typography>
              </label>
              <Box sx={{ marginTop: 2 }}>
                {files.length > 0 && (
                  <Typography variant="body2" color="textSecondary">
                    <strong>Uploaded Files:</strong>
                    <ul>
                      {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{
                padding: '14px 0',
                fontWeight: 'bold',
                backgroundColor: loading ? 'gray' : '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' }
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
      </>
      )}
      <div>
        <ChatBot showChatbot={showChatbot} setShowChatbot={setShowChatbot}/>
      </div>
    </Box>
  );
};

export default SymptomsForm;
