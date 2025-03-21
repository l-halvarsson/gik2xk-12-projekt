
import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  
  Container
} from "@mui/material";
import TestNavbar from "./components/Navbar.jsx";



function App() {
  return (
    <>
      <TestNavbar />
      <Container sx={{ mt: 4 }} maxWidth="xl" component="main">
        <Outlet />
      </Container>
    </>
  );
}

export default App;

