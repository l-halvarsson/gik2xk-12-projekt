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



function Navbar(){
    //Hanterar varukorgens tillstånd
    const [cartOpen, setCartOpen] = useState(false);
    //Togglar varukorgens tillstånd
    function toggleCart(open) {
        return () => {
          setCartOpen(open);
        };
    }

    //Hanterar kategori-listans tillstånd
    const [menuDropDown, setMenuDropDown] = useState(null);
    //Öppna kategori-listan
    function openMenuDropDown(event) {
        setMenuDropDown(event.currentTarget);
    }
    //Stänger kategori-listan
    function closeMenuDropDown() {
        setMenuDropDown(null);
    }
    return (
        <AppBar position="sticky" sx={{height: "7rem", backgroundColor: "#F6F5F0", boxShadow: 'none'}}>
            {/*Navbar sektionen*/}
            <Toolbar sx={{height: "100%", display: "flex", justifyContent: "space-between" }}>
                {/*Vänster delen - meny*/}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Typography sx={{ cursor: "pointer", display: "flex", alignItems: "center", color: "#0E100E" }}  onClick={openMenuDropDown}>
                        Produkter<KeyboardArrowDownIcon />
                    </Typography>
                    <Menu anchorEl={menuDropDown} open={Boolean(menuDropDown)} onClose={closeMenuDropDown}>
                        <MenuItem onClick={closeMenuDropDown} component={Link} to="/products">
                            Visa alla produkter
                        </MenuItem>
                    </Menu>
                </Box>

                {/*Mitten - logo*/}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "grey", alignItems: "center"}}>
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
export default Navbar;