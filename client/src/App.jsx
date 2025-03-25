
import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar.jsx";
import { useState } from "react"; //Tillagt precis



function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || ""); //Tillagt precis
  return (
    <>
      <Navbar userId={userId} setUserId={setUserId}/> 
      <Container sx={{ mt: 4, border: "#F6F5F0", bgcolor: "#F6F5F0" }} maxWidth="xl" component="main">
        <Outlet context={{ userId }}/>  
      </Container>
    </>
  );
}

export default App;

