import * as React from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Menu, 
    MenuItem, 
    Box, 
    Drawer, 
    List, 
    ListItem, 
    ListItemText 
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HiveOutlinedIcon from "@mui/icons-material/HiveOutlined";



function TestNavbar(){
    const [cartOpen, setCartOpen] = useState(false);

    function toggleCart(open) {
        return () => {
          setCartOpen(open);
        };
    }


     

    return (
        <AppBar>

            {/*Navbar sectionen*/}
            <Toolbar  sx={{ display: "flex", justifyContent: "space-between" }}>
                {/*Vänster delen - meny*/}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Typography sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                        Produkter<KeyboardArrowDownIcon />
                    </Typography>
                </Box>

                {/*Mitten - logo*/}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "black", alignItems: "center"}}>
                        Webbshop <HiveOutlinedIcon sx={{ ml: 1 }} />
                    </Link>
                </Typography>

                { /*Höger - Profil-varukorgen*/}
                <Box>
                    <IconButton component={Link} to="/admin">
                        <AccountCircleIcon />
                    </IconButton>
                    <span>|</span>
                    <IconButton onClick={toggleCart(true)}>
                        <ShoppingCartIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            {/*Varukorgens sidopanel*/}
            <Drawer anchor="right" open={cartOpen}  onClose={toggleCart(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                <Typography variant="h6">Du har kommit till din Varukorg</Typography>
                <List>
                    <ListItem>
                    <ListItemText primary="Din varukorg är tom" />
                    </ListItem>
                </List>
                </Box>
            </Drawer>
        </AppBar>
    );

}
export default TestNavbar;