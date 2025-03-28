import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar.jsx";
import { useState } from "react"; 


// Huvudkomponent som hanterar användar-ID och antal produkter i varukorgen. Renderar navbar och sidinnehåll via Outlet.
function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || ""); 
  const [cartCount, setCartCount] = useState(0); 
  return (
    <>
      <Navbar userId={userId} setUserId={setUserId} setCartCount={setCartCount} cartCount={cartCount}/> 
      

      <Container
  sx={{ mt: 0, bgcolor: "#F6F5F0", padding: 0 }}
  maxWidth={false}           
  disableGutters             
  component="main"
>
        <Outlet context={{ userId, setCartCount }}/>  
      </Container> 
    </>
  );
}

export default App;

