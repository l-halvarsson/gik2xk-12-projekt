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
    Tooltip,
    ListItemText 
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HiveOutlinedIcon from "@mui/icons-material/HiveOutlined";
import { Avatar, TextField, Button } from "@mui/material";
import axios from "../services/api";
import Cart from './Cart';


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

    const [userId, setUserId] = useState(localStorage.getItem("userID") || "");
    const [userName, setUserName] = useState("");

    async function handleLogin() {
        try {
            const response = await axios.get(`/users/${userId}`);
            const user = response.data;
            localStorage.setItem("UserId", userId);
            setUserName(user.firstName);
            alert("Inloggad som användare " + user.firstName);

        } catch (error) {
            alert("Användare med id: " + userId + " hittades inte.");
            setUserName("");
            localStorage.removeItem("userId");
        }

    }
    return (
        <AppBar position="sticky" sx={{height: "7rem", backgroundColor: "#F6F5F0", boxShadow: 'none'}}>
            {/*Navbar sektionen*/}
            <Toolbar sx={{height: "100%", display: "flex", justifyContent: "space-between" }}>

                {/* Inloggning högst upp till vänster */}
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {userName ? (
                    <Tooltip title={userName}>
                    <Avatar sx={{ bgcolor: "#888", width: 40, height: 40 }}>
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                    </Tooltip>
                ) : (
                    <>
                    <TextField
                        label="Användar-ID"
                        variant="outlined"
                        size="small"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        sx={{ backgroundColor: "white", borderRadius: 1 }}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleLogin}
                        sx={{ backgroundColor: "#ccc", color: "black", "&:hover": { backgroundColor: "#bbb" } }}
                    >
                        Logga in
                    </Button>
                    </>
                )}
                </Box>
        




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