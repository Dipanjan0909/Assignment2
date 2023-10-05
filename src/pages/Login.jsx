import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const[email, setEmail] = useState({value: "",error: false, errormsg: ""});
    const[password, setPassword] = useState({value: "",error: false, errormsg: ""});
  const handleSubmit = (event) => {
    event.preventDefault();
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isEmailValid = email.value.trim().length > 0;
    let isPasswordValid = password.value.trim().length > 0;
    


    const data = new FormData();
    if(!isEmailValid){
        setEmail({...email, error: true, errormsg: "Please enter a valid username"})
        return;
    }
    if(!isPasswordValid){
        setPassword({...password, error: true, errormsg: "Please enter a valid passowrd"})
        return;
    }
    data.append("username", email.value)
    data.append("password", password.value)
    axios({
      method: "post",
      url: "http://bd-userservice-lb-staging-233784656.us-east-1.elb.amazonaws.com/api/v1/login",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res)=>{if(res.status==200){
      navigate("/home")}
    }).catch(()=> console.log("error occured"))


    /*--> this endpoint is not working getting 500 error
    
    axios({
      method: "post",
      url: "http://3.84.171.136:5000/user/login",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res)=>{if(res.status==200){
      navigate("/home")
    }}).catch(()=> console.log("error occured"))
    */



    
  };

  return (
    <ThemeProvider theme={defaultTheme} >
      <Container component="main" maxWidth="xs" style={{boxShadow: "0px 5px 15px -2px rgba(0,0,0,0.75)",paddingBottom: "20px", borderRadius: "12px"}} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=> setEmail({value: e.target.value, error: false, errormsg: ""})}
              error={email.error}
              helperText={email.error && email.errormsg}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=> setPassword({value: e.target.value, error: false, errormsg: ""})}
              error={password.error}
              helperText={password.error && password.errormsg}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
