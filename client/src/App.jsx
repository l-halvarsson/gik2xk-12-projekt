/*import { Link, Outlet } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container
} from '@mui/material';

function App() {
  return (
    <>
      <Box component="header" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Webbshop</Link>
            </Typography>
            <Button color="inherit">
              <Link to="/products">Visa alla produkter</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ mt: 4 }} maxWidth="xl" component="main">
        <Outlet />
      </Container>
    </>
  );
}


export default App;*/

import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HiveOutlinedIcon from "@mui/icons-material/HiveOutlined";
import TestNavbar from "./components/Navbar.jsx";
function Navbar() {
  
  return (
    <Box component="header" sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5dc" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none", color: "grey", display: "flex", alignItems: "center" }}>
              Webbshop <HiveOutlinedIcon sx={{ ml: 1 }} />
            </Link>
          </Typography>
          <Button component={Link} to="/products" style={{ textDecoration: "none", color: "grey" }}>
            Visa alla produkter
          </Button>
          <IconButton component={Link} to="/admin" style={{ textDecoration: "none", color: "grey" }}>
          <PersonIcon /> 
        </IconButton>
          <IconButton component={Link} to="/cart/:userId" style={{ textDecoration: "none", color: "grey" }}>
          <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <TestNavbar />
      <Container sx={{ mt: 4 }} maxWidth="xl" component="main">
        <Outlet />
      </Container>
    </>
  );
}

export default App;

