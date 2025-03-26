
import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar.jsx";
import { useState } from "react"; //Tillagt precis



function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || ""); //Tillagt precis
  const [cartCount, setCartCount] = useState(0); // Lägg till definiering av cartCount
  return (
    <>
      <Navbar userId={userId} setUserId={setUserId} setCartCount={setCartCount} cartCount={cartCount}/> 
      

      <Container
  sx={{ mt: 0, bgcolor: "#F6F5F0", padding: 0 }}
  maxWidth={false}           // ← gör att den fyller hela skärmen
  disableGutters             // ← tar bort padding inuti Container
  component="main"
>
        <Outlet context={{ userId, setCartCount }}/>  
      </Container> 
    </>
  );
}

export default App;

