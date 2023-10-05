import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [fname, setFname] = useState({ value: "", error: false, errormsg: "" });
  const [lname, setLname] = useState({ value: "", error: false, errormsg: "" });
  const [email, setEmail] = useState({ value: "", error: false, errormsg: "" });
  const [user, setUser] = useState({ value: "", error: false, errormsg: "" });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    errormsg: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isFNameValid = fname.value.trim().length > 0;
    let isLNameValid = lname.value.trim().length > 0;
    let isEmailValid = emailRegex.test(email.value);
    let isPasswordValid = password.value.trim().length > 0;
    let isUserValid = user.value.trim().length > 0;
    if (!isFNameValid) {
      setFname({ ...fname, error: true, errormsg: "Enter first name" });
      return;
    }
    if (!isLNameValid) {
      setLname({ ...lname, error: true, errormsg: "Enter lirst name" });
      return;
    }
    if (!isUserValid) {
      setUser({ ...user, error: true, errormsg: "Enter user name" });
      return;
    }
    if (!isEmailValid) {
      setEmail({
        ...email,
        error: true,
        errormsg: "Please enter a valid email",
      });
      return;
    }
    if (!isPasswordValid) {
      setPassword({
        ...password,
        error: true,
        errormsg: "Please enter a valid passowrd",
      });
      return;
    }
    let payload = {
      firstname: fname.value,
      lastname: lname.value,
      username: user.value,
      email: email.value,
      password: password.value,
      usertype: "app",
      role: "user",
      status: "active",
    };
    axios({
      method: "post",
      url: " http://bd-userservice-lb-staging-233784656.us-east-1.elb.amazonaws.com/api/v1/signup",
      data: payload,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status == 201) {
          navigate("/");
        }
      })
      .catch(() => console.log("error occured"));
    axios({
      method: "post",
      url: "http://3.84.171.136:5000/user/add",
      data: payload,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status == 201) {
          navigate("/");
        }
      })
      .catch(() => console.log("error occured"));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          boxShadow: "0px 5px 15px -2px rgba(0,0,0,0.75)",
          paddingBottom: "20px",
          borderRadius: "12px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) =>
                    setFname({
                      value: e.target.value,
                      error: false,
                      errormsg: "",
                    })
                  }
                  error={fname.error}
                  helperText={fname.error && fname.errormsg}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) =>
                    setLname({
                      value: e.target.value,
                      error: false,
                      errormsg: "",
                    })
                  }
                  error={lname.error}
                  helperText={lname.error && lname.errormsg}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  onChange={(e) =>
                    setUser({
                      value: e.target.value,
                      error: false,
                      errormsg: "",
                    })
                  }
                  error={user.error}
                  helperText={user.error && user.errormsg}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) =>
                    setEmail({
                      value: e.target.value,
                      error: false,
                      errormsg: "",
                    })
                  }
                  error={email.error}
                  helperText={email.error && email.errormsg}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) =>
                    setPassword({
                      value: e.target.value,
                      error: false,
                      errormsg: "",
                    })
                  }
                  error={password.error}
                  helperText={password.error && password.errormsg}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
