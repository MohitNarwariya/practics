import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import {postData,getData} from '../services/FetchNodeServices'

const RegistrationPage = () => {
  // State variables to store user input
  const [userName, setUserName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit =async () => {
    var formData = new FormData()
      
      formData.append('username', userName) 
      formData.append('mobileno', mobileNo)  
      formData.append('email', email)
      formData.append('password', password)
   
      var result = await postData('adminlogin/add_user_data', formData)
      alert(result.status)
     
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Registration Page
      </Typography>
      {/* <form onSubmit={handleSubmit}> */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Full Name"
              fullWidth
             
              onChange={(e) => setUserName(e.target.value)}
              
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Mobile No"
              fullWidth
              type="text"
             
              onChange={(e) => setMobileNo(e.target.value)}
             
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              fullWidth
            
             
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Password"
              fullWidth
              type="password"
       
              onChange={(e) => setPassword(e.target.value)}
           
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit} variant="contained" color="primary" type="submit" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      {/* </form> */}
    </Container>
  );
};

export default RegistrationPage;
