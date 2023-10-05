import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

export default function Home() {
  let navigate=useNavigate()
  return (
    <>
      <h1>Home Page</h1>
      <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={()=> navigate("/")}>
        Log out
      </Button>
    </>
  );
}
