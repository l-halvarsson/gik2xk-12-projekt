
import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  
  Container
} from "@mui/material";
import Navbar from "./components/Navbar.jsx";



function App() {
  return (
    <>
      <Navbar /> 
      <Container sx={{ mt: 4 }} maxWidth="xl" component="main">
        <Outlet />
      </Container>
    </>
  );
}

export default App;

